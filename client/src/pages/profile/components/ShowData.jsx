import { Col, Row } from "react-bootstrap";

const ShowData = (props) => {
  return (
    <>
      <Row>
        <Col sm={4}>
          <h6 className="mb-0">{props.label}</h6>
        </Col>
        <Col sm={8} className="text-secondary">
          {props.data}
        </Col>
      </Row>
      <hr />
    </>
  );
};

export default ShowData;
