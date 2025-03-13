import { json } from '@sveltejs/kit';
import db from '$lib/db';
import { gists } from '$lib/db/schema';

export async function GET() {
  const allGists = await db.select().from(gists);
  console.log(allGists)
  return json(allGists);
}

export async function POST({ request }) {
    const formData = await request.formData();
    const url = formData.get('url')?.toString();
    const title = formData.get('title')?.toString();
    const category = formData.get('category')?.toString();
  
    if (!url || !title || !category) {
      return json({ error: 'Missing required fields' }, { status: 400 });
    }
  console.log(url, title, category)
    try {
      const [newGist] = await db.insert(gists)
        .values({ url, title, category })
        .returning();
      return json(newGist, { status: 201 });
    } catch (error) {
        console.error(error)
      return json({ error: 'Failed to create gist' }, { status: 500 });
    }
  }