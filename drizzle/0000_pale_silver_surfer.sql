CREATE TABLE `gists` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`url` text NOT NULL,
	`title` text NOT NULL,
	`category` text NOT NULL,
	`upvotes` integer DEFAULT 0,
	`created_at` integer DEFAULT '"2025-03-13T14:50:27.273Z"'
);
--> statement-breakpoint
CREATE UNIQUE INDEX `gists_url_unique` ON `gists` (`url`);