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


// Fetch the topic list with styles
export const fetchTopics = async (username: string): Promise<any[]> => {
    try {
        const response = await axios.get<any[]>(`${BASE_API_URL}/topics/${username}/`);
        return response.data;
    } catch (error) {
        console.error("Error fetching topics:", error);
        return [];
    }
};

// Fetch exam data
export const fetchExam = async (topicId: number): Promise<any> => {
    try {
        const response = await axios.get(`${BASE_API_URL}/exam/${topicId}/`);
        return response.data;
    } catch (error) {
        console.error("Error fetching exam data:", error);
        return null;
    }
};

// Submit exam results
export const submitExam = async (examId: number, username: string, score: number): Promise<void> => {
    try {
        await axios.post(`${BASE_API_URL}/submit_exam/${examId}/${username}/`, {
            score,
        });
    } catch (error) {
        console.error("Error submitting exam results:", error);
    }
};

// API to check exam eligibility
export const checkExamEligibility = async (username: string): Promise<boolean> => {
    try {
        const response = await axios.get<{ eligible: boolean }>(
            `${BASE_API_URL}/exam-eligibility/${username}/`
        );
        return response.data.eligible;
    } catch (error) {
        console.error("Error checking exam eligibility:", error);
        return false; // Default to false if there's an error
    }
};