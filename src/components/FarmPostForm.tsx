import React from 'react';
import { useStateValue } from '../state';
import '../styles/App.css';

interface Props {
	onFileUpload: () => void;
	onFileChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const FarmPostForm = ({ onFileChange, onFileUpload }: Props) => {
	const [{ notification }] = useStateValue();
	return (
		<>
			<h1>Farm Data CSV Database</h1>
			<form className="farmListForm" onClick={onFileUpload}>
				<div className="formWrapper">
					{notification}
					<div className="formRow">
						<fieldset>
							<label
								className="formLabel"
								htmlFor="title">
								Upload CSV file to database:
							</label>
							<input
								className="formInput"
								name='fileInput'
								type="file"
								accept='text/csv'
								onChange={onFileChange} />
						</fieldset>
					</div>
				</div>
				<button
					type='submit'
					className="btn btnAdd">
					Upload CSV
				</button>
			</form>
		</>
	);
};

export default FarmPostForm;