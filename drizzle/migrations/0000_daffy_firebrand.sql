CREATE TABLE `Category` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`name` text NOT NULL
);
--> statement-breakpoint
CREATE TABLE `ProductCategory` (
	`product_id` integer NOT NULL,
	`category_id` integer NOT NULL,
	FOREIGN KEY (`product_id`) REFERENCES `Product`(`id`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`category_id`) REFERENCES `Category`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `Product` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`name` text NOT NULL,
	`description` text,
	`price` integer NOT NULL,
	`image` text,
	`specification` text,
	`brand` text
);
