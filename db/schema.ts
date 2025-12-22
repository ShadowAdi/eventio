import {
  mysqlTable,
  int,
  varchar,
  text,
  datetime,
  boolean,
  decimal,
} from "drizzle-orm/mysql-core";

export const events = mysqlTable("events", {
  id: int("id").primaryKey().autoincrement(),

  title: varchar("title", { length: 255 }).notNull(),

  description: text("description").notNull(),

  location: varchar("location", { length: 255 }),

  isOnline: boolean("is_online").notNull().default(false),

  imageUrl: varchar("image_url", { length: 512 }),
  
  startDate: datetime("start_date").notNull(),

  endDate: datetime("end_date").notNull(),

  capacity: int("capacity"),

  price: decimal("price", { precision: 10, scale: 2 }).default("0.00"),

  createdAt: datetime("created_at").notNull().$defaultFn(() => new Date()),

  updatedAt: datetime("updated_at")
    .notNull()
    .$defaultFn(() => new Date())
    .$onUpdateFn(() => new Date()),
});
