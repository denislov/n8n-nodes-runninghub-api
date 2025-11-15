import type { INodeProperties } from 'n8n-workflow';

const showOnlyForAccountCreate = {
	operation: ['create'],
	resource: ['account'],
};

export const accountCreateDescription: INodeProperties[] = [
	{
		displayName: 'Name',
		name: 'name',
		type: 'string',
		default: '',
		required: true,
		displayOptions: {
			show: showOnlyForAccountCreate,
		},
		description: 'The name of the account',
		routing: {
			send: {
				type: 'body',
				property: 'name',
			},
		},
	},
];
