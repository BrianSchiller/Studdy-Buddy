import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Text } from '../../components/Text';
import { Menu } from '../../components/Menu';
import { Button } from '../../components/Button';
import { MultipleChoice } from '../../components/MultipleChoice';
import { fetchVocabWords } from '../../api'; // Import the API function
import { generateQuizQuestions, QuizQuestion } from './quizUtils'; // Import helper
import {
    MultipleChoice_Quiz,
    DashboardPanel,
    NavigationHeader,
    NavigationFooter,
    StyledContainer,
    StyledFlex,
    NextButtonWrapper, // We'll create a new wrapper for the Next button
} from './stylesQuizPage';

const QuizPage: React.FC = () => {
    const navigate = useNavigate();

    // States
    const [questions, setQuestions] = useState<QuizQuestion[]>([]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [loading, setLoading] = useState(true);
    const [answerSelected, setAnswerSelected] = useState(false); // Track if an answer is selected

    // Fetch vocab words and generate quiz questions
    useEffect(() => {
        const loadQuestions = async () => {
            try {
                const vocabWords = await fetchVocabWords(); // Fetch words from backend
                const quizQuestions = generateQuizQuestions(vocabWords, 4); // Generate questions
                setQuestions(quizQuestions); // Set the questions
                setLoading(false);
            } catch (error) {
                console.error('Error loading quiz questions:', error);
                setLoading(false);
            }
        };

        loadQuestions();
    }, []);

    // Handle navigation
    const handleNextQuestion = () => {
        if (currentIndex < questions.length - 1) {
            setCurrentIndex(currentIndex + 1);
            setAnswerSelected(false); // Reset answer selection for the next question
        } else {
            navigate('/quiz-complete'); // Navigate to a completion page or display a message
        }
    };

    const handleSkip = () => {
        if (currentIndex < questions.length - 1) {
            setCurrentIndex(currentIndex + 1);
            setAnswerSelected(false); // Reset answer selection for the next question
        } else {
            navigate('/quiz-complete');
        }
    };

    const handleBack = () => {
        if (currentIndex > 0) {
            setCurrentIndex(currentIndex - 1);
            setAnswerSelected(false); // Reset answer selection for the previous question
        }
    };

    const handleCancelQuiz = () => {
        navigate('/welcome'); // Navigate to the welcome page
    };

    const handleAnswerSelect = (answer: string) => {
        console.log('Selected Answer:', answer);
        setAnswerSelected(true); // Mark that an answer has been selected
    };

    // Display a loading spinner or message while questions are being fetched
    if (loading) {
        return (
            <StyledContainer>
                <Text size="24px" weight="bold">
                    Loading Quiz...
                </Text>
            </StyledContainer>
        );
    }

    // Display the quiz question and options
    return (
        <StyledContainer>
            <Menu />
            <DashboardPanel>
                <MultipleChoice_Quiz>
                    <NavigationHeader>
                        <Text size="24px" weight="bold">
                            Question {currentIndex + 1} of {questions.length}
                        </Text>
                    </NavigationHeader>
                    {questions.length > 0 && (
                        <MultipleChoice
                            question={questions[currentIndex].question}
                            options={questions[currentIndex].options}
                            onAnswerSelect={handleAnswerSelect}
                            width="80%"
                            padding="20px"
                            radius={true}
                            shadow={true}
                            backgroundColor="rgba(245, 245, 245, 1)"
                        />
                    )}
                    {/* Next Button only appears if an answer is selected */}
                    {answerSelected && (
                        <NextButtonWrapper>
                            <Button onClick={handleNextQuestion}>
                                {currentIndex < questions.length - 1 ? 'Next' : 'Finish'}
                            </Button>
                        </NextButtonWrapper>
                    )}
                  
                </MultipleChoice_Quiz>
                <NavigationFooter>
                    <StyledFlex $direction="row" $justify="space-between">
                        <Button backgroundColor="#8955F1" onClick={handleBack} disabled={currentIndex === 0}>
                            Back
                        </Button>
                        <Button backgroundColor="#8955F1" onClick={handleSkip}>
                            Skip
                        </Button>
                    </StyledFlex>
                    <StyledFlex $direction="column" $gap="12px">
                        <Button background-color="#1E88E5" onClick={handleCancelQuiz}>Cancel Quiz</Button>
                    </StyledFlex>
                </NavigationFooter>
            </DashboardPanel>
        </StyledContainer>
    );
};

export default QuizPage;
