import { useCallback, useEffect, useState } from "react";
import { Button } from "trunx";
import { useAccount, useNetwork, useSignMessage } from "wagmi";
import { SiweMessage } from "siwe";

const backendBaseUrl = "http://localhost:3000";

export function SignIn({ onSuccess }) {
  const [nonce, setNonce] = useState();

  const { address } = useAccount();
  const { chain } = useNetwork();
  const { signMessageAsync } = useSignMessage();

  const chainId = chain?.id;

  const fetchNonce = useCallback(async () => {
    try {
      const response = await fetch(`${backendBaseUrl}/nonce`);
      const nonce = await response.text();
      setNonce(nonce);
    } catch (error) {
      console.error(error);
    }
  }, []);

  const onClick = useCallback(async () => {
    try {
      if (!nonce) return;
      if (!chainId) return;

      const message = new SiweMessage({
        domain: window.location.host,
        address,
        statement: "Sign in with Ethereum to Web3FA.",
        uri: window.location.origin,
        version: "1",
        chainId,
        nonce,
      });
      const signature = await signMessageAsync({
        message: message.prepareMessage(),
      });

      // Verify signature
      const response = await fetch(`${backendBaseUrl}/verify`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ message, signature }),
      });
      if (!response.ok) throw new Error("Error verifying message");
      onSuccess({ address });
    } catch (error) {
      console.error(error);
    }
  }, [address, chainId, nonce, onSuccess, signMessageAsync]);

  useEffect(() => {
    fetchNonce();
  }, [fetchNonce]);

  return <Button onClick={onClick}>Sign-In with Ethereum</Button>;
}
