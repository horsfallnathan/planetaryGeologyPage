import { useContext, useState, useEffect } from "react";
import { useRouter } from "next/router";
import { PayloadContext } from "../../comps/payloadContext";
import Layout from "../../comps/layout.js";
import NewsBox from "../../comps/newsBox";
import { getUniqueID } from "../../utils/helperFunctions";
import Loading from "../../comps/loading";
import SearchBar from "../../comps/searchBar";

export default function Trip() {
  const payload = useContext(PayloadContext);

  const router = useRouter();
  const { trip } = router.query;
  const tripObject = trip ? payload.fieldTrips[trip] : undefined;
  const {
    tripTitle,
    tripSummary,
    mainImage,
    tripLocation,
    leadCoordinator,
    otherCoordinators,
    stops
  } = tripObject ? tripObject : "";
  const [liveStopArray, setLiveStopArray] = useState([]);
  const [seeAll, setSeeAll] = useState(false);

  useEffect(() => {
    if (stops) {
      setLiveStopArray(stops.filter((_, i) => i < 2));
    }
  }, [stops]);
  const handleSeeAll = () => {
    setSeeAll(!seeAll);
    // I think I twisted my logic here but it works, sorry
    const newStopArr = !seeAll ? stops : stops.filter((_, i) => i < 2);
    setLiveStopArray(newStopArr);
  };
  return (
    <>
      {!tripObject ? (
        <Loading />
      ) : (
        <Layout>
          <section className="bx--grid">
            <h1>{tripTitle}</h1>
            <h4>{tripLocation}</h4>
          </section>
          <div className="bx--grid">
            <div className="inner-banner"></div>
            <style jsx>{`
              .inner-banner {
                background: url(${mainImage});
                background-size: cover;
                background-position: center;
              }
            `}</style>
          </div>
          <section className="bx--grid">
            <p>{tripSummary}</p>
          </section>
          <section className="bx--grid">
            <h2 className="main-content-gang">Stops</h2>
          </section>
          <div className="bx--grid bx--row">
            <div className="left-content-gang">
              <SearchBar placeHolderText="Search stops" />
            </div>
            <article className="main-content-gang">
              <div className=" bx--row">
                {liveStopArray.map((stop, i) => {
                  return (
                    <div className="bx--col-lg-6 news-box" key={getUniqueID()}>
                      <NewsBox
                        newsObject={stop}
                        imageUrl="mainImage"
                        title="stopTitle"
                        summary="stopSummary"
                        newsLink={`stops/${trip}-${i}`}
                      />
                    </div>
                  );
                })}
              </div>
              <button
                className="bx--btn bx--btn--primary bx--btn--sm"
                type="button"
                onClick={handleSeeAll}
              >
                {seeAll ? "View less" : "View all"}
              </button>
            </article>
          </div>
          <section className="bx--grid">
            <h2 className="main-content-gang">Trip Coordinators</h2>
          </section>
          <div className="bx--grid">
            <div className="main-content-gang ">
              <div className="bx--row">
                <div className="bx--col-lg-6 news-box">
                  <NewsBox
                    newsObject={leadCoordinator}
                    imageUrl="imageUrl"
                    title="name"
                    summary="title"
                    newsLink={leadCoordinator.url}
                  />
                </div>
                {otherCoordinators.map(person => {
                  return (
                    <div className="bx--col-lg-6 news-box" key={getUniqueID()}>
                      <NewsBox
                        newsObject={person}
                        imageUrl="imageUrl"
                        title="name"
                        summary="title"
                        newsLink={person.url}
                      />
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </Layout>
      )}
    </>
  );
}
