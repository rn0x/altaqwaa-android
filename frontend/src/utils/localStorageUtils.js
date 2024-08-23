/**
 * Add or update an item in local storage.
 * @param {string} key - The key under which the data will be stored.
 * @param {any} value - The value to be stored.
 */
export const setItem = (key, value) => {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      console.error('Error setting item in localStorage:', error);
    }
  };
  
  /**
   * Retrieve an item from local storage.
   * @param {string} key - The key of the item to retrieve.
   * @returns {any} - The retrieved value, or null if not found.
   */
  export const getItem = (key) => {
    try {
      const value = localStorage.getItem(key);
      return value ? JSON.parse(value) : null;
    } catch (error) {
      console.error('Error getting item from localStorage:', error);
      return null;
    }
  };
  
  /**
   * Remove an item from local storage.
   * @param {string} key - The key of the item to remove.
   */
  export const removeItem = (key) => {
    try {
      localStorage.removeItem(key);
    } catch (error) {
      console.error('Error removing item from localStorage:', error);
    }
  };
  
  /**
   * Clear all items from local storage.
   */
  export const clearStorage = () => {
    try {
      localStorage.clear();
    } catch (error) {
      console.error('Error clearing localStorage:', error);
    }
  };
  