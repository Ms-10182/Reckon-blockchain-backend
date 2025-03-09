import express, { urlencoded } from 'express';
import cors from 'cors';

const app = express();

app.use(cors({
    credentials:true
}))

app.use(express.json({limit:"16kb"}));
app.use(urlencoded({ extended: true })); 
app.use(express.static("public"));

import UserRouter from './routes/user.routes.js';
import TransportRouter from './routes/transport.routes.js';
import adminRouter from './routes/admin.routes.js';

app.use("/api/v1/users",UserRouter);
app.use("/api/v1/transport",TransportRouter);
app.use("/api/v1/admin",adminRouter);

export {app}
