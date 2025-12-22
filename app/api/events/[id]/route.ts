import { db } from "@/config/db";
import { eventsTable } from "@/db/schema";
import { eq } from "drizzle-orm";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
    { params }: { params: Promise<{ id: string }> }
) {
    const id = Number((await params).id);

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
    { params }: { params: Promise<{ id: string }> }
) {
    const id = Number((await params).id);

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