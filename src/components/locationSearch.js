import { useEffect, useState } from "react";
import "../static/button.css";

function LocationSearch({
  location,
  setSearchedLocation,
  setGeolocation,
  geolocation,
}) {
  const [cities, setCities] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [suggestions, setSuggestions] = useState([]);

  useEffect(() => {
    fetch("https://countriesnow.space/api/v0.1/countries/population/cities")
      .then((res) => res.json())
      .then((data) => setCities(data.data))
      .catch((err) => console.error("Failed to load population data:", err));
  }, []);

  // const dataList = ["Coimbatore", "Chennai", "Erode", "Salem", "Madurai"];

  const Geolocation = () => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const coords = {
          lat: position.coords.latitude,
          lon: position.coords.longitude,
        };
        setGeolocation(coords);
      },
      (error) => {
        console.warn("User denied location or error occurred:", error.message);
      }
    );
  };

  const handleChange = (e) => {
    const value = e.target.value;
    setSearchTerm(value);

    if (value.length > 0) {
      const filtered = cities.filter((item) =>
        item.city.toLowerCase().includes(value.toLowerCase())
      );
      setSuggestions(filtered);
    } else {
      setSuggestions([]);
    }
  };

  const handleSuggestionClick = (value) => {
    // console.log(value);
    setSearchTerm(`${value.city}, ${value.country}`);
    // setSearchedLocation(value.city)
    setSearchedLocation(searchTerm);
      setSearchTerm("");
    setSuggestions([]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (searchTerm.length > 0) {
      console.log(searchTerm);
      setSearchedLocation(searchTerm);
      setSearchTerm("");
      setSuggestions([]);
    }
  };

  const handleSearchClick = (e) => {
    e.preventDefault();
    if (searchTerm.length > 0) {
      console.log(searchTerm);
      setSearchedLocation(searchTerm);
      setSearchTerm("");
      setSuggestions([]);
    }
  };

  return (
    <section className="location-container">
      <address>
        {location
          ? `location: ${location.name}, ${location.region}, ${location.country}`
          : "Fetching location..."}
        <br />
        <time dateTime={location?.localtime}>{location?.tz_id}</time>
      </address>

      <button className="btn" onClick={Geolocation} disabled={geolocation}>
        <span className="text">precious location</span>
        <svg
          width="16"
          height="16"
          viewBox="0 0 16 16"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M4.66669 11.3334L11.3334 4.66669"
            stroke="white"
            strokeWidth="1.33333"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M4.66669 4.66669H11.3334V11.3334"
            stroke="white"
            strokeWidth="1.33333"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>

      <div className="search-container">
        <form action="" onSubmit={handleSubmit}>
          <input
            type="search"
            value={searchTerm}
            onChange={handleChange}
            autoFocus
            required
          />
          {suggestions.length > 0 && <ul>
            {suggestions.map((item, idx) => (
              <li key={idx} onClick={() => handleSuggestionClick(item)}>
                {item?.city || "Unknown City"},{" "}
                {item?.country || "Unknown Country"}
              </li>
            ))}
          </ul> }
          <i className="fa fa-search" onClick={handleSearchClick}></i>
          <button type="submit">Search</button>
        </form>
      </div>
    </section>
  );
}

export default LocationSearch;
