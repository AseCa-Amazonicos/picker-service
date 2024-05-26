import express from 'express';
import cors from 'cors';
import router from './router/Router';

const app = express();
const port = 3000;

// Define CORS options to restrict access
const corsOptions = {
    origin: 'http://localhost:63342', // Allow only this origin
    optionsSuccessStatus: 200 // Some legacy browsers choke on 204
};

// Use CORS middleware with specified options
app.use(cors(corsOptions));

app.use(express.json());
app.use('/api/picker', router);

const server = app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});

export default server;
