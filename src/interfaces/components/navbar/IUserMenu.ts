export interface IUserMenu {
	icon: string;
	text: string;
	action: string | (() => void);
}
