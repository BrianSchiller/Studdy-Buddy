import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
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
    exam_taken: boolean;
}

const TopicsContainer = styled.div`
    display: flex;
    flex-wrap: wrap;
    gap: 16px;
    max-height: 80vh;
    overflow-y: auto;
    padding: 16px;
    box-sizing: border-box;
`;

const HeaderIconsContainer = styled.div`
    display: flex;
    justify-content: space-around;
    margin-bottom: 20px;

    img {
        width: 50px;
        height: 50px;
        border-radius: 50%;
        background-color: #f5f5f5;
        padding: 10px;
    }
`;

const StyledCard = styled.div`
    flex: 1 1 calc(33.333% - 16px);
    max-width: calc(33.333% - 16px);
    box-sizing: border-box;
    padding: 16px;
    border: 1px solid #ddd;
    border-radius: 8px;
    text-align: center;

    img {
        max-width: 100%;
        height: auto;
        margin-bottom: 8px;
    }

    h3 {
        font-size: 1.2rem;
        margin: 0 0 8px;
    }

    button {
        margin-top: 8px;
    }

    @media (max-width: 1279px) {
        flex: 1 1 calc(50% - 16px);
        max-width: calc(50% - 16px);
    }

    @media (max-width: 768px) {
        flex: 1 1 100%;
        max-width: 100%;
    }
`;

const topicIcons: Record<string, string> = {
    animals: "https://path-to-animal-icon.png", // Replace with an actual animal icon URL
    jobs: "https://path-to-jobs-icon.png", // Replace with an actual jobs icon URL
    fruits: "https://path-to-fruits-icon.png", // Replace with an actual fruits icon URL
};

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

    const isQuizTakenToday = (dateTaken: string | null): boolean => {
        if (!dateTaken) return false;
        const today = new Date().toISOString().split("T")[0];
        return dateTaken.startsWith(today);
    };

    const handleTopicSelection = (topicId: number, title: string, description: string) => {
        navigate("/list", { state: { username, topicId, title, description } });
    };

    const handleTakeExam = (topicId: number) => {
        navigate(`/exam/${topicId}`, { state: { username, topicId } });
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <>
            {/* Display Icons for Categories */}
            <HeaderIconsContainer>
                {["animals", "jobs", "fruits"].map((topic) => (
                    <img
                        key={topic}
                        src={topicIcons[topic] || ""}
                        alt={`${topic} icon`}
                    />
                ))}
            </HeaderIconsContainer>

            {/* Render Topics */}
            <TopicsContainer>
                {topics.map((topic) => {
                    const progress = userProgress.find((p) => p.topic_id === topic.topic_id);
                    const isLevel4 = progress?.level === 4;
                    const quizTakenToday = isQuizTakenToday(topic.date_taken);
                    const examAlreadyTaken = topic.exam_taken;

                    return (
                        <StyledCard key={topic.topic_id}>
                            <h3>{topic.topic_name}</h3>
                            <img
                                src={topicIcons[topic.topic_name.toLowerCase()] || ""}
                                alt={topic.topic_name}
                            />
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
                            <Button
                                onClick={() => handleTakeExam(topic.topic_id)}
                                disabled={!isLevel4 || examAlreadyTaken}
                            >
                                {examAlreadyTaken
                                    ? "Exam Completed"
                                    : isLevel4
                                    ? "Take Exam"
                                    : "Exam Locked"}
                            </Button>
                        </StyledCard>
                    );
                })}
            </TopicsContainer>
        </>
    );
};

export default TopicSelector;
