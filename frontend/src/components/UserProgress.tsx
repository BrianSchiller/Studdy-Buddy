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
const ProgressContainer = styled.div`
    display: flex;
    flex-direction: column;
    gap: 20px;
    padding: 20px;
    background-color: #f9fafc;
    border-radius: 12px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
`;

const ProgressCard = styled.div`
    background-color: #ffffff;
    border: 1px solid #e0e0e0;
    padding: 20px;
    border-radius: 12px;
    box-shadow: 0 2px 6px rgba(0, 0, 0, 0.05);
    display: flex;
    flex-direction: column;
    gap: 12px;
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
    display: flex;
    justify-content: space-between;
    align-items: center;
`;

const Checkmark = styled.span`
    color: #4caf50;
    font-size: 18px;
    margin-left: 8px;
`;

const NoProgressMessage = styled(Text)`
    text-align: center;
    font-size: 16px;
    color: #888;
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
        <ProgressContainer>
            <Text size="24px" weight="bold" color="#2c3e50">
                Your Progress
            </Text>
            {progress.length > 0 ? (
                progress.map((topic) => {
                    const isCompleted = topic.examTaken;

                    return (
                        <ProgressCard key={topic.topic_id}>
                            <Text size="18px" weight="bold" color="#333">
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
                                <span>
                                    Level {topic.level} / 4{" "}
                                    {isCompleted && (
                                        <span>
                                            (Lection Completed) <Checkmark>✔</Checkmark>
                                        </span>
                                    )}
                                </span>
                            </ProgressLabel>
                        </ProgressCard>
                    );
                })
            ) : (
                <NoProgressMessage>No progress data available.</NoProgressMessage>
            )}
        </ProgressContainer>
    );
};

export default UserProgress;
