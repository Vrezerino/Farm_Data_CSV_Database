import React, { useEffect, useState, SyntheticEvent } from 'react';
import FarmListRow from './components/FarmList';
import { farmDelete, farmPost, getAllFarms } from './services/farmService';
import '../src/styles/App.css';

import { setFarmList, setNotification, useStateValue } from './state';

export const App = () => {
	const [loading, setLoading] = useState(false);
	const [selectedFile, setSelectedFile] = useState<File>();
	const [{ farmList, notification }, dispatch] = useStateValue();

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
	}, [getAllFarms]);

	const onFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		if (event.target.files) {
			console.log('selected file:', event.target.files[0]);
			setSelectedFile(event.target.files[0]);
		}
	};

	const onFileUpload = async () => {
		//e.preventDefault();
		const formData = new FormData();
		if (selectedFile) {
			formData.append(
				'file',
				selectedFile
			);
		}
		try {
			const response = await farmPost(formData);
		} catch (e) {
			if (e instanceof Error) dispatch(setNotification(e.message));
		}
	};

	const handleFarmRemove = async (name: string) => {
		try {
			const response = await farmDelete(name);
			void fetchFarms();
		} catch (e) {
			if (e instanceof Error) dispatch(setNotification(e.message));
		}
	};

	return (
		<div className="farmListWrapper">
			<h1>Farm Data CSV Database</h1>
			<form className="farmListForm" onClick={onFileUpload}>
				<div className="formWrapper">
					{notification}
					{loading && <div>Loading...</div>}
					<div className="formRow">
						<fieldset>
							<label
								className="formLabel"
								htmlFor="title">
								Upload CSV file to database:
							</label>
							<input
								className="formInput"
								type="file"
								accept='text/csv'
								onChange={onFileChange} />
						</fieldset>
					</div>
				</div>
				<button
					type='submit'
					className="btn btnAdd">
					Post CSV file
				</button>
			</form>
			<FarmListRow
				farms={farmList}
				loading={loading}
				handleFarmRemove={handleFarmRemove} />
		</div>
	);
};
