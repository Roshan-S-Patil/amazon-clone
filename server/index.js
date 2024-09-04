import express from "express"
import mongoose from "mongoose"
import bodyParser from "body-parser"
import cookieParser from "cookie-parser"
import cors from "cors"
import userRoute from "./routes/userRoute.js"
import productRoute from "./routes/productRoute.js"
import reviewRoute from "./routes/reviewRoute.js"
import orderRoute from "./routes/orderRoute.js"
import checkoutRoute from "./routes/checkoutRoute.js"
import path from "path"
import {dirname} from "path"
import { fileURLToPath } from "url"
import dotenv from "dotenv"
dotenv.config()
const app=express()
const PORT=process.env.PORT||8000
// app.listen(PORT,()=>{
//     console.log(`connection estabilished with server on port ${PORT}`)
// })

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
}).on('error', (err) => {
  if (err.code === 'EADDRINUSE') {
    console.log(`Port ${PORT} is already in use. Trying another port...`);
    app.listen(PORT + 1, () => {
      console.log(`Server running on port ${PORT + 1}`);
    });
  } else {
    console.error(err);
  }
});
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));
app.use(cookieParser())
// app.use(cors())
app.use(cors({
    origin: 'https://amazon-clone-murex-sigma.vercel.app/', // Replace with your client's origin
    methods: '*', // Allow specific methods
    allowedHeaders:'*', // Allow specific headers
    credentials: true, // Enable this if your frontend and backend are on different domains and you want to send cookies
  }))

app.use("/api/user",userRoute)
app.use("/api/products",productRoute)
app.use("/api/review",reviewRoute)
app.use("/api/order",orderRoute)
app.use("/api/checkout",checkoutRoute)
// ERROR HANDELLING MIDDLEWARE
app.use((err, req, res, next) => {
  console.error(err.stack); // Log the error stack trace for debugging
  res.status(500).json({ message: 'Internal Server Error', error: err.message });
});
// Serve static files from the React app
const _filename = fileURLToPath(import.meta.url);
const __dirname = dirname(_filename);
app.use(express.static(path.join(__dirname,'../client/build')));
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname,'..','client','build','index.html'));
  });

const uri=process.env.URI
mongoose.connect(uri).then(()=>console.log("connected with database"))
export default app