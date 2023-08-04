import { useState } from 'react';
import { Route, Routes } from "react-router-dom";
import Layout from "../layout";
import CurrentMatches from '../views/dashbord';
import FileView from '../views/fileView';
import Arhiv from '../views/arhiv';
import Sponsor from '../views/sponsor';


const PrivateRoutes = () => {
	const[layout, setLayout] = useState(false)
	return (
		<Layout layout={layout} setLayout={setLayout}>
			<Routes>
				<Route path="/" element={<CurrentMatches/>} />
				<Route path="arhiv" element={<Arhiv/>} />
				<Route path="file" element={<FileView />} />
				<Route path="arhiv/file" element={<FileView/>} />				
				<Route path="sponsor" element={<Sponsor/>} />				
			</Routes>
		</Layout>
	);
};

export default PrivateRoutes;
