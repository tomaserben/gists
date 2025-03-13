<script lang="ts">
	import { enhance } from '$app/forms';
	import { invalidateAll } from '$app/navigation';

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
			class="mb-2 block w-full rounded p-2"
		/>
		<input
			type="text"
			name="title"
			bind:value={title}
			placeholder="Title"
			required
			class="mb-2 block w-full rounded p-2"
		/>
		<select name="category" bind:value={category} class="mb-2 block w-full rounded p-2">
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
			<div class="rounded border p-4">
				<h2 class="font-semibold">{gist.title}</h2>
				<a href={gist.url} class="text-blue-500" target="_blank">{gist.url}</a>
				<p>Category: {gist.category}</p>
				<form
					method="POST"
					action={`/api/gists/${gist.id}/upvote`}
					use:enhance={() => {
						return async ({ result, update }) => {
							await invalidateAll();
						};
					}}
				>
					<button class="mt-2 flex items-center gap-2">
						👍 {gist.upvotes}
					</button>
				</form>
			</div>
		{/each}
	</div>
</div>
