import express from 'express';
import path from 'path';

import authRoutes from "./routes/auth.routes.js"
import movieRoutes from "./routes/movie.routes.js"
import tvRoutes from "./routes/tv.routes.js"
import searchRoutes from "./routes/search.routes.js"

import { ENV_VAR } from './db/ENV_VARS.js';
import { connection } from './db/conn.js';
import { protectRoute } from './middleware/protectRoute.js';
import cookieParser from 'cookie-parser';
 
const app = express()
const PORT = ENV_VAR.PORT;
const __dirname = path.resolve();

app.use(express.json())
app.use(cookieParser())


app.use("/api/v1/auth",authRoutes);
app.use("/api/v1/movie",protectRoute, movieRoutes);
app.use("/api/v1/tv",protectRoute, tvRoutes);
app.use("/api/v1/search",protectRoute, searchRoutes);

if (ENV_VAR.NODE_ENV === "production") {
  const frontendPath = path.join(__dirname, "frontend/dist");


  app.use(express.static(frontendPath));

  
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(frontendPath, "index.html"));
  });
}



app.listen(PORT,()=>{
    console.log(`server started at: http://localhost:`+PORT);
    connection()
})
