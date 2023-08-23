<script lang="ts">
  import { graphql } from '$houdini';
  import type { PageModes } from '$lib';
  import ProfileDelete from '$lib/components/Profile/ProfileDelete.svelte';
  import ProfileFormAdd from '$lib/components/Profile/ProfileFormAdd.svelte';
  import ProfileFormEdit from '$lib/components/Profile/ProfileFormEdit.svelte';
  import ProfileView from '$lib/components/Profile/ProfileView.svelte';
  import {
    Button,
    Heading,
    Table,
    TableBody,
    TableBodyCell,
    TableBodyRow,
    TableHead,
    TableHeadCell
  } from 'flowbite-svelte';

  const Profiles = graphql(`
    query Profiles @load {
      profiles @list(name: "Profiles_Items") {
        _id
        user {
          _id
          email
        }
        birthday
        weight
      }
      usersOptions {
        name
        value
      }
    }
  `);

  let selected: string | null = null;

  let mode: PageModes = null;

  function selectItem(_id: string | null | undefined) {
    selected = _id || null;
    mode = 'view';
  }

  $: selected = mode === null ? null : selected;
</script>

<Heading tag="h1">Profiles SPA</Heading>

{#if $Profiles.data}
  <div class="grid grid-cols-12">
    <div class="col-span-3 py-4 px-2">
      <Button on:click={() => (mode = 'create')}>Create</Button>

      <div class="py-2">
        {#if mode === 'create'}
          <ProfileFormAdd users={$Profiles.data.usersOptions} bind:mode bind:selected />
        {/if}
        {#if selected}
          {#if mode === 'edit'}
            <ProfileFormEdit users={$Profiles.data.usersOptions} _id={selected} bind:mode />
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
      <div>
        Total of {$Profiles.data.profiles.length}
      </div>
      <Table>
        <TableHead>
          <TableHeadCell>Email</TableHeadCell>
          <TableHeadCell>Weight</TableHeadCell>
          <TableHeadCell>Birthday</TableHeadCell>
        </TableHead>
        <TableBody>
          {#each $Profiles.data.profiles as profile}
            <TableBodyRow on:click={() => selectItem(profile?._id)} class="cursor-pointer">
              <TableBodyCell>{profile?.user?.email}</TableBodyCell>
              <TableBodyCell>{profile?.weight}</TableBodyCell>
              <TableBodyCell>{profile?.birthday}</TableBodyCell>
            </TableBodyRow>
          {/each}
        </TableBody>
      </Table>
    </div>
  </div>
{/if}
