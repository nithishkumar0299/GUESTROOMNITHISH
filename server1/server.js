//server and mangodb connection establishment
const app = require('./app')
const dotenv = require('dotenv')
const connectDB = require('./config/database')

const path = require('path')

dotenv.config({path:path.join(__dirname,'config/config.env')});

connectDB();

app.listen(process.env.port,()=>{
    console.log(`listening on port ${process.env.port} in ${process.env.node_env}`);
})