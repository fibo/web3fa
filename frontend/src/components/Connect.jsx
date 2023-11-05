import { Button, Column, Columns, Flex } from "trunx";
import { useConnect } from "wagmi";

export function Connect() {
  const { connect, connectors, isLoading, pendingConnector } = useConnect();

  return (
    <>
      <Flex spacing={{ m: 5 }} justify="center">
        <p>Use any wallet to start</p>
      </Flex>

      <Columns isMobile>
        <Column />

        <Column size="half">
          {connectors.map((connector) => (
            <Button
              color="primary"
              className="has-text-weight-semibold is-fullwidth"
              key={connector.id}
              disabled={!connector.ready}
              onClick={() => connect({ connector })}
              isRounded
            >
              {/*connector.name*/} {"Sign in"}{" "}
              {!connector.ready && " (unsupported)"}
              {isLoading &&
                connector.id === pendingConnector?.id &&
                " (connecting)"}
            </Button>
          ))}
        </Column>

        <Column />
      </Columns>
    </>
  );
}
