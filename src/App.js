import React, { useState, useEffect } from "react";
import "./App.scss";
import InfiniteScroll from 'react-infinite-scroll-component';
import User from "./components/User";
import Header from './components/Header';
const { Octokit } = require("@octokit/rest");

function App() {
  const [page, setPage] = useState(0);
  const [users, setUsers] = useState([]);
  // const [isSearching, setIsSearching] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  // changes every time the search query has been stagnant for .500 milliseconds
  const debouncedSearchTerm = useDebounce(searchQuery, 500)

  // search users when you change search term / list all users if empty
  useEffect(()=>{
    if (debouncedSearchTerm !== '') {
      searchUsers();
    } else {
      setUsers([]);
      getUsers();
    }
  }, [debouncedSearchTerm]);

  // octokit is a library that helps you to interact with GitHub's API
  const octokit = new Octokit();

  // get initial 30 users
  const getUsers = async () => {
    const result = await octokit.users.list();
    setUsers([...result.data]);
  };

  // adds more users to the end of users array. Is called in the infinite scroll component.
  const getMoreUsers = async () => {
    //only add more users if search bar is empty
    if(!searchQuery){
      const result = await octokit.users.list({since: (users.length ? users[users.length -1].id : 0)});
      setUsers([...users, ...result.data]);
    }
  };

  // get a list of users whose name contains your search term
  const searchUsers = async () => {
    const result = await octokit.search.users({q : searchQuery, per_page: 30});
    setUsers([...result.data.items]);
  };

  // handles the search bar
  const handleChange = (e) => {
    e.preventDefault();
    setSearchQuery(e.target.value);
  };

  return (
    <div className="App">
      <Header 
        onChange={handleChange}
        searchQuery={searchQuery}
      />
      <InfiniteScroll
        className="Users-container"
        dataLength={users.length}
        next={getMoreUsers}
        hasMore={true}
      >
        {/* map over your users and pass their contents into User component as props */}
        {users.map(o => (
          <User key={o.node_id} {...o} />
        ))}
      </InfiniteScroll>
    </div>
  );
}

       
// Hook the allows search functionality without an actual submit button. 
// Only returns value after it has remained the same for the provided time interval. 
function useDebounce(value, delay) {
  // State and setters for debounced value
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(
    () => {
      // Update debounced value after delay
      const handler = setTimeout(() => {
        setDebouncedValue(value);
      }, delay);

      // Cancel the timeout if value changes (also on delay change or unmount)
      // This is how we prevent debounced value from updating if value is changed ...
      // .. within the delay period. Timeout gets cleared and restarted.
      return () => {
        clearTimeout(handler);
      };
    },
    [value, delay] // Only re-call effect if value or delay changes
  );

  return debouncedValue;
}

export default App;
