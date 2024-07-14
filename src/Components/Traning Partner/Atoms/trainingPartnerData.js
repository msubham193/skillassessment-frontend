// Atoms/trainingPartnerData.js
import { atom } from "recoil";
import { loadState,saveState } from "../utils/localStorage";

export const tpDataAtoms = atom({
  key: 'tpDataAtom',
  default: loadState('tpDataAtom') || {}, // Load initial state from local storage
  effects: [
    ({ onSet }) => {
      onSet(newValue => {
        saveState('tpDataAtom', newValue); // Save state to local storage on change
      });
    }
  ]
});
