import { useEffect, useState } from "react";
import {
  Container,
  Navbar,
  NavbarBrand,
  NavbarItem,
  Section,
} from "trunx";
import { WagmiConfig } from "wagmi";
import { Accounts } from "./components/Accounts.jsx";
import { AddAccount } from "./components/AddAccount.jsx";

import { Connect } from "./components/Connect.jsx";
import { MasterPassword } from "./components/MasterPassword.jsx";
import { decryptData, encryptData } from "./crypto.js";
import { config } from "./wagmi.js";

export default function App() {
  const [accounts, setAccounts] = useState([]);
  const [masterPassword, setMasterPassword] = useState("");

  useEffect(() => {
    if (!masterPassword) return;
    const encryptedAccounts = localStorage.getItem("accounts");
    if (!encryptedAccounts) return;
    decryptData(encryptedAccounts, masterPassword).then((decryptedData) => {
      try {
        setAccounts(JSON.parse(decryptedData));
      } catch (error) {
        console.error(error);
      }
    });
  }, [masterPassword]);

  useEffect(() => {
    if (!masterPassword) return;
    if (accounts.length === 0) return;
    encryptData(JSON.stringify(accounts), masterPassword).then(
      (encryptedData) => {
        localStorage.setItem("accounts", encryptedData);
      },
    );
  }, [accounts, masterPassword]);

  return (
    <WagmiConfig config={config}>
      <Navbar color="black">
        <NavbarBrand>
          <NavbarItem>Web3FA</NavbarItem>
        </NavbarBrand>
      </Navbar>

      <Container maxWidth="desktop">
        <Section>
          <MasterPassword setMasterPassword={setMasterPassword} />
        </Section>

        <Section>
          <Connect />
        </Section>

        <Section>
    <Accounts accounts={accounts} />
        </Section>

        {masterPassword && (
          <Section>
            <AddAccount setAccounts={setAccounts} />
          </Section>
        )}
      </Container>
    </WagmiConfig>
  );
}
