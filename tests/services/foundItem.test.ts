import * as service from '../../src/api/v1/services/foundItemService';

describe('Found Item Service', () => {
  let createdId: string;

  const sampleItem = {
    name: 'Lost Cap',
    category: 'clothing',
    location: 'Gym',
    description: 'Blue cap with Adidas logo',
    dateFound: '2025-04-12',
    foundBy: 'Lovepreet Singh',
  };

  it('should return all found items', () => {
    const items = service.getAll();
    expect(Array.isArray(items)).toBe(true);
    expect(items.length).toBeGreaterThan(0);
  });

  it('should create a new found item', () => {
    const newItem = service.create(sampleItem);
    expect(newItem).toHaveProperty('id');
    expect(newItem.name).toBe(sampleItem.name);
    createdId = newItem.id;
  });

  it('should update an existing found item', () => {
    const updated = service.update(createdId, {
      ...sampleItem,
      location: 'Main Hall',
    });
    expect(updated).not.toBeNull();
    expect(updated?.location).toBe('Main Hall');
  });

  it('should return null when updating non-existent item', () => {
    const result = service.update('nonexistent-id', sampleItem);
    expect(result).toBeNull();
  });

  it('should delete a found item', () => {
    const deleted = service.remove(createdId);
    expect(deleted).toBe(true);
  });

  it('should return false when deleting non-existent item', () => {
    const deleted = service.remove('nonexistent-id');
    expect(deleted).toBe(false);
  });
});
