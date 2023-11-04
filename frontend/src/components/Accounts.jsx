import { Columns } from "trunx";
import abi from "../abi.json";
import { contractAddress } from "../contractAddress.js";
import { Account } from "./Account.jsx";
import { useContractRead } from "wagmi";

export function Accounts({ accounts }) {
  const { data, isError, isLoading } = useContractRead({
    address: contractAddress,
    abi,
    functionName: "read",
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
