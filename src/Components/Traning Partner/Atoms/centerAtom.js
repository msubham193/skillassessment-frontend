import { atom } from "recoil";
import { loadState, saveState } from "../utils/localStorage";


export const centerAtom = atom({
    key: 'centerData',
    default: loadState('centerData') || [],
    effects: [
      ({ onSet }) => {
        onSet(newValue => {
          saveState('centerData', newValue); // Save state to local storage on change
        });
      }
    ]
  });
