<script lang="ts">
  import { graphql } from '$houdini';
  import type { PageModes } from '$lib';
  import ProfileDelete from '$lib/components/Profile/ProfileDelete.svelte';
  import ProfileForm from '$lib/components/Profile/ProfileForm.svelte';
  import ProfileTable from '$lib/components/Profile/ProfileTable.svelte';
  import ProfileView from '$lib/components/Profile/ProfileView.svelte';
  import { Button, Heading } from 'flowbite-svelte';

  const Options = graphql(`
    query Options @load {
      usersOptions {
        name
        value
      }
    }
  `);

  let selected: string | null = null;

  let mode: PageModes = null;

  function createItem() {
    selected = null;
    mode = 'create';
  }
  $: selected = mode === null ? null : selected;
</script>

<Heading tag="h1">Profiles SPA</Heading>

{#if $Options.data}
  <div class="grid grid-cols-12">
    <div class="col-span-3 py-4 px-2">
      <Button on:click={createItem}>Create</Button>

      <div class="py-2">
        {#if mode === 'create'}
          <ProfileForm users={$Options.data.usersOptions} _id={selected} bind:mode bind:selected />
        {/if}
        {#if selected}
          {#if mode === 'edit'}
            <ProfileForm
              users={$Options.data.usersOptions}
              _id={selected}
              bind:mode
              bind:selected
            />
          {/if}

          {#if mode === 'delete'}
            <ProfileDelete _id={selected} bind:mode />
          {/if}
          {#if mode === 'view'}
            <ProfileView _id={selected} />
            <Button on:click={() => (mode = 'edit')}>Edit</Button>
            <Button on:click={() => (mode = 'delete')}>Delete</Button>
            <Button on:click={() => (mode = null)}>Back</Button>
          {/if}
        {/if}
      </div>
    </div>

    <div class="col-span-9">
      <ProfileTable bind:selected bind:mode />
    </div>
  </div>
{/if}
