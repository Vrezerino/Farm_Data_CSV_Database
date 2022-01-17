import React, { useEffect, useState } from 'react';
import FarmPostForm from './components/FarmPostForm';
import FarmListRow from './components/FarmList';
import { farmDelete, farmPost, getAllFarms } from './services/farmService';
import '../src/styles/App.css';

import { setFarmList, setNotification, useStateValue } from './state';

export const App = () => {
	const [selectedFile, setSelectedFile] = useState<File>();
	const [{ farmList }, dispatch] = useStateValue();

	const fetchFarms = async () => {
		try {
			const farms = await getAllFarms();
			dispatch(setFarmList(farms));
		} catch (e) {
			if (e instanceof Error) dispatch(setNotification(e.message));
		}
	};

	useEffect(() => {
		void fetchFarms();
	}, [fetchFarms]);

	const onFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		if (event.target.files) {
			console.log('selected file:', event.target.files[0]);
			setSelectedFile(event.target.files[0]);
		}
	};

	const onFileUpload = async () => {
		const formData = new FormData();
		if (selectedFile) {
			formData.append(
				'file',
				selectedFile
			);
		}
		try {
			await farmPost(formData);
		} catch (e) {
			if (e instanceof Error) dispatch(setNotification(e.message));
		}
	};

	const handleFarmRemove = async (name: string) => {
		try {
			await farmDelete(name);
			void fetchFarms();
		} catch (e) {
			if (e instanceof Error) dispatch(setNotification(e.message));
		}
	};

	return (
		<div className='farmListWrapper'>
			<FarmPostForm
				onFileChange={onFileChange}
				onFileUpload={onFileUpload} />
			<FarmListRow
				farms={farmList}
				handleFarmRemove={handleFarmRemove} />
		</div>
	);
};
