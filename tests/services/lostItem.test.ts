import * as service from '../../src/api/v1/services/lostItemService';

describe('Lost Item Service', () => {
  let testId = '';

  it('should return all lost items', () => {
    const result = service.getAll();
    expect(Array.isArray(result)).toBe(true);
    expect(result.length).toBeGreaterThan(0);
  });

  it('should create a new lost item', () => {
    const newItem = {
      name: 'Leather Wallet',
      category: 'accessories',
      location: 'Library',
      description: 'Black leather wallet with cards',
      dateReported: '2025-04-12',
      reportedBy: 'Lovepreet Singh'
    };

    const created = service.create(newItem);
    expect(created).toHaveProperty('id');
    expect(created.name).toBe(newItem.name);
    testId = created.id;
  });

  it('should update an existing lost item', () => {
    const updated = service.update(testId, {
      location: 'Bookstore',
      description: 'Updated description'
    });

    expect(updated).not.toBeNull();
    expect(updated?.location).toBe('Bookstore');
    expect(updated?.description).toBe('Updated description');
  });

  it('should return null when updating non-existing item', () => {
    const result = service.update('invalid-id', { location: 'New Location' });
    expect(result).toBeNull();
  });

  it('should delete an existing item', () => {
    const success = service.remove(testId);
    expect(success).toBe(true);
  });

  it('should fail to delete non-existing item', () => {
    const fail = service.remove('non-existent-id');
    expect(fail).toBe(false);
  });
});
