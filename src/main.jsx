import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { store, persistor } from "./store/store.js";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import {
	Home,
	Login,
	Profile,
} from "./pages/index.js";
import {
	Error,
	Users,
	Protected,
	Unauthorized,
} from "./components/index.js";

const queryClient = new QueryClient();

const router = createBrowserRouter([
	{
		path: "/",
		element: <App />,
		errorElement: <Error />,
		children: [
			{
				path: "/unauthorized",
				element: <Unauthorized />,
			},
			{
				path: "/",
				element: <Home />,
			},
			{
				path: "/login",
				element: (
					<Protected authentication={false}>
						<Login />
					</Protected>
				),
			},
			{
				path: "/users",
				element: (
					<Protected authentication={true}>
						<Users />
					</Protected>
				),
			},
			{
				path: "/profile",
				element: (
					<Protected authentication={true}>
						<Profile />
					</Protected>
				),
			},
		],
	},
]);

ReactDOM.createRoot(document.getElementById("root")).render(
	<React.StrictMode>
		<Provider store={store}>
			<PersistGate loading={null} persistor={persistor}>
				<QueryClientProvider client={queryClient}>
					<RouterProvider router={router} />
					<ReactQueryDevtools initialIsOpen={false} />
				</QueryClientProvider>
			</PersistGate>
		</Provider>
	</React.StrictMode>
);
