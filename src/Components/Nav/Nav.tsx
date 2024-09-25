import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDiscord, faPatreon } from "@fortawesome/free-brands-svg-icons";
import { faRobot, faCheckToSlot } from "@fortawesome/free-solid-svg-icons";
import DefaultValues from "../../defaultValues.json";

const MainNav = () => {
  return (
    <>
      <Navbar
        collapseOnSelect
        expand="lg"
        className="bg-body-tertiary"
        bg="primary"
        data-bs-theme="dark"
      >
        <Container>
          <Navbar.Brand href="/">
            <img
              alt=""
              src="/larry.png"
              width="30"
              height="30"
              className="d-inline-block align-top"
            />{" "}
            Larry Games
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link href="https://top.gg/bot/1026495225759277146/vote">
                <FontAwesomeIcon icon={faCheckToSlot} /> Vote
              </Nav.Link>
              <Nav.Link href="https://discord.gg/r9WZ4ywbEx">
                <FontAwesomeIcon icon={faDiscord} /> Support Server
              </Nav.Link>
              <Nav.Link href="https://patreon.com/larrytalbot">
                <FontAwesomeIcon icon={faPatreon} /> Sponsor
              </Nav.Link>
              <Nav.Link href={DefaultValues.InviteLink}>
                <FontAwesomeIcon icon={faRobot} /> Add to your server
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <Container></Container>
    </>
  );
};

export default MainNav;
