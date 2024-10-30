import axios from "axios";

const BASE_URL = "http://localhost:8000";

const api = axios.create({
  baseURL: BASE_URL,
});

// Get all cards
export const getAllCards = async () => {
  try {
    const response = await api.get("/cards");
    return response.data;
  } catch (error) {
    console.error("Error fetching cards:", error);
    throw error;
  }
};

// Get a single card by ID
export const getCardById = async (id) => {
  try {
    const response = await api.get(`/cards/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching card with ID ${id}:`, error);
    throw error;
  }
};

// Create a new card
export const createCard = async (text, background) => {
  try {
    const response = await api.post("/cards", { text, background });
    return response.data;
  } catch (error) {
    console.error("Error creating card:", error);
    throw error;
  }
};

// Update a card by ID
export const updateCard = async (id, updatedData) => {
  try {
    const response = await api.patch(`/cards/${id}`, updatedData);
    return response.data;
  } catch (error) {
    console.error(`Error updating card with ID ${id}:`, error);
    throw error;
  }
};

// Delete a card by ID
export const deleteCard = async (id) => {
  try {
    await api.delete(`/cards/${id}`);
  } catch (error) {
    console.error(`Error deleting card with ID ${id}:`, error);
    throw error;
  }
};
