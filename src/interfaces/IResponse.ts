export interface IResponseServiceSuccessfullyOptions<ExtraType> {
	extra: IResponseServiceOptionsSuccessfullyExtra<ExtraType> | ExtraType;
}

export interface IResponseServicePaginationOptions<ExtraType> {
	extra: IResponseServicePaginationOptionsExtra<ExtraType>;
}

export interface IResponseServiceOptionsSuccessfullyExtra<ExtraType> {
	list: ExtraType[];
}

export interface IResponseServicePaginationOptionsExtra<ExtraType> {
	list: ExtraType[];
	totalElementCount: number;
	maxPage: number;
	currentLimit: number;
	currentPage: number;
}

export interface IResponseServiceSuccessfullyGenerateNotExtraResponse {
	error: number;
	message: string;
	extra: null;
}

export interface IResponseServiceSuccessfullyGenerateResponse<ExtraType> {
	error: number;
	message: string;
	extra: ExtraType & IResponseServiceOptionsSuccessfullyExtra<ExtraType> & IResponseServicePaginationOptionsExtra<ExtraType>;
}
