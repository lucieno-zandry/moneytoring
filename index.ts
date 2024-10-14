import { config } from "dotenv";
import express from "express";
import route from "./routes/api";
import cors from "cors";

config();

const app = express();
const port = process.env.APP_PORT || 8000;

app.use(express.json());
app.use(cors());
app.use(route);

app.listen(port, () => {
  console.log(`Server running on port: ${port}`);
});

export default app;
