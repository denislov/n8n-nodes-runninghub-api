import type { INodeProperties } from 'n8n-workflow';

const showOnlyForTaskCancel = {
    operation: ['cancelTask'],
    resource: ['task'],
};

export const taskGetDescription: INodeProperties[] = [
	{
		displayName: 'Task ID',
		name: 'taskId',
		type: 'string',
		required: true,
		default: '',
		displayOptions: {
			show: showOnlyForTaskCancel,
		},
	},
];