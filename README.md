# Web3FA

> Decentralized multi-factor authenticator app


This project was developed during [EthLisbon 2023](https://ethlisbon.org/) (3 - 5 November 2023)

By using blockchains as distributed storage for encrypted secrets, Web3FA allows you to access your multi-factor tokens from any device – just by connecting with your wallet.

<img width="2300" alt="Promo Banner" src="https://github.com/fibo/web3fa/assets/2742107/b1af362c-9152-4a07-bf16-f2f8cfe0e377">

## Demo

To run demo locally, install deps (only once): `npm install`.

Launch frontend: `npm run frontend`, then point your browser to http://localhost:8000

https://github.com/fibo/web3fa/assets/176730/155e82ad-105d-46f3-a2a2-342708b49e62

## Relevant code

Generates the 2FA _one time password_: [get2FA.js](./frontend/src/get2FA.js)

Symmetric encryption for 2FA secrets: [crypto.js](./frontend/src/crypto.js)

## References

[ERC-5630: New approach for encryption / decryption](https://eips.ethereum.org/EIPS/eip-5630)

### Flowchart

![Web3FA flowchart](https://github.com/fibo/web3fa/assets/2742107/664654ed-58c3-4c35-ab14-51359fcc52db)

### Contributors
[github.com/fibo](https://github.com/fibo)

[github.com/IreneBa26](https://github.com/IreneBa26)

[github.com/pyramus](https://github.com/pyramus)
