// quizUtils.ts
import { VocabWord } from '../../interfaces';

export interface QuizQuestion {
    question: string; // English word
    correctAnswer: string; // Spanish translation
    options: string[]; // Randomized answer options
}

/**
 * Generate quiz questions from a list of vocab words.
 * @param words List of vocab words from the backend.
 * @param numOptions Number of answer options per question.
 * @returns Array of QuizQuestion objects.
 */
export const generateQuizQuestions = (words: VocabWord[], numOptions = 4): QuizQuestion[] => {
    return words.map((word) => {
        // Exclude the current word to generate random options
        const otherWords = words.filter((w) => w.id !== word.id);

        // Select random options from the remaining words
        const randomOptions = otherWords
            .sort(() => Math.random() - 0.5)
            .slice(0, numOptions - 1)
            .map((w) => w.spanish);

        // Combine correct answer with random options
        const options = [...randomOptions, word.spanish].sort(() => Math.random() - 0.5);

        return {
            question: word.english,
            correctAnswer: word.spanish,
            options,
        };
    });
};
