import React, { useEffect, useState } from "react";
import { useStateContext } from "../context";
import { useLocation, useNavigate } from "react-router-dom";

const TransactionList = () => {
  const { state } = useLocation();
  const navigate = useNavigate();
  const [txns, setTxns] = useState([]);
  const { contract, address, getTxns } = useStateContext();

  useEffect(() => {
    if (!contract) return;
    (async () => {
      const txnRes = await getTxns(state.pId);
      setTxns(txnRes);
      console.log(txnRes);
    })();
  }, [contract, address]);

  const mapType = (typ) => typ === 0 ? "CREDIT" : "DEBIT"

  return (
    <table className="overflow-y-scroll text-white table-auto">
        <thead className="text-xl border-b-2 border-gray-300">
            <tr className="">
                <th  className="py-4">#</th>
                <th>Timestamp</th>
                <th>From</th>
                <th>To</th>
                <th>Amount</th>
                <th>Type</th>
            </tr>
        </thead>
        <tbody className="">
            {txns && (
                txns.map((tx, i) => (
                    <tr className="p-4">
                        <td className="p-4">{i+1}</td>
                        <td className="p-4">{tx.timestamp}</td>
                        <td className="p-4">{tx.from}</td>
                        <td className="p-4">{tx.to}</td>
                        <td className="p-4">{tx.amount} MATIC</td>
                        <td className="p-4">{mapType(tx.type)}</td>
                    </tr>
                ))
            )}
        </tbody>
        <tfoot className="w-full">
            <button type="button" onClick={() => navigate('/')} className="mt-4 font-bold text-center text-white">Back</button>
        </tfoot>
    </table>
  )
};

export default TransactionList;
