// utils/localStorage.js
export const loadState = (key) => {
    try {
      const serializedState = localStorage.getItem(key);
      if (serializedState === null) {
        return undefined;
      }
      console.log(`Loaded state for ${key}:`, JSON.parse(serializedState)); // Add logging
      return JSON.parse(serializedState);
    } catch (err) {
      console.error("Could not load state", err);
      return undefined;
    }
  };
  
  export const saveState = (key, state) => {
    try {
      const serializedState = JSON.stringify(state);
      localStorage.setItem(key, serializedState);
      console.log(`Saved state for ${key}:`, state); // Add logging
    } catch (err) {
      console.error("Could not save state", err);
    }
  };
  