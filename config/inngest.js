import { Inngest } from "inngest";
import connectDB from "./db";
import User from "@/models/user";

export const inngest = new Inngest({ id: "Ecommerce" });

export const syncUserCreation = inngest.createFunction(
  {
    id: "sync-user-from-clerk",
  },
  {
    event: "clerk/user.created",
  },
  async ({ event }) => {
    const { id, firstName, lastName, emailAddresses, imageUrl } = event.data;
    const userData = {
      _id: id,
      name: firstName + " " + lastName,
      email: emailAddresses[0].emailAddress,
      imageUrl: imageUrl,
    };
    await connectDB();
    await User.create(userData);
  }
);

// update  user data in db

export const syncUserUpdate = inngest.createFunction(
  {
    id: "sync-user-from-clerk",
  },
  {
    event: "clerk/user.updated",
  },
  async ({ event }) => {
    const { id, firstName, lastName, emailAddresses, imageUrl } = event.data;
    const userData = {
      _id: id,
      name: firstName + " " + lastName,
      email: emailAddresses[0].emailAddress,
      imageUrl: imageUrl,
    };
    await connectDB();
    await User.findByIdAndUpdate(id, userData);
  }
);

// delete user data from db
export const syncUserDeletion = inngest.createFunction(
  {
    id: "sync-user-from-clerk",
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
