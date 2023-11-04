import { Button, Buttons } from "trunx";
import { useConnect } from "wagmi";

export function Connect() {
  const { connect, connectors, isLoading, pendingConnector } = useConnect();

  return (
    <Buttons>
      {connectors.map((connector) => (
        <Button
          key={connector.id}
          disabled={!connector.ready}
          onClick={() => connect({ connector })}
        >
          {connector.name} {!connector.ready && " (unsupported)"}
          {isLoading &&
            connector.id === pendingConnector?.id &&
            " (connecting)"}
        </Button>
      ))}
    </Buttons>
  );
}
