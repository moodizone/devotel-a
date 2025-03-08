import { getForms, getSubmissions } from "@/services";
import { useQuery } from "@tanstack/react-query";

//================================
// Keys
//================================
export const FORM_KEY = "FORM_KEY";
export const SUBMISSION_KEY = "SUBMISSION_KEY";

//================================
// Queries
//================================
export function useGetForms() {
  return useQuery({
    queryKey: [FORM_KEY],
    queryFn: getForms,
    gcTime: Infinity,
    staleTime: Infinity,
  });
}
export function useGerSubmissions() {
  return useQuery({
    queryKey: [SUBMISSION_KEY],
    queryFn: getSubmissions,
    gcTime: Infinity,
    staleTime: Infinity,
  });
}
