import React from "react";
import { useNavigate } from "react-router-dom";
import { Card } from "../../components/Card";
import { Button } from "../../components/Button";
import { CardBox } from "./styles";

interface TopicSelectorProps {
    username: string; // Passed from the parent component
}

const TopicSelector: React.FC<TopicSelectorProps> = ({ username }) => {
    const navigate = useNavigate();

    // Navigate to ListPage with topic-specific data
    const handleTopicSelection = (topicId: number, title: string, description: string) => {
        navigate("/list", {
            state: { 
                username, 
                topicId, 
                title, 
                description 
            },
        });
    };

    return (
        <CardBox>
            {/* Topic: Verduras y Frutas */}
            <Card radius width="40%">
                <h3>Verduras y Frutas</h3>
                <img src="https://placehold.co/100" alt="Fruits and Vegetables" />
                <Button 
                    onClick={() => 
                        handleTopicSelection(
                            1, 
                            "Learn Fruits and Vegetables", 
                            "Get to know different fruits and vegetables with this list."
                        )
                    }
                >
                    Start
                </Button>
            </Card>


            {/* Topic: Vacaciones */}
            <Card radius width="40%">
                <h3>Vacaciones</h3>
                <img src="https://placehold.co/100" alt="Vacation Words" />
                <Button 
                    onClick={() => 
                        handleTopicSelection(
                            2, 
                            "Learn Vacation Words", 
                            "Prepare for your next vacation with these useful words."
                        )
                    }
                >
                    Start
                </Button>
            </Card>

            {/* Topic: Profesiones  */}
            <Card radius width="40%">
                <h3>Profesiones</h3>
                <img src="https://placehold.co/100" alt="Profesiones Words" />
                <Button 
                    onClick={() => 
                        handleTopicSelection(
                            3, 
                            "Learn Profession Words", 
                            "Prepare for your next profession with these useful words."
                        )
                    }
                >
                    Start
                </Button>
            </Card>

            {/* Topic: Animales */}
            <Card radius width="40%">
                <h3>Animales</h3>
                <img src="https://placehold.co/100" alt="Animals" />
                <Button 
                    onClick={() => 
                        handleTopicSelection(
                            4, 
                            "Learn Animals", 
                            "Learn the names of various animals in Spanish and English."
                        )
                    }
                >
                    Start
                </Button>
            </Card>
        </CardBox>
    );
};

export default TopicSelector;
