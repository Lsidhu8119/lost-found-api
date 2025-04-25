import * as service from '../../src/api/v1/services/lostItemService';

describe('Lost Item Service', () => {
  let testId = '';

  it('should return all lost items', async () => {
    const result = await service.getAll();
    expect(Array.isArray(result)).toBe(true);
  });

  it('should create a new lost item', async () => {
    const newItem = {
      name: 'Leather Wallet',
      category: 'accessories',
      location: 'Library',
      description: 'Black leather wallet with cards',
      dateReported: '2025-04-12',
      reportedBy: 'Lovepreet Singh',
    };

    const created = await service.create(newItem);
    expect(created).toHaveProperty('id');
    expect(created.name).toBe(newItem.name);
    testId = created.id;
  });

  it('should update an existing lost item', async () => {
    const updated = await service.update(testId, {
      location: 'Bookstore',
      description: 'Updated description',
    });
    expect(updated).not.toBeNull();
    expect(updated?.location).toBe('Bookstore');
    expect(updated?.description).toBe('Updated description');
  });

  it('should return null when updating non-existing item', async () => {
    const result = await service.update('invalid-id', { location: 'New Location' });
    expect(result).toBeNull();
  });

  it('should delete an existing item', async () => {
    const success = await service.remove(testId);
    expect(success).toBe(true);
  });

  it('should fail to delete non-existing item', async () => {
    const fail = await service.remove('non-existent-id');
    expect(fail).toBe(false);
  });
});
