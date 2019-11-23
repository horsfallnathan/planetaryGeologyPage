import { Tile, ClickableTile } from "carbon-components-react";
import { findVal } from "../utils/helperFunctions";

export default function NewsBox(props) {
  const { newsObject, imageUrl, title, summary, newsLink } = props;
  return (
    <React.Fragment>
      <div className="new-img" />
      <style jsx>{`
        .new-img {
          background: url(${findVal(newsObject, imageUrl)});
          background-size: cover;
          background-position: center;
          min-height: 130px;
        }
      `}</style>
      <Tile>
        <h5>{findVal(newsObject, title)}</h5>
        <p>{findVal(newsObject, summary)}</p>
      </Tile>
      <ClickableTile href={newsLink}>Get details</ClickableTile>
    </React.Fragment>
  );
}
