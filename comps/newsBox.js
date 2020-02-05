import { Tile } from "carbon-components-react";
import { findVal, cropText } from "../utils/helperFunctions";
import Link from "next/link";

const internalButton = (newsLink, titleText) => {
  return (
    <Link href={newsLink}>
      <a className="newsLink" type="button">
        {titleText}
      </a>
    </Link>
  );
};
const externalButton = (newsLink, titleText) => {
  return (
    <a className="newsLink" href={newsLink} type="button">
      {titleText}
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
    externalLink = false,
    tripDates = null
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
          {!externalLink
            ? internalButton(newsLink, findVal(newsObject, title))
            : externalButton(newsLink, findVal(newsObject, title))}
        </div>
        <em className="newsDate">{tripDates}</em>
        <div
          className="news-content-text"
          dangerouslySetInnerHTML={summary}
        ></div>
      </Tile>
    </React.Fragment>
  );
}
