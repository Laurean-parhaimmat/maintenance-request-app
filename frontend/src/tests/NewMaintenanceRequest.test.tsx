import { afterEach, describe, expect, it, vi } from 'vitest';
import { fireEvent, render, screen } from '@testing-library/react';
import NewMaintenanceRequest from '../pages/NewMaintenanceRequest';

describe('NewMaintenanceRequest', () => {
  afterEach(() => {
    vi.unstubAllGlobals();
    vi.restoreAllMocks();
  });

  // Confirms submitting a completed form sends all entered fields to the API.
  it('sends the entered maintenance request data', async () => {
    const fetchMock = vi.fn().mockResolvedValue({ ok: true });
    vi.stubGlobal('fetch', fetchMock);
    vi.spyOn(window, 'alert').mockImplementation(() => {});

    render(<NewMaintenanceRequest />);

    fireEvent.change(screen.getByLabelText('Otsikko *'), {
      target: { value: 'Keittiön hana vuotaa' },
    });
    fireEvent.change(screen.getByLabelText('Kuvaus *'), {
      target: { value: 'Hana vuotaa jatkuvasti.' },
    });
    fireEvent.change(screen.getByLabelText('Rakennuksen osoite *'), {
      target: { value: 'Esimerkkikatu 10' },
    });
    fireEvent.change(screen.getByLabelText('Asunnon numero *'), {
      target: { value: 'A 12' },
    });
    fireEvent.change(screen.getByLabelText('Kategoria *'), {
      target: { value: 'water' },
    });

    fireEvent.click(screen.getByRole('button', { name: 'Lähetä huoltopyyntö' }));

    expect(fetchMock).toHaveBeenCalledWith(
      expect.stringMatching(/\/api\/maintenance$/),
      expect.objectContaining({
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({
          title: 'Keittiön hana vuotaa',
          description: 'Hana vuotaa jatkuvasti.',
          category: 'water',
          buildingAddress: 'Esimerkkikatu 10',
          apartmentNumber: 'A 12',
        }),
      }),
    );
  });
});
