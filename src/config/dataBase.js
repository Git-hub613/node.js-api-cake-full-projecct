import mongoose from 'mongoose';

const connectDB = async () =>{
    try {
        const result = await mongoose.connect(process.env.MONGODB_URL)

        console.log(`MONGODB connected successfully at ${result.connection.host}`)
    } catch (error) {
        console.log(`MONGODB connection failed: ${error.message}`);

        process.exit(1);
    }
}
export default connectDB;