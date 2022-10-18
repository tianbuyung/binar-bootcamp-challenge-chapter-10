import { Card, ListGroup, ListGroupItem } from "react-bootstrap";

const SocialMedia = (props) => {
  return (
    <Card>
      <ListGroup className="d-flex flex-row list-group-flush justify-content-center">
        {props.socialMedias?.map((socialMedia, index) => {
          return (
            <ListGroupItem
              className="d-flex align-items-center flex-wrap"
              key={index}
            >
              <a
                className="text-dark text-decoration-none"
                href={socialMedia.link}
                target="_blank"
                rel="noreferrer"
              >
                <h6 className="mb-0">
                  {socialMedia.data && (
                    <>
                      <i className={socialMedia.icon}></i>
                      <span className="m-2">{socialMedia.data}</span>
                    </>
                  )}
                </h6>
              </a>
            </ListGroupItem>
          );
        })}
      </ListGroup>
    </Card>
  );
};

export default SocialMedia;
