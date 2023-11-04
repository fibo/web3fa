import { Button, Buttons } from "trunx";
import { useAccount, useConnect } from "wagmi";

export function Connect() {
  const { isConnected } = useAccount();
  const { connect, connectors,  isLoading, pendingConnector } =
    useConnect();

  if (isConnected) return null;

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
