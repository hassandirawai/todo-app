import env from "dotenv"
import mongoose from "mongoose"

env.config({ path: "./.env"} )

const conn = mongoose.connect(process.env.MONGODB_URI)
export default mongoose.connection