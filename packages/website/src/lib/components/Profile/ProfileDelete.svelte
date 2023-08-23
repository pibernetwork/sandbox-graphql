<script lang="ts">
  import type { PageModes } from '$lib';
  import { Button, Heading, P } from 'flowbite-svelte';

  export let _id: string;
  export let mode: PageModes;
</script>

<Heading tag="h2">Delete</Heading>
<P>Are you sure about delete {_id}?</P>

<Button>Yes</Button>
<Button on:click={() => (mode = 'view')}>Cancel</Button>
