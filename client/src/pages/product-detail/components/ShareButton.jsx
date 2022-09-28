import {
  FacebookShareButton,
  FacebookIcon,
  TwitterShareButton,
  TwitterIcon,
} from "react-share";
import { ButtonGroup } from "react-bootstrap";

const ShareButton = ({ name, id }) => {
  const shareUrl = `https://binar-e-commerce.herokuapp.com/product/${id}`;
  const title = `Waktunya beli ${name} di`;
  const fbHashtag = "#test";
  const twHashtags = "test";
  const size = "2.5rem";
  return (
    <ButtonGroup aria-label="share-button">
      <FacebookShareButton url={shareUrl} quote={title} hashtag={fbHashtag}>
        <FacebookIcon size={size} />
      </FacebookShareButton>
      <TwitterShareButton url={shareUrl} title={title} hashtags={[twHashtags]}>
        <TwitterIcon size={size} />
      </TwitterShareButton>
    </ButtonGroup>
  );
};

export default ShareButton;
