import axios from 'axios';
import { VocabWord } from './interfaces';

const API_URL = 'http://localhost:8000/api/words/1/';

// Fetch vocab words from the updated API
export const fetchVocabWords = async (): Promise<VocabWord[]> => {
    try {
        const response = await axios.get<VocabWord[]>(API_URL);
        return response.data;
    } catch (error) {
        console.error("Error fetching vocab words:", error);
        return [];
    }
};