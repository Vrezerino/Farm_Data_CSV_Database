import { Action, State } from '../types';

export const setFarmList = (farms: string[]) => {
	return {
		type: 'SET_FARM_NAME_LIST',
		payload: farms
	} as Action;
};

export const setNotification = (notif: string) => {
	return {
		type: 'SET_NOTIFICATION',
		payload: notif
	} as Action;
};

export const reducer = (state: State, action: Action): State => {
  switch (action.type) {
		case 'SET_FARM_NAME_LIST':
			return {
				...state,
				farmList: [
					...action.payload
				],
				...state.farmList
			};
    default:
      return state;
  }
};
