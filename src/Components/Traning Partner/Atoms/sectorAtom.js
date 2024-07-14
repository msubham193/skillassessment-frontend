import { atom } from "recoil";
import { loadState, saveState } from "../utils/localStorage";


export const sectorData=atom({
    key:"sectordata",
    default:loadState("sectordata"),
    effects:[
        ({onSet})=>{
            onSet(newValue=>{
                saveState("sectordata",newValue);
            })
        }
    ]
})