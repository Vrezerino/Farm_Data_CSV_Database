import React from 'react';
import FarmListRow from './FarmListRow';
import '../../styles/farmList.css';
import { useStateValue } from '../../state';

interface Props {
	farms: string[];
	handleFarmRemove: (name: string) => void;
}

const FarmList = (props: Props) => {
	const [{ farmList }] = useStateValue();

	return (
		<table className="table">
			<tbody className="tableBody">
				{farmList.length > 0 ? (
					farmList.map((farm: string, i) => (
						<FarmListRow
							key={farm}
							farm={farm}
							position={i + 1}
							handleFarmRemove={props.handleFarmRemove}
						/>
					)
					)
				) : (
					<tr className="tableRow">
						<td className="tableItem" style={{ textAlign: 'center' }} colSpan={6}>There are no farms to show. Upload one!</td>
					</tr>
				)
				}
			</tbody>
		</table>
	);
};

export default FarmList;