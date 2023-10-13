import { z } from "zod";

export const isUsernameAvailableRespSchema = z.object({
  ok: z.boolean(),
});
export type TIsUsernameAvailableResp = z.infer<
  typeof isUsernameAvailableRespSchema
>;
