import express from "express"
import cookieParser from "cookie-parser"
import cors from "cors"
import dotenv from "dotenv"
import {connectDB} from "./utils/db.js"
import userRoute from "./routes/user.route.js"
import companyRoute from "./routes/company.route.js"
import jobRoute from "./routes/job.route.js"
import applicationRoute from "./routes/application.route.js"
import  path from "path"


dotenv.config({})


import dns from "dns"

// This forces your Node app to use Google DNS regardless of your PC settings
dns.setServers(['8.8.8.8', '8.8.4.4']);



const app = express()
const __dirname=path.resolve()
//middleware
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(cookieParser())
const corsOptions = {
    origin:'https://find-job-backend-7cyd.onrender.com',
    credentials:true
}
app.use(cors(corsOptions))



const PORT = process.env.PORT || 3000


//apis
app.use("/api/v1/user",userRoute)
app.use("/api/v1/company",companyRoute)
app.use("/api/v1/job",jobRoute)
app.use("/api/v1/application",applicationRoute)

if (process.env.NODE_ENV === "production") {
    const frontendPath = path.resolve(__dirname, "../frontend/dist");
    app.use(express.static(frontendPath));
    
    // This is the most compatible way to handle SPA routing in Express 5
    app.use((req, res) => {
        res.sendFile(path.join(frontendPath, "index.html"));
    });
}
app.listen(PORT,()=>{
    connectDB()
    console.log(`Server running at port ${PORT}`)
})
