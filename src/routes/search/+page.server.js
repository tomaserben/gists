import db from '$lib/db';
import { gists } from '$lib/db/schema';
import { like } from 'drizzle-orm';

export async function load({ url }) {
  const q = url.searchParams.get('q') || '';
  const results = await db.select().from(gists)
    .where(like(gists.title, `%${q}%`));
  return { query: q, gists: results };
}