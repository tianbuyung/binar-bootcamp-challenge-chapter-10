import { Card } from "react-bootstrap";
import ShowData from "./ShowData";

const Identity = (props) => {
  return (
    <Card className="mb-3">
      <Card.Body>
        <ShowData label="Full Name" data={props.profile.user?.name} />
        <ShowData label="Email" data={props.profile.user?.email} />
        <ShowData label="Phone Number" data="Phone Number" />
        <ShowData label="Address" data="Address" />
        <ShowData
          label="Total Transactions"
          data={`Rp. ${props.badge.results?.map((result) => result.totalShop)}`}
        />
        <ShowData label="Badge" data={props.badge?.badge} />
      </Card.Body>
    </Card>
  );
};

export default Identity;
