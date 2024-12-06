// WelcomePage.tsx
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Text } from "../../components/Text";
import { Menu } from "../../components/Menu";
import { DashboardLeft, DashboardPanel, StyledContainer, StyledButton } from "./styles";
import TopicSelector from "./TopicSelector"; // Import the TopicSelector component
import { checkExamEligibility } from "../../api"; // New API function

const WelcomePage: React.FC = () => {
    const location = useLocation();
    const navigate = useNavigate();

    // Extract username from the location state
    const username = location.state?.username || "Guest";

    const [isExamAvailable, setIsExamAvailable] = useState(false);

    // Check if the user is eligible for the exam
    useEffect(() => {
        const fetchEligibility = async () => {
            try {
                const eligible = await checkExamEligibility(username);
                setIsExamAvailable(eligible);
            } catch (error) {
                console.error("Error checking exam eligibility:", error);
            }
        };
        fetchEligibility();
    }, [username]);

    // Navigate to the exam page
    const handleTakeExam = () => {
        navigate("/exam", { state: { username } });
    };

    return (
        <StyledContainer>
            <Menu />
            <DashboardPanel>
                <DashboardLeft>
                    <Text size="24px" weight="bold">
                        Welcome to Studdy Buddy, {username}!
                    </Text>
                    <Text size="18px">Select a topic to practice:</Text>

                    {/* Render the TopicSelector component */}
                    <TopicSelector username={username} />

                    {/* Exam Button */}
                    <StyledButton
                        onClick={handleTakeExam}
                        disabled={!isExamAvailable}
                        $isEnabled={isExamAvailable}
                    >
                        Take Exam
                    </StyledButton>
                </DashboardLeft>
            </DashboardPanel>
        </StyledContainer>
    );
};

export default WelcomePage;
