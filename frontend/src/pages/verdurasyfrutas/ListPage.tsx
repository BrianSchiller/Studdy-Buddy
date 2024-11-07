import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './ListPage.css';
import { fetchVocabWords } from '../../api';
import { VocabWord } from '../../interfaces';

const ListPage_VyF: React.FC = () => {
    const location = useLocation();
    const user = location.state?.username;
    const navigate = useNavigate();

    const [words, setWords] = useState<VocabWord[]>([]); // State to hold fetched words

    // Fetch words when component mounts
    useEffect(() => {
        const fetchWords = async () => {
            const fetchedWords = await fetchVocabWords();
            setWords(fetchedWords);
        };
        fetchWords();
    }, []);

    const handleStartQuiz = () => {
        navigate('/verdurasyfrutas/quiz');
    };

    return (
        <div className="welcome-container">
            <h1>Let's start by getting to know different fruits and vegetables.</h1>
            <h1>Read the list to practice what they mean.</h1>
            <p>List of words:</p>
            {/* Display Spanish and English translations */}
            <ul>
                {words.map((word) => (
                    <li key={word.id}>
                        {word.spanish} - {word.english}
                    </li>
                ))}
            </ul>
            <button onClick={handleStartQuiz}>Start quiz</button>
        </div>
    );
};

export default ListPage_VyF;