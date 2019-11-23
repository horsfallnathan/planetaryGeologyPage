import { useContext } from "react";
import { PayloadContext } from "../../../comps/payloadContext";
import Layout from "../../../comps/layout.js";
import NewsBox from "../../../comps/newsBox.js";
import { useRouter } from "next/router";
import { getUniqueID } from "../../../utils/helperFunctions";
import Loading from "../../../comps/loading";

export default function Stops() {
  const payload = useContext(PayloadContext);
  const router = useRouter();
  const { stop } = router.query;

  const [trip, stopNum] = stop ? stop.split("-").map(x => Number(x)) : [];

  const stopObject = stop ? payload.fieldTrips[trip].stops[stopNum] : undefined;
  const fieldTripTitle = trip && payload.fieldTrips[trip].fieldTripTitle;
  const {
    stopTitle,
    stopSummary,
    mainImage,
    stopImages,
    stopContent
  } = stopObject ? stopObject : "";
  console.log(stop, stopObject);
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
                    <p>{content.textBlock && content.textBlock}</p>
                    <img
                      className="content-image"
                      src={content.contentUrl && content.contentUrl}
                    />
                    <p>
                      {content.contentDescription && content.contentDescription}
                    </p>
                  </React.Fragment>
                );
              })}
            </div>
          </section>
        </Layout>
      )}
    </>
  );
}
