import { Box, Column, Flex, Image, Media, bulma } from "trunx";
import { get2FA } from "../get2FA.js";
import { useEffect, useState } from "react";

const computeNumSeconds = () => 30 - (Math.floor(Date.now() / 1000) % 30);

const counter = (numSeconds) => {
  return `${75 - 2.6 * numSeconds}px`;
};

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
      {/*
        <Progress size="small" value={numSeconds} max={30} />
      */}
      <Flex direction="row">
        <div>
          <img width="64" height="64" src="/64x64.png" />
        </div>
        <Flex direction="column" spacing={{ ml: 2 }}>
          <span className={bulma("is-size-5")}>{name}</span>
          <small className={bulma("has-text-grey")}>{url}</small>
          <Flex direction="row" alignItems="center">
            <div
              className={bulma(
                "has-text-primary",
                "has-text-weight-semibold",
                "mt-2",
                "mr-5",
                "is-size-4",
              )}
            >
              {oneTimePassword}
            </div>
            <div className="countdown">
              <svg>
                <circle
                  r="12"
                  cx="16"
                  cy="16"
                  strokeDashoffset={counter(numSeconds)}
                ></circle>
              </svg>
            </div>
          </Flex>
        </Flex>
      </Flex>
    </Column>
  );
}
