import React, { useState, Fragment } from "react";
import styles from "./SearchBar.module.css";

function SearchBar(props) {
  const [search, setSearch] = useState("");

  const handleChange = (e) => {
    setSearch(e.target.value);
  };

  const handleSearch = (e) => {
    if (e.target.value === "") {
      props.defaultWeather();
    }
    props.handleSearch(e.target.value);
    setSearch("");
  };

  return (
    <Fragment>
      <div className={styles["search-box"]}>
        <input
          onChange={handleChange}
          onKeyUp={(e) => (e.key === "Enter" ? handleSearch(e) : null)}
          type="text"
          className={styles["search-bar"]}
          placeholder="Search..."
          value={search}
        />
      </div>
    </Fragment>
  );
}

export default SearchBar;
