import {
  pgTable,
  serial,
  varchar,
  text,
  timestamp,
  boolean,
  numeric,
  integer,
} from "drizzle-orm/pg-core";

export const eventsTable = pgTable("events", {
  id: serial("id").primaryKey(),

  title: varchar("title", { length: 255 }).notNull(),

  description: text("description").notNull(),

  location: varchar("location", { length: 255 }),

  isOnline: boolean("is_online").notNull().default(false),

  imageUrl: varchar("image_url", { length: 512 }),

  startDate: timestamp("start_date", { withTimezone: true }).notNull(),

  endDate: timestamp("end_date", { withTimezone: true }).notNull(),

  capacity: integer("capacity"),

  price: numeric("price", { precision: 10, scale: 2 }).default("0.00"),

  createdAt: timestamp("created_at", { withTimezone: true })
    .notNull()
    .defaultNow(),

  updatedAt: timestamp("updated_at", { withTimezone: true })
    .notNull()
    .defaultNow(),
});
