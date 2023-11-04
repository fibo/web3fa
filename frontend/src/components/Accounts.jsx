import { Columns } from "trunx";
import { Account } from "./components/Account.jsx";

export function Accounts ({accounts}) {
  return (
          <Columns isMultiline>
            {accounts.map(({ name, secret, url }, i) => (
              <Account key={i} name={name} secret={secret} url={url} />
            ))}
          </Columns>
  )
}
