declare namespace Cloudflare {
  interface Env {
    DB?: D1Database;
    BUCKET?: R2Bucket;
    ADMIN_EMAILS?: string;
    LEAD_WEBHOOK_URL?: string;
    LEAD_WEBHOOK_SECRET?: string;
    WHATSAPP_NUMBER?: string;
    GOOGLE_SITE_VERIFICATION?: string;
    BING_SITE_VERIFICATION?: string;
  }
}
