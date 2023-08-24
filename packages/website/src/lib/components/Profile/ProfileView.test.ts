import ProfileView from './ProfileView.svelte';

import { act, render } from '@testing-library/svelte';
import { tick } from 'svelte';
import { describe, expect, it, vi } from 'vitest';

const mocks = vi.hoisted(() => {
  const graphql = vi.fn();
  graphql.mockImplementation(() => ({
    data: true,
    errors: true,
    partial: false,
    stale: false,
    source: null,
    fetching: true,
    variables: null
  }));

  return {
    graphql
  };
});

vi.mock('$houdini', async () => {
  const actual = (await vi.importActual('$houdini')) as object;

  return {
    ...actual,
    ...mocks
  };
});

describe('Example', () => {
  it('It render ok', async () => {
    const { debug } = await render(ProfileView, { props: { _id: '' } });

    act(async () => {
      await tick();
    });
    console.log(debug());
    expect(mocks.graphql).toHaveBeenCalled();
  });
});
