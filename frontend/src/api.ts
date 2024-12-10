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
export const updateUserProgress = async (username: string, topicId: number, mistakes: number, duration: number): Promise<void> => {
    try {
        await axios.post(`${BASE_API_URL}/update-progress/${username}/`, {
            topic_id: topicId,
            mistakes,
            duration
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

export const fetchExam = async (topicId: number): Promise<any> => {
    try {
        const response = await axios.get(`${BASE_API_URL}/exam/${topicId}/`);
        return response.data;
    } catch (error) {
        console.error("Error fetching exam:", error);
        throw error;
    }
};

export const submitExam = async (
    examId: number,
    username: string,
    score: number,
    answers: { [key: number]: string },
    duration: number
): Promise<void> => {
    try {
        await axios.post(`${BASE_API_URL}/submit_exam/${examId}/${username}/`, {
            score,
            answers,
            duration,
        });
        console.log("Exam submitted successfully.");
    } catch (error) {
        console.error("Error submitting exam results:", error);
        throw new Error("Failed to submit exam. Please try again.");
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

// api.ts
// Fetch user progress
export const getUserProgress = async (username: string) => {
    try {
        const response = await axios.get(`${BASE_API_URL}/user-progress/${username}/`);
        return response.data; // Assuming response is an array of { topic_id, topic, level }
    } catch (error) {
        console.error("Error fetching user progress:", error);
        return [];
    }
};
