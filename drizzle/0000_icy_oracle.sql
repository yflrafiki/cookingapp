CREATE TABLE `videos` (
	`id` text PRIMARY KEY NOT NULL,
	`title` text NOT NULL,
	`description` text NOT NULL,
	`video_url` text NOT NULL,
	`thumbnail` text NOT NULL,
	`ingredients` text,
	`steps` text
);
