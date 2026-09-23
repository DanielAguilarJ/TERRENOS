import { sqliteTable, text, integer, index } from "drizzle-orm/sqlite-core";
export const leads = sqliteTable("leads", {
  id: text("id").primaryKey(), name: text("name").notNull(), email: text("email").notNull(), phone: text("phone").notNull(), company: text("company").notNull(),
  modality: text("modality").notNull(), budget: text("budget").notNull(), timeline: text("timeline").notNull(), intent: text("intent").notNull(), message: text("message").notNull(),
  status: text("status").notNull().default("nuevo"), score: integer("score").notNull(), source: text("source").notNull(), consentVersion: text("consent_version").notNull(),
  createdAt: text("created_at").notNull(), followupAt: text("followup_at").notNull(), notification: text("notification").notNull().default("no_configurada")
}, t => [index("idx_leads_created_at").on(t.createdAt), index("idx_leads_status_followup").on(t.status,t.followupAt)]);
export const settings = sqliteTable("settings", { key: text("key").primaryKey(), value: text("value").notNull() });
export const rateLimits = sqliteTable("rate_limits", { key: text("key").primaryKey(), count: integer("count").notNull(), expiresAt: integer("expires_at").notNull() });
