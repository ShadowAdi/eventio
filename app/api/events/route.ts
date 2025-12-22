import { db } from "@/config/db";
import { eventsTable } from "@/db/schema";
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
        return NextResponse.json({ message: "Error Server" }, { status: 500 });
    }
}

export async function POST(req: NextRequest) {
    try {
        const body = await req.json();

        const {
            title,
            description,
            location,
            isOnline = false,
            imageUrl,
            startDate,
            endDate,
            capacity,
            price,
        } = body;

        if (!title || !description || !startDate || !endDate) {
            return NextResponse.json(
                { success: false, message: "Missing required fields" },
                { status: 400 }
            );
        }

        const [event] = await db
            .insert(eventsTable)
            .values({
                title,
                description,
                location,
                isOnline,
                imageUrl,
                startDate: new Date(startDate),
                endDate: new Date(endDate),
                capacity,
                price,
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
            { success: false, message: "Internal Server Error" },
            { status: 500 }
        );
    }
}