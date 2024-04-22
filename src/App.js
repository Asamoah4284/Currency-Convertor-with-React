// `https://api.frankfurter.app/latest?amount=100&from=EUR&to=USD`

import { useEffect, useState } from "react";

export default function App() {
  const [amount, setAmount] = useState("0");
  const [change, setChange] = useState("");
  const [fromCur, setFromCurrency] = useState("EUR");
  const [toCur, setToCurrency] = useState("USD");
  const [loading, setIsLoading] = useState(true);
  useEffect(
    function () {
      async function FetchDta() {
        setIsLoading(true);
        const res = await fetch(
          `https://api.frankfurter.app/latest?amount=${amount}&from=${fromCur}&to=${toCur}`
        );
        const data = await res.json();
        setChange(data.rates[toCur]);
        if (!res.ok) throw new Error("No internet connection");
        console.error("No internet Connection");
      }
      if (fromCur === toCur) return setChange(amount);
      FetchDta();
    },
    [amount, fromCur, toCur]
  );
  function handleChange(e) {
    setAmount(Number(e.target.value));
  }
  return (
    <div className="main">
      <div className="center">
        <h2>Currency Convertor</h2>
        <input type="text" onChange={handleChange} />
        <select
          value={fromCur}
          onChange={(e) => setFromCurrency(e.target.value)}
        >
          <option value="USD">USD</option>
          <option value="EUR">EUR</option>
          <option value="CAD">CAD</option>
          <option value="INR">INR</option>
        </select>
        <select value={toCur} onChange={(e) => setToCurrency(e.target.value)}>
          <option value="USD">USD</option>
          <option value="EUR">EUR</option>
          <option value="CAD">CAD</option>
          <option value="INR">INR</option>
        </select>
        <p>
          {change} {toCur}
        </p>
      </div>
    </div>
  );
}
