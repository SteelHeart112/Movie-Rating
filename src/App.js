import React from "react";
import "./App.css";
import NavBar from "./components/Navbar";
import HomePage from "./components/HomePage";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Trailer from "./components/Trailer";
import TopRated from "./components/TopRated";
import Upcoming from "./components/Upcoming";
import Popular from "./components/Popular";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      movies: [],
      genres: [],
      allMovies: [],
      isOpen: false,
      pageNumber: 1,
      searchText: "",
      hasSearched: false,
      searchResults: []
    };
  }
  componentDidMount = () => {
    this.getMovieData();
  };
  getMovieData = async () => {
    const { pageNumber } = this.state;
    const API_KEY = "1ba877ea9b60eed18e4a44c2cf42fc99";
    const response = await fetch(
      `https://api.themoviedb.org/3/movie/now_playing?api_key=${API_KEY}&language=en-US&page=${pageNumber}`
    );
    const jsonData = await response.json();
    this.setState(
      {
        pageNumber: pageNumber + 1,
        movies: this.state.movies.concat(jsonData.results),
        allMovies: this.state.movies.concat(jsonData.results)
      },
      () => console.log("second state", this.state)
    );
  };
  searchMovies = async text => {
    // const { pageNumber, hasSearched, searchText } = this.state

    if (!this.state.hasSearched) this.state.pageNumber = 2;
    const API_KEY = "1ba877ea9b60eed18e4a44c2cf42fc99";
    const response = await fetch(
      `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=${text}&page=${this
        .state.pageNumber - 1}`
    );
    const jsonData = await response.json();
    console.log("FUIRE", jsonData);
    this.setState({
      movies: this.state.hasSearched
        ? this.state.movies.concat(jsonData.results)
        : jsonData.results,
      hasSearched: true,
      pageNumber: this.state.pageNumber + 1,
      searchText: text
    });
  };

  render() {
    console.log("seachtext", this.state.searchText);
    return (
      <div>
        <NavBar
          {...this.state}
          searchMovies={this.searchMovies}
          justToSetState={this.justToSetState}
        />
        <Router>
          <div>
            <Route
              exact
              path="/"
              component={props => {
                return <HomePage {...this.state} />;
              }}
            />
            <Route
              exact
              path="/trailer/:id"
              component={props => {
                return <Trailer {...props} {...this.state} />;
              }}
            />
            <Route
              exact
              path="/topRated"
              component={props => {
                return <TopRated {...props} />;
              }}
            />
            <Route
              exact
              path="/upcoming"
              component={props => {
                return <Upcoming {...props} />;
              }}
            />
            <Route
              exact
              path="/popular"
              component={props => {
                return <Popular {...props} />;
              }}
            />
          </div>
        </Router>
        {!this.state.hasSearched ? (
          <button onClick={() => this.getMovieData()}>GET MORE MOVIES!</button>
        ) : (
          <button onClick={() => this.searchMovies(this.state.searchText)}>
            GET MORE SEARCH!
          </button>
        )}
      </div>
    );
  }
}
export default App;
