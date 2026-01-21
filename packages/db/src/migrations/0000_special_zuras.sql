CREATE TABLE `stage_records` (
	`id` text PRIMARY KEY NOT NULL,
	`stage_id` text NOT NULL,
	`player_name` text NOT NULL,
	`time` integer NOT NULL,
	`date` text NOT NULL,
	FOREIGN KEY (`stage_id`) REFERENCES `stages`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
CREATE TABLE `stages` (
	`id` text PRIMARY KEY NOT NULL,
	`name` text NOT NULL,
	`grid_size` integer NOT NULL,
	`board` text NOT NULL,
	`pickaxe_count` integer DEFAULT 3 NOT NULL,
	`required_onigiri` integer DEFAULT 0 NOT NULL,
	`created_at` text NOT NULL
);
