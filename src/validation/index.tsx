import * as yup from "yup";

import { FormFieldType } from "@/services/type";

export function generateYupSchema(fields: FormFieldType[]) {
  const schema: Record<string, yup.AnySchema> = {};

  fields.forEach((field) => {
    let validator: yup.AnySchema;

    switch (field.type) {
      case "text":
        validator = yup.string();
        if (field.required)
          validator = validator.required("This field is required");
        if (field.validation?.pattern)
          validator = (validator as yup.StringSchema).matches(
            new RegExp(field.validation.pattern),
            "Invalid format"
          );
        break;

      case "number":
        validator = yup.number();
        if (field.required)
          validator = validator.required("This field is required");
        if (field.validation?.min !== undefined)
          validator = (validator as yup.NumberSchema).min(
            field.validation.min,
            `Must be at least ${field.validation.min}`
          );
        if (field.validation?.max !== undefined)
          validator = (validator as yup.NumberSchema).min(
            field.validation.max,
            `Must be at least ${field.validation.max}`
          );
        break;

      case "date":
        validator = yup.date();
        if (field.required)
          validator = validator.required("This field is required");
        break;

      case "radio":
        validator = yup.string();
        if (field.required)
          validator = validator.required("This field is required");
        if (field.options)
          validator = validator.oneOf(field.options, "Invalid selection");
        break;

      case "checkbox":
        validator = yup.array();
        if (field.required)
          validator = (validator as yup.ArraySchema<string[], unknown>).min(
            1,
            "At least one option must be selected"
          );
        if (field.options)
          validator = (validator as yup.ArraySchema<string[], unknown>).of(
            yup.string().oneOf(field.options, "Invalid selection")
          );
        break;

      case "select":
        validator = yup.string();
        if (field.required)
          validator = validator.required("This field is required");
        if (field.options)
          validator = validator.oneOf(field.options, "Invalid selection");
        break;

      case "group":
        validator = generateYupSchema(field.fields);
        break;
      default:
        // @ts-expect-error unreachable case
        throw new Error(`Unsupported field type: ${field.type}`);
    }

    if (field.visibility) {
      const { dependsOn, condition, value } = field.visibility;
      validator = validator.when(dependsOn, {
        is: (depValue: unknown) => {
          if (condition === "equals") {
            return depValue === value;
          }
          return false;
        },
        then: (schema) => schema,
        otherwise: (schema) => schema.strip(),
      });
    }

    schema[field.id] = validator;
  });

  return yup.object().shape(schema);
}
