import { Card, ListGroup, ListGroupItem } from "react-bootstrap";

const SocialMedia = (props) => {
  return (
    <Card>
      <ListGroup className="list-group-flush">
        {props.socialMedias.map((socialMedia, index) => {
          return (
            <ListGroupItem
              className="d-flex justify-content-between align-items-center flex-wrap"
              key={index}
            >
              <h6 className="mb-0">
                <i className={socialMedia.icon}></i> {socialMedia.name}
              </h6>
              <span className="text-secondary">{socialMedia.data}</span>
            </ListGroupItem>
          );
        })}
      </ListGroup>
    </Card>
  );
};

export default SocialMedia;
