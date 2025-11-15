import type { INodeProperties } from 'n8n-workflow';

const showOnlyForTaskGetOutput = {
    operation: ['getTaskOutput'],
    resource: ['task'],
};

export const taskGetOutputDescription: INodeProperties[] = [
	{
		displayName: 'Task ID',
		name: 'taskId',
		type: 'string',
		required: true,
		default: '',
		displayOptions: {
			show: showOnlyForTaskGetOutput,
		},
	},
];