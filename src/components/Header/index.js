import React from 'react';
import './style.scss';
import { faGithubAlt } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";

export default function Header(props){
  return(
    <div
      className="Header"
    >
      <div className="Header-brand">
        <h1>
          <FontAwesomeIcon icon={faGithubAlt} className="mr-1"/>
          GitHub Directory
          <FontAwesomeIcon icon={faGithubAlt} className="ml-1"/>
        </h1>
        <p>by {' '}
          <a 
            href='https://nich-o-las.github.io'
            rel='noopener noreferrer'
            target="_blank"
            className="link"
          >
            Nick Cox
          </a>
        </p>
      </div>

      <div
        className="Header-search-container"
      >
        <input 
          className="Header-searchbar" 
          value={props.searchQuery}
          onChange={props.onChange}
          placeholder="search users"
        />
      <FontAwesomeIcon icon={faSearch} className="Header-search-icon"/>
      </div>
    </div>
  )
}