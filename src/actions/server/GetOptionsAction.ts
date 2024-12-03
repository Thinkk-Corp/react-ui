import type { IOption } from "@/interfaces/components/form/inputs/ISelect.ts";
import HTTPClient from "@/plugins/HTTPClient.ts";
import get from "lodash/get";

export const getOptionsAction = async (endpoint: string): Promise<IOption[] | null> => {
	const response = await HTTPClient.get(endpoint);
	if (!response.data) return null;
	return get(response.data, "extra.list", null);
};
