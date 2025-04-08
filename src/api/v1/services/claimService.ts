import { claims } from '../../../claims';
import { v4 as uuid } from 'uuid';

export const getAll = () => claims;

export const create = (data: any) => {
  const newClaim = { ...data, id: uuid() };
  claims.push(newClaim);
  return newClaim;
};

export const update = (id: string, data: any) => {
  const index = claims.findIndex(claim => claim.id === id);
  if (index === -1) return null;
  claims[index] = { ...claims[index], ...data };
  return claims[index];
};

export const remove = (id: string) => {
  const index = claims.findIndex(claim => claim.id === id);
  if (index === -1) return false;
  claims.splice(index, 1);
  return true;
};
