import React, { useState, useEffect } from "react";
import api from "../api";

const Transactions = () => {
    const [transactions, setTransactions] = useState([]);
    const [amount, setAmount] = useState("");
    const [description, setDescription] = useState("");

    useEffect(() => {
        fetchTransactions();
    }, []);

    const fetchTransactions = async () => {
        try {
            const response = await api.get("/transaction");
            setTransactions(response.data);
        } catch (error) {
            console.error("Error fetching transactions", error);
        }
    };

    const createTransaction = async (e) => {
        e.preventDefault();
        try {
            const response = await api.post("/transaction", { amount, description });
            setTransactions([...transactions, response.data]);
            setAmount("");
            setDescription("");
        } catch (error) {
            console.error("Error creating transaction", error);
        }
    };

    return (
        <div>
            <h1>Transactions</h1>
            <form onSubmit={createTransaction}>
                <input
                    type="number"
                    placeholder="Amount"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                />
                <input
                    type="text"
                    placeholder="Description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                />
                <button type="submit">Add Transaction</button>
            </form>

            <ul>
                {transactions.map((tx) => (
                    <li key={tx.id}>
                        {tx.amount} - {tx.description} ({new Date(tx.date).toLocaleString()})
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Transactions;
