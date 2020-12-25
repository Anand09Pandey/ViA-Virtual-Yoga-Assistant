import React from 'react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

const BootCard = (props) => {
    return (
        <Card style={{ width: '18rem' }}>
            <Card.Img variant="top" src={require(props.src)} />
                <Card.Body>
                    <Card.Title>{props.name}</Card.Title>
                    <Card.Text>
                    {props.disc}
                    </Card.Text>
                    <Button href={props.link} variant="primary">Learn More</Button>
                </Card.Body>
        </Card>
    );
}

export default BootCard;