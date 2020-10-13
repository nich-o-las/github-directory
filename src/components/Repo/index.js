import React from 'react';
import './style.scss';

export default function Repo(props){
  return(
    <div
      className="Repo"
    >
      <div className="Repo-link">
        <a 
          className="link"
          href={props.html_url}
          target="_blank"
          rel="noopener noreferrer"
        >
          {props.name}
        </a>
      </div>
      <div className="Repo-description">
        <p>{props.description}</p>
      </div> 
    </div>
  )
}