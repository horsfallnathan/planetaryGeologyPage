import { useContext, useState } from "react";
import { PayloadContext } from "../../comps/payloadContext";
import Layout from "../../comps/layout.js";
import NewsBox from "../../comps/newsBox.js";
import { getUniqueID, cropText, findVal } from "../../utils/helperFunctions";
import SearchBar from "../../comps/searchBar";

export default function FieldTrips() {
  const payload = useContext(PayloadContext);
  const [tripArray, setTripArray] = useState(payload.fieldTrips);
  const [inputValue, setInputValue] = useState("");
  const handleSearch = e => {
    const searchInput = e.target.value;
    setInputValue(searchInput);
    const liveTripArray = payload.fieldTrips.filter(trip =>
      trip.tripTitle.toLowerCase().includes(searchInput.toLowerCase())
    );
    setTripArray(liveTripArray);
  };
  const handleSearchClear = () => {
    setInputValue("");
    setTripArray(payload.fieldTrips);
  };
  return (
    <Layout>
      <section className="bx--grid">
        <h1>Field Trips</h1>
        <h4>Explore our Geological odysseys around the world!</h4>
      </section>
      <section className="bx--grid">
        <div className="inner-banner"></div>
        <style jsx>{`
          .inner-banner {
            background: url(${payload.fieldTripBanner});
            background-size: cover;
            background-position: center;
          }
        `}</style>
      </section>
      <section className="bx--grid">
        <SearchBar
          handleSearchInput={handleSearch}
          inputValue={inputValue}
          handleSearchClear={handleSearchClear}
          placeHolderText="Search field trips"
        />
      </section>
      <section className="bx--grid bx--row">
        {tripArray.map(trip => {
          return (
            <div className="bx--col-lg-4" key={getUniqueID()}>
              <NewsBox
                newsObject={trip}
                imageUrl="mainImage"
                title="tripTitle"
                summary={cropText(trip.tripSummary)}
                tripDates={`${trip.tripStart} - ${trip.tripEnd}`}
                newsLink={`field-trips/${trip.tripId}`}
              />
            </div>
          );
        })}
      </section>
    </Layout>
  );
}
