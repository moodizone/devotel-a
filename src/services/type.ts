export interface FormType {
  formId: string;
  title: string;
  fields: FormFieldType[];
}

//================================
// Common properties
//================================
export interface BaseFormField {
  id: string;
  label: string;
  required?: boolean;
  visibility?: {
    dependsOn: BaseFormField["id"];
    condition: "equals";
    value: string;
  };
}

//================================
// Specific properties
//================================
export interface TextInput extends BaseFormField {
  type: "text";
  validation?: {
    pattern?: string;
  };
}
export interface NumberInput extends BaseFormField {
  type: "number";
  validation?: {
    min?: number;
    max?: number;
  };
}
export interface RadioInput extends BaseFormField {
  type: "radio";
  options: string[];
}
export interface CheckboxInput extends BaseFormField {
  type: "checkbox";
  options: string[];
}
export interface DateInput extends BaseFormField {
  type: "date";
}
export interface DateInput extends BaseFormField {
  type: "date";
}
export interface SelectInput extends BaseFormField {
  type: "select";
  options?: string[];
  dynamicOptions?: {
    dependsOn: BaseFormField["id"];
    endpoint: string;
    method: "GET";
  };
}
export interface GroupInput extends BaseFormField {
  type: "group";
  fields: FormFieldType[];
}
export type FormFieldType =
  | TextInput
  | NumberInput
  | RadioInput
  | CheckboxInput
  | DateInput
  | GroupInput
  | SelectInput;

//================================
// API inventories
//================================
export interface StatesType {
  country: string;
  states: string[];
}
export enum Gender {
  male = "Male",
  female = "Female",
}
export interface Submission {
  id: string;
  "Full Name": string;
  Age: number;
  Gender: Gender;
  "Insurance Type": string;
  City: string;
  Status?: string;
}
export interface Submissions {
  columns: Array<keyof Omit<Submission, "id">>;
  data: Submission[];
}
