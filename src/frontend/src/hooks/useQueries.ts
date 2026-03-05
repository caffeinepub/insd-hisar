import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import type { Course } from "../backend.d";
import { useActor } from "./useActor";

export function useGetCourses() {
  const { actor, isFetching } = useActor();
  return useQuery<Course[]>({
    queryKey: ["courses"],
    queryFn: async () => {
      if (!actor) return [];
      const result = await actor.getCourses();
      return result;
    },
    enabled: !!actor && !isFetching,
    staleTime: 5 * 60 * 1000,
  });
}

export interface EnquiryPayload {
  name: string;
  email: string;
  phone: string;
  courseInterest: string;
  message: string;
}

export function useSubmitEnquiry() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (payload: EnquiryPayload) => {
      if (!actor) throw new Error("Not connected");
      await actor.submitEnquiry(
        payload.name,
        payload.email,
        payload.phone,
        payload.courseInterest,
        payload.message,
      );
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["enquiries"] });
    },
  });
}
