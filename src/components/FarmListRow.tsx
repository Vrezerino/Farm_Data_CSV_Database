import React from 'react';
import { baseUrl } from '../utils';

interface FarmNamesListRowUI {
	farm: string;
  position: number;
  handleFarmRemove: (name: string) => void;
}

const FarmListRow = (props: FarmNamesListRowUI) => {
	const url = `${baseUrl}/farms/${props.farm}`;
	return(
		<tr className="tableRow">
			<td className="tableItem">
				{props.position}
			</td>
			<td className="tableItem">
				<a href={url} rel='noopener noreferrer' target='_blank'>{props.farm}</a>
			</td>
			<td className="tableItem">
				<button
					className="btn btnRemove"
					onClick={() => props.handleFarmRemove(props.farm)}>
					Remove farm
				</button>
			</td>
		</tr>
	);
};

export default FarmListRow;