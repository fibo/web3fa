# Web3FA

> decentralized multi-factor authenticator app

By using blockchains as distributed storage for encrypted secrets, Web3FA allows you to access your multi-factor tokens from any device – just by connecting with your wallet.

<img width="2300" alt="Promo Banner" src="https://github.com/fibo/web3fa/assets/2742107/b1af362c-9152-4a07-bf16-f2f8cfe0e377">

## Demo

To run demo locally, install deps (only once): `npm install`.

Launch frontend: `npm run frontend`, then point your browser to http://localhost:8000

## Relevant code

Generates the 2FA _one time password_: [get2FA.js](./frontend/src/get2FA.js)
Symmetric encryption for 2FA secrets: [crypto.js](./frontend/src/crypto.js)

## References

[ERC-5630: New approach for encryption / decryption](https://eips.ethereum.org/EIPS/eip-5630)

### Flowchart

![Web3FA flowchart](https://github.com/fibo/web3fa/assets/2742107/664654ed-58c3-4c35-ab14-51359fcc52db)
