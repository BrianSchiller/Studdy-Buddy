import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card } from "../../components/Card";
import { Button } from "../../components/Button";
import styled from "styled-components";
import { getUserProgress, fetchTopics } from "../../api";

interface TopicSelectorProps {
    username: string;
}

interface UserProgress {
    topic_id: number;
    topic: string;
    level: number;
}

interface Topic {
    topic_id: number;
    topic_name: string;
    style: string | null;
    date_taken: string | null;
}

// Styled Component für eine deaktivierte Karte
const DisabledCard = styled(Card)`
    background-color: #f0f0f0;
    pointer-events: none;
    opacity: 0.6;
`;

const TopicSelector: React.FC<TopicSelectorProps> = ({ username }) => {
    const navigate = useNavigate();
    const [userProgress, setUserProgress] = useState<UserProgress[]>([]);
    const [topics, setTopics] = useState<Topic[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const progressData = await getUserProgress(username);
                const topicsData = await fetchTopics(username);
                setUserProgress(progressData);
                setTopics(topicsData);
            } catch (error) {
                console.error("Error fetching data:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, [username]);

    // Prüfen, ob der Test heute gemacht wurde
    const isQuizTakenToday = (dateTaken: string | null | Record<string, any>): boolean => {
        if (!dateTaken || typeof dateTaken !== "string") return false;
    
        try {
            const today = new Date().toISOString().split("T")[0];
            return dateTaken.startsWith(today);
        } catch (error) {
            console.error("Error parsing dateTaken:", error);
            return false;
        }
    };

    const handleTopicSelection = (topicId: number, title: string, description: string) => {
        navigate("/list", {
            state: { username, topicId, title, description },
        });
    };

    const handleTakeExam = (topicId: number) => {
        navigate(`/exam/${topicId}`, { state: { username, topicId } });
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <div style={{ display: "flex", flexWrap: "wrap", gap: "16px" }}>
            {topics.map((topic) => {
                const progress = userProgress.find((p) => p.topic_id === topic.topic_id);
                const isLevel4 = progress?.level === 4;
                const quizTakenToday = isQuizTakenToday(topic.date_taken);

                return (
                    <Card radius width="40%" key={topic.topic_id}>
                        <h3>{topic.topic_name}</h3>
                        <img src="https://placehold.co/100" alt={topic.topic_name} />

                        {/* Start Button */}
                        <Button
                            onClick={() =>
                                handleTopicSelection(
                                    topic.topic_id,
                                    `Learn ${topic.topic_name}`,
                                    `Get to know about ${topic.topic_name} with this list.`
                                )
                            }
                            disabled={isLevel4 || quizTakenToday}
                        >
                            {isLevel4
                                ? "Level 4 Achieved"
                                : quizTakenToday
                                ? "Start Disabled (Completed Today)"
                                : "Start"}
                        </Button>

                        {/* Take Exam Button */}
                        <Button
                            onClick={() => handleTakeExam(topic.topic_id)}
                            disabled={!isLevel4}
                        >
                            {isLevel4 ? "Take Exam" : "Exam Locked"}
                        </Button>
                    </Card>
                );
            })}
        </div>
    );
};

export default TopicSelector;
