import { z } from "zod";

export const signOutRespSchema = z.object({
  ok: z.boolean(),
});
export type TSignOutRespSchema = z.infer<typeof signOutRespSchema>;
