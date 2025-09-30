import React, { useState } from "react";
import "./App.css";

function App() {
  const [form, setForm] = useState({
    gender: "Male",
    SeniorCitizen: 1,
    Partner: "Yes",
    Dependents: "No",
    tenure: 43,
    PhoneService: "Yes",
    MultipleLines: "Yes",
    InternetService: "Fiber optic",
    OnlineSecurity: "No",
    OnlineBackup: "Yes",
    DeviceProtection: "Yes",
    TechSupport: "No",
    StreamingTV: "Yes",
    StreamingMovies: "Yes",
    Contract: "Month-to-month",
    PaperlessBilling: "Yes",
    PaymentMethod: "Electronic check",
    MonthlyCharges: 103,
    TotalCharges: 4414.3,
  });

  const [prediction, setPrediction] = useState(null);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setPrediction(null);

    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/predict`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const result = await response.json();
      setPrediction(result);
    } catch (err) {
      console.error("Error:", err);
      setError("Failed to fetch prediction. Check backend logs.");
    }
  };

  return (
    <div>
      {/* Hero Section */}
      <div className="hero">
        <h1>Telecom Churn Predictor</h1>
        <p>Enter customer details to predict churn risk.</p>
      </div>

      {/* Main Container */}
      <div className="container">
        <form onSubmit={handleSubmit} className="form-grid">
          {/* All form inputs here (unchanged) */}
          <div>
            <label>Gender</label>
            <select name="gender" value={form.gender} onChange={handleChange}>
              <option>Female</option>
              <option>Male</option>
            </select>
          </div>

          <div>
            <label>Senior Citizen</label>
            <select
              name="SeniorCitizen"
              value={form.SeniorCitizen}
              onChange={handleChange}
            >
              <option value={0}>No</option>
              <option value={1}>Yes</option>
            </select>
          </div>

          <div>
            <label>Partner</label>
            <select name="Partner" value={form.Partner} onChange={handleChange}>
              <option>Yes</option>
              <option>No</option>
            </select>
          </div>

          <div>
            <label>Dependents</label>
            <select
              name="Dependents"
              value={form.Dependents}
              onChange={handleChange}
            >
              <option>No</option>
              <option>Yes</option>
            </select>
          </div>

          <div>
            <label>Tenure</label>
            <input
              type="number"
              name="tenure"
              value={form.tenure}
              onChange={handleChange}
            />
          </div>

          <div>
            <label>Phone Service</label>
            <select
              name="PhoneService"
              value={form.PhoneService}
              onChange={handleChange}
            >
              <option>Yes</option>
              <option>No</option>
            </select>
          </div>

          <div>
            <label>Multiple Lines</label>
            <select
              name="MultipleLines"
              value={form.MultipleLines}
              onChange={handleChange}
            >
              <option>No</option>
              <option>Yes</option>
              <option>No phone service</option>
            </select>
          </div>

          <div>
            <label>Internet Service</label>
            <select
              name="InternetService"
              value={form.InternetService}
              onChange={handleChange}
            >
              <option>DSL</option>
              <option>Fiber optic</option>
              <option>No</option>
            </select>
          </div>

          <div>
            <label>Online Security</label>
            <select
              name="OnlineSecurity"
              value={form.OnlineSecurity}
              onChange={handleChange}
            >
              <option>No</option>
              <option>Yes</option>
              <option>No internet service</option>
            </select>
          </div>

          <div>
            <label>Online Backup</label>
            <select
              name="OnlineBackup"
              value={form.OnlineBackup}
              onChange={handleChange}
            >
              <option>No</option>
              <option>Yes</option>
              <option>No internet service</option>
            </select>
          </div>

          <div>
            <label>Device Protection</label>
            <select
              name="DeviceProtection"
              value={form.DeviceProtection}
              onChange={handleChange}
            >
              <option>No</option>
              <option>Yes</option>
              <option>No internet service</option>
            </select>
          </div>

          <div>
            <label>Tech Support</label>
            <select
              name="TechSupport"
              value={form.TechSupport}
              onChange={handleChange}
            >
              <option>No</option>
              <option>Yes</option>
              <option>No internet service</option>
            </select>
          </div>

          <div>
            <label>Streaming TV</label>
            <select
              name="StreamingTV"
              value={form.StreamingTV}
              onChange={handleChange}
            >
              <option>No</option>
              <option>Yes</option>
              <option>No internet service</option>
            </select>
          </div>

          <div>
            <label>Streaming Movies</label>
            <select
              name="StreamingMovies"
              value={form.StreamingMovies}
              onChange={handleChange}
            >
              <option>No</option>
              <option>Yes</option>
              <option>No internet service</option>
            </select>
          </div>

          <div>
            <label>Contract</label>
            <select
              name="Contract"
              value={form.Contract}
              onChange={handleChange}
            >
              <option>Month-to-month</option>
              <option>One year</option>
              <option>Two year</option>
            </select>
          </div>

          <div>
            <label>Paperless Billing</label>
            <select
              name="PaperlessBilling"
              value={form.PaperlessBilling}
              onChange={handleChange}
            >
              <option>Yes</option>
              <option>No</option>
            </select>
          </div>

          <div>
            <label>Payment Method</label>
            <select
              name="PaymentMethod"
              value={form.PaymentMethod}
              onChange={handleChange}
            >
              <option>Electronic check</option>
              <option>Mailed check</option>
              <option>Bank transfer (automatic)</option>
              <option>Credit card (automatic)</option>
            </select>
          </div>

          <div>
            <label>Monthly Charges</label>
            <input
              type="number"
              step="0.01"
              name="MonthlyCharges"
              value={form.MonthlyCharges}
              onChange={handleChange}
            />
          </div>

          <div>
            <label>Total Charges</label>
            <input
              type="number"
              step="0.01"
              name="TotalCharges"
              value={form.TotalCharges}
              onChange={handleChange}
            />
          </div>
        </form>

        {/* Predict Button */}
        <div className="button-section">
          <button onClick={handleSubmit}>Predict</button>
        </div>

        {/* Prediction Result */}
        {prediction && (
          <div className="result">
            <h3>Prediction Result</h3>
            <p>
              <b>Churn Probability:</b>{" "}
              {(prediction.churn_probability * 100).toFixed(2)}%
            </p>
            <p>
              <b>Prediction:</b> {prediction.prediction}
            </p>
          </div>
        )}

        {error && (
          <div className="result error">
            <p>{error}</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
