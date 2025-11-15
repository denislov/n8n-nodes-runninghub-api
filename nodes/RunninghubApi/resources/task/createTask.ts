import type { INodeProperties } from 'n8n-workflow';

const showOnlyForCreateTask = {
	resource: ['task'],
	operation: ['createTask'],
};

export const createTaskDescription: INodeProperties[] = [
	{
		displayName: 'Workflow ID',
		name: 'workflowId',
		type: 'string',
		required: true,
		default: '',
		displayOptions: {
			show: showOnlyForCreateTask,
		},
	},
	{
		displayName: 'Send NodeInfo List',
		name: 'sendNodeInfoList',
		type: 'boolean',
		default: false,
		noDataExpression: true,
		description: 'Whether the request has nodeinfo list or not',
		displayOptions: {
			show: showOnlyForCreateTask,
		},
	},
	{
		displayName: 'NodeInfoList',
		name: 'nodeInfoList',
		type: 'json',
		default: '',
		displayOptions: {
			show: {
				sendNodeInfoList:[true]
			},
		},
	},
];
