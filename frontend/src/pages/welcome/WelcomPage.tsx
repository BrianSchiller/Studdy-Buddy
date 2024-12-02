// WelcomePage.tsx
import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Text } from '../../components/Text';
import { Card } from '../../components/Card';
import { SearchInput } from '../../components/SearchInput';
import { Menu } from '../../components/Menu';
import { Button } from '../../components/Button';
import { CardBox, DashboardLeft, DashboardPanel, DashboardRight, StyledContainer, StyledFlex } from './styles';

const WelcomePage: React.FC = () => {
    const location = useLocation();
    const user = location.state?.username || "Guest"; // Added fallback username for clarity
    const navigate = useNavigate();

    const handleTask_VyF = () => {
        navigate('/verdurasyfrutas');
    };

    return (
        <StyledContainer>
            <Menu />
            <DashboardPanel>
                <DashboardLeft>
                    {/* Welcome message with the user's name */}
                    <Text size="24px" weight="bold">
                        Welcome to Study Buddy, {user}!
                    </Text>
                    <Text size="18px">
                        Which language would you like to learn?
                    </Text>
                    
                    {/* Search input for language search */}
                    <SearchInput type="text" placeholder="Search for a language" />

                    <CardBox>
                        {/* Section with "Let's continue" and date information */}
                        <Card radius width="270px">
                            <StyledFlex $justify="space-between">
                                <div>
                                    <Text size="20px" weight="bold">Let's continue</Text>
                                    <Text weight="bold">Vamos a continuar</Text>
                                </div>
                                <img src="https://placehold.co/95" alt="placeholder" />
                            </StyledFlex>
                        </Card>

                        {/* Date Card */}
                        <Card radius color="#692DBD" width="240px">
                            <Text size="32px" weight="bold" color="white">Monday</Text>
                            <Text size="20px" color="white">11.11.24</Text>
                        </Card>
                    </CardBox>

                    {/* Section title for the practice list */}
                    <Text weight="bold" size="20px">Pick something to practice next:</Text>
                    
                    {/* Cards for language practice with Verduras y Frutas option */}
                    <CardBox>
                        <Card radius width="40%">
                            <StyledFlex $direction="column">
                                <Text size="20px" weight="bold">Verduras y Frutas</Text>
                                <img src="https://placehold.co/100" alt="placeholder" />
                                <Button onClick={handleTask_VyF}>Start</Button>
                            </StyledFlex>
                        </Card>
                        
                        {/* Additional Cards */}
                        {[...Array(3)].map((_, index) => (
                            <Card key={index} radius width="40%">
                                <StyledFlex $direction="column">
                                    <Text size="20px" weight="bold">Vacaciones</Text>
                                    <img src="https://placehold.co/100" alt="placeholder" />
                                    <Button>Start</Button>
                                </StyledFlex>
                            </Card>
                        ))}
                    </CardBox>
                </DashboardLeft>

                {/* Right panel with popular languages */}
                <DashboardRight>
                    {["Popular Languages", "Popular Languages", "Popular Languages", "Popular Languages"].map((title, index) => (
                        <Card key={index}>
                            <h2>{title}</h2>
                            <p>JavaScript</p>
                            <p>Python</p>
                        </Card>
                    ))}
                </DashboardRight>
            </DashboardPanel>
        </StyledContainer>
    );
};

export default WelcomePage;
