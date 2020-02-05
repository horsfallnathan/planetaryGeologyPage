import { useContext, useState, useEffect } from "react";
import { useRouter } from "next/router";
import { PayloadContext } from "../../comps/payloadContext";
import Layout from "../../comps/layout.js";
import NewsBox from "../../comps/newsBox";
import {
  getUniqueID,
  filterForObject,
  getSummaryText
} from "../../utils/helperFunctions";
import Loading from "../../comps/loading";
import SearchBar from "../../comps/searchBar";
import { Pagination } from "../../comps/Pagination";

export default function Trip() {
  const payload = useContext(PayloadContext);

  const router = useRouter();
  const { trip } = router.query;
  const tripObject = trip
    ? filterForObject(payload.fieldTrips, "tripId", trip)
    : undefined;
  const {
    tripTitle,
    tripSummary,
    mainImage,
    tripLocation,
    tripStart,
    tripEnd,
    stops
  } = tripObject ? tripObject : "";
  const [liveStopArray, setLiveStopArray] = useState([0]);
  const [livePage, setLivePage] = useState(1);
  const [pageRange, setPageRange] = useState(4);
  const [seeAll, setSeeAll] = useState(false);
  const [inputValue, setInputValue] = useState("");

  useEffect(() => {
    setLiveStopArray(stops);
    // confirmStops();
  }, []);
  // const handleSeeAll = () => {
  //   setSeeAll(!seeAll);
  //   // I think I twisted my logic here but it works, sorry
  //   const newStopArr = !seeAll ? stops : stops.filter((_, i) => i < 2);
  //   setLiveStopArray(newStopArr);
  // };

  // const handleSearch = e => {
  //   const searchInput = e.target.value;
  //   setInputValue(searchInput);
  //   const filteredArray =
  //     stops &&
  //     stops.filter(stop =>
  //       stop.stopTitle.toLowerCase().includes(searchInput.toLowerCase())
  //     );
  //   setLiveStopArray(filteredArray);
  // };
  // const handleSearchClear = () => {
  //   setInputValue("");
  //   setLiveStopArray(stops.filter((_, i) => i < 2));
  //   setSeeAll(false);
  // };

  //
  const indexLastStop = livePage * pageRange;
  const indexFirstStop = indexLastStop - pageRange;
  const liveArray =
    liveStopArray && liveStopArray.slice(indexFirstStop, indexLastStop);

  return (
    <Layout>
      <div className="bx--grid">
        <div className="inner-banner"></div>
        <style jsx>{`
          .inner-banner {
            background: url(${mainImage});
            background-size: cover;
            background-position: center;
            margin-top: 4em;
          }
        `}</style>
      </div>
      <section className="bx--grid">
        <h2>{tripTitle}</h2>
        <h4>
          {tripLocation} |
          <span>
            <em className="tripDates">
              {" "}
              {tripStart} - {tripEnd}
            </em>
          </span>
        </h4>
      </section>
      <div className="bx--grid">
        <p>{tripSummary}</p>
      </div>
      <section className="bx--grid stopTitleSection">
        <h3 className="main-content-gang left">Stops</h3>
        <div className="right-content-gang">
          <SearchBar
            // handleSearchInput={handleSearch}
            inputValue={inputValue}
            // handleSearchClear={handleSearchClear}
            placeHolderText="Search by title"
          />
        </div>
      </section>
      <div className="bx--grid bx--row">
        <article className="main-content-gang left">
          <div className=" bx--row">
            {liveStopArray &&
              liveStopArray.map((stop, i) => {
                return (
                  <div className="bx--col-lg-6 news-box" key={getUniqueID()}>
                    <NewsBox
                      newsObject={stop}
                      imageUrl="mainImage"
                      title="stopTitle"
                      tripDates={stop.stopDate}
                      summary={getSummaryText(stop)}
                      newsLink={`stops/${trip} ${stop.stopId}`}
                    />
                  </div>
                );
              })}
          </div>
          <button
            className="bx--btn bx--btn--primary bx--btn--sm"
            type="button"
            // onClick={handleSeeAll}
          >
            {seeAll ? "View less" : "View all"}
          </button>
          <Pagination postsPerPage={pageRange} totalPosts={60} />
        </article>
      </div>
    </Layout>
  );
}
