import ButtonGroup from "react-bootstrap/ButtonGroup";
import Button from "react-bootstrap/Button";
import { zeroPad } from "../../common-functions";
import { useQuery } from "react-query";

const getBotInfo = async () => {
  return await fetch("https://api.larrygames.au:8182/info")
    .then((response) => response.json())
    .then((data) => {
      return data;
    });
};

const BotStatus = () => {
  const { data: info, error } = useQuery("infoData", getBotInfo);

  if (error || !info) {
    console.error("Unable to load bot information.");
    return <></>;
  }

  const serverCount = info.guilds ? info.guilds : 0;
  const playerCount = info.players ? info.players : 0;
  const ping = info.bot_ping ? info.bot_ping : 0;

  const onlineDate = new Date(info.up_since);
  const onlineSinceNice = `${zeroPad(onlineDate.getDate(), 2, "0")}-${zeroPad(
    onlineDate.getMonth() + 1,
    2,
    "0"
  )}-${onlineDate.getFullYear()} ${zeroPad(
    onlineDate.getHours(),
    2,
    "0"
  )}:${zeroPad(onlineDate.getMinutes(), 2, "0")}:${zeroPad(
    onlineDate.getSeconds(),
    2,
    "0"
  )} `;

  return (
    <>
      <ButtonGroup size="sm">
        <Button variant="primary">Servers</Button>
        <Button variant="outline-primary">{serverCount}</Button>
      </ButtonGroup>{" "}
      <ButtonGroup size="sm">
        <Button variant="primary">Players</Button>
        <Button variant="outline-primary">{playerCount}</Button>
      </ButtonGroup>{" "}
      <ButtonGroup size="sm">
        <Button variant="primary">Online Since</Button>
        <Button variant="outline-primary">{onlineSinceNice}</Button>
      </ButtonGroup>{" "}
      <ButtonGroup size="sm">
        <Button variant="primary">Ping</Button>
        <Button variant="outline-primary">{ping}ms</Button>
      </ButtonGroup>
    </>
  );
};

export default BotStatus;
