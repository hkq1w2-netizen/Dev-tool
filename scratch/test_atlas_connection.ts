import mongoose from "mongoose";

const uri = "mongodb+srv://hkq1w2_db_user:v2hyYAKzSBzidxm8@cluster0.33waw8c.mongodb.net/devtools?retryWrites=true&w=majority&appName=Cluster0";

async function testConnection() {
  console.log("Connecting to MongoDB Atlas Cluster0...");
  try {
    await mongoose.connect(uri, { serverSelectionTimeoutMS: 5000 });
    console.log("SUCCESS! Connected to MongoDB Atlas Cloud Database!");
    console.log("Database Name:", mongoose.connection.name);
    console.log("Host:", mongoose.connection.host);
    await mongoose.disconnect();
    console.log("Disconnected cleanly.");
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : String(err);
    console.error("MongoDB Atlas Connection Failed:", message);
  }
}

testConnection();
