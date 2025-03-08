import { getForms, getSubmissions } from "@/services";
import { useSuspenseQuery } from "@tanstack/react-query";

//================================
// Keys
//================================
export const FORM_KEY = "FORM_KEY";
export const SUBMISSION_KEY = "SUBMISSION_KEY";

//================================
// Queries
//================================
export function useGetForms() {
  return useSuspenseQuery({
    queryKey: [FORM_KEY],
    queryFn: getForms,
    gcTime: Infinity,
    staleTime: Infinity,
  });
}
export function useGerSubmissions() {
  return useSuspenseQuery({
    queryKey: [SUBMISSION_KEY],
    queryFn: getSubmissions,
    gcTime: Infinity,
    staleTime: Infinity,
  });
}
