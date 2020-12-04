import React from 'react';

export function TextInput(props) {
    const { value, onChange, placeholder = '', label, type } = props;

    const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        onChange(e?.target?.value || '');
    }

    const style = {
        background: '#FBF8F8',
        borderRadius: '10px',
        width: '263px',
        height: '60px',
        border: 'none',
        padding: '3px',
        fontStyle: 'normal',
        fontWeight: 'bold',
        fontFamily: "font-family: 'Roboto', sans-serif",
        verticalAlign: 'middle',
        textDecoration: 'none',
        color: '#111111',
        fontSize: '20px',
    }

    return (
        <>
            {label && <p>{label}:</p>}
            <input className='text text-input' type={type ?? 'text'} style={style} value={value} onChange={handleOnChange} placeholder={placeholder}/>
        </>
    );
}