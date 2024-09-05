import { atom } from "recoil";
import { loadState,saveState } from "../utils/localStorage";
export const batchIdAtoms= atom({
    key: 'batchId',
  default: loadState('batchId') || {}, // Load initial state from local storage
  effects: [
    ({ onSet }) => {
      onSet(newValue => {
        saveState('batchId', newValue); // Save state to local storage on change
      });
    }
  ]
})