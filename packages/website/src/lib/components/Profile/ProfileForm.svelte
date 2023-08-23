<script lang="ts">
  import { graphql } from '$houdini';
  import type { PageModes } from '$lib';
  import { Button, Heading, Input, Label, Select } from 'flowbite-svelte';
  import type { GetEditProfileVariables } from './$houdini';
  export let mode: PageModes;
  export let users: { readonly name: string; readonly value: string }[];
  export let selected: string | null;
  const addProfileTwo = graphql(`
    mutation AddProfileTwo($userId: String!, $birthday: String!, $weight: Float!) {
      addProfile(userId: $userId, birthday: $birthday, weight: $weight) {
        _id
        ...Profiles_Items_insert
      }
    }
  `);

  const editProfile = graphql(`
    mutation editProfile($_id: String!, $userId: String!, $birthday: String!, $weight: Float!) {
      editProfile(_id: $_id, userId: $userId, birthday: $birthday, weight: $weight) {
        _id
        ...Profiles_Items_insert
      }
    }
  `);

  export let _id: string | null;

  export const _GetEditProfileVariables: GetEditProfileVariables = () => {
    return { _id: _id || '' };
  };

  const store = graphql(`
    query GetEditProfile($_id: String!) @load {
      profile(_id: $_id) {
        _id
        birthday
        weight
        user {
          _id
          email
        }
      }
    }
  `);

  async function submit(e: SubmitEvent) {
    e.preventDefault();

    const formData = new FormData(e.target as HTMLFormElement);

    const _id = formData.get('_id')?.toString() || '';
    const birthday = formData.get('birthday')?.toString() || '';
    const weight = formData.get('weight')?.toString() || '0';

    const userId = formData.get('userId')?.toString() || '';

    if (_id) {
      await editProfile.mutate({
        _id,
        birthday,
        weight: (weight && parseFloat(weight)) || 0,
        userId
      });
      mode = 'view';
      return;
    }

    const response = await addProfileTwo.mutate({
      birthday,
      weight: (weight && parseFloat(weight)) || 0,
      userId
    });

    selected = response.data?.addProfile?._id || null;
    mode = 'view';
  }
</script>

<Heading tag="h2">
  {#if _id}
    Edit
  {:else}
    Create
  {/if}
</Heading>
<form on:submit={submit} class="p-4">
  <Input id="_id" name="_id" type="hidden" value={$store.data?.profile?._id} />
  <div class="mb-6">
    <Label>
      Select an user
      <Select
        name="userId"
        id="userId"
        class="mt-2"
        items={users}
        value={$store.data?.profile?.user?._id || null}
      />
    </Label>
  </div>
  <div class="mb-6">
    <Label for="birthday" class="block mb-2">Birthday</Label>
    <Input
      id="birthday"
      name="birthday"
      placeholder="Birthday"
      value={$store.data?.profile?.birthday}
    />
  </div>
  <div class="mb-6">
    <Label for="weight" class="block mb-2">Weight</Label>
    <Input
      id="weight"
      name="weight"
      placeholder="Weight"
      type="number"
      step="0.1"
      min="0"
      value={$store.data?.profile?.weight}
    />
  </div>
  <div class="mb-6">
    <Button type="submit"
      >{#if _id}
        Edit
      {:else}
        Create
      {/if}</Button
    >
    <Button on:click={() => (mode = 'view')}>Cancel</Button>
  </div>
</form>
