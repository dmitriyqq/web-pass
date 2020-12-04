export const Text: React.FC = ({children, variant,  className, style }) => {

    const getSize = () => {
        if (variant === "regular") {
            return '30px'
        }
        if (variant === "small") {
            return '20px'
        }
        if (variant === "big") {
            return '40px'
        }

        return '30px';
    }

    const selfStyle = {
        fontSize: getSize(),
        fontStyle: 'normal',
        fontWeight: 'bold',
        fontFamily: "font-family: 'Roboto', sans-serif",
        verticalAlign: 'middle',
        textDecoration: 'none',
        color: '#111111',
        ...style
    };

    return <div className={className} style={selfStyle}>
        {children}
    </div>
}