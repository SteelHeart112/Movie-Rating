import React from "react";
import "./App.css";
import {
  Button,
  Card,
  Container,
  Row,
  Col,
  ListGroup,
  Navbar,
  Nav,
  Fade,
  Form,
  FormControl,
  Carousel
} from "react-bootstrap";
import moment from "moment";
import { RingLoader } from "react-spinners";
import InputRange from "react-input-range";
import "react-input-range/lib/css/index.css";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      movies: [],
      pageNo: 1,
      isLoading: true,
      year: { min: 1990, max: 2019 },
      sliderShown: false
    };
  }

  componentDidMount() {
    this.getLatestMoviesData(1);
  }

  getLatestMoviesData = async () => {
    const { pageNo } = this.state;
    const url = `https://api.themoviedb.org/3/discover/movie?api_key=58049738a0f581e94fda3c41ab528a79&page=${pageNo}`;

    try {
      let data = await fetch(url);
      let response = await data.json();

      this.setState({
        movies: this.state.movies.concat(response.results),
        allMovies: response.results,
        pageNo: pageNo + 1,
        isLoading: false
      });
    } catch (error) {
      alert(error);
    }
  };

  getNowPlayingData = async () => {
    const url = `https://api.themoviedb.org/3/movie/now_playing?api_key=58049738a0f581e94fda3c41ab528a79&page=1`;
    try {
      let data = await fetch(url);
      let response = await data.json();
      console.log(response.results);
      this.setState({
        movies: response.results,
        allMovies: response.results
      });
    } catch (error) {
      alert(error);
    }
  };

  sortByAZ = () => {
    function compare(a, b) {
      if (a.title < b.title) {
        return -1;
      }
      if (a.title > b.title) {
        return 1;
      }
      return 0;
    }

    const sortedMovies = this.state.allMovies.sort(compare);

    this.setState({
      movies: sortedMovies
    });
  };

  sortByRating = () => {
    function compare(a, b) {
      if (a.vote_average < b.vote_average) {
        return 1;
      }
      if (a.vote_average > b.vote_average) {
        return -1;
      }
      return 0;
    }

    const sortedMovies = this.state.allMovies.sort(compare);

    this.setState({
      movies: sortedMovies
    });
  };

  sortByVotes = () => {
    function compare(a, b) {
      if (a.vote_count < b.vote_count) {
        return 1;
      }
      if (a.vote_count > b.vote_count) {
        return -1;
      }
      return 0;
    }

    const sortedMovies = this.state.allMovies.sort(compare);

    this.setState({
      movies: sortedMovies
    });
  };

  getSearchByYear = () => {
    const results = this.state.allMovies.filter(movie => {
      if (
        parseInt(movie.release_date) >= this.state.year.min &&
        parseInt(movie.release_date) <= this.state.year.max + 1
      )
        return movie;
    });
    this.setState({ movies: results });
  };

  modifyImgUrl(path) {
    if (path === null)
      return "https://files.slack.com/files-pri/TG5NN1V8U-FK42LPB5E/noposter.jpg";
    return `https://image.tmdb.org/t/p/w500/${path}`;
  }

  renderMovies() {
    return this.state.movies.map(
      ({
        title,
        overview,
        vote_average,
        backdrop_path,
        release_date,
        vote_count
      }) => {
        return (
          <Col xs={12} md={6} lg={4}>
            <Card style={{ marginBottom: 10 }}>
              <Card.Img variant="top" src={this.modifyImgUrl(backdrop_path)} />
              <Card.Body>
                <Card.Title
                  className="over-flow"
                  style={{
                    textAlign: "center",
                    fontSize: 24,
                    height: "3.5rem"
                  }}
                >
                  {title}
                </Card.Title>
                <Card.Text style={{ textAlign: "center" }}>
                  <ListGroup variant="flush" style={{ color: "#040F16" }}>
                    <ListGroup.Item
                      className="over-flow"
                      style={{ height: "15rem" }}
                    >
                      {overview}
                    </ListGroup.Item>
                    <ListGroup.Item>
                      <b>Release Date:</b>{" "}
                      {moment(release_date).format("MMM Do YY")}
                    </ListGroup.Item>
                    <ListGroup.Item>
                      <b>Vote Count:</b> {vote_count}
                    </ListGroup.Item>
                    <ListGroup.Item className="text-center">
                      <label
                        className="btn text-white"
                        style={{ backgroundColor: "#0094C6" }}
                      >
                        Rating: {vote_average}
                      </label>
                    </ListGroup.Item>
                  </ListGroup>
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
        );
      }
    );
  }

  renderNavFilterYear() {
    const { sliderShown } = this.state;
    return (
      <>
        <Nav.Link
          className="text-white"
          onClick={() => this.setState({ sliderShown: !sliderShown })}
          aria-controls="year-fade"
          aria-expanded={sliderShown}
        >
          Filter By Years
        </Nav.Link>
      </>
    );
  }

  renderFilterYearFade() {
    return (
      <Fade
        in={this.state.sliderShown}
        className="w-25 mx-auto ml-lg-2 mt-lg-0 mt-2"
      >
        <div id="year-fade">
          <InputRange
            maxValue={2019}
            minValue={1990}
            value={this.state.year}
            onChange={year => this.setState({ year }, this.getSearchByYear)}
          />
        </div>
      </Fade>
    );
  }

  renderNavBar() {
    return (
      <Navbar
        collapseOnSelect
        expand="lg"
        fixed="top"
        style={{ backgroundColor: "white" }}
      >
        <Navbar.Brand href="#">
          <img
            alt="logo"
            src="https://pi.tedcdn.com/r/talkstar-assets.s3.amazonaws.com/production/playlists/playlist_508/tv_movie_icons_1200x627.jpg?quality=89&w=1200"
            width="90"
            height="50"
            className="d-inline-block align-top"
          />
        </Navbar.Brand>
        <Navbar.Toggle
          aria-controls="responsive-navbar-nav"
          className="nav-toggle"
        />
        <Navbar.Collapse
          id="responsive-navbar-nav"
          style={{ textAlign: "center" }}
        >
          <Nav>
            <Nav.Link className="text-black" onClick={this.getNowPlayingData}>
              Now Playing
            </Nav.Link>
            <Nav.Link className="text-black" onClick={this.sortByRating}>
              Highest Rating
            </Nav.Link>
            <Nav.Link className="text-black" onClick={this.sortByVotes}>
              Highest Votes
            </Nav.Link>
            <Nav.Link className="text-black" onClick={this.sortByAZ}>
              Movies A-Z
            </Nav.Link>
            {this.renderNavFilterYear()}
          </Nav>
          {this.renderFilterYearFade()}
          <Form
            inline
            onSubmit={this.handleSubmit}
            className="d-flex justify-content-center ml-auto mt-4 mt-lg-0"
          />
        </Navbar.Collapse>
      </Navbar>
    );
  }

  render() {
    if (this.state.isLoading) {
      return (
        <div
          className="d-flex justify-content-center align-items-center"
          style={{ height: "100vh" }}
        >
          <RingLoader color={"#36D7B7"} />
        </div>
      );
    }

    return (
      <div>
        {this.renderNavBar()}
        <Container style={{ marginTop: 90 }}>
          <Row>
            <Col xs={12} className="mt-4 mb-2">
              <h1 className="movie-selection">
                <span>Movie Selection</span>
              </h1>
            </Col>
          </Row>
          <Row className="d-flex justify-content-center">
            {this.renderMovies()}
          </Row>
          <Row>
            <Col className="d-flex justify-content-center">
              <Button
                block
                className="btn btn-more mb-5"
                onClick={this.getLatestMoviesData}
              >
                View More
              </Button>
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}

export default App;
