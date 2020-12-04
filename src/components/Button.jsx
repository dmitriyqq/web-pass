
import React from 'react';


export const Button = (props) => {
    const { children, onClick, color = 'green'}  = props;

    const style = {
        borderRadius: '10px',
        border: 'none',
        padding: '3px',
        fontStyle: 'normal',
        fontWeight: 'bold',
        fontFamily: "font-family: 'Roboto', sans-serif",
        verticalAlign: 'middle',
        textDecoration: 'none',
        textTransform: 'uppercase',
        color: '#FEFEFE',
        fontSize: '20px',
        margin: '25px',
        filter: 'drop-shadow(4px 4px 10px rgba(0, 0, 0, 0.25))',
    }

    return (
        <button style={style} className={`text button ${ color === 'red' ? 'button-red' : 'button-green'}`} onClick={onClick}>
            {children}
        </button>
    );
}

export default Button;