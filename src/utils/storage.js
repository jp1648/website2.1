const STORAGE_KEY = 'github_projects';
const CACHE_DURATION = 24 * 60 * 60 * 1000; // 24 hours in milliseconds

export const getStoredProjects = () => {
  try {
    const item = localStorage.getItem(STORAGE_KEY);
    if (!item) return null;

    const { projects, timestamp } = JSON.parse(item);
    
    // Check if cache is expired
    if (Date.now() - timestamp > CACHE_DURATION) {
      localStorage.removeItem(STORAGE_KEY);
      return null;
    }

    return projects;
  } catch (error) {
    console.error('Error reading from localStorage:', error);
    return null;
  }
};

export const storeProjects = (projects) => {
  try {
    const item = {
      projects,
      timestamp: Date.now()
    };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(item));
  } catch (error) {
    console.error('Error writing to localStorage:', error);
  }
};