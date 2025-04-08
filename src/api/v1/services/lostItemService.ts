import { v4 as uuid } from 'uuid';

export const lostItems = [
  {
    id: '1',
    name: 'Red Backpack',
    category: 'bags',
    location: 'Library',
    description: 'Lost near bookshelf',
    dateReported: '2024-03-25',
  },
];

export const getAll = () => lostItems;

export const create = (data: any) => {
  const newItem = { ...data, id: uuid() };
  lostItems.push(newItem);
  return newItem;
};

export const update = (id: string, data: any) => {
  const index = lostItems.findIndex(item => item.id === id);
  if (index === -1) return null;
  lostItems[index] = { ...lostItems[index], ...data };
  return lostItems[index];
};

export const remove = (id: string) => {
  const index = lostItems.findIndex(item => item.id === id);
  if (index === -1) return false;
  lostItems.splice(index, 1);
  return true;
};
