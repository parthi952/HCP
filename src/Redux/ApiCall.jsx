import axios from 'axios';

const API = axios.create({
  baseURL: 'http://127.0.0.1:8000/api/hcp', // Base URL for the HCP routes
});

const AI_API = axios.create({
  baseURL: 'http://127.0.0.1:8000/api/ai', // Base URL for the AI routes
});

// GET: Analyze natural language prompt
export const analyzePrompt = async (prompt) => {
  try {
    const response = await AI_API.get('/analyze-data', { params: { prompt } });
    return response.data;
  } catch (error) {
    console.error("Error analyzing prompt:", error);
    throw error.response?.data || error;
  }
};

// POST: Create a new interaction
export const createInteraction = async (interactionData) => {
  try {
    const response = await API.post('/interaction', interactionData);
    return response.data;
  } catch (error) {
    console.error("Error creating interaction:", error);
    throw error.response?.data || error;
  }
};


// GET: Fetch all interactions
export const getAllInteractions = async () => {
  try {
    const response = await API.get('/interaction');
    return response.data;
  } catch (error) {
    console.error("Error fetching interactions:", error);
    throw error.response?.data || error;
  }
};

// GET: Fetch a single interaction by ID
export const getInteractionById = async (id) => {
  try {
    const response = await API.get(`/interaction/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching interaction ${id}:`, error);
    throw error.response?.data || error;
  }
};

// PUT: Update an existing interaction
export const updateInteraction = async (id, interactionData) => {
  try {
    const response = await API.put(`/interaction/${id}`, interactionData);
    return response.data;
  } catch (error) {
    console.error(`Error updating interaction ${id}:`, error);
    throw error.response?.data || error;
  }
};

// DELETE: Delete an interaction
export const deleteInteraction = async (id) => {
  try {
    const response = await API.delete(`/interaction/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error deleting interaction ${id}:`, error);
    throw error.response?.data || error;
  }
};