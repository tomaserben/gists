<script>
	import { enhance } from '$app/forms';
	import { invalidateAll } from '$app/navigation';
	import { page } from '$app/state';
	import Gist from '$lib/components/gist.svelte';

	let { data } = $props();
</script>

<h1 class="m-4 text-2xl font-bold">Category: {page.url.pathname.split('/').pop()}</h1>
<div class="mx-auto max-w-4xl p-4">
	<div class="grid gap-4">
		{#each data.data as gist}
		<Gist onUpvote={async () => await invalidateAll()} {gist} />
		{/each}
	</div>
</div>
