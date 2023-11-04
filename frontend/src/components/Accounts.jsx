import { Columns } from "trunx";
import { useEffect, useState } from "react";
import abi from "../abi.json";
import { contractAddress } from "../contractAddress.js";
import { Account } from "./Account.jsx";
import { decryptData } from "../crypto.js";
import { useAccount, useContractRead } from "wagmi";

export function Accounts({masterPassword}) {
  const {address: account } = useAccount();
  const [accounts, setAccounts] = useState([])
  console.log('account',account)

  const { data, isError, isLoading } = useContractRead({
    address: account? contractAddress: undefined,
    abi,
    functionName: "read",
    args: [account],
    account
  });
  console.log(isError, isLoading, data);

  useEffect(() => {
    if (!masterPassword) return
    if (!data) return
    decryptData(data, masterPassword).then((decryptedData) => {
      try {
        setAccounts( JSON.parse(decryptedData))
      } catch (error) {
        console.error(error);
      }
    });
  }, [data, masterPassword])

  return (
    <Columns isMultiline>
      {accounts.map(({ name, secret, url }, i) => (
        <Account key={i} name={name} secret={secret} url={url} />
      ))}
    </Columns>
  );
}
