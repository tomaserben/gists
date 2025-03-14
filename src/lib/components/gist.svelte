<script>
	import { enhance } from '$app/forms';
	import { onMount } from 'svelte';
	onMount(() => {
		window.GistEmbed.init();
	});

	let { onUpvote, gist } = $props();

	let isCollapsed = $state(false);
</script>

<div
	class="rounded border p-4"
	onclick={() => {
		isCollapsed = !isCollapsed;
        setTimeout(() => {
            window.GistEmbed.init();
        }, 0);
	}}
>
	<!-- <h2 class="font-semibold">{gist.title}</h2> -->
	{#if isCollapsed}
		<code
			data-gist-id={gist.url.split('/').pop()}
			data-gist-hide-footer="true"
			data-gist-caption={gist.title}
		></code>
	{/if}
	<p>Category: {gist.category}</p>
	<form
		method="POST"
		action={`/api/gists/${gist.id}/upvote`}
		use:enhance={({ cancel }) => {
			const gistLikes = JSON.parse(localStorage.getItem('gistsLikes') || '[]');
			if (gistLikes.some((e) => e === gist.id)) {
				cancel();
				return;
			}
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

<style>
	div {
		max-width: 864px;
	}
</style>
