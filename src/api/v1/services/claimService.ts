import { v4 as uuid } from 'uuid';

export const claims = [
  {
    id: '1',
    itemId: 'abc123',
    claimantName: 'subhpreet',
    claimantEmail: 'Subhpreet@gmail.com',
    justification: 'I can identify the Asus Laptop with black logo and my favourite sticker',
    dateClaimed: '2025-04-10',

  },

  {
    id: '2',
    itemId: 'abc999',
    claimantName: 'Amandeep Singh',
    claimantEmail: 'amandeepSingh@gmail.com',
    justification: 'I can identify my black iPhone 12 with a cracked back and a red cover',
    dateClaimed: '2025-04-11'
  }
  
];


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
