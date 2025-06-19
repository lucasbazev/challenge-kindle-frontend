import { z } from "zod";

export const schema = z.object({
  title: z.string().min(1, "Título é obrigatório"),
  description: z.string().optional(),
  status: z.enum(["BOUGHT", "READING", "FINISHED"]),
});
