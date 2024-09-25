import MainContent from "../MainContent/MainContent";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Container from "react-bootstrap/Container";
import MainNav from "../Nav/Nav";
import { Route, Routes } from "react-router-dom";

function App() {
  return (
    <>
      <MainNav />
      <Routes>
        <Route path="/" element={<MainPage />} />
      </Routes>
    </>
  );
}

const MainPage = () => {
  return (
    <div className="App">
      <Container>
        <Row>
          <Col>
            <h4>What is Larry Games?</h4>
          </Col>
        </Row>

        <Row>
          <Col>
            <p>
              Host game nights easily with Larry Games, a group game bot with
              various unique games! Regular updates and improvements are being
              made.
            </p>
          </Col>
        </Row>
      </Container>
      <hr />
      <MainContent />
    </div>
  );
};

export default App;
