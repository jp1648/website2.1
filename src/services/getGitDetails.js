import axios from "axios";

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

let out = [];

// Function to fetch all repositories of the user
export const getGitDetails = async (username = "jp1648") => {
  try {
    let { data } = await axiosInstance.get(`/users/${username}/repos`);
    let id = 0;
    data.map((project) => {
      if (
        project.name !== "jp1648" &&
        project.name.toLowerCase() !== "website2"
      ) {
        out.push({
          id: id,
          name: project.name,
          description: project.description,
          url: project.html_url,
        });
        id++;
      }
    });
    return out;
  } catch (error) {
    console.error("Error fetching repositories:", error.message);
  }
};
