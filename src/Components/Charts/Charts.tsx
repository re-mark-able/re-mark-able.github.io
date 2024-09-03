import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Container from "react-bootstrap/Container";
import Tabs from "react-bootstrap/Tabs";
import Tab from "react-bootstrap/Tab";
import { useQuery } from "react-query";
import Table from "react-bootstrap/Table";

const getChartInfo = async () => {
  return await fetch("https://larry.larrygames.au:25565/charts")
    .then((response) => response.json())
    .then((data) => {
      return data.data;
    });
};

const getHelpInfo = async () => {
  return await fetch("https://larry.larrygames.au:25565/help")
    .then((response) => response.json())
    .then((data) => {
      return data.help;
    });
};

function Charts() {
  const { data: info, error } = useQuery("chartData", getChartInfo);
  const { data: help } = useQuery("helpData", getHelpInfo);
  if (error || !info) {
    console.error("Unable to load chart information.");

    return <>Cannot display this page.</>;
  } else {
    let outputRows: any = {};
    if (info.players.length < 1) {
      outputRows["players"] = (
        <tr>
          <td colSpan={3}>No data</td>
        </tr>
      );
    } else {
      outputRows["players"] = info.players.map((g: string, k: number) => {
        return (
          <tr>
            <td>{k + 1}</td>
            <td>{g[0]}</td>
            <td>{g[1]}</td>
          </tr>
        );
      });
    }
    if (info.hosts.length < 1) {
      outputRows["hosts"] = (
        <tr>
          <td colSpan={3}>No data</td>
        </tr>
      );
    } else {
      outputRows["hosts"] = info.hosts.map((g: string, k: number) => {
        return (
          <tr>
            <td>{k + 1}</td>
            <td>{g[0]}</td>
            <td>{g[1]}</td>
          </tr>
        );
      });
    }

    if (info.guilds.length < 1) {
      outputRows["guilds"] = (
        <tr>
          <td colSpan={3}>No data</td>
        </tr>
      );
    } else {
      outputRows["guilds"] = info.guilds.map((g: string, k: number) => {
        return (
          <tr>
            <td>{k + 1}</td>
            <td>{g[0]}</td>
            <td>{g[1]}</td>
          </tr>
        );
      });
    }
    if (info.games.length < 1) {
      outputRows["games"] = (
        <tr>
          <td colSpan={3}>No data</td>
        </tr>
      );
    } else {
      outputRows["games"] = info.games.map((g: string, k: number) => {
        return (
          <tr>
            <td>{k + 1}</td>
            <td>
              {help[g[0]] && help[g[0]].nicename ? help[g[0]].nicename : g[0]}
            </td>
            <td>{g[1]}</td>
          </tr>
        );
      });
    }
    return (
      <div className="Charts">
        <Container>
          <Row>
            <Col>
              <h2>Top Charts</h2>
            </Col>
          </Row>
          <Row>
            <Col>
              <Tabs
                defaultActiveKey="games"
                id="uncontrolled-tab-example"
                className="mb-3"
                fill
              >
                <Tab eventKey="games" title="Games">
                  <Table striped bordered hover>
                    <thead>
                      <tr>
                        <th>#</th>
                        <th>Game</th>
                        <th>Total</th>
                      </tr>
                    </thead>
                    <tbody>{outputRows.games}</tbody>
                    <caption>
                      <small>
                        Total <u>{outputRows.games.length}</u>
                      </small>
                    </caption>
                  </Table>
                </Tab>
                <Tab eventKey="hosts" title="Hosts">
                  <Table striped bordered hover>
                    <thead>
                      <tr>
                        <th>#</th>
                        <th>Host</th>
                        <th>Total</th>
                      </tr>
                    </thead>
                    <tbody>{outputRows.hosts}</tbody>
                    <caption>
                      <small>
                        Total <u>{outputRows.hosts.length}</u>
                      </small>
                    </caption>
                  </Table>
                </Tab>
                <Tab eventKey="servers" title="Servers">
                  <Table striped bordered hover>
                    <thead>
                      <tr>
                        <th>#</th>
                        <th>Server</th>
                        <th>Total</th>
                      </tr>
                    </thead>
                    <tbody>{outputRows.guilds}</tbody>
                    <caption>
                      <small>
                        Total <u>{outputRows.guilds.length}</u>
                      </small>
                    </caption>
                  </Table>
                </Tab>
                <Tab eventKey="players" title="Players">
                  <Table striped bordered hover>
                    <thead>
                      <tr>
                        <th>#</th>
                        <th>Player</th>
                        <th>Total</th>
                      </tr>
                    </thead>
                    <tbody>{outputRows.players}</tbody>
                    <caption>
                      <small>
                        Total <u>{outputRows.players.length}</u>
                      </small>
                    </caption>
                  </Table>
                </Tab>
              </Tabs>
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}

export default Charts;
