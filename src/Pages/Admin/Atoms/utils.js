export const checkTokenValidity = () => {
    const token = localStorage.getItem('adminAuthToken');
    const expirationTime = localStorage.getItem('tokenExpiration');
  
    if (!token || !expirationTime) {
      return false;
    }
  
    const currentTime = new Date().getTime();
    if (currentTime > expirationTime) {
      localStorage.removeItem('adminAuthToken');
      localStorage.removeItem('tokenExpiration'); 
      return false;
    }
  
    return true;
  };