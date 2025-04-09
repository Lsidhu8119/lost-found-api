import { v4 as uuid } from 'uuid';

export const lostItems = [
  {
    id: '1',
    name: 'Black Asus Vivobook',
    category: 'electronics',
    location: 'Tim hortons',
    description: 'Lost at Tim Hortons while texting on mobile',
    dateReported: '2025-03-25',

  },
  {
    id: '2',
    name: 'Fitbit Charge 5',
    category: 'accessories',
    location: 'Gym Locker Room',
    description: 'Blue strap Fitbit left on the bench in locker area',
    dateReported: '2025-04-09',
    reportedBy: 'Sarbjit Singh'
  }
  
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
