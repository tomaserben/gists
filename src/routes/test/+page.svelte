<script>
	import { enhance } from '$app/forms';
	import { invalidateAll } from '$app/navigation';
	import { page } from '$app/state';
	
	let { data } = $props();
	console.log(data);
	let a = $state(data.data)
	let form = $state({ error: null });
  
	let url = '';
	let title = '';
	let category = 'Other';

  </script>
  
  <div class="max-w-4xl mx-auto p-4">
	<!-- Form remains similar, just update the action handling -->
	<form 
	  method="POST" 
	  action="/api/gists"
	  use:enhance={() => {
		return async ({ result }) => {
		  if (result.type === 'success') {
			url = '';
			title = '';
			category = 'Other';
			await invalidateAll(); // Revalidate data after adding
		  }
		};
	  }}
	  class="mb-8 p-4 bg-gray-100 rounded"
	>
	  {#if form?.error}
		<p class="text-red-500 mb-2">{form.error}</p>
	  {/if}
	  <!-- Rest of form remains same -->
	</form>
  
	<div class="grid gap-4">
	  {#each a as gist (gist.id)}
		<div class="p-4 border rounded">
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
			<button 
			  type="submit"
			  class="flex items-center gap-2 mt-2 hover:text-blue-500"
			>
			  👍 {gist.upvotes}
			</button>
		  </form>
		</div>
	  {/each}
	</div>
  </div>