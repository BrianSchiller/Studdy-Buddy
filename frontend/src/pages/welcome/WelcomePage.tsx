import React from "react";
import { useLocation } from "react-router-dom";
import { Text } from "../../components/Text";
import { Menu } from "../../components/Menu";
import { DashboardLeft, DashboardPanel, StyledContainer, DashboardRight } from "./styles";
import TopicSelector from "./TopicSelector";
import UserProgress from "../../components/UserProgress";

const WelcomePage: React.FC = () => {
    const location = useLocation();
    const username = location.state?.username || "Guest";

    return (
        <StyledContainer>
            <Menu />
            <DashboardPanel>
                <DashboardLeft>
                    <Text size="28px" weight="bold">
                        Welcome to Study Buddy, {username}!
                    </Text>
                    <Text size="18px" color="#555">
                        Select a topic to practice:
                    </Text>
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