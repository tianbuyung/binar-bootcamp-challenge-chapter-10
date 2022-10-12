import { Card } from "react-bootstrap";
import EditProfile from "./EditProfile/EditProfile";

const Profile = (props) => {
  return (
    <Card>
      <Card.Body className="card-body">
        <div className="d-flex flex-column align-items-center text-center">
          <img
            src="https://bootdey.com/img/Content/avatar/avatar7.png"
            alt="Admin"
            className="rounded-circle"
            width="150"
          />
          <div className="mt-3">
            <h4>{props.profile.user?.name}</h4>
            <p className="text-secondary mb-1">{props.profile.user?.email}</p>
            <p className="text-muted font-size-sm">
              {props.badge?.badge} Member
            </p>
            <EditProfile
              id={props.profile.user?.id}
              name={props.profile.user?.name}
              address={props.profile.user?.address}
              phoneNumber={props.profile.user?.phoneNumber}
              twitter={props.profile.user?.twitter}
              instagram={props.profile.user?.instagram}
              facebook={props.profile.user?.facebook}
              setIsFetching={props.setIsFetching}
            />
          </div>
        </div>
      </Card.Body>
    </Card>
  );
};

export default Profile;
