"use client";

import { useState, useEffect } from "react";
import { PromptCard } from "./PromptCard";

// post : _id, creator, prompt, tag

const PromptCardList = ({ data, handleTagClick }) => {
  return (
    <div className="mt-16 prompt_layout">
      {data.map((post) => {
        return (
          <PromptCard
            key={post._id}
            post={post}
            handleTagClick={handleTagClick}
          />
        );
      })}
    </div>
  );
};

function Feed() {
  const [posts, setPosts] = useState([]);

  const [searchText, setSearchText] = useState("");
  const [searchTimeout, setSearchTimeout] = useState(null);
  const [searchResults, setSearchResults] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      const response = await fetch("/api/prompt", {
        cache: "no-store",
      });
      const data = await response.json();

      setPosts(data);
    };

    fetchPosts();
  }, []);

  const filterPrompts = (searchtext) => {
    const regex = new RegExp(searchtext, "i");
    return posts.filter(
      (item) =>
        regex.test(item.creator.username) ||
        regex.test(item.tag) ||
        regex.test(item.creator.email) ||
        regex.test(item.prompt)
    );
  };

  const handleSearchTextChange = (e) => {
    clearTimeout(searchTimeout);
    setSearchText(e.target.value);

    setSearchTimeout(
      setTimeout(() => {
        const searchResult = filterPrompts(e.target.value);
        setSearchResults(searchResult);
      }, 500)
    );
  };

  const handleTagClick = (tagName) => {
    setSearchText(tagName);

    const searchResult = filterPrompts(tagName);
    setSearchResults(searchResult);
  };

  return (
    <section className="feed">
      <form className="relative w-full flex-center">
        <input
          type="text"
          placeholder="Serch for a tag or a username"
          value={searchText}
          onChange={handleSearchTextChange}
          required
          className="search_input peer"
        />
      </form>
      {searchText ? (
        <PromptCardList
          data={searchResults}
          handleTagClick={handleTagClick}
        />
      ) : (
        <PromptCardList
          data={posts}
          handleTagClick={handleTagClick}
        />
      )}
    </section>
  );
}

export default Feed;
