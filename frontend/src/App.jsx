import { useCallback, useEffect, useState } from "react";
import {
  Button,
  Column,
  Columns,
  Container,
  Navbar,
  NavbarBrand,
  NavbarItem,
  Section,
} from "trunx";
import {  useAccount } from "wagmi";
import { Accounts } from "./components/Accounts.jsx";
import { AddAccount } from "./components/AddAccount.jsx";

import { Connect } from "./components/Connect.jsx";
import { MasterPassword } from "./components/MasterPassword.jsx";
import { decryptData, encryptData } from "./crypto.js";

export default function App() {
  const {isConnected } = useAccount();
  const [accounts, setAccounts] = useState([]);
  const [masterPassword, setMasterPassword] = useState("");
  const [showAddAccount, setShowAddAccount] = useState(false);
  const [showMasterPassword, setShowMasterPassword] = useState(true);

  const onClickAddNew = useCallback(() => {
    setShowAddAccount(true);
  }, []);

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
    <>
      <Navbar color="black">
        <NavbarBrand>
          <NavbarItem>Web3FA</NavbarItem>
        </NavbarBrand>
      </Navbar>

      <div className="page">
        <Container maxWidth="desktop">
          {isConnected && showMasterPassword && (
            <Section>
              <MasterPassword
                setMasterPassword={setMasterPassword}
                setShowMasterPassword={setShowMasterPassword}
              />
            </Section>
          )}

    {isConnected||(
          <Section>
            <Connect />
          </Section>
          )}

    {masterPassword && (
          <Section>
            <Accounts masterPassword={masterPassword} />
          </Section>
    )}

          {showAddAccount && (
            <Section>
              <AddAccount
                setAccounts={setAccounts}
                setShowAddAccount={setShowAddAccount}
              />
            </Section>
          )}

          {showMasterPassword || showAddAccount || (
            <Columns isMobile>
            <Column />

            <Column size='half' >
              <Button
                onClick={onClickAddNew}
                color="primary"
                isRounded
                className="is-fullwidth"
              >
                Add new
              </Button>
            </Column>

            <Column/>
            </Columns>
          )}
        </Container>
      </div>

      <footer className="footer">
        <b>Web3FA</b>
        <p>
          A decentralized solution to store and access your 2FA codes on-chain -
          private and secure
        </p>
      </footer>
    </>
  );
}
