export const checkAATokenValidity = () => {
    const token = localStorage.getItem('aaAuthToken');
    const expirationTime = localStorage.getItem('tokenExpiration');
  
    if (!token || !expirationTime) {
      return false;
    }
  
    const currentTime = new Date().getTime();
    if (currentTime > expirationTime) {
      localStorage.removeItem('aaAuthToken');
      localStorage.removeItem('tokenExpiration');
      return false;
    }
  
    return true;
  };