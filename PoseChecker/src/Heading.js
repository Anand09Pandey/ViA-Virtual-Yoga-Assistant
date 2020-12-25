import React from 'react';

const Heading = (props) => {
    return (
        <>
            <div style={{fontFamily: "'Rock Salt', cursive", padding: 10, color: "white"}}>
                <h1>{ props.title }</h1>
            </div>
        </>      
    );
}

export default Heading;