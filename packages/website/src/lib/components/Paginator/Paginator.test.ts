import { render } from '@testing-library/svelte';

import { describe, expect, test } from 'vitest';
import Paginator from './Paginator.svelte';

describe('Paginator', () => {
  test('It renders', () => {
    const { getByText } = render(Paginator, {
      props: {
        page: 5,
        totalPages: 15,
        totalNodes: 150,
        start: 41,
        end: 50,
        hasNextPage: true,
        hasPrevPage: true,
        nextPage: 6,
        prevPage: 4
      }
    });

    expect(getByText('Showing 41 to 50 of 150 entries')).toBeDefined();
    expect(getByText('Page 5 of 15')).toBeDefined();
  });
});
