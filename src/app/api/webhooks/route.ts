import { headers } from 'next/headers';
import { Webhook } from 'svix';
import type { WebhookEvent } from '@clerk/nextjs/server';
import { eq } from 'drizzle-orm';

import { db } from '@externals/storage/connection.storage';
import { user } from '@externals/storage/schema.storage';
import { DEFAULT_USER_PROFILE_URL } from '@shared/constants/user.constant';

export async function POST(request: Request) {
  const WEBHOOK_SECRET = process.env.WEBHOOK_SECRET;

  if (!WEBHOOK_SECRET) {
    throw new Error('Please add WEBHOOK_SECRET from Clerk Dashboard to .env');
  }

  const headerPayload = headers();
  const svix_id = headerPayload.get('svix-id');
  const svix_timestamp = headerPayload.get('svix-timestamp');
  const svix_signature = headerPayload.get('svix-signature');

  if (!svix_id || !svix_timestamp || !svix_signature) {
    return new Response('Error occurred -- no svix headers', {
      status: 400,
    });
  }

  const payload = await request.json();
  const body = JSON.stringify(payload);

  const webhook = new Webhook(WEBHOOK_SECRET);

  let event: WebhookEvent;

  try {
    event = webhook.verify(body, {
      'svix-id': svix_id,
      'svix-timestamp': svix_timestamp,
      'svix-signature': svix_signature,
    }) as WebhookEvent;
  } catch (error) {
    console.error('Error verifying webhook:', error);
    return new Response('Error occurred', {
      status: 400,
    });
  }

  const eventType = event.type;

  if (eventType === 'user.created') {
    try {
      await db.insert(user).values({
        userId: event.data.id,
        name: `${event.data.first_name} ${event.data.last_name}`,
        email: event.data.email_addresses[0].email_address,
        imageUrl: event.data.has_image
          ? event.data.image_url
          : DEFAULT_USER_PROFILE_URL,
        createdAt: new Date(event.data.created_at),
      });
    } catch (error) {
      console.error('Error creating user:', error);
      return new Response('Error occurred', {
        status: 400,
      });
    }
  }

  if (eventType === 'user.deleted') {
    if (event.data.id) {
      try {
        await db.delete(user).where(eq(user.userId, event.data.id));
      } catch (error) {
        console.error('Error deleting user:', error);
        return new Response('Error occurred', {
          status: 400,
        });
      }
    }
  }

  return new Response(null, { status: 200 });
}
