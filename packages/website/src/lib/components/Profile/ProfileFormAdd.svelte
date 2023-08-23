<script lang="ts">
  import { graphql } from '$houdini';
  import type { PageModes } from '$lib';
  import { Button, Heading, Input, Label, Select } from 'flowbite-svelte';

  export let users: { readonly name: string; readonly value: string }[];
  export let mode: PageModes;

  const addProfile = graphql(`
    mutation AddProfile($userId: String!, $birthday: String!, $weight: Float!) {
      addProfile(userId: $userId, birthday: $birthday, weight: $weight) {
        _id
        ...Profiles_Items_insert
      }
    }
  `);

  async function submit(e: SubmitEvent) {
    e.preventDefault();

    const formData = new FormData(e.target as HTMLFormElement);

    const birthday = formData.get('birthday')?.toString() || '';
    const weight = formData.get('weight')?.toString() || '0';

    const userId = formData.get('userId')?.toString() || '';

    const response = await addProfile.mutate({
      birthday,
      weight: (weight && parseFloat(weight)) || 0,
      userId
    });

    mode = null;
  }
</script>

<Heading tag="h2">Create</Heading>
<form on:submit={submit} class="p-4">
  <div class="mb-6">
    <Label>
      Select an user
      <Select name="userId" id="userId" class="mt-2" items={users} />
    </Label>
  </div>
  <div class="mb-6">
    <Label for="birthday" class="block mb-2">Birthday</Label>
    <Input id="birthday" name="birthday" placeholder="Birthday" />
  </div>
  <div class="mb-6">
    <Label for="weight" class="block mb-2">Weight</Label>
    <Input id="weight" name="weight" placeholder="Weight" type="number" step="0.1" min="0" />
  </div>
  <div class="mb-6">
    <Button type="submit">Create</Button>
    <Button on:click={() => (mode = null)}>Cancel</Button>
  </div>
</form>
