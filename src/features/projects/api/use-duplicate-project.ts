import { toast } from "sonner";
import { InferRequestType, InferResponseType } from "hono";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import { client } from "@/lib/hono";
import { useRouter } from "next/navigation";
import { useUpdateProject } from "./use-update-project";

type ResponseType = InferResponseType<typeof client.api.projects[":id"]["duplicate"]["$post"], 200>;
type RequestType = InferRequestType<typeof client.api.projects[":id"]["duplicate"]["$post"]>["param"];

export const useDuplicateProject = () => {
  const queryClient = useQueryClient();
  const router = useRouter();

  const mutation = useMutation<
    ResponseType,
    Error,
    RequestType
  >({
    mutationFn: async (param) => {
      const response = await client.api.projects[":id"].duplicate.$post({ 
        param,
      });

      if (!response.ok) {
        throw new Error("Falha ao duplicar o projeto");
      }

      return await response.json();
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["projects"] });
      router.push(`/mobile/89f8ddf8-0c13-48da-98be-07c9c1d5ae86`);
    },
    onError: () => {
      toast.error("Falha ao duplicar o projeto");
    }
  });

  return mutation;
};
