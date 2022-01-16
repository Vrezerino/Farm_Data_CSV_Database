export interface Measurement {
	name: string;
	date: Date;
	measureType: string;
	measureValue: number;
}

export interface Farm {
	id: number;
	name: string;
}

export type Action =
	| {
		type: 'SET_FARM_NAME_LIST';
		payload: string[];
	}
	| {
		type: 'SET_NOTIFICATION';
		payload: string;
	};

export type State = {
	farmList: string[];
  notification: string;
};

export type StateProviderProps = {
  reducer: React.Reducer<State, Action>;
  children: React.ReactElement;
};