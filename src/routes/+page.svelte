<script>
	import { enhance } from '$app/forms';
	import { invalidateAll } from '$app/navigation';
	import Gist from '$lib/components/gist.svelte';

	let { data } = $props();
	let form = $state({ error: null });

	let url = $state('');
	let title = $state('');
	let category = $state('Other');
</script>

<div class="mx-auto max-w-4xl p-4">
	<form
		method="POST"
		action="/api/gists"
		use:enhance={() => {
			return async ({ result }) => {
				url = '';
				title = '';
				category = 'Other';
				await invalidateAll();
			};
		}}
		class="mb-8 rounded bg-gray-100 p-4"
	>
		{#if form?.error}
			<p class="mb-2 text-red-500">{form.error}</p>
		{/if}
		<input
			type="url"
			name="url"
			bind:value={url}
			placeholder="Gist URL"
			required
			class="mb-2 block w-full rounded p-2 border-1"
		/>
		<input
			type="text"
			name="title"
			bind:value={title}
			placeholder="Title"
			required
			class="mb-2 block w-full rounded p-2 border-1"
		/>
		<select name="category" bind:value={category} class="mb-2 block w-full rounded p-2 border-1">
			<option value="JavaScript">JavaScript</option>
			<option value="Python">Python</option>
			<option value="CSS">CSS</option>
			<option value="HTML">HTML</option>
			<option value="Svelte">Svelte</option>
			<option value="Other">Other</option>
		</select>
		<button type="submit" class="rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600">
			Add Gist
		</button>
	</form>

	<div class="grid gap-4">
		{#each data.data as gist}
			<Gist onUpvote={async () => await invalidateAll()} {gist} />
		{/each}
	</div>
</div>