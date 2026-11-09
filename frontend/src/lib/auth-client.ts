import { createAuthClient } from "better-auth/react";
import { inferAdditionalFields } from "better-auth/client/plugins";

export const authClient = createAuthClient({
  baseURL: import.meta.env.VITE_REACT_APP_BETTER_AUTH_URL,

  plugins: [
    inferAdditionalFields({
      user: {
        role: {
          type: "string",
          required: true,
          defaultValue: "user",
          input: false, // Prevent users from self-assigning admin on registration
        },
      },
    }),
  ],
});
