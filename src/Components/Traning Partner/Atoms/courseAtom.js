import { atom } from "recoil";
import { loadState, saveState } from "../utils/localStorage";
export const coursesData=atom({
    key:"coursesdata",
    default:loadState("coursesdata"),
    effects:[
        ({onSet})=>{
         onSet(newValue=>{
            saveState("coursesdata",newValue)
            
         })
        }
    ]
})