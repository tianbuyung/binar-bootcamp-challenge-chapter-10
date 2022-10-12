import { Card } from "react-bootstrap";
import ShowData from "./ShowData";

const Identity = (props) => {
  return (
    <Card>
      <Card.Body>
        <ShowData label="Full Name" data={props.profile.user?.name} />
        <hr />
        <ShowData label="Email" data={props.profile.user?.email} />
        <hr />
        <ShowData label="Phone Number" data={props.profile.user?.phoneNumber} />
        <hr />
        <ShowData label="Address" data={props.profile.user?.address} />
        <hr />
        <ShowData
          label="Total Transactions"
          data={`Rp. ${props.badge.results?.map((result) => result.totalShop)}`}
        />
        <hr />
        <ShowData label="Badge" data={`${props.badge?.badge} Member`} />
      </Card.Body>
    </Card>
  );
};

export default Identity;
