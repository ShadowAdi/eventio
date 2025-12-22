import { db } from "@/config/db";
import { eventsTable } from "@/db/schema";
import { NextResponse } from "next/server";

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