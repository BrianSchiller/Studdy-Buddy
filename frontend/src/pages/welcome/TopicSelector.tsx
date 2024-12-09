import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card } from "../../components/Card";
import { Button } from "../../components/Button";
import styled from "styled-components";
import { getUserProgress } from "../../api";

interface TopicSelectorProps {
    username: string;
}

interface TopicProgress {
    topic_id: number;
    topic: string;
    level: number;
    examTaken?: boolean; // To track if the exam has been taken
}

// Styled Component for a disabled card
const DisabledCard = styled(Card)`
    background-color: #f0f0f0;
    pointer-events: none;
    opacity: 0.6;
`;

const TopicSelector: React.FC<TopicSelectorProps> = ({ username }) => {
    const navigate = useNavigate();
    const [progress, setProgress] = useState<TopicProgress[]>([]);

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

    const handleTopicSelection = (topicId: number, title: string, description: string) => {
        navigate("/list", {
            state: { username, topicId, title, description },
        });
    };

    const handleTakeExam = (topicId: number) => {
        // Simulate taking the exam by updating the progress state
        setProgress((prevProgress) =>
            prevProgress.map((topic) =>
                topic.topic_id === topicId ? { ...topic, examTaken: true } : topic
            )
        );
        navigate(`/exam/${topicId}`, { state: { username } });
    };

    return (
        <div style={{ display: "flex", flexWrap: "wrap", gap: "16px" }}>
            {progress.map((topic) => {
                const isLevel4 = topic.level === 4;
                const examTaken = topic.examTaken || false;

                return (
                    <Card radius width="40%" key={topic.topic_id}>
                        <h3>{topic.topic}</h3>
                        <img src="https://placehold.co/100" alt={topic.topic} />
                        
                        {/* Start Button */}
                        <Button
                            onClick={() =>
                                handleTopicSelection(
                                    topic.topic_id,
                                    `Learn ${topic.topic}`,
                                    `Get to know about ${topic.topic} with this list.`
                                )
                            }
                            disabled={isLevel4 || examTaken}
                        >
                            {isLevel4 || examTaken ? "Start Disabled" : "Start"}
                        </Button>

                        {/* Take Exam Button */}
                        <Button
                            onClick={() => handleTakeExam(topic.topic_id)}
                            disabled={!isLevel4 || examTaken}
                        >
                            {examTaken ? "Exam Completed" : "Take Exam"}
                        </Button>
                    </Card>
                );
            })}
        </div>
    );
};

export default TopicSelector;
