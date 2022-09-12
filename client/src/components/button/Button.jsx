const Button = ({ title, onClick }) => {
    return (
        <div onClick={onClick ? onClick : () => null}>{title}</div>
    )
}

export default Button;