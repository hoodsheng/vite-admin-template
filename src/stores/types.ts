/* themeConfigProp */
export interface ThemeConfigProps {
	layout: string;
	primary: string;
	isDark: boolean;
	isGrey: boolean;
	isCollapse: boolean;
	isWeak: boolean;
	breadcrumb: boolean;
	breadcrumbIcon: boolean;
	tabs: boolean;
	tabsIcon: boolean;
	maximize: boolean;
}

/* GlobalState */
export interface GlobalState {
	token: string;
	userInfo: any;
	themeConfig: ThemeConfigProps;
}

/* tabsMenuProps */
export interface TabsMenuProps {
	icon: string;
	title: string;
	path: string;
	close: boolean;
}

/* TabsState */
export interface TabsState {
	tabsMenuList: TabsMenuProps[];
}

/* AuthState */
export interface AuthState {
	authButtonList: {
		[key: string]: {
			[key: string]: boolean;
		};
	};
	authMenuList: Menu.MenuOptions[];
}
