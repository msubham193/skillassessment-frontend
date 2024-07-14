import { atom } from "recoil";
import { loadState,saveState } from "../utils/localStorage";
export const batchDataAtoms= atom({
    key: 'batchData',
  default: loadState('batchData') || {}, // Load initial state from local storage
  effects: [
    ({ onSet }) => {
      onSet(newValue => {
        saveState('batchData', newValue); // Save state to local storage on change
      });
    }
  ]
})