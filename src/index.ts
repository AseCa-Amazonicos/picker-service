import express from "express";
import router from "./router/Router";


const app = express();
const port = 3000;

app.use(express.json());
app.use("/api/picker", router);

const server = app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});

export default server;
