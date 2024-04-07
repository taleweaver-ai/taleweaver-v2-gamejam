import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import CreateGameButton from "@/components/Button/CreateGameButton"
import ThemeButton from "@/components/Button/ThemeButton"
import NavBarBrand from "./NavBarBrand"
import SearchBar from "./SearchBar"

function NavBar() {
  return (
    <div className="navbar-container">
      <Navbar expand="lg" className="navbar bg-body-tertiary d-flex"
        style={{ backgroundColor: "inherit !important" }}>
        <NavBarBrand />

        {/* Toggle button for mobile devices */}
        <Navbar.Toggle aria-controls="navbarScroll" />

        <Navbar.Collapse id="navbarScroll">
          <Nav className="me-auto my-2 my-lg-0" style={{ maxHeight: '100px' }} navbarScroll />

          <SearchBar />

          <ThemeButton />

          <CreateGameButton />

        </Navbar.Collapse>
      </Navbar>
    </div>
  );
}

export default NavBar;
