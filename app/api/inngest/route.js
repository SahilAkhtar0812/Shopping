import { serve } from "inngest/next";
import {
  inngest,
  syncUserCreation,
  syncUserDeletion,
  syncUserUpdate,
} from "@/config/inngest";

// ✅ Correct positional syntax to avoid serialization errors
export const { GET, POST, PUT } = serve(inngest, [
  syncUserCreation,
  syncUserUpdate,
  syncUserDeletion,
]);
