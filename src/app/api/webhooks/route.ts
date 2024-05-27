import { UserJSON, WebhookEvent } from "@clerk/nextjs/server";
import { headers } from "next/headers";
import { Webhook } from "svix";

export async function POST(req: Request) {
  // You can find this in the Clerk Dashboard -> Webhooks -> choose the endpoint
  const WEBHOOK_SECRET = process.env.LOCAL_WEBHOOK_SECRET;

  if (!WEBHOOK_SECRET) {
    throw new Error(
      "Please add WEBHOOK_SECRET from Clerk Dashboard to .env or .env.local",
    );
  }

  // Get the headers
  const headerPayload = headers();
  const svix_id = headerPayload.get("svix-id");
  const svix_timestamp = headerPayload.get("svix-timestamp");
  const svix_signature = headerPayload.get("svix-signature");

  // If there are no headers, error out
  if (!svix_id || !svix_timestamp || !svix_signature) {
    return new Response("Error occured -- no svix headers", {
      status: 400,
    });
  }

  // Get the body
  const payload = await req.json();
  const body = JSON.stringify(payload);

  // Create a new Svix instance with your secret.
  const wh = new Webhook(WEBHOOK_SECRET);

  let evt: WebhookEvent;

  // Verify the payload with the headers
  try {
    evt = wh.verify(body, {
      "svix-id": svix_id,
      "svix-timestamp": svix_timestamp,
      "svix-signature": svix_signature,
    }) as WebhookEvent;
  } catch (err) {
    console.error("Error verifying webhook:", err);
    return new Response("Error occured", {
      status: 400,
    });
  }

  // Do something with the payload
  // For this guide, you simply log the payload to the console
  // console.log(`Webhook with and ID of ${id} and type of ${eventType}`);
  // console.log("Webhook body:", body);

  const data = evt.data as UserJSON;

  // if (evt.type === "user.created") {
  //   try {
  //     await db.insert(UserTable).values({
  //       id: data.id,
  //       username: data.username,
  //       email: data.email_addresses[0].email_address,
  //       firstName: data.first_name,
  //       lastName: data.last_name,
  //     });

  //     console.log("User created");
  //   } catch (error) {
  //     throw new Error("Error creating user in database");
  //   }
  // }

  // if (evt.type === "user.updated") {
  //   try {
  //     await db.update(UserTable).set({
  //       id: data.id,
  //       username: data.username,
  //       email: data.email_addresses[0].email_address,
  //       firstName: data.first_name,
  //       lastName: data.last_name,
  //     });

  //     console.log("User updated");
  //   } catch (error) {
  //     throw new Error("Error updating user in database");
  //   }
  // }

  return new Response("", { status: 200 });
}
