import { atom } from 'recoil';

export const tokenAtoms = atom({
  key: 'tokenAtom',
  default: localStorage.getItem('token') || null,
});