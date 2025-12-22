import { db } from "@/config/db";
import { eventsTable } from "@/db/schema";
import { createEventSchema } from "@/validators/create-event.validator";
import { NextRequest, NextResponse } from "next/server";

export async function GET() {
    try {
        const data = await db.select().from(eventsTable)
        return NextResponse.json({
            "success": true,
            "events": data
        }, { status: 200 });
    } catch (error) {
        console.error("Error to fetch data :", error);
        return NextResponse.json({ success: false, message: "Error Server", error }, { status: 500 });
    }
}

export async function POST(req: NextRequest) {
    try {
        const body = await req.json();

        const parsed = createEventSchema.safeParse(body);

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


        const [event] = await db
            .insert(eventsTable)
            .values({
                ...data,
                startDate: new Date(data.startDate),
                endDate: new Date(data.endDate),
                price: data.price !== undefined ? String(data.price) : undefined,
            })
            .returning();

        return NextResponse.json(
            {
                success: true,
                event,
            },
            { status: 201 }
        );
    } catch (error) {
        console.error("Error creating event:", error);
        return NextResponse.json(
            { success: false, message: "Internal Server Error", error },
            { status: 500 }
        );
    }
}