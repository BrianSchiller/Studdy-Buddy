import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './ListPage.css';
import { fetchVocabWords } from '../../api';
import { VocabWord } from '../../interfaces';

const ListPage: React.FC = () => {
    const location = useLocation();
    const username = location.state?.username || 'Guest'; // Extract username
    const topicId = location.state?.topicId; // Extract topicId
    const title = location.state?.title || 'Vocabulary List'; // Extract title
    const description = location.state?.description || 'Learn these words!'; // Extract description
    const navigate = useNavigate();
    const [words, setWords] = useState<VocabWord[]>([]);

    useEffect(() => {
        const fetchWords = async () => {
            if (topicId) {
                const fetchedWords = await fetchVocabWords(topicId);
                setWords(fetchedWords);
            }
        };
        fetchWords();
    }, [topicId]);

    const handleStartQuizSelector = () => {
        navigate('/quiz-selector', { state: { username, topicId, title } });
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
            <button onClick={handleStartQuizSelector}>Choose Quiz Type</button>
        </div>
    );
};

export default ListPage;
