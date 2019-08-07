import React from "react";
import { Button, Card, ListGroup, ListGroupItem } from "react-bootstrap";

class Upcoming extends React.Component {
  constructor() {
    super();
    this.state = {
      upcomingMovies: []
    };
  }
  componentDidMount = () => {
    this.getUpcomingMovies();
  };

  getUpcomingMovies = async () => {
    const API_KEY = "1ba877ea9b60eed18e4a44c2cf42fc99";
    const response = await fetch(
      `https://api.themoviedb.org/3/movie/upcoming?api_key=${API_KEY}`
    );
    const jsonData = await response.json();
    this.setState({
      upcomingMovies: jsonData.results
    });
  };

  renderMovies() {
    return this.state.upcomingMovies.map(
      ({ title, release_date, overview, poster_path, vote_average, id }) => {
        return (
          <div>
            <Card
              className="container"
              style={{
                width: "23rem",
                textAlign: "center",
                marginTop: 20,
                padding: 0
              }}
            >
              <Card.Img
                variant="top"
                style={{ height: 520 }}
                src={
                  poster_path
                    ? `https://image.tmdb.org/t/p/w500/${poster_path}`
                    : "img/not-available-coming-soon.jpg"
                }
              />
              <Card.Body>
                <Card.Title
                  style={{
                    minHeight: "3.5em",
                    fontSize: 25,
                    fontWeight: "bold"
                  }}
                >
                  {title}
                </Card.Title>

                <Card.Text style={{ overflowY: "scroll", height: "6em" }}>
                  {overview}
                </Card.Text>
              </Card.Body>
              <ListGroup className="list-group-flush">
                <ListGroupItem>Date of release: {release_date}</ListGroupItem>
                <ListGroupItem>Vote average: {vote_average} /10</ListGroupItem>
              </ListGroup>
              <Card.Body>
                <Button href={`trailer/${id}`} variant="outline-warning">
                  Watch Trailer
                </Button>
              </Card.Body>
            </Card>
          </div>
        );
      }
    );
  }

  render() {
    return (
      <div className="container">
        <h1 style={{ textAlign: "center", marginTop: 10 }}>UPCOMING</h1>
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            padding: "0",
            justifyContent: "space-around"
          }}
        >
          {this.renderMovies()}
        </div>
      </div>
    );
  }
}
export default Upcoming;
