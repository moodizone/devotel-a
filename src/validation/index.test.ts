import {
  FormFieldType,
  TextInput,
  NumberInput,
  RadioInput,
  CheckboxInput,
  DateInput,
  SelectInput,
  GroupInput,
} from "@/services/type";
import { generateYupSchema } from "@/validation";

describe("generateYupSchema", () => {
  // Test for required text field
  it("should generate a schema for a required text field", async () => {
    const fields: FormFieldType[] = [
      {
        id: "name",
        label: "Full Name",
        type: "text",
        required: true,
      } as TextInput,
    ];

    const schema = generateYupSchema(fields);

    await expect(schema.validateAt("name", { name: "" })).rejects.toThrow(
      "This field is required"
    );
    await expect(schema.validateAt("name", { name: "John Doe" })).resolves.toBe(
      "John Doe"
    );
  });

  // Test for text field with pattern validation
  it("should generate a schema for a text field with pattern validation", async () => {
    const fields: FormFieldType[] = [
      {
        id: "email",
        label: "Email",
        type: "text",
        validation: {
          pattern: "^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$",
        },
      } as TextInput,
    ];

    const schema = generateYupSchema(fields);

    await expect(
      schema.validateAt("email", { email: "invalid-email" })
    ).rejects.toThrow("Invalid format");
    await expect(
      schema.validateAt("email", { email: "valid@example.com" })
    ).resolves.toBe("valid@example.com");
  });

  // Test for required number field with min and max validation
  it("should generate a schema for a required number field with min and max validation", async () => {
    const fields: FormFieldType[] = [
      {
        id: "age",
        label: "Age",
        type: "number",
        required: true,
        validation: {
          min: 18,
          max: 99,
        },
      } as NumberInput,
    ];

    const schema = generateYupSchema(fields);

    await expect(schema.validateAt("age", { age: 17 })).rejects.toThrow(
      "Must be at least 18"
    );
    await expect(schema.validateAt("age", { age: 100 })).rejects.toThrow(
      "Must be at most 99"
    );
    await expect(schema.validateAt("age", { age: 25 })).resolves.toBe(25);
  });

  // Test for date field
  it("should generate a schema for a date field", async () => {
    const fields: FormFieldType[] = [
      {
        id: "dob",
        label: "Date of Birth",
        type: "date",
        required: true,
      } as DateInput,
    ];

    const schema = generateYupSchema(fields);

    await expect(
      schema.validateAt("dob", { dob: "invalid-date" })
    ).rejects.toThrow("dob must be a `date` type");
    await expect(
      schema.validateAt("dob", { dob: new Date() })
    ).resolves.toBeDefined();
  });

  // Test for radio field with options
  it("should generate a schema for a radio field with options", async () => {
    const fields: FormFieldType[] = [
      {
        id: "gender",
        label: "Gender",
        type: "radio",
        required: true,
        options: ["Male", "Female"],
      } as RadioInput,
    ];

    const schema = generateYupSchema(fields);

    await expect(
      schema.validateAt("gender", { gender: "Other" })
    ).rejects.toThrow("Invalid selection");
    await expect(schema.validateAt("gender", { gender: "Male" })).resolves.toBe(
      "Male"
    );
  });

  // Test for checkbox field with options
  it("should generate a schema for a checkbox field with options", async () => {
    const fields: FormFieldType[] = [
      {
        id: "hobbies",
        label: "Hobbies",
        type: "checkbox",
        required: true,
        options: ["Reading", "Swimming", "Coding"],
      } as CheckboxInput,
    ];

    const schema = generateYupSchema(fields);

    await expect(schema.validateAt("hobbies", { hobbies: [] })).rejects.toThrow(
      "At least one option must be selected"
    );
    await expect(
      schema.validateAt("hobbies", { hobbies: ["Reading", "Coding"] })
    ).resolves.toEqual(["Reading", "Coding"]);
  });

  // Test for select field with options
  it("should generate a schema for a select field with options", async () => {
    const fields: FormFieldType[] = [
      {
        id: "country",
        label: "Country",
        type: "select",
        required: true,
        options: ["USA", "Canada", "UK"],
      } as SelectInput,
    ];

    const schema = generateYupSchema(fields);

    await expect(
      schema.validateAt("country", { country: "France" })
    ).rejects.toThrow("Invalid selection");
    await expect(
      schema.validateAt("country", { country: "USA" })
    ).resolves.toBe("USA");
  });

  // Test for group field
  it("should generate a schema for a group field", async () => {
    const fields: FormFieldType[] = [
      {
        id: "address",
        label: "Address",
        type: "group",
        fields: [
          {
            id: "street",
            label: "Street",
            type: "text",
            required: true,
          } as TextInput,
          {
            id: "city",
            label: "City",
            type: "text",
            required: true,
          } as TextInput,
        ],
      } as GroupInput,
    ];

    const schema = generateYupSchema(fields);

    await expect(
      schema.validateAt("address.street", {
        address: { street: "", city: "NYC" },
      })
    ).rejects.toThrow("This field is required");
    await expect(
      schema.validateAt("address.city", {
        address: { street: "123 Main St", city: "" },
      })
    ).rejects.toThrow("This field is required");
    await expect(
      schema.validateAt("address", {
        address: { street: "123 Main St", city: "NYC" },
      })
    ).resolves.toEqual({ street: "123 Main St", city: "NYC" });
  });

  // Test for visibility conditions
  it("should handle visibility conditions", async () => {
    const fields: FormFieldType[] = [
      {
        id: "subscribe",
        label: "Subscribe",
        type: "radio",
        required: true,
        options: ["yes", "no"],
      } as RadioInput,
      {
        id: "email",
        label: "Email",
        type: "text",
        required: true,
        visibility: {
          dependsOn: "subscribe",
          condition: "equals",
          value: "yes",
        },
      } as TextInput,
    ];

    const schema = generateYupSchema(fields);

    // When subscribe is "no", email is not required
    await expect(schema.validate({ subscribe: "no" })).resolves.toEqual({
      subscribe: "no",
    });

    // When subscribe is "yes", email is required
    await expect(
      schema.validate({ subscribe: "yes", email: "" })
    ).rejects.toThrow("This field is required");
    await expect(
      schema.validate({ subscribe: "yes", email: "test@example.com" })
    ).resolves.toEqual({ subscribe: "yes", email: "test@example.com" });
  });

  // Test for unsupported field type
  it("should throw an error for unsupported field types", () => {
    const fields = [
      {
        id: "unsupported",
        label: "Unsupported",
        type: "unsupported",
      },
    ] as any;

    expect(() => generateYupSchema(fields)).toThrow(
      "Unsupported field type: unsupported"
    );
  });
});
