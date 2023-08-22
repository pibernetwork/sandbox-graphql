<script lang="ts">
  import ProfileView from '$lib/components/Profile/ProfileView.svelte';
  import {
    Heading,
    Table,
    TableBody,
    TableBodyCell,
    TableBodyRow,
    TableHead,
    TableHeadCell
  } from 'flowbite-svelte';
  import type { PageData } from './$houdini';

  export let data: PageData;

  $: ({ Profiles } = data);

  let selected: string | null = null;
</script>

<Heading tag="h1">Profiles SPA</Heading>

<div class="grid grid-cols-12">
  <div class="col-span-3">
    <div>Actions</div>
    <div>{selected}</div>
    <div>View</div>
    <div>Create</div>
    <div>Edit</div>
    {#if selected}
      <ProfileView _id={selected} />
    {/if}
  </div>

  <div class="col-span-9">
    {#if $Profiles.data}
      <Table>
        <TableHead>
          <TableHeadCell>Email</TableHeadCell>
          <TableHeadCell>Weight</TableHeadCell>
          <TableHeadCell>Birthday</TableHeadCell>
        </TableHead>
        <TableBody>
          {#each $Profiles.data.profiles as profile}
            <TableBodyRow on:click={() => (selected = profile?._id || null)} class="cursor-pointer">
              <TableBodyCell>{profile?.user?.email}</TableBodyCell>
              <TableBodyCell>{profile?.weight}</TableBodyCell>
              <TableBodyCell>{profile?.birthday}</TableBodyCell>
            </TableBodyRow>
          {/each}
        </TableBody>
      </Table>
    {/if}
  </div>
</div>
