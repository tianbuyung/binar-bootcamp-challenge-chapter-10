import { Card, Placeholder } from "react-bootstrap";

const CardPlaceholder = () => {
	return (
		<Card
			style={{
				height: "400px",
			}}
		>
			<Card.Img
				variant="top"
				src="https://res.cloudinary.com/drqqwwpen/image/upload/v1596474380/pcs/not-available_g2vsum.jpg"
			/>
			<Card.Body>
				<Placeholder as={Card.Title} animation="glow">
					<Placeholder
						xs={12}
						className={"change-border"}
						bg="secondary"
					/>
				</Placeholder>
				<Placeholder as={Card.Text} animation="glow">
					<Placeholder
						xs={12}
						className={"change-border"}
						bg="secondary"
					/>{" "}
					<Placeholder
						xs={7}
						className={"change-border"}
						bg="secondary"
					/>{" "}
				</Placeholder>
			</Card.Body>
		</Card>
	);
};

export default CardPlaceholder;
