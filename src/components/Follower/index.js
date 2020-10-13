import React from 'react';
import './style.scss';
import { faGithub } from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function Follower(props){
  return(
    <div className="Follower">
      <a
        href={`https://github.com/${props.login}`}
        target="_blank"
        rel="noopener noreferrer"
        className="link"
      >
        <FontAwesomeIcon icon={faGithub} className="mr-1"/>
          {props.login}
        <FontAwesomeIcon icon={faGithub} className="ml-1"/>
      </a>
    </div>
  )
}