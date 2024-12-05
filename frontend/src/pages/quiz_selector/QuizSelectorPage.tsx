import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Button } from '../../components/Button';
import { Text } from '../../components/Text';
import { StyledContainer, QuizOptionContainer, QuizButton } from './stylesQuizSelector';

const QuizSelectorPage: React.FC = () => {
    const location = useLocation();
    const navigate = useNavigate();

    const username = location.state?.username || 'Guest'; // Extract username from state
    const topicId = location.state?.topicId; // Extract topicId from state
    const title = location.state?.title || 'Select Quiz Type'; // Extract title or set default

    const handleStartMultipleChoice = () => {
        navigate('/quiz', { state: { username, topicId, title } });
    };

    const handleStartFillSentence = () => {
        navigate('/fill-sentence-quiz', { state: { username, topicId, title } });
    };

    const handleStartMemoryQuiz = () => {
        navigate('/wordpair-quiz', { state: { username, topicId, title } });
    };

    return (
        <StyledContainer>
            <Text size="28px" weight="bold">
                {title}
            </Text>
            <Text size="18px">Choose a quiz type to start practicing!</Text>
            <QuizOptionContainer>
                <QuizButton onClick={handleStartMultipleChoice}>
                    <Text size="20px" weight="bold">Multiple Choice</Text>
                    <Text>Test your knowledge by selecting the correct word.</Text>
                </QuizButton>
                <QuizButton onClick={handleStartFillSentence}>
                    <Text size="20px" weight="bold">Fill the Sentence</Text>
                    <Text>Complete the sentence with the correct word.</Text>
                </QuizButton>
                <QuizButton onClick={handleStartMemoryQuiz}>
                    <Text size="20px" weight="bold">Wordpair Quiz</Text>
                    <Text>Match English words and images to Spanish words</Text>
                </QuizButton>
            </QuizOptionContainer>
        </StyledContainer>
    );
};

export default QuizSelectorPage;
