import { atom } from 'recoil';

export const authenticationState = atom({
  key: 'authState',
  default:{
    isAuthenticated:localStorage.getItem('adminAuthToken')?true:false ,
    token: localStorage.getItem('adminAuthToken')?localStorage.getItem('adminAuthToken') :null,
  }
});

export const examState=atom({
  key:'examState',
  default:{
    isCreated:false
  }
});


