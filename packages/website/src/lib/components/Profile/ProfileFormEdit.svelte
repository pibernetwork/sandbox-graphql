<script lang="ts">
  import { graphql } from '$houdini';
  import { Button, Heading, Input, Label, Select } from 'flowbite-svelte';
  import type { GetEditProfileVariables } from './$houdini';
  export let mode: PageModes;
  export let users: { readonly name: string; readonly value: string }[];

  const editProfile = graphql(`
    mutation editProfile($_id: String!, $userId: String!, $birthday: String!, $weight: Float!) {
      editProfile(_id: $_id, userId: $userId, birthday: $birthday, weight: $weight) {
        _id
        ...Profiles_Items_insert
      }
    }
  `);

  export let _id: string;

  export const _GetEditProfileVariables: GetEditProfileVariables = ({ props }) => {
    return { _id: props._id };
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

    const response = await editProfile.mutate({
      _id,
      birthday,
      weight: (weight && parseFloat(weight)) || 0,
      userId
    });

    mode = null;
    console.log(response);
  }
</script>

{#if $store.data?.profile}
  <Heading tag="h2">Edit</Heading>
  <form on:submit={submit} class="p-4">
    <Input id="_id" name="_id" type="hidden" value={$store.data.profile._id} />
    <div class="mb-6">
      <Label>
        Select an user
        <Select
          name="userId"
          id="userId"
          class="mt-2"
          items={users}
          value={$store.data.profile.user?._id}
        />
      </Label>
    </div>
    <div class="mb-6">
      <Label for="birthday" class="block mb-2">Birthday</Label>
      <Input
        id="birthday"
        name="birthday"
        placeholder="Birthday"
        value={$store.data.profile.birthday}
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
        value={$store.data.profile.weight}
      />
    </div>
    <div class="mb-6">
      <Button type="submit">Edit</Button>
    </div>
  </form>
{/if}
