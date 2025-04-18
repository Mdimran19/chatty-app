// import mongoose from "mongoose";

// export const connectDB = async () => {
//     try {
//       await mongoose.connect(process.env.uri);
//       console.log('MongoDB Connected...');
//     } catch (err) {
//       console.error('MongoDB Connection Error:', err.message);
      
//     }
//   };
import mongoose from "mongoose";

export const connectDB = async () => {
  try {
    if (!process.env.uri) {
      throw new Error("MongoDB URI is missing in environment variables!");
    }

    await mongoose.connect(process.env.uri, {
      tlsAllowInvalidCertificates: true, // 🧪 Debug only
      tlsAllowInvalidHostnames: true,   // 🧪 Debug only
    });

    console.log("✅ MongoDB Connected...");
  } catch (err) {
    console.error("❌ MongoDB Connection Error:", err.message);
    console.error("📛 Full Error:", err);
  }
};
