import { serve } from "inngest/next";
import {
  inngest,
  syncUserCreation,
  syncUserUpdate,
  syncUserDeletion,
} from "@/config/inngest";

// ✅ Inngest v3 requires object format
export const { GET, POST, PUT } = serve({
  client: inngest,
  functions: [syncUserCreation, syncUserUpdate, syncUserDeletion],
});
