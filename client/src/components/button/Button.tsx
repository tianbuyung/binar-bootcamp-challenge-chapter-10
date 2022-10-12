interface ButtonProps {
    title: string;
}

const Button = (props : ButtonProps) => {
    return (
        <div>
            {props?.title}
        </div>
    )
}

export default Button;