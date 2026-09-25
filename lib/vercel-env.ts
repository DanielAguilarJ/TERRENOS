// This only lets the Vercel adapter bundle the site. Cloudflare D1 bindings
// are not available in Vercel's Node runtime; the sales API needs separate
// storage before this build can serve buyers.
export const env = {
  DB: undefined,
  ADMIN_EMAILS: process.env.ADMIN_EMAILS ?? "",
  LEAD_WEBHOOK_URL: process.env.LEAD_WEBHOOK_URL ?? "",
  LEAD_WEBHOOK_SECRET: process.env.LEAD_WEBHOOK_SECRET ?? "",
};
