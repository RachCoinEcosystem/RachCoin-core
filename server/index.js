import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import helmet from 'helmet';
import morgan from 'morgan';
import homeRoutes from './routes/home.js';
import clientRoutes from './routes/client.js';
import generalRoutes from './routes/general.js';
import managementRoutes from './routes/management.js';
import salesRoutes from './routes/sales.js';

/* CONFIGURATION */
dotenv.config();
const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false}));
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: 'cross-origin' }));
app.use(morgan('common'));
app.use(cors());

/* ROUTES */
app.use("/", homeRoutes);
app.use("/client", clientRoutes);
app.use("/general", generalRoutes);
app.use("/management", managementRoutes);
app.use("/sales", salesRoutes);

/* ROUTES */
const PORT = process.env.PORT || 9000; // Use 9000 as default if PORT not set
const MONGO_URL = process.env.MONGO_URL;

// **Error Handling Function**
function handleError(error) {
  console.error('Error:', error);
  process.exit(1); // Exit with an error code if something goes wrong
}

// **Database Connection**
async function connectToDatabase() {
  try {
    await mongoose.connect(MONGO_URL);
    console.log('MongoDB connection established successfully.');
  } catch (error) {
    handleError(error);
  }
}

// **Server Startup Ensure database connection**
async function startServer() {
  try {
    await connectToDatabase();
    app.listen(PORT, () => {
      console.log(`Server listening on port: ${PORT}`);
    });
  } catch (error) {
    handleError(error);
  }
}

// **Start the Server**
startServer();
