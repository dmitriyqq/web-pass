import React from "react";

export const Paper: React.FC = ({ children, className, style }) => {
    return (<div
        className={className}
        style={{
            background: '#FBF8F8',
            borderRadius: '10px',
            padding: '15px',
            filter: 'drop-shadow(4px 4px 10px rgba(0, 0, 0, 0.25))',
            ...style
        }}>
        {children}
    </div>);
}