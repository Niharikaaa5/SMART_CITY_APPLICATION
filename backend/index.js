const express = require("express");
// const { producer, initKafka } = require("./kafka");
//const { getAlerts } = require("./db")
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());


// API route to send Kafka message
app.post("/send", async (req, res) => {
  const { message } = req.body;

  try {
    await producer.send({
      topic: "test-topic",
      messages: [{ value: message }],
    });

    res.json({ status: "success", message: `Sent: ${message}` });
  } catch (err) {
    console.error("Error sending message:", err);
    res.status(500).json({ status: "error", error: err.message });
  }
});

app.get("/alerts", async (req, res) => {
  try {
    const alerts = [
  { alert_name: "Traffic Jam", sensor_id: "Traffic Sensor", location: "Downtown", priority: "High", coords: [77.5946, 12.9716] },
  { alert_name: "Power Outage", sensor_id: "Power Grid", location: "Suburbs", priority: "Medium", coords: [77.6, 12.95] },
  { alert_name: "Air Quality", sensor_id: "Air Sensor", location: "Industrial Zone", priority: "High", coords: [77.58, 12.99] },
  { alert_name: "Flooding", sensor_id: "Water Sensor", location: "Riverside", priority: "Critical", coords: [77.61, 12.965] },
  { alert_name: "Security Breach", sensor_id: "CCTV", location: "City Center", priority: "Critical", coords: [77.59, 12.97] }
];
    res.json(alerts);
  } 
  catch (err) {
    console.error("❌ Error fetching alerts:", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Start API + Kafka
const start = async () => {
//  await initKafka();

  app.listen(3000, () => {
    console.log("🚀 Server running on http://localhost:3000");
  });
};

start();
