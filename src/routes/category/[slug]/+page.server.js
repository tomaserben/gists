import db from '$lib/db';
import { gists } from '$lib/db/schema';
import { eq } from 'drizzle-orm';

export async function load({ params }) {
	const category = params.slug;
	const allGists = await db.select().from(gists).where(eq(gists.category, category));
	return { data: allGists, category };
}
