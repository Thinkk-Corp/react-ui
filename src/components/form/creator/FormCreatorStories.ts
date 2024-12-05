import type { IFormButton, IFormFields } from "@/interfaces/components/form/IFormCreator.ts";
import { z } from "zod";

export interface FormCreatorFields {
	firstName: string;
	lastName?: string;
	email: string;
	phoneNumber?: string;
	country: string;
	language?: string;
}

export const mockButtonAction = jest.fn();

export const fields: IFormFields = {
	full_name: {
		combined: true,
		children: {
			firstName: {
				type: "text",
				placeholder: "First Name",
				label: "First Name",
				initialValue: "",
				required: true,
			},
			lastName: {
				type: "text",
				placeholder: "Last Name",
				label: "Last Name",
				initialValue: "",
				required: false,
			},
		},
	},
	email: {
		type: "email",
		placeholder: "example@example.com",
		required: true,
		label: "Email Address",
		initialValue: "",
	},
	phoneNumber: {
		type: "text",
		placeholder: "+1 234 567 890",
		label: "Phone Number",
		initialValue: "",
		required: false,
	},
	country: {
		type: "select",
		initialValue: "",
		label: "Country",
		selectSettings: {
			isSearchable: true,
			options: [
				{ value: "us", label: "United States" },
				{ value: "ca", label: "Canada" },
				{ value: "de", label: "Germany" },
				{ value: "tr", label: "Turkey" },
				{ value: "gb", label: "United Kingdom" },
				{ value: "fr", label: "France" },
			],
		},
	},
	language: {
		type: "select",
		initialValue: "en",
		label: "Preferred Language",
		selectSettings: {
			isSearchable: true,
			options: [
				{ value: "en", label: "English" },
				{ value: "tr", label: "Turkish" },
				{ value: "es", label: "Spanish" },
				{ value: "fr", label: "French" },
				{ value: "de", label: "German" },
			],
		},
	},
};

export const buttons: IFormButton[] = [
	{ type: "submit", text: "Submit" },
	{ type: "button", text: "Reset", action: mockButtonAction },
];

export const validationSchema = z.object({
	firstName: z.string().min(1, "First name is required").min(2, "First name must be at least 2 characters long"),
	lastName: z
		.string()
		.optional()
		.refine((val) => val === undefined || val.length >= 2, {
			message: "Last name must be at least 2 characters long if provided",
		}),
	email: z.string().min(1, "Email address is required").email("Invalid email address format"),
	phoneNumber: z
		.string()
		.optional()
		.refine((val) => val === undefined || /^\+?\d{1,3}[-.\s]?\(?\d{1,4}\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}$/.test(val), {
			message: "Invalid phone number format",
		}),
	country: z.string().min(1, "Country is required"),
	language: z.string().min(1, "Preferred language is required"),
});

export const values: FormCreatorFields = {
	firstName: "John",
	lastName: "Doe",
	email: "john.doe@example.com",
	phoneNumber: "+1 234 567 890",
	country: "us",
	language: "en",
};
