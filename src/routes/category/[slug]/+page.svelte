<script lang="ts">
    import { gists } from '$lib/db/schema';
    
    export let data: { category: string; gists: typeof gists.$inferSelect[] };
  </script>
  
  <h1 class="text-2xl font-bold m-4">Category: {data.category}</h1>