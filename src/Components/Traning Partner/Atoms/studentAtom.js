import { loadState, saveState } from "../utils/localStorage";
import { atom } from "recoil";
 export const StudentDataAtom=atom({
    key:"studentatom",
    default:loadState("studentatom") || {},
    effects:[
        ({onSet})=>{
        onSet(newValue=>{
            saveState('studentatom',newValue)
        }) 
        }
    ]
})