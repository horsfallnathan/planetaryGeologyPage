import { useContext, useState, useEffect, useRef } from "react";
import { useRouter } from "next/router";
import { PayloadContext } from "../../comps/payloadContext";
import Layout from "../../comps/layout.js";
import NewsBox from "../../comps/newsBox";
import { getUniqueID, filterForObject, getSummaryText } from "../../utils/helperFunctions";
import Loading from "../../comps/loading";
// import SearchBar from "../../comps/searchBar";
import { Pagination } from "../../comps/Pagination";

export default function Trip() {
  const payload = useContext(PayloadContext);

  const router = useRouter();
  const { trip } = router.query;
  const postsPerPage = 12
  const numb = useRef(1)
  const tripObject = trip
    ? filterForObject(payload.fieldTrips, "tripId", trip)
    : undefined;
  const {
    tripTitle,
    tripSummary,
    mainImage,
    tripLocation,
    // leadCoordinator,
    // otherCoordinators,
    stops
  } = tripObject ? tripObject : "";
  const [liveStopArray, setLiveStopArray] = useState([]);
  // const [seeAll, setSeeAll] = useState(false);
  // const [inputValue, setInputValue] = useState("");

  useEffect(() => {
    if (stops) {
      setLiveStopArray(stops.filter((_, i) => i < postsPerPage));
    }
  }, [stops]);
  // const handleSeeAll = () => {
  //   setSeeAll(!seeAll);
  //   // I think I twisted my logic here but it works, sorry
  //   const newStopArr = !seeAll ? stops : stops.filter((_, i) => i < postsPerPage);
  //   setLiveStopArray(newStopArr);
  // };

  const [activePage, setActivePage] = useState(1)
  const changePage = (newNumb = 1) => {
    numb.current = newNumb
    setActivePage(newNumb)
    const newStopArr = stops.filter((_, i) => postsPerPage * (numb.current - 1) <= i && i < postsPerPage * numb.current);
    setLiveStopArray(newStopArr);
  };

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
  //   setLiveStopArray(stops.filter((_, i) => i < postsPerPage));
  //   setSeeAll(false);
  // };

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
            {/* <section className="bx--grid">
              <h2 className="main-content-gang">Stops</h2>
            </section> */}
            <div className="bx--grid bx--row">
              {/* <div className="left-content-gang"> */}
              {/* <SearchBar
                  handleSearchInput={handleSearch}
                  inputValue={inputValue}
                  handleSearchClear={handleSearchClear}
                  placeHolderText="Search by title"
                />
                <button
                  className="bx--btn bx--btn--primary bx--btn--sm"
                  type="button"
                  onClick={handleSeeAll}
                >
                  {seeAll ? "View less" : "View all"}
                </button> */}
              {/* </div> */}
              <article className="main-center-gang">
                <section className='bx-grid'>
                  <h2>Stops</h2>
                </section>
                <section className='bx-grid'>
                  <Pagination activePage={activePage} postsPerPage={postsPerPage} changePage={changePage} totalPosts={Object.keys(stops).length} />
                </section>
                <div className=" bx--row">
                  {liveStopArray.map((stop, i) => {
                    return (
                      <div className="bx--col-lg-6 news-box" key={getUniqueID()}>
                        <NewsBox
                          newsObject={stop}
                          imageUrl="mainImage"
                          tripDates={stop.stopDate}
                          title="stopTitle"
                          summary={getSummaryText(stop, 'news-content-text')}
                          newsLink={`stops/${trip} ${stop.stopId}`}
                        />
                      </div>
                    );
                  })}
                </div>
                <Pagination activePage={activePage} postsPerPage={postsPerPage} changePage={changePage} totalPosts={Object.keys(stops).length} />
              </article>
            </div>
            {/* <section className="bx--grid">
              <h2 className="main-content-gang">Trip Coordinators</h2>
            </section> */}
            {/* <div className="bx--grid">
              <div className="main-content-gang ">
                <div className="bx--row">
                  <div className="bx--col-lg-6 news-box">
                    <NewsBox
                      newsObject={leadCoordinator}
                      imageUrl="imageUrl"
                      title="name"
                      summary="title"
                      newsLink={leadCoordinator.url}
                      externalLink={true}
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
                          externalLink={true}
                        />
                      </div>
                    );
                  })}
                </div>
              </div>
            </div> */}
          </Layout>
        )
      }
    </>
  );
}