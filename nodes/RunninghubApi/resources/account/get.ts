import type { INodeProperties } from 'n8n-workflow';

const showOnlyForAccountGet = {
	operation: ['get'],
	resource: ['account'],
};

export const accountGetDescription: INodeProperties[] = [
	{
		displayName: 'Account ID',
		name: 'accountId',
		type: 'string',
		displayOptions: { show: showOnlyForAccountGet },
		default: '',
		description: "The account's ID to retrieve",
	},
];
