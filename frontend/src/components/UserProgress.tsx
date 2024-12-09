import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { Text } from "./Text";
import { getUserProgress } from "../api";

interface UserProgressProps {
    username: string;
}

interface TopicProgress {
    topic_id: number;
    topic: string;
    level: number;
    examTaken?: boolean;
}

// Styled Components
const ProgressCard = styled.div`
    background-color: #ffffff;
    border: 1px solid #e0e0e0;
    padding: 15px;
    border-radius: 12px;
    box-shadow: 0 2px 6px rgba(0, 0, 0, 0.05);
    display: flex;
    flex-direction: column;
    gap: 10px;
    transition: transform 0.2s ease-in-out;

    &:hover {
        transform: translateY(-5px);
        box-shadow: 0 6px 12px rgba(0, 0, 0, 0.1);
    }
`;

const ProgressBar = styled.div`
    background-color: #e0e0e0;
    border-radius: 8px;
    height: 12px;
    width: 100%;
    overflow: hidden;

    div {
        height: 100%;
        background-color: #6c63ff;
        transition: width 0.4s ease-in-out;
    }
`;

const ProgressLabel = styled.span`
    font-size: 14px;
    color: #555;
    font-weight: bold;
    text-align: right;
`;

const UserProgress: React.FC<UserProgressProps> = ({ username }) => {
    const [progress, setProgress] = useState<TopicProgress[]>([]);

    useEffect(() => {
        const fetchProgress = async () => {
            try {
                const data = await getUserProgress(username);
                setProgress(data);
            } catch (error) {
                console.error("Error fetching user progress:", error);
            }
        };
        fetchProgress();
    }, [username]);

    return (
        <div>
            <Text size="24px" weight="bold">
                Your Progress
            </Text>
            {progress.length > 0 ? (
                progress.map((topic) => {
                    const isCompleted = topic.examTaken;

                    return (
                        <ProgressCard key={topic.topic_id}>
                            <Text size="18px" weight="bold">
                                {topic.topic}
                            </Text>
                            <ProgressBar>
                                <div
                                    style={{
                                        width: `${(topic.level / 4) * 100}%`,
                                        backgroundColor: isCompleted ? "#4caf50" : "#6c63ff",
                                    }}
                                />
                            </ProgressBar>
                            <ProgressLabel>
                                Level {topic.level} / 4 {isCompleted && "(Lection Completed)"}
                            </ProgressLabel>
                        </ProgressCard>
                    );
                })
            ) : (
                <Text size="16px" color="#888">
                    No progress data available.
                </Text>
            )}
        </div>
    );
};

export default UserProgress;
