import axios, { AxiosResponse } from 'axios';
import { Measurement } from '../types';
import { baseUrl } from '../utils';

export const getAllData = async () => {
	const response = await axios.get<Measurement[]>(`${baseUrl}/all`);
	return response.data;
};

export const getAllFarms = async () => {
	const response = await axios.get<{ name: string }[]>(`${baseUrl}/allnames`);
	return response.data.map(farm => farm.name);
};

export const farmPost = async (formData: FormData) => {
	const response = await axios.post<AxiosResponse>(`${baseUrl}/create`, formData);
	return response.data;
};

export const farmDelete = async (name: string) => {
	const response = await axios.delete<AxiosResponse>(`${baseUrl}/delete?name=${name}`, { data: { name: 'name' } });
	return response.data;
};