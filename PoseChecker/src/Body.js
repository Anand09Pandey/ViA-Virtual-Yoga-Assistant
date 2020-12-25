import React from 'react';
import './Body.css';
import Card from './MaterialCard';

const Body = (props) => {
    const Cards = (val) => {
        return (
            <Card name={val.name} disc={val.disc} src={val.src} prt={val.prt} link={val.link} /> 
        );
    };

    return (
        <>
            <div className="cardsSection">
                {props.data.map(Cards)}
            </div>
        </>
    );
}

export default Body;