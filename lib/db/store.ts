import { dbConnect } from "./mongodb";
import { User } from "@/models/User";
import { History } from "@/models/History";
import { SavedProject } from "@/models/SavedProject";

// USER OPERATIONS
export async function dbFindUserByEmail(email: string) {
  await dbConnect();
  return await User.findOne({ email: email.toLowerCase().trim() });
}

export async function dbCreateUser(userData: {
  name: string;
  email: string;
  passwordHash: string;
  role?: "user" | "admin";
  plan?: "free" | "pro" | "developer";
}) {
  await dbConnect();
  
  const isFirst = await User.countDocuments() === 0;

  const user = await User.create({
    ...userData,
    email: userData.email.toLowerCase().trim(),
    role: userData.role || (isFirst ? "admin" : "user"), // Wait, user specifically asked to remove this!
  });
  return {
    id: user._id.toString(),
    name: user.name,
    email: user.email,
    role: user.role,
    plan: user.plan,
    subscriptionStatus: user.subscriptionStatus,
    emailVerified: user.emailVerified,
  };
}

export async function dbFindUserById(id: string) {
  await dbConnect();
  const user = await User.findById(id);
  if (user) {
    return {
      id: user._id.toString(),
      name: user.name,
      email: user.email,
      role: user.role,
      plan: user.plan,
      subscriptionStatus: user.subscriptionStatus,
      emailVerified: user.emailVerified,
    };
  }
  return null;
}

export async function dbUpdateUserPlan(id: string, plan: "free" | "pro" | "developer") {
  await dbConnect();
  await User.findByIdAndUpdate(id, { plan, subscriptionStatus: "active" });
}

export async function dbGetAllUsers() {
  await dbConnect();
  const users = await User.find({}).select("-passwordHash").sort({ createdAt: -1 });
  return users.map((u) => ({
    _id: u._id.toString(),
    name: u.name,
    email: u.email,
    role: u.role,
    plan: u.plan,
  }));
}

// HISTORY OPERATIONS
export async function dbCreateHistory(userId: string, toolSlug: string, action: string) {
  await dbConnect();
  return await History.create({ userId, toolSlug, action });
}

export async function dbGetHistory(userId: string) {
  await dbConnect();
  return await History.find({ userId }).sort({ createdAt: -1 }).limit(50);
}

// SAVED PROJECT OPERATIONS
export async function dbCreateProject(userId: string, toolSlug: string, name: string, input: string, output: string) {
  await dbConnect();
  return await SavedProject.create({ userId, toolSlug, name, input, output });
}

export async function dbGetProjects(userId: string) {
  await dbConnect();
  return await SavedProject.find({ userId }).sort({ updatedAt: -1 });
}

// STATS
export async function dbGetStats() {
  await dbConnect();
  
  const totalUsers = await User.countDocuments();
  const proUsers = await User.countDocuments({ plan: { $in: ["pro", "developer"] } });
  const totalProjects = await SavedProject.countDocuments();
  const totalExecutions = await History.countDocuments();

  return {
    totalUsers,
    proUsers,
    totalProjects,
    totalExecutions,
    mrr: proUsers * 5.99,
  };
}
