import axios from "axios";
import { getStoredProjects, storeProjects } from '../utils/storage';

// GitHub Personal Access Token (optional, but recommended to avoid rate limits)
const token = import.meta.env.VITE_GITHUB_TOKEN; // Optional, only for private repositories or rate-limited requests
const username = "jp1648"; // Replace with the GitHub account username

// Set up axios instance with authorization header (if using a token)
const axiosInstance = axios.create({
  baseURL: "https://api.github.com",
  headers: {
    Authorization: token ? `token ${token}` : undefined,
  },
});

// Function to fetch all repositories of the user
export const getGitDetails = async (username = "jp1648") => {
  try {
    // Check localStorage first
    const cachedProjects = getStoredProjects();
    if (cachedProjects) {
      return cachedProjects;
    }

    // If no cache, fetch from API
    let { data } = await axiosInstance.get(`/users/${username}/repos`);
    let id = 0;
    const projects = [];

    data.forEach((project) => {
      if (
        project.name !== "jp1648" &&
        project.name.toLowerCase() !== "website2"
      ) {
        projects.push({
          id: id++,
          name: project.name,
          description: project.description,
          url: project.html_url,
        });
      }
    });

    // Store in localStorage for future use
    storeProjects(projects);
    return projects;

  } catch (error) {
    console.error("Error fetching repositories:", error.message);
    
    // Return cached data if available, even if expired
    const cachedProjects = getStoredProjects();
    if (cachedProjects) {
      console.log("Returning cached projects due to API error");
      return cachedProjects;
    }
    
    return []; // Return empty array if nothing is available
  }
};
