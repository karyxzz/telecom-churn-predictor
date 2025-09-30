from fastapi import FastAPI
from pydantic import BaseModel
from fastapi.middleware.cors import CORSMiddleware
import torch
import numpy as np
import joblib

# Load TorchScript model
model = torch.jit.load("weights/churn_ann.pt",
                       map_location=torch.device("cpu"))
model.eval()

# Load scaler used during training
scaler = joblib.load("weights/scaler.pkl")

# FastAPI app
app = FastAPI()

# Enable CORS (so React can call backend)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # allow all origins for now
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Input schema


class CustomerData(BaseModel):
    gender: str
    SeniorCitizen: int
    Partner: str
    Dependents: str
    tenure: float
    PhoneService: str
    MultipleLines: str
    InternetService: str
    OnlineSecurity: str
    OnlineBackup: str
    DeviceProtection: str
    TechSupport: str
    StreamingTV: str
    StreamingMovies: str
    Contract: str
    PaperlessBilling: str
    PaymentMethod: str
    MonthlyCharges: float
    TotalCharges: float

# Preprocessing (encoding + scaling)


def preprocess(data: CustomerData):
    features = [
        1 if data.gender == "Male" else 0,
        data.SeniorCitizen,
        1 if data.Partner == "Yes" else 0,
        1 if data.Dependents == "Yes" else 0,
        data.tenure,
        1 if data.PhoneService == "Yes" else 0,
        1 if data.MultipleLines == "Yes" else 0,
        1 if data.OnlineSecurity == "Yes" else 0,
        1 if data.OnlineBackup == "Yes" else 0,
        1 if data.DeviceProtection == "Yes" else 0,
        1 if data.TechSupport == "Yes" else 0,
        1 if data.StreamingTV == "Yes" else 0,
        1 if data.StreamingMovies == "Yes" else 0,
        1 if data.PaperlessBilling == "Yes" else 0,
        data.MonthlyCharges,
        data.TotalCharges,
        1 if data.InternetService == "DSL" else 0,
        1 if data.InternetService == "Fiber optic" else 0,
        1 if data.InternetService == "No" else 0,
        1 if data.Contract == "Month-to-month" else 0,
        1 if data.Contract == "One year" else 0,
        1 if data.Contract == "Two year" else 0,
        1 if data.PaymentMethod == "Bank transfer (automatic)" else 0,
        1 if data.PaymentMethod == "Credit card (automatic)" else 0,
        1 if data.PaymentMethod == "Electronic check" else 0,
        1 if data.PaymentMethod == "Mailed check" else 0,
    ]

    features = np.array(features, dtype=np.float32).reshape(1, -1)

    # Apply scaler to tenure, MonthlyCharges, TotalCharges (indices 4, 14, 15)
    features[:, [4, 14, 15]] = scaler.transform(features[:, [4, 14, 15]])

    return features

# Prediction endpoint


@app.post("/predict")
def predict(data: CustomerData):
    try:
        features = preprocess(data)
        inputs = torch.tensor(features, dtype=torch.float32)
        with torch.no_grad():
            outputs = model(inputs)
            prob = torch.sigmoid(outputs).item()
            prediction = "Churn" if prob > 0.5 else "No Churn"
        return {"churn_probability": prob, "prediction": prediction}
    except Exception as e:
        return {"error": str(e)}
