import axios from 'axios';
import { VocabWord } from './interfaces';

const API_URL = 'http://localhost:8000/api';  // Backend base URL

// Fetch vocab words from the API
export const fetchVocabWords = async (): Promise<VocabWord[]> => {
    try {
        const response = await axios.get<VocabWord[]>(`${API_URL}/vocab/`);
        return response.data;
    } catch (error) {
        console.error("Error fetching vocab words:", error);
        return [];
    }
};
