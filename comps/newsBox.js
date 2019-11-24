import { Tile } from "carbon-components-react";
import { findVal } from "../utils/helperFunctions";
import Link from "next/link";

const internalButton = newsLink => {
  return (
    <Link href={newsLink}>
      <a className="bx--btn bx--btn--primary" type="button">
        Get details
      </a>
    </Link>
  );
};
const externalButton = newsLink => {
  return (
    <a className="bx--btn bx--btn--primary" href={newsLink} type="button">
      Get details
    </a>
  );
};
export default function NewsBox(props) {
  const {
    newsObject,
    imageUrl,
    title,
    summary,
    newsLink,
    externalLink = false
  } = props;

  return (
    <React.Fragment>
      <div className="news-img" />
      <style jsx>{`
        .news-img {
          background: url(${findVal(newsObject, imageUrl)});
          background-size: cover;
          background-position: center;
          min-height: 130px;
        }
      `}</style>
      <Tile className="news-content-tile">
        <div className="news-content-title">
          <h5>{findVal(newsObject, title)}</h5>
        </div>
        <div className="news-content-text">
          <p className="news-summary">{findVal(newsObject, summary)}</p>
        </div>
        {!externalLink ? internalButton(newsLink) : externalButton(newsLink)}
      </Tile>
    </React.Fragment>
  );
}
