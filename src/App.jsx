import { useEffect, useState } from "react";
import {
  Columns,
  Container,
  Navbar,
  NavbarBrand,
  NavbarItem,
  Section,
} from "trunx";
import { Account } from "./components/Account.jsx";
import { AddAccount } from "./components/AddAccount.jsx";
import { MasterPassword } from "./components/MasterPassword.jsx";
import { decryptData, encryptData } from "./crypto.js";

function App() {
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
  }, [accounts]);

  return (
    <>
      <Navbar color="black">
        <NavbarBrand>
          <NavbarItem>Web3FA</NavbarItem>
        </NavbarBrand>
      </Navbar>

      <Container maxWidth="desktop">
        <Section>
          <MasterPassword setMasterPassword={setMasterPassword} />
        </Section>

        {masterPassword && (
          <Section>
            <AddAccount setAccounts={setAccounts} />
          </Section>
        )}

        <Section>
          <Columns isMultiline>
            {accounts.map(({ name, secret, url }, i) => (
              <Account key={i} name={name} secret={secret} url={url} />
            ))}
          </Columns>
        </Section>
      </Container>
    </>
  );
}

export default App;
