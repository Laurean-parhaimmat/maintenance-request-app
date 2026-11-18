import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import MaintenanceRequestList from '../components/MaintenanceRequestList';

describe('MaintenanceRequestList', () => {
  // Confirms requests are shown with the user-facing Finnish status label.
  it('shows a request title and its Finnish status label', () => {
    render(
      <MemoryRouter>
        <MaintenanceRequestList
          requests={[
            {
              id: 'request-1',
              title: 'Keittiön hana vuotaa',
              category: 'water',
              createdAt: '2026-01-15T12:00:00.000Z',
              status: 'in progress',
            },
          ]}
        />
      </MemoryRouter>,
    );

    expect(screen.getByRole('link', { name: 'Keittiön hana vuotaa' })).toBeInTheDocument();
    expect(screen.getByText('Käsittelyssä')).toBeInTheDocument();
  });
});
