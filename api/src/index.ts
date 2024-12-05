// src/index.ts
import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import axios from "axios";
import cors from "cors";

dotenv.config();

const app: Express = express();
const PORT = process.env.PORT || 3000;

interface IssApiResponse {
  message: string;
  timestamp: number;
  iss_position: {
      latitude: string;
      longitude: string;
  };
}

app.use(cors());

app.get('/iss', async (req: Request, res: Response): Promise<void> => {
  try {
      // Fetch data from the ISS position API
      const response = await axios.get<IssApiResponse>('http://api.open-notify.org/iss-now.json');
      const { timestamp, iss_position } = response.data;

      // Respond with the ISS position
      res.json({
          message: "ISS position data retrieved successfully!",
          timestamp,
          latitude: iss_position.latitude,
          longitude: iss_position.longitude
      });
  } catch (error) {
      console.error("Error fetching ISS data:", error);
      res.status(500).json({ error: "Failed to fetch ISS position data" });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});