import { useState } from "react";
import axios from "axios";
import "./CropPredict.css";
import Swal from "sweetalert2";

const CropPredict = () => {
  const [formData, setFormData] = useState({
    N: "",
    P: "",
    K: "",
    temperature: "",
    humidity: "",
    ph: "",
    rainfall: "",
  });

  const [prediction, setPrediction] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://127.0.0.1:5000/", formData, {
        headers: { "Content-Type": "application/json" },
      });
      setPrediction(response.data.prediction);
    } catch (error) {
      console.error("Error making prediction:", error);
      Swal.fire("Error", "Failed to get prediction. Try again later.", "error");
    }
  };

  return (
    <div className="crop-container">
      <div className="crop-form-box">
        <h2>Crop Prediction Form 🌱</h2>
        <form onSubmit={handleSubmit}>
          <div className="crop-fields-container">
            {[
              { label: "Nitrogen (N)", name: "N", min: 15, max: 249 },
              { label: "Phosphorus (P)", name: "P", min: 5, max: 59 },
              { label: "Potassium (K)", name: "K", min: 5, max: 249 },
              { label: "Temperature (°C)", name: "temperature", min: 12, max: 42, step: 0.1 },
              { label: "Humidity (%)", name: "humidity", min: 20, max: 85, step: 0.1 },
              { label: "pH Level", name: "ph", min: 5.5, max: 8, step: 0.1 },
              { label: "Rainfall (mm)", name: "rainfall", min: 200, max: 2000, step: 0.1 },
            ].map((field) => (
              <div className="crop-input-group" key={field.name}>
                <label>{field.label} [Range: {field.min} - {field.max}]:</label>
                <input
                  type="number"
                  name={field.name}
                  min={field.min}
                  max={field.max}
                  step={field.step || 1}
                  value={formData[field.name]}
                  onChange={handleChange}
                  required
                />
              </div>
            ))}
          </div>

          <button type="submit" className="crop-submit-btn">Predict</button>
        </form>

        {prediction && (
          <div className="crop-prediction-box">
            <h3>Recommended Crop:</h3>
            <p style={{ fontSize: "20px" }}>{prediction}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default CropPredict;
