const dotenv = require("dotenv")

dotenv.config();

module.exports =  {
    PORT : process.env.PORT || 5000,
    MONGODB_URL : process.env.MONGODB_URL || "mongodb+srv://mnassar:nassar5050@tu-blogs.7sokl.mongodb.net/eshop?retryWrites=true&w=majority",
    JWT_SECRET : process.env.JWT_SECRET || "somthing secret"
}