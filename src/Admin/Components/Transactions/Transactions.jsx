import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";
import "../Transactions/Transactions.css";
import { getCurrenttoken } from "../../../Client/Components/LoginPage/LoginPage";

function Transactions() {
  const [transactions, setTransactions] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const token = getCurrenttoken();

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const response = await fetch(
          "http://localhost:5045/api/PesticidesTransaction",
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        if (!response.ok) {
          throw new Error("Failed to fetch pesticides transactions data");
        }
        const data = await response.json();
        setTransactions(data);
      } catch (error) {
        Swal.fire("Error", error.message, "error");
      }
    };

    fetchTransactions();
  }, []);

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const filteredTransactions = transactions.filter(
    (transaction) =>
      transaction.pesticidesName.toString().includes(searchQuery) ||
      transaction.buyerName.toString().includes(searchQuery)
  );

  return (
    <div className="container" style={{ width: "80vw" }}>
      <h1 className="transactions-heading">Pesticides Transactions</h1>
      <div className="container">
        <div className="row d-flex justify-content-center align-items-center">
          <div className="col-md-9 d-flex">
            <div className="search d-flex w-100">
              <i className="fa fa-search"></i>
              <input
                type="text"
                className="form-control"
                placeholder="Find transactions"
                value={searchQuery}
                onChange={handleSearchChange}
              />
              <button className="btn btn-primary ms-2">Search</button>
            </div>
          </div>
        </div>
      </div>

      <table className="table table-bordered custom-table">
        <thead className="table-header">
          <tr>
            <th scope="col">Transaction ID</th>
            <th scope="col">Buyer Name</th>
            <th scope="col">Pesticide Name</th>
            <th scope="col">Quantity Purchased</th>
            <th scope="col">Total Price</th>
            <th scope="col">Payment Method</th>
            <th scope="col">Payment Detail</th>
            <th scope="col">Purchase Date</th>
          </tr>
        </thead>
        <tbody>
          {filteredTransactions.length > 0 ? (
            filteredTransactions.map((transaction) => (
              <tr key={transaction.pesticidesTransactionID}>
                <td>{transaction.pesticidesTransactionID}</td>
                <td>{transaction.userName}</td>
                <td>{transaction.pesticidesName}</td>
                <td>{transaction.quantityPurchased}</td>
                <td>₹{transaction.totalPrice}</td>
                <td>{transaction.paymentMethod}</td>
                <td>{transaction.paymentDetail}</td>
                <td>
                  {new Date(transaction.purchaseDate).toLocaleString("en-IN", {
                    day: "numeric",
                    month: "short",
                    year: "numeric",
                    hour: "2-digit",
                    minute: "2-digit",
                    second: "2-digit",
                  })}
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="6" className="text-center">
                No transactions found.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

export default Transactions;
