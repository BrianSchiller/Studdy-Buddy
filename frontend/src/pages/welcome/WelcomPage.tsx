// WelcomePage.tsx
import React from 'react';
import { Text } from '../../components/Text';
import { Card } from '../../components/Card';
import { SearchInput } from '../../components/SearchInput';
import { Menu } from '../../components/Menu';
import { Button } from '../../components/Button';
import { CardBox, DashboardLeft, DashboardPanel, DashboardRight, StyledContainer, StyledFlex } from './styles';


const WelcomePage: React.FC = () => {
    // const location = useLocation();
    // const user = location.state?.username;

    return (
        <StyledContainer>
            <Menu />
            <DashboardPanel>
                <DashboardLeft>
                    <SearchInput type="text" placeholder="Search for a language" />
                    <CardBox>
                        <Card radius width="270px">
                            <StyledFlex $justify='space-between'>
                                <div>
                                    <Text size="20px" weight="bold">Let's continue</Text>
                                    <Text weight="bold">Vamos a continuar</Text>
                                </div>
                                <img src="https://placehold.co/95" alt="placeholder" />
                            </StyledFlex>
                        </Card>
                         <Card radius color="#692DBD" width="240px">
                          <Text size="32px" weight="bold" color="white">Monday</Text>
                        <Text size="20px" color="white">11.11.24</Text>
                        </Card>
                    </CardBox>
                    <Text weight="bold" size="20px">Pick something to practice next:</Text>
                    <CardBox>
                        <Card radius width="40%">
                            <StyledFlex $direction="column">
                                <Text size="20px" weight="bold">Verduras y Frutas</Text>
                                <img src="https://placehold.co/100" alt="placeholder" />
                                <Button>Start</Button>
                            </StyledFlex>
                        </Card>
                         <Card radius width="40%">
                            <StyledFlex $direction="column">
                                <Text size="20px" weight="bold">Verduras y Frutas</Text>
                                <img src="https://placehold.co/100" alt="placeholder" />
                                <Button>Start</Button>
                            </StyledFlex>
                        </Card>
                          <Card radius width="40%">
                            <StyledFlex $direction="column">
                                <Text size="20px" weight="bold">Verduras y Frutas</Text>
                                <img src="https://placehold.co/100" alt="placeholder" />
                                <Button>Start</Button>
                            </StyledFlex>
                        </Card>
                         <Card radius width="40%">
                        <StyledFlex $direction="column">
                                <Text size="20px" weight="bold">Verduras y Frutas</Text>
                                <img src="https://placehold.co/100" alt="placeholder" />
                                <StyledFlex $align="end">
                                    <span/>
                                    <Button>Start</Button>
                                </StyledFlex>
                        </StyledFlex>
                        </Card>
                    </CardBox>
                </DashboardLeft>
                <DashboardRight>
                    <Card>
                        <h2>Popular Languages</h2>
                        <p>JavaScript</p>
                        <p>Python</p>
                    </Card>
                     <Card>
                        <h2>Popular Languages</h2>
                        <p>JavaScript</p>
                        <p>Python</p>
                    </Card>
                     <Card>
                        <h2>Popular Languages</h2>
                        <p>JavaScript</p>
                        <p>Python</p>
                    </Card>
                     <Card>
                        <h2>Popular Languages</h2>
                        <p>JavaScript</p>
                        <p>Python</p>
                    </Card> 
                </DashboardRight>
            </DashboardPanel>
        </StyledContainer>
    );
};

export default WelcomePage;
