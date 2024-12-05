import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './ListPage.css';
import { fetchVocabWords, fetchTopics } from '../../api';
import { VocabWord } from '../../interfaces';

const ListPage: React.FC = () => {
    const location = useLocation();
    const username = location.state?.username || 'Guest';
    const topicId = location.state?.topicId;
    const title = location.state?.title || 'Vocabulary List';
    const description = location.state?.description || 'Learn these words!';
    const navigate = useNavigate();

    const [words, setWords] = useState<VocabWord[]>([]);
    const [topicStyle, setTopicStyle] = useState<string | null>(null);

    useEffect(() => {
        const fetchWordsAndStyle = async () => {
            if (topicId) {
                // Fetch vocab words
                const fetchedWords = await fetchVocabWords(topicId);
                setWords(fetchedWords);

                // Fetch topic style
                const topics = await fetchTopics(username);
                const topic = topics.find((t) => t.topic_id === topicId);
                setTopicStyle(topic?.style || null);
            }
        };
        fetchWordsAndStyle();
    }, [topicId, username]);

    const handleStartQuiz = () => {
        if (!topicStyle) {
            alert('No quiz style available for this topic.');
            return;
        }

        // Navigate to the quiz based on style
        switch (topicStyle) {
            case 'B':
                navigate('/quiz', { state: { username, topicId, title } });
                break;
            case 'S':
                navigate('/fill-sentence-quiz', { state: { username, topicId, title } });
                break;
            case 'I':
                navigate('/wordpair-quiz', { state: { username, topicId, title } });
                break;
            default:
                alert('Quiz style not supported.');
        }
    };

    return (
        <div className="welcome-container">
            <h1>{title}</h1>
            <p>{description}</p>
            <h2>List of words:</h2>
            <ul>
                {words.map((word) => (
                    <li key={word.id}>
                        {word.spanish} - {word.english}
                    </li>
                ))}
            </ul>
            <button onClick={handleStartQuiz}>Start Quiz</button>
        </div>
    );
};

export default ListPage;
