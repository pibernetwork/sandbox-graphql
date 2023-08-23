<script lang="ts">
  import { graphql } from '$houdini';
  import type { PageModes } from '$lib';
  import {
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
    }
  `);

  export let selected: string | null;

  export let mode: PageModes;

  function selectItem(_id: string | null | undefined) {
    selected = _id || null;
    mode = 'view';
  }

  $: selected = mode === null ? null : selected;
</script>

<Heading tag="h1">Profiles SPA</Heading>

{#if $Profiles.data}
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
{/if}
