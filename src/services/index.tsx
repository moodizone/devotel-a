import { appFetch } from "../utils/fetch";
import { FormType, StatesType, Submissions } from "./type";

export async function getForms() {
  const response = await appFetch<FormType[]>("/api/insurance/forms");
  return response;
}
export async function submitForm(payload: unknown) {
  const response = await appFetch<FormType[]>("/api/insurance/forms/submit", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  return response;
}
export async function getSubmissions() {
  const response = await appFetch<Submissions>(
    "/api/insurance/forms/submissions"
  );
  return response;
}
export async function getStates(code: string) {
  const response = await appFetch<StatesType>(
    `api/getStates?country=${encodeURIComponent(code)}`
  );
  return response;
}
