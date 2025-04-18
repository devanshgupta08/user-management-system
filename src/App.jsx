import { Header, Footer} from "./components";
import { Outlet } from "react-router-dom";


function App() {
	return (
		<div className="wrapper min-h-screen max-md:text-sm max-sm:text-xs ">
			<Header />
			<Outlet />
			<Footer />
		</div>
	);
}

export default App;
