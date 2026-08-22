import { agoraIso, hojeLocal } from './hoje';

describe('hoje', () => {
  test('hojeLocal devolve data no formato YYYY-MM-DD', () => {
    expect(hojeLocal()).toMatch(/^\d{4}-\d{2}-\d{2}$/);
  });

  test('agoraIso devolve um timestamp ISO válido', () => {
    const iso = agoraIso();
    expect(iso).toMatch(/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}Z$/);
    expect(new Date(iso).toISOString()).toBe(iso);
  });
});
