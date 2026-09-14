import { dbConnect } from "./mongodb";
import { User, IUser } from "@/models/User";
import { History, IHistory } from "@/models/History";
import { SavedProject, ISavedProject } from "@/models/SavedProject";
import { Subscription, ISubscription } from "@/models/Subscription";
import { hashPassword, comparePassword } from "@/lib/auth/jwt";

// In-Memory Fallback Store when MongoDB is not running locally
interface MemoryUser {
  _id: string;
  name: string;
  email: string;
  passwordHash: string;
  emailVerified: boolean;
  role: "user" | "admin";
  plan: "free" | "pro" | "developer";
  subscriptionStatus: "active" | "canceled" | "past_due" | "trialing" | "none";
  createdAt: Date;
  updatedAt: Date;
}

interface MemoryHistory {
  _id: string;
  userId: string;
  toolSlug: string;
  action: string;
  createdAt: Date;
}

interface MemoryProject {
  _id: string;
  userId: string;
  toolSlug: string;
  name: string;
  input: string;
  output: string;
  createdAt: Date;
  updatedAt: Date;
}

interface MemorySubscription {
  _id: string;
  userId: string;
  provider: string;
  plan: "free" | "pro" | "developer";
  status: "active" | "canceled" | "past_due" | "trialing" | "none";
  createdAt: Date;
  updatedAt: Date;
}

// Global memory cache across hot reloads
declare global {
  // eslint-disable-next-line no-var
  var memoryStore: {
    users: MemoryUser[];
    history: MemoryHistory[];
    projects: MemoryProject[];
    subscriptions: MemorySubscription[];
  } | undefined;
}

if (!global.memoryStore) {
  global.memoryStore = {
    users: [],
    history: [],
    projects: [],
    subscriptions: [],
  };
}

const mem = global.memoryStore;

// USER OPERATIONS
export async function dbFindUserByEmail(email: string) {
  const conn = await dbConnect();
  if (conn) {
    try {
      return await User.findOne({ email: email.toLowerCase().trim() });
    } catch {
      // Fallback if Mongo operation fails
    }
  }
  const found = mem.users.find((u) => u.email === email.toLowerCase().trim());
  return found || null;
}

export async function dbCreateUser(userData: {
  name: string;
  email: string;
  passwordHash: string;
  role?: "user" | "admin";
  plan?: "free" | "pro" | "developer";
}) {
  const conn = await dbConnect();
  if (conn) {
    try {
      const user = await User.create({
        ...userData,
        email: userData.email.toLowerCase().trim(),
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
    } catch {
      // Fallback to memory
    }
  }

  const isFirst = mem.users.length === 0;
  const newMemUser: MemoryUser = {
    _id: "mem_user_" + Date.now() + "_" + Math.random().toString(36).substr(2, 5),
    name: userData.name,
    email: userData.email.toLowerCase().trim(),
    passwordHash: userData.passwordHash,
    emailVerified: true,
    role: userData.role || (isFirst ? "admin" : "user"),
    plan: userData.plan || "free",
    subscriptionStatus: "none",
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  mem.users.push(newMemUser);

  return {
    id: newMemUser._id,
    name: newMemUser.name,
    email: newMemUser.email,
    role: newMemUser.role,
    plan: newMemUser.plan,
    subscriptionStatus: newMemUser.subscriptionStatus,
    emailVerified: newMemUser.emailVerified,
  };
}

export async function dbFindUserById(id: string) {
  const conn = await dbConnect();
  if (conn) {
    try {
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
    } catch {
      // Fallback
    }
  }

  const found = mem.users.find((u) => u._id === id);
  if (!found) return null;
  return {
    id: found._id,
    name: found.name,
    email: found.email,
    role: found.role,
    plan: found.plan,
    subscriptionStatus: found.subscriptionStatus,
    emailVerified: found.emailVerified,
  };
}

export async function dbUpdateUserPlan(id: string, plan: "free" | "pro" | "developer") {
  const conn = await dbConnect();
  if (conn) {
    try {
      await User.findByIdAndUpdate(id, { plan, subscriptionStatus: "active" });
    } catch {
      // Fallback
    }
  }
  const user = mem.users.find((u) => u._id === id);
  if (user) {
    user.plan = plan;
    user.subscriptionStatus = "active";
    user.updatedAt = new Date();
  }
}

export async function dbGetAllUsers() {
  const conn = await dbConnect();
  if (conn) {
    try {
      const users = await User.find({}).select("-passwordHash").sort({ createdAt: -1 });
      return users.map((u) => ({
        _id: u._id.toString(),
        name: u.name,
        email: u.email,
        role: u.role,
        plan: u.plan,
      }));
    } catch {
      // Fallback
    }
  }
  return mem.users.map((u) => ({
    _id: u._id,
    name: u.name,
    email: u.email,
    role: u.role,
    plan: u.plan,
  }));
}

// HISTORY OPERATIONS
export async function dbCreateHistory(userId: string, toolSlug: string, action: string) {
  const conn = await dbConnect();
  if (conn) {
    try {
      return await History.create({ userId, toolSlug, action });
    } catch {
      // Fallback
    }
  }
  const item: MemoryHistory = {
    _id: "mem_hist_" + Date.now(),
    userId,
    toolSlug,
    action,
    createdAt: new Date(),
  };
  mem.history.unshift(item);
  return item;
}

export async function dbGetHistory(userId: string) {
  const conn = await dbConnect();
  if (conn) {
    try {
      return await History.find({ userId }).sort({ createdAt: -1 }).limit(50);
    } catch {
      // Fallback
    }
  }
  return mem.history.filter((h) => h.userId === userId);
}

// SAVED PROJECT OPERATIONS
export async function dbCreateProject(userId: string, toolSlug: string, name: string, input: string, output: string) {
  const conn = await dbConnect();
  if (conn) {
    try {
      return await SavedProject.create({ userId, toolSlug, name, input, output });
    } catch {
      // Fallback
    }
  }
  const proj: MemoryProject = {
    _id: "mem_proj_" + Date.now(),
    userId,
    toolSlug,
    name,
    input,
    output,
    createdAt: new Date(),
    updatedAt: new Date(),
  };
  mem.projects.unshift(proj);
  return proj;
}

export async function dbGetProjects(userId: string) {
  const conn = await dbConnect();
  if (conn) {
    try {
      return await SavedProject.find({ userId }).sort({ updatedAt: -1 });
    } catch {
      // Fallback
    }
  }
  return mem.projects.filter((p) => p.userId === userId);
}

// STATS
export async function dbGetStats() {
  const conn = await dbConnect();
  let totalUsers = mem.users.length;
  let proUsers = mem.users.filter((u) => u.plan !== "free").length;
  let totalProjects = mem.projects.length;
  let totalExecutions = mem.history.length;

  if (conn) {
    try {
      totalUsers = await User.countDocuments();
      proUsers = await User.countDocuments({ plan: { $in: ["pro", "developer"] } });
      totalProjects = await SavedProject.countDocuments();
      totalExecutions = await History.countDocuments();
    } catch {
      // Fallback to memory numbers
    }
  }

  return {
    totalUsers,
    proUsers,
    totalProjects,
    totalExecutions,
    mrr: proUsers * 5.99,
  };
}
