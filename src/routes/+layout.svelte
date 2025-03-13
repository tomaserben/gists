<script>
	import { page } from '$app/stores';
	import '../app.css';

	const categories = ['JavaScript', 'Python', 'CSS', 'HTML', 'Svelte', 'Other'];
	let searchQuery = '';
</script>

<nav class="bg-gray-800 p-4 text-white">
	<div class="mx-auto flex max-w-4xl items-center gap-4">
		<a href="/" class="text-xl font-bold">Gist Directory</a>
		<div class="flex gap-4">
			{#each categories as category}
				<a
					href={`/category/${category.toLowerCase()}`}
					class:active={$page.url.pathname === `/category/${category.toLowerCase()}`}
					class="hover:text-gray-300"
				>
					{category}
				</a>
			{/each}
		</div>
		<form class="ml-auto" action="/search">
			<input
				type="search"
				name="q"
				bind:value={searchQuery}
				placeholder="Search gists..."
				class="rounded bg-gray-700 px-2 py-1"
			/>
		</form>
	</div>
</nav>

<slot />

