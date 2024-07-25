import { atom } from "recoil";
import { loadState,saveState } from "../utils/localStorage";
export const CompeltebatchDataAtoms= atom({
    key: 'CompeltebatchData',
  default: loadState('CompeltebatchData') || {}, // Load initial state from local storage
  effects: [
    ({ onSet }) => {
      onSet(newValue => {
        saveState('CompeltebatchData', newValue); // Save state to local storage on change
      });
    }
  ]
})