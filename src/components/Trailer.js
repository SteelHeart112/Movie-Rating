import React from "react";
import YouTube from "@u-wave/react-youtube";

class Trailer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedMovieTrailer: null
    };
  }
  componentDidMount() {
    this.openModalTrailer(this.props.match.params.id);
  }
  openModalTrailer = async movieId => {
    const API_KEY = "1ba877ea9b60eed18e4a44c2cf42fc99";
    const response = await fetch(
      `https://api.themoviedb.org/3/movie/${movieId}/videos?api_key=${API_KEY}`
    );
    const jsonData = await response.json();
    const pickRandomTrailer =
      jsonData.results[Math.floor(Math.random() * jsonData.results.length)];
    if (pickRandomTrailer !== undefined) {
      this.setState({
        selectedMovieTrailer: pickRandomTrailer.key
      });
    }
  };

  render() {
    return (
      <div
        className="container"
        style={{ height: "75vh", marginTop: 35, padding: 0 }}
      >
        <YouTube
          height="100%"
          width="100%"
          video={this.state.selectedMovieTrailer}
          allowfullscreen
        />
      </div>
    );
  }
}
export default Trailer;
