import { useState } from "react";
import { Navbar, Nav, Form, Button, NavDropdown } from "react-bootstrap";
import Link from "next/link";
import { useRouter } from "next/router";
import { useAtom } from "jotai";
import { searchHistoryAtom } from "@/store"; 
import { addToHistory } from "@/lib/userData";


export default function MainNav() {
  const [isExpanded, setIsExpanded] = useState(false);
  const router = useRouter();
  const [searchHistory, setSearchHistory] = useAtom(searchHistoryAtom);

  const handleSearchSubmit = async (e) => {
    e.preventDefault();
    const query = e.target.elements.search.value;
    if (query) {
      const queryString = `title=true&q=${query}`;
      setSearchHistory(await addToHistory(queryString));

      router.push(`/artwork?${queryString}`);
      setIsExpanded(false);
    }
  };

  const toggleNavbar = () => {
    setIsExpanded(!isExpanded);
  };

  const closeNavbar = () => {
    setIsExpanded(false);
  };

  return (
    <Navbar
      style={{ backgroundColor: "#343a40", color: "#ffffff" }}
      expand="lg"
      expanded={isExpanded}
      className="px-5"
    >
      <Navbar.Brand as={Link} href="/" style={{ color: "#ffffff" }}>
        Ahnaf Abrar Khan
      </Navbar.Brand>
      <Navbar.Toggle onClick={toggleNavbar} style={{ borderColor: "#ffffff" }} />
      <Navbar.Collapse>
        <Nav className="me-auto">
          <Nav.Link
            as={Link}
            href="/"
            onClick={closeNavbar}
            active={router.pathname === "/"}
            style={{ color: router.pathname === "/" ? "#17a2b8" : "#ffffff" }}
          >
            Home
          </Nav.Link>
          <Nav.Link
            as={Link}
            href="/search"
            onClick={closeNavbar}
            active={router.pathname === "/search"}
            style={{ color: router.pathname === "/search" ? "#17a2b8" : "#ffffff" }}
          >
            Advanced Search
          </Nav.Link>
        </Nav>

        <Nav>
          <NavDropdown
            title={<span style={{ color: "#ffffff" }}>User Name</span>}
            id="user-dropdown"
            active={router.pathname === "/favourites" || router.pathname === "/history"}
          >
            <NavDropdown.Item
              as={Link}
              href="/favourites"
              onClick={closeNavbar}
              active={router.pathname === "/favourites"}
              style={{ color: router.pathname === "/favourites" ? "#17a2b8" : "#343a40" }}
            >
              Favourites
            </NavDropdown.Item>
            <NavDropdown.Item
              as={Link}
              href="/history"
              onClick={closeNavbar}
              active={router.pathname === "/history"}
              style={{ color: router.pathname === "/history" ? "#17a2b8" : "#343a40" }}
            >
              Search History
            </NavDropdown.Item>
          </NavDropdown>
        </Nav>

        &nbsp;
        <Form className="d-flex" onSubmit={handleSearchSubmit}>
          <Form.Control
            type="text"
            placeholder="Search"
            name="search"
            className="me-2"
            style={{ backgroundColor: "#ffffff", color: "#17a2b8", borderColor: "#ffffff" }}
          />
          <Button type="submit" variant="outline-light">
            Search
          </Button>
        </Form>
        &nbsp;
      </Navbar.Collapse>
    </Navbar>
  );
}
