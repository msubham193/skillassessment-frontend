import { atom } from 'recoil';

export const authenticationState = atom({
  key: 'authState',
  default:{
    isAuthenticated:localStorage.getItem('adminAuthToken')?true:false ,
    token: localStorage.getItem('adminAuthToken')?localStorage.getItem('adminAuthToken') :null,
    // email:localStorage.getItem('specificEmail')?localStorage.getItem('specificEmail'):null
  } 
});
 



