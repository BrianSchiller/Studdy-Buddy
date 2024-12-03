import { VocabWord } from '../../interfaces';
import { fetchRandomWords } from '../../api';

export interface QuizQuestion {
    question: string; // English word
    image: string;
    correctAnswer: string; // Spanish translation
    options: string[]; // Randomized answer options
}

/**
 * Generate quiz questions using vocab words and random words from the API.
 * @param vocabWords List of vocab words from the backend.
 * @param numOptions Number of answer options per question.
 * @returns Array of QuizQuestion objects.
 */
export const generateQuizQuestions = async (vocabWords: VocabWord[], numOptions = 4): Promise<QuizQuestion[]> => {
    const quizQuestions: QuizQuestion[] = [];

    for (const word of vocabWords) {
        try {
            // Fetch random words, excluding the current word
            const randomWords = await fetchRandomWords(numOptions - 1);

            // Ensure the random words do not include the correct answer
            const filteredRandomWords = randomWords.filter((randomWord) => randomWord.spanish !== word.spanish);

            // If not enough random options, fill with more random words (re-fetch if necessary)
            while (filteredRandomWords.length < numOptions - 1) {
                const moreRandomWords = await fetchRandomWords(numOptions - 1 - filteredRandomWords.length);
                const additionalFilteredWords = moreRandomWords.filter(
                    (randomWord) => randomWord.spanish !== word.spanish
                );
                filteredRandomWords.push(...additionalFilteredWords);
            }

            // Combine correct answer with random options
            const options = [...filteredRandomWords.map((rw) => rw.spanish), word.spanish].sort(
                () => Math.random() - 0.5
            );

            // Construct the quiz question
            quizQuestions.push({
                question: word.english,
                correctAnswer: word.spanish,
                options,
                image: word.image, // Include the image URL for the question
            });
        } catch (error) {
            console.error(`Error generating quiz question for word: ${word.english}`, error);
        }
    }

    return quizQuestions;
};
