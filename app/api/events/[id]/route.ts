import { db } from "@/config/db";
import { eventsTable } from "@/db/schema";
import { eq } from "drizzle-orm";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
    req: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    const { id: idParam } = await params;
    const id = Number(idParam);

    if (isNaN(id)) {
        return NextResponse.json({ error: "Invalid ID" }, { status: 400 });
    }

    const current = await db.select().from(eventsTable).where(eq(eventsTable.id, id)).limit(1);
    const existingEvent = current[0];

    if (!existingEvent) {
        return NextResponse.json({ error: "Event not found" }, { status: 404 });
    }

    return NextResponse.json({ event: existingEvent, success: true }, { status: 200 });
}

export async function DELETE(
    req: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    const { id: idParam } = await params;
    const id = Number(idParam);

    if (isNaN(id)) {
        return NextResponse.json({ error: "Invalid ID" }, { status: 400 });
    }

    const current = await db.select().from(eventsTable).where(eq(eventsTable.id, id)).limit(1);
    const existingEvent = current[0];

    if (!existingEvent) {
        return NextResponse.json({ error: "Event not found" }, { status: 404 });
    }
    await db.delete(eventsTable).where(eq(eventsTable.id, id));

    return NextResponse.json({ message: "Event deleted!", success: true }, { status: 200 });
}


export async function PATCH(
    req: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id: idParam } = await params;
        const id = Number(idParam);

        if (isNaN(id)) {
            return NextResponse.json({ error: "Invalid ID" }, { status: 400 });
        }

        const body = await req.json();

        const updateData: Partial<typeof eventsTable.$inferInsert> = {};

        if (body.title !== undefined) updateData.title = body.title;
        if (body.description !== undefined) updateData.description = body.description;
        if (body.location !== undefined) updateData.location = body.location;
        if (body.isOnline !== undefined) updateData.isOnline = body.isOnline;
        if (body.imageUrl !== undefined) updateData.imageUrl = body.imageUrl;
        if (body.capacity !== undefined) updateData.capacity = body.capacity;
        if (body.price !== undefined) updateData.price = body.price;

        if (body.startDate !== undefined)
            updateData.startDate = new Date(body.startDate);

        if (body.endDate !== undefined)
            updateData.endDate = new Date(body.endDate);

        updateData.updatedAt = new Date();

        if (Object.keys(updateData).length === 0) {
            return NextResponse.json(
                { error: "No fields provided to update" },
                { status: 400 }
            );
        }

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
            { error: "Internal Server Error" },
            { status: 500 }
        );
    }
}