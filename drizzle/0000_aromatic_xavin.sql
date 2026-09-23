CREATE TABLE `leads` (
	`id` text PRIMARY KEY NOT NULL,
	`name` text NOT NULL,
	`email` text NOT NULL,
	`phone` text NOT NULL,
	`company` text NOT NULL,
	`modality` text NOT NULL,
	`budget` text NOT NULL,
	`timeline` text NOT NULL,
	`intent` text NOT NULL,
	`message` text NOT NULL,
	`status` text DEFAULT 'nuevo' NOT NULL,
	`score` integer NOT NULL,
	`source` text NOT NULL,
	`consent_version` text NOT NULL,
	`created_at` text NOT NULL,
	`followup_at` text NOT NULL,
	`notification` text DEFAULT 'no_configurada' NOT NULL
);
--> statement-breakpoint
CREATE INDEX `idx_leads_created_at` ON `leads` (`created_at`);--> statement-breakpoint
CREATE INDEX `idx_leads_status_followup` ON `leads` (`status`,`followup_at`);--> statement-breakpoint
CREATE TABLE `rate_limits` (
	`key` text PRIMARY KEY NOT NULL,
	`count` integer NOT NULL,
	`expires_at` integer NOT NULL
);
--> statement-breakpoint
CREATE TABLE `settings` (
	`key` text PRIMARY KEY NOT NULL,
	`value` text NOT NULL
);
