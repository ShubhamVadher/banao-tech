const mongoose=require('mongoose')
const dns=require('dns')

// Use Google DNS - default DNS often fails to resolve MongoDB Atlas hostnames
dns.setServers(['8.8.8.8','8.8.4.4'])

const connection_string=process.env.DB_CONNECTION
mongoose.connect(connection_string)
module.exports=mongoose.connection;