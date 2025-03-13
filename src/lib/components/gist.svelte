<script>
	import { enhance } from "$app/forms";

    let { onUpvote, gist } = $props();
</script>

<div class="rounded border p-4">
	<h2 class="font-semibold">{gist.title}</h2>
	<a href={gist.url} class="text-blue-500" target="_blank">{gist.url}</a>
	<p>Category: {gist.category}</p>
	<form
		method="POST"
		action={`/api/gists/${gist.id}/upvote`}
		use:enhance={({cancel}) => {
            const gistLikes = JSON.parse(localStorage.getItem('gistsLikes') || '[]');
            if (gistLikes.some(e => e === gist.id)) {
                cancel();
                return;
            };
			return async ({ result, update }) => {
                await onUpvote?.();
                localStorage.setItem('gistsLikes', JSON.stringify([...gistLikes, gist.id]));
			};
		}}
	>
		<button class="mt-2 flex items-center gap-2">
			👍 {gist.upvotes}
		</button>
	</form>
</div>
