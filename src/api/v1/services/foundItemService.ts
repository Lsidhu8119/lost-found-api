import { v4 as uuid } from 'uuid';

export const foundItems = [
  {
    id: '1',
    name: 'Black Asus Vivobook',
    category: 'electronics',
    location: 'Tim Hortons',
    description: 'Asus Vivobook v15',
    dateFound: '2025-04-05',
    foundBy: 'Navpreet'
  },
  {
    id: '2',
    name: 'iPhone 12',
    category: 'electronics',
    location: "Cafeteria",
    description: "Black iPhone 12 with cracked back and red case",
    dateFound: "2025-04-10",
    foundBy: "Akashdeep Singh"
  }
];

export const getAll = () => foundItems;

export const create = (data: any) => {
  const newItem = { ...data, id: uuid() };
  foundItems.push(newItem);
  return newItem;
};

export const update = (id: string, data: any) => {
  const index = foundItems.findIndex(item => item.id === id);
  if (index === -1) return null;
  foundItems[index] = { ...foundItems[index], ...data };
  return foundItems[index];
};

export const remove = (id: string) => {
  const index = foundItems.findIndex(item => item.id === id);
  if (index === -1) return false;
  foundItems.splice(index, 1);
  return true;
};
