// TopicSelector.tsx
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card } from "../../components/Card";
import { Button } from "../../components/Button";
import { CardBox } from "./styles";
import { getUserProgress } from "../../api"; // Fetch user progress

interface TopicSelectorProps {
    username: string;
}

interface TopicProgress {
    topic_id: number;
    topic: string;
    level: number;
}

const TopicSelector: React.FC<TopicSelectorProps> = ({ username }) => {
    const navigate = useNavigate();
    const [progress, setProgress] = useState<TopicProgress[]>([]);

    // Fetch user progress on mount
    useEffect(() => {
        const fetchProgress = async () => {
            try {
                const userProgress = await getUserProgress(username);
                setProgress(userProgress);
            } catch (error) {
                console.error("Error fetching user progress:", error);
            }
        };
        fetchProgress();
    }, [username]);

    // Navigate to ListPage with topic-specific data
    const handleTopicSelection = (topicId: number, title: string, description: string) => {
        navigate("/list", {
            state: { username, topicId, title, description },
        });
    };

    // Navigate to Exam Page
    const handleTakeExam = (topicId: number) => {
        navigate(`/exam/${topicId}`, { state: { username } });
    };

    return (
        <CardBox>
            {progress.map((topic) => (
                <Card radius width="40%" key={topic.topic_id}>
                    <h3>{topic.topic}</h3>
                    <img src="https://placehold.co/100" alt={topic.topic} />
                    <Button
                        onClick={() =>
                            handleTopicSelection(
                                topic.topic_id,
                                `Learn ${topic.topic}`,
                                `Get to know about ${topic.topic} with this list.`
                            )
                        }
                    >
                        Start
                    </Button>
                    <Button
                        onClick={() => handleTakeExam(topic.topic_id)}
                        disabled={topic.level < 5}
                    >
                        {topic.level < 5 ? "Exam Locked" : "Take Exam"}
                    </Button>
                </Card>
            ))}
        </CardBox>
    );
};

export default TopicSelector;
