import React from "react";
import { Button, Navbar, Nav, Form, FormControl } from "react-bootstrap";

let text;
const NavBar = props => {
  const handleChange = e => {
    text = e.target.value;
  };

  return (
    <div>
      <Navbar className="container" bg="dark" variant="dark" sticky="top">
        <Navbar.Brand href="/">
          <img
            style={{ width: 40, height: 40 }}
            src="https://storage.googleapis.com/kaggle-organizations/1030/thumbnail.png%3Fr=355"
          />
        </Navbar.Brand>
        <Nav className="mr-auto">
          <Nav.Link href="/topRated">Top Rated</Nav.Link>
          <Nav.Link href="/upcoming">Upcoming</Nav.Link>
          <Nav.Link href="/popular">Popular</Nav.Link>
          <Nav.Link href="#pricing">Genre</Nav.Link>
        </Nav>
        <Form inline>
          <FormControl
            value={text}
            onChange={e => handleChange(e)}
            type="text"
            placeholder="Search"
            className="mr-sm-2"
          />
          <Button onClick={() => props.searchMovies(text)} variant="warning">
            Search
          </Button>
        </Form>
      </Navbar>
    </div>
  );
};

export default NavBar;
