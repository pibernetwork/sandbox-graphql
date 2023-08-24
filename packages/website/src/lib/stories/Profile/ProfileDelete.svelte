<script lang="ts">
  import { cache, graphql } from '$houdini';
  import type { PageModes } from '$lib';
  import { Button, Heading, P } from 'flowbite-svelte';

  export let _id: string;
  export let mode: PageModes;

  const delProfile = graphql(`
    mutation DelProfile($_id: String!) {
      delProfile(_id: $_id) @Profile_delete
    }
  `);

  async function deleteItem() {
    await delProfile.mutate({ _id });
    // Mark all type 'UserNodes' stale
    cache.markStale('Profile');
    mode = null;
  }
</script>

<Heading tag="h2">Delete</Heading>
<P>Are you sure about delete {_id}?</P>

<Button on:click={deleteItem}>Yes</Button>
<Button on:click={() => (mode = 'view')}>Cancel</Button>
