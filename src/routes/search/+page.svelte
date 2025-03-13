<script>
	import { enhance } from '$app/forms';
	import { invalidateAll } from '$app/navigation';
	import Gist from '$lib/components/gist.svelte';

	let { data } = $props();
</script>

<div class="mx-auto max-w-4xl p-4">
	<div class="grid gap-4">
		{#each data.data as gist}
			<Gist onUpvote={async () => await invalidateAll()} {gist} />
		{/each}
	</div>
</div>
