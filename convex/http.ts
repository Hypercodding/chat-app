import { httpRouter } from "convex/server";
import { httpAction } from "./_generated/server";
import { WebhookEvent } from "@clerk/nextjs/server";
import { Webhook } from "svix";
import {internal} from "./_generated/api";

const validateAction = async (req: Request): Promise<WebhookEvent | undefined> => {
    const payload = await req.text();

    const svixHeaders = {
        "svix-id": req.headers.get("svix-id")!,
        "svix-timestamp": req.headers.get("svix-timestamp")!,
        "svix-signature": req.headers.get("svix-signature")!,
    };

    const webhook = new Webhook(process.env.CLERK_WEBHOOK_SECRET || "");

    try {
        const event = webhook.verify(payload, svixHeaders) as WebhookEvent;
        return event;
    } catch (error) {
        console.error("Clerk webhook request could not be verified:", error);
        return undefined;
    }
};

const handleClerkWebhook = httpAction(async (ctx, req) => {
    const event = await validateAction(req);

    if (!event) {
        
        return new Response("Could not validate Clerk Payload", {
            status: 400,
        });
    }

    switch (event.type) {
        case "user.created":
            try {
                console.log("Received user.created event:", event.data);
        
                await ctx.runMutation(internal.users.createUser, {
                    username: `${event.data.first_name} ${event.data.last_name}`,
                    imageurl: event.data.image_url,
                    clerkId: event.data.id,
                    email: event.data.email_addresses[0]?.email_address || "",
                });
            } catch (error) {
                console.error("Error creating user:", error);
                return new Response("Internal Server Error", {
                    status: 500,
                });
            }
            break;
        
            case "user.updated":
                try {
                    console.log("Received user.updated event:", event.data);
            
                    await ctx.runMutation(internal.users.createUser, {
                        username: `${event.data.first_name} ${event.data.last_name}`,
                        imageurl: event.data.image_url,
                        clerkId: event.data.id,
                        email: event.data.email_addresses[0]?.email_address || "",
                    });
                } catch (error) {
                    console.error("Error updating user:", error);
                    return new Response("Internal Server Error", {
                        status: 500,
                    });
                }
                break;
            
        default:
            console.log("Unsupported Clerk webhook event:", event.type);
            break;
    }
    return new Response(null, {
        status: 202,
    });
});

const http = httpRouter();

http.route({
    path: "/clerk-user-webhook",
    method: "POST",
    handler: handleClerkWebhook,
});

export default http;
