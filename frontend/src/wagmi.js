import { configureChains, createConfig } from "wagmi";
import { foundry, goerli, mainnet } from "wagmi/chains";
import { CoinbaseWalletConnector } from "wagmi/connectors/coinbaseWallet";
import { WalletConnectConnector } from "wagmi/connectors/walletConnect";
import { publicProvider } from "wagmi/providers/public";

const { chains, publicClient, webSocketPublicClient } = configureChains(
  [
    mainnet,
    ...(import.meta.env?.MODE === "development" ? [goerli, foundry] : []),
  ],
  [publicProvider()],
);

const zkEVM = {
  id: 1442,
  name: "Polygon zkEVM",
  rpcUrls: {
    public: [{http: 'rpc.public.zkevm-test.net'}]
  }
}

export const config = createConfig({
  autoConnect: true,
  connectors: [
    new CoinbaseWalletConnector({
      chains: [...chains,zkEVM],
      options: {
        appName: "Web3FA",
      },
    }),
    new WalletConnectConnector({
      chains,
      options: {
        projectId: "fcb2652ead1b7424112906ea52e95e31",
      },
    }),
  ],
  publicClient,
  webSocketPublicClient,
});
