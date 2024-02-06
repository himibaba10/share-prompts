"use client";

import { useEffect, useState } from "react";
import PropmtCardList from "./PropmtCardList";

const Feed = () => {
  const [searchText, setSearchText] = useState("");
  const [prompts, setPrompts] = useState([]);

  useEffect(() => {
    fetch("/api/prompt")
      .then((res) => res.json())
      .then((data) => setPrompts(data));
  }, []);

  const handleSearchText = (e) => {
    e.preventDefault();

    setSearchText(e.target.value);
  };
  return (
    <section className="feed">
      <form className="relative w-full flex-center">
        <input
          type="text"
          placeholder="Search for a tag or a username"
          value={searchText}
          onChange={handleSearchText}
          required
          className="search_input peer"
        />
      </form>
      <PropmtCardList prompts={prompts} handleTagClick={() => {}} />
    </section>
  );
};

export default Feed;
