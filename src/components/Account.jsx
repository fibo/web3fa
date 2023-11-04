import { Box, Column, Progress, Title } from "trunx";
import { get2FA } from "../get2FA.js";
import { useEffect, useState } from "react";

const computeNumSeconds = () => 30 - (Math.floor(Date.now() / 1000) % 30);

export function Account({ name, secret, url }) {
  const [oneTimePassword, setOneTimePassword] = useState("");
  const [numSeconds, setNumSeconds] = useState(computeNumSeconds());

  useEffect(() => {
    get2FA(secret).then(setOneTimePassword);
    const intervalId = setInterval(() => {
      const numSeconds = computeNumSeconds();
      if (numSeconds === 30) get2FA(secret).then(setOneTimePassword);
      setNumSeconds(numSeconds);
    }, 1000);
    return () => {
      clearInterval(intervalId);
    };
  }, [secret]);

  return (
    <Column size="one-third">
      <Box>
        <Title>{name}</Title>
        <p>{url}</p>
        <p>{oneTimePassword}</p>
        <Progress value={numSeconds} max={30} />
      </Box>
    </Column>
  );
}
