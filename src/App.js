import React, { useEffect, useState } from "react";
import Chuck from "./chuck.png";
import axios from "axios";
function App() {
  const [state, setState] = useState({
    joke: "",
    searchKeyword: "",
    searchUrl: "https://api.chucknorris.io/jokes/search?query=",
  });

  useEffect(() => {
    fetchData();
    // eslint-disable-next-line
  }, []);

  const fetchData = async () => {
    const result = await axios.get("https://api.chucknorris.io/jokes/random");
    setState({
      ...state,
      joke: result.data.value,
    });
  };

  const searchJoke = (event) => {
    setState({
      ...state,
      searchKeyword: event.target.value,
    });
  };

  const fetchMyJoke = async () => {
    const result = await axios.get(state.searchUrl + state.searchKeyword);
    const jokePosition = Math.floor(Math.random() * result.data.result.length);

    setState({
      ...state,
      joke: result.data.result[jokePosition].value,
    });
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col-6">
          <h1 className="title">Chuck Norris API</h1>
          <img src={Chuck} alt="Chuck Norris" />
        </div>
        <div className="col-6 searchJokeCol">
          <div className="form__group field">
            <input
              type="input"
              className="form__field"
              placeholder="Search a word"
              name="search a word"
              id="name"
              required
              onChange={searchJoke}
            />
            <label for="name" className="form__label">
              Search a word
            </label>
          </div>
          <div>
            <button onClick={fetchMyJoke} className="btn btn-lg">
              Generate Joke
            </button>
          </div>
          <div className="chuckjokes">
            <h2 className="subTitle">Here is the joke</h2>
            <h4>{state.joke}</h4>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
