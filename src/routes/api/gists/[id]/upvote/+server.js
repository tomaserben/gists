import { json } from '@sveltejs/kit';
import db from '$lib/db';
import { gists } from '$lib/db/schema';
import { eq, sql } from 'drizzle-orm';

export async function POST({ params }) {
	const [updatedGist] = await db
		.update(gists)
		.set({ upvotes: sql`${gists.upvotes} + 1` })
		.where(eq(gists.id, Number(params.id)))
		.returning();
	return json(updatedGist);
}
