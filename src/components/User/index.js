import React, { useState, useEffect } from "react";
import axios from "axios";
import Repo from "../Repo";
import Follower from "../Follower";
import "./style.scss";
import { faGithub } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCodeBranch, faAddressBook } from "@fortawesome/free-solid-svg-icons";

export default function User(props) {
  const [repos, setRepos] = useState([]);
  const [followers, setFollowers] = useState([]);
  const [showing, setShowing] = useState("none");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (showing === "repos" && !repos.length) {
      getRepos();
    } else if (showing === "followers" && !followers.length) {
      getFollowers();
    }
  }, [showing]);
  // Fetch a user's repos using the provided repos endpoint
  const getRepos = async () => {
    setLoading(true);
    const result = await axios.get(
      `/.netlify/functions/getRepos/getRepos.js?user=${props.login}`
    );
    setRepos([...result.data]);
    setLoading(false);
  };

  // Fetch a user's followers using the provided followers endpoint
  const getFollowers = async () => {
    setLoading(true);
    const result = await axios.get(
      `/.netlify/functions/getFollowers/getFollowers.js?user=${props.login}`
    );
    setFollowers([...result.data]);
    setLoading(false);
  };

  return (
    <div className="User">
      <div className="User-photo-container">
        <a
          className="User-profile-link link"
          target="_blank"
          rel="noopener noreferrer"
          href={props.html_url}
        >
          <FontAwesomeIcon icon={faGithub} className="mr-1" />
          {props.login}
          <FontAwesomeIcon icon={faGithub} className="ml-1" />
        </a>
        <img
          className="User-profile-photo"
          src={props.avatar_url}
          alt={`${props.login}'s GitHub Avatar.`}
        />
      </div>
      <div className="User-info-container">
        {/* conditionally render the repos/followers buttons */}
        <div className="User-info-buttons">
          <span onClick={() => setShowing("repos")} className="repo-button">
            <FontAwesomeIcon icon={faCodeBranch} />{" "}
            {showing !== "repos" && "Show"} Repos
          </span>
          <span
            onClick={() => setShowing("followers")}
            className="follower-button"
          >
            {showing !== "followers" && "Show"} Followers{" "}
            <FontAwesomeIcon icon={faAddressBook} />
          </span>
        </div>
        <div
          className="User-repos User-lists"
          // hide or display this div depending on "showing" state
          style={{ display: `${showing === "repos" ? "block" : "none"}` }}
        >
          {/* Show repos after loading, or show message if no repos are found */}
          {repos.length > 0 ? (
            repos.map((i) => <Repo key={i.node_id} {...i} />)
          ) : loading === true ? (
            <p>
              <strong>Loading...</strong>
            </p>
          ) : (
            <p>No repos to show</p>
          )}
        </div>
        <div
          className="User-landing User-lists"
          // hide or display this div depending on "showing" state
          style={{ display: `${showing === "none" ? "block" : "none"}` }}
        >
          {/* Display this on initial load */}
          <p>Click "Show Repos" or "Show Followers" to see more.</p>
        </div>
        <div
          className="User-followers User-lists"
          // hide or display this div depending on "showing" state
          style={{ display: `${showing === "followers" ? "flex" : "none"}` }}
        >
          {/* Show followers after loading, or show message if no followers are found */}
          {followers.length > 0 ? (
            followers.map((i) => <Follower key={i.node_id} {...i} />)
          ) : loading ? (
            <p>
              <strong>Loading...</strong>
            </p>
          ) : (
            <p>No followers to show</p>
          )}
        </div>
      </div>
    </div>
  );
}
