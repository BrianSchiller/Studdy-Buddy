import axios from 'axios';
import { VocabWord } from './interfaces';

const BASE_API_URL = 'http://localhost:8000/api';

// Fetch vocab words from the updated API
export const fetchVocabWords = async (topicId: number): Promise<VocabWord[]> => {
    try {
        const response = await axios.get<VocabWord[]>(`${BASE_API_URL}/words/${topicId}/`);
        return response.data;
    } catch (error) {
        console.error("Error fetching vocab words:", error);
        return [];
    }
};

// Fetch random words from the updated API
export const fetchRandomWords = async (amount: number): Promise<VocabWord[]> => {
    try {
        const response = await axios.get<VocabWord[]>(`${BASE_API_URL}/random_words/${amount}/`);
        return response.data;
    } catch (error) {
        console.error("Error fetching random words:", error);
        return [];
    }
};

// Update user progress with mistakes and topic ID
export const updateUserProgress = async (username: string, topicId: number, mistakes: number): Promise<void> => {
    try {
        await axios.post(`${BASE_API_URL}/update-progress/${username}/`, {
            topic_id: topicId,
            mistakes,
        });
    } catch (error) {
        console.error("Error updating user progress:", error);
    }
};
