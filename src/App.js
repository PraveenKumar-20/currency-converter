import logo from "./logo.svg";
import "./App.css";
import { useState, useEffect } from "react";

// https://api.frankfurter.app/latest?amount=100&from=EUR&to=USD

function App() {
  const [amount, setAmount] = useState(1);
  const [from, setFrom] = useState("USD");
  const [to, setTo] = useState("EUR");
  const [output, setOutput] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(
    function () {
      async function getCurrencyDetails() {
        setIsLoading(true);
        const res = await fetch(
          `https://api.frankfurter.app/latest?amount=${amount}&from=${from}&to=${to}`
        );
        const data = await res.json();
        console.log(data);
        // setOutput(Object.values(data.rates)[0]);
        setOutput(data.rates[to]);
        setIsLoading(false);
      }

      if (from === to) return setOutput(amount);
      getCurrencyDetails();
    },
    [amount, from, to]
  );

  function handleInputAmount(e) {
    setAmount(Number(e.target.value));
  }

  function handleFromInput(e) {
    setFrom(e.target.value);
  }

  function handleToInput(e) {
    setTo(e.target.value);
  }

  return (
    <div>
      <input
        type="text"
        value={amount}
        onChange={handleInputAmount}
        disabled={isLoading}
      />
      <select value={from} onChange={handleFromInput}>
        <option value="USD">USD</option>
        <option value="EUR">EUR</option>
        <option value="CAD">CAD</option>
        <option value="INR">INR</option>
      </select>
      <select value={to} onChange={handleToInput}>
        <option value="USD">USD</option>
        <option value="EUR">EUR</option>
        <option value="CAD">CAD</option>
        <option value="INR">INR</option>
      </select>
      <p>
        {output} {to}
      </p>
    </div>
  );
}

export default App;
