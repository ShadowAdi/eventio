import { db } from "@/config/db";
import { eventsTable } from "@/db/schema";
import { parseId } from "@/utils/parse-id";
import { updateEventSchema } from "@/validators/event.validator";
import { eq } from "drizzle-orm";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
    req: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id: idParam } = await params;

        const id = parseId(idParam);
        if (!id) {
            return NextResponse.json({ error: "Invalid ID" }, { status: 400 });
        }

        const current = await db.select().from(eventsTable).where(eq(eventsTable.id, id)).limit(1);
        const existingEvent = current[0];

        if (!existingEvent) {
            return NextResponse.json({ error: "Event not found" }, { status: 404 });
        }

        return NextResponse.json({ event: existingEvent, success: true }, { status: 200 });
    } catch (error) {
        console.error("Error fetching event:", error);
        return NextResponse.json(
            { success: false, message: "Internal Server Error", error },
            { status: 500 }
        );
    }
}

export async function DELETE(
    req: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id: idParam } = await params;
        const id = parseId(idParam);
        if (!id) {
            return NextResponse.json({ error: "Invalid ID" }, { status: 400 });
        }

        const current = await db.select().from(eventsTable).where(eq(eventsTable.id, id)).limit(1);
        const existingEvent = current[0];

        if (!existingEvent) {
            return NextResponse.json({ error: "Event not found" }, { status: 404 });
        }
        await db.delete(eventsTable).where(eq(eventsTable.id, id));

        return NextResponse.json({ message: "Event deleted!", success: true }, { status: 200 });
    } catch (error) {
        console.error("Error deleting event:", error);
        return NextResponse.json(
            { success: false, message: "Internal Server Error", error },
            { status: 500 }
        );
    }
}

export async function PATCH(
    req: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id: idParam } = await params;
        const id = parseId(idParam);
        if (!id) {
            return NextResponse.json({ error: "Invalid ID" }, { status: 400 });
        }

        const body = await req.json();

        const parsed = updateEventSchema.safeParse(body);

        if (!parsed.success) {
            return NextResponse.json(
                {
                    success: false,
                    errors: parsed.error.flatten().fieldErrors,
                },
                { status: 400 }
            );
        }

        const data = parsed.data;


        if (Object.keys(data).length === 0) {
            return NextResponse.json(
                { error: "No fields provided to update" },
                { status: 400 }
            );
        }


        const updateData: Partial<typeof eventsTable.$inferInsert> = {
            ...data,
            startDate: data.startDate ? new Date(data.startDate) : undefined,
            endDate: data.endDate ? new Date(data.endDate) : undefined,
            price: data.price !== undefined ? String(data.price) : undefined,
            updatedAt: new Date(),
        };

        const existing = await db
            .select()
            .from(eventsTable)
            .where(eq(eventsTable.id, id))
            .limit(1);

        if (!existing.length) {
            return NextResponse.json({ error: "Event not found" }, { status: 404 });
        }

        const [updatedEvent] = await db
            .update(eventsTable)
            .set(updateData)
            .where(eq(eventsTable.id, id))
            .returning();

        return NextResponse.json(
            { success: true, event: updatedEvent },
            { status: 200 }
        );
    } catch (error) {
        console.error("Error updating event:", error);
        return NextResponse.json(
            { success: false, message: "Internal Server Error", error },
            { status: 500 }
        );
    }
}