import { foundItems } from '../../../foundItems';
import { v4 as uuid } from 'uuid';

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
