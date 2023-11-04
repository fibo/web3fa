import { Columns } from "trunx";
import abi from "../abi.json";
import { contractAddress } from "../contractAddress.js";
import { Account } from "./Account.jsx";
import { useAccount, useContractRead } from "wagmi";

export function Accounts({ accounts }) {
  const {address: account } = useAccount();
  console.log('account',account)

  const { data, isError, isLoading } = useContractRead({
    address: account? contractAddress: undefined,
    abi,
    functionName: "read",
    args: [account],
    account
  });
  console.log(isError, isLoading, data);

  return (
    <Columns isMultiline>
      {accounts.map(({ name, secret, url }, i) => (
        <Account key={i} name={name} secret={secret} url={url} />
      ))}
    </Columns>
  );
}
