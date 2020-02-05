import { useContext } from "react";
import { PayloadContext } from "../../../comps/payloadContext";
import Layout from "../../../comps/layout.js";
import NewsBox from "../../../comps/newsBox.js";
import { useRouter } from "next/router";
import {
  getUniqueID,
  findVal,
  filterForObject
} from "../../../utils/helperFunctions";
import Loading from "../../../comps/loading";
import GridGallery from "../../../comps/gridGallery";

export default function Stops() {
  const payload = useContext(PayloadContext);
  const router = useRouter();
  const { stop } = router.query;

  const [trip, stopTrack] = stop ? stop.split(" ") : [];
  const tripObject = trip
    ? filterForObject(payload.fieldTrips, "tripId", trip)
    : undefined;
  const stopObject = tripObject
    ? filterForObject(tripObject.stops, "stopId", stopTrack)
    : undefined;

  const {
    stopTitle,
    stopSummary,
    mainImage,
    stopImages,
    stopContent
  } = stopObject ? stopObject : "";

  return (
    <>
      {!stopObject ? (
        <Loading />
      ) : (
        <Layout>
          <section className="bx--grid">
            <h1>{stopTitle}</h1>
            <h4>{stopSummary}</h4>
          </section>
          <section className="bx--grid">
            <div className="inner-banner"></div>
            <style jsx>{`
              .inner-banner {
                background: url(${mainImage});
                background-size: cover;
                background-position: center;
              }
            `}</style>
          </section>
          <section className="bx--grid">
            <div className="main-center-gang">
              {stopContent.map(content => {
                return (
                  <React.Fragment key={getUniqueID()}>
                    <p isfor="stopText">
                      {content.textBlock && content.textBlock}
                    </p>
                    {content.contentUrl && (
                      <div className="content-image">
                        <img src={content.contentUrl && content.contentUrl} />
                        <em>
                          {content.contentDescription &&
                            content.contentDescription}
                        </em>
                      </div>
                    )}
                  </React.Fragment>
                );
              })}
            </div>
          </section>
          {stopImages && (
            <section className="bx--grid">
              <div className="main-center-gang">
                <h4>Images from Stop</h4>
                <GridGallery photos={stopImages} />
              </div>
            </section>
          )}
        </Layout>
      )}
    </>
  );
}
