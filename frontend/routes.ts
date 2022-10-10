
export interface Route {
	path: string;
	name: string;
	icon?: any;
	routes?: Route[];
}

export interface RoutesGroup {
	name: string;
	routes: Route[];
}

export const routes: RoutesGroup[] = [
	{
		name: "menue",
		routes: [
			{
				path: "/",
				name: "home",
			},
			{
				path: "/about",
				name: "about",
			},
		],
	},
];