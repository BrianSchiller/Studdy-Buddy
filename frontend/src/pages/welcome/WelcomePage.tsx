import React from "react";
import { useLocation } from "react-router-dom";
import { Text } from "../../components/Text";
import { Menu } from "../../components/Menu";
import { DashboardLeft, DashboardPanel, StyledContainer, DashboardRight } from "./styles";
import TopicSelector from "./TopicSelector";
import UserProgress from "../../components/UserProgress";
import { DateCard, StyledCard } from "./StyledComponents";
import styled from "styled-components";

// Styled component for the Spanish flag and learning message
const LearningCard = styled.div`
    display: flex;
    align-items: center;
    gap: 12px;
    background-color: #f5f5f5;
    padding: 15px;
    border-radius: 10px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    
`;

const FlagImage = styled.img`
    width: 40px;
    height: 40px;
    border-radius: 5px;
`;

const WelcomePage: React.FC = () => {
    const location = useLocation();
    const username = location.state?.username || "Guest";

    // Get the current date
    const currentDate = new Date().toLocaleDateString("en-US", {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
    });

    return (
        <StyledContainer>
            <Menu />
            <DashboardPanel>
                <DashboardLeft>
                    <StyledCard>
                        <Text size="28px" weight="bold" color="#2c3e50">
                            Welcome to Study Buddy, {username}!
                        </Text>
                        <Text size="18px" color="#555">
                            Select a topic to practice:
                        </Text>
                    </StyledCard>
                    
                    <DateCard>
                        <Text size="20px" weight="bold" color="#4a90e2">
                            📅 {currentDate}
                        </Text>
                    </DateCard>

                    <LearningCard>
                        <FlagImage
                            src="https://upload.wikimedia.org/wikipedia/commons/thumb/9/9a/Flag_of_Spain.svg/2560px-Flag_of_Spain.svg.png"
                            alt="Spanish Flag"
                        />
                        <Text size="20px" weight="bold" color="#d35400">
                            You're learning Spanish today! 🇪🇸
                        </Text>
                    </LearningCard>

                    <TopicSelector username={username} />
                </DashboardLeft>
                <DashboardRight>
                    <UserProgress username={username} />
                </DashboardRight>
            </DashboardPanel>
        </StyledContainer>
    );
};

export default WelcomePage;
