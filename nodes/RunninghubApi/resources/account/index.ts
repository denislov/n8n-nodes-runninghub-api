import type { INodeProperties } from 'n8n-workflow';

const showOnlyForAccounts = {
	resource: ['account'],
};

export const accountDescription: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: showOnlyForAccounts,
		},
		options: [
			{
				name: 'Get Account Info',
				value: 'getAccountInfo',
				action: 'Get account',
				description: 'Get Account Infomation',
			},
		],
		default: 'getAccountInfo',
	},
];
