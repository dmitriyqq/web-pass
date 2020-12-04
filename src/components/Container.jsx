import React from "react";

export const Container: React.FC = ({ children}) => {
    return <div
        style={{
            width: '1000px',
            background: '',
            margin: 'auto',
            height: '100%',
            padding: '25px'
        }}
    >
        {children}
    </div>
}