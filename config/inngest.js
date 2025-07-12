import { Inngest } from "inngest";
import connectDB from "./db";
import User from "@/models/user";

export const inngest = new Inngest({ id: "Ecommerce" });

/**
 * Sync new user creation from Clerk
 */
export const syncUserCreation = inngest.createFunction(
  {
    id: "Ecommerce-sync-user-created", // ✅ Updated: unique, namespaced ID
  },
  {
    event: "clerk/user.created",
  },
  async ({ event }) => {
    const { id, firstName, lastName, emailAddresses, imageUrl } = event.data;

    const userData = {
      _id: id,
      name: `${firstName} ${lastName}`,
      email: emailAddresses[0].emailAddress,
      imageUrl: imageUrl,
    };

    await connectDB();
    await User.create(userData);
  }
);

/**
 * Sync user updates from Clerk
 */
export const syncUserUpdate = inngest.createFunction(
  {
    id: "Ecommerce-sync-user-updated", // ✅ Updated: unique ID
  },
  {
    event: "clerk/user.updated",
  },
  async ({ event }) => {
    const { id, firstName, lastName, emailAddresses, imageUrl } = event.data;

    const userData = {
      _id: id,
      name: `${firstName} ${lastName}`,
      email: emailAddresses[0].emailAddress,
      imageUrl: imageUrl,
    };

    await connectDB();
    await User.findByIdAndUpdate(id, userData);
  }
);

/**
 * Sync user deletion from Clerk
 */
export const syncUserDeletion = inngest.createFunction(
  {
    id: "Ecommerce-sync-user-deleted", // ✅ Updated: unique ID
  },
  {
    event: "clerk/user.deleted",
  },
  async ({ event }) => {
    const { id } = event.data;

    await connectDB();
    await User.findByIdAndDelete(id);
  }
);
