// WelcomePage.tsx
import React from "react";
import { useLocation } from "react-router-dom";
import { Text } from "../../components/Text";
import { Menu } from "../../components/Menu";
import { DashboardLeft, DashboardPanel, StyledContainer } from "./styles";
import TopicSelector from "./TopicSelector"; // Import the new component

const WelcomePage: React.FC = () => {
    const location = useLocation();

    // Extract username from the location state
    const username = location.state?.username || "Guest";

    return (
        <StyledContainer>
            <Menu />
            <DashboardPanel>
                <DashboardLeft>
                    <Text size="24px" weight="bold">
                        Welcome to Studdy Buddy, {username}!
                    </Text>
                    <Text size="18px">
                        Select a topic to practice:
                    </Text>

                    {/* Render the TopicSelector component */}
                    <TopicSelector username={username} />
                </DashboardLeft>
            </DashboardPanel>
        </StyledContainer>
    );
};

export default WelcomePage;
