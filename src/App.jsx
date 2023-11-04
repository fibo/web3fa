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

function App() {
  const [accounts, setAccounts] = useState([]);
  const [masterPassword, setMasterPassword] = useState("");

  useEffect(() => {
    if (!masterPassword) return;
  }, [masterPassword]);

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

        <Section>
          <AddAccount setAccounts={setAccounts} />
        </Section>

        <Section>
          <Columns isMultiline>
            {accounts.map(({ name, secret }, i) => (
              <Account key={i} name={name} secret={secret} />
            ))}
          </Columns>
        </Section>
      </Container>
    </>
  );
}

export default App;
