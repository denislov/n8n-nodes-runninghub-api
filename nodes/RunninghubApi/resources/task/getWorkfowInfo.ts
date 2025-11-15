import type { INodeProperties } from 'n8n-workflow';

const showOnlyForWorkflowGet = {
	resource: ['task'],
	operation: ['getWorkfowInfo'],
};

export const workflowGetDescription: INodeProperties[] = [
	{
		displayName: '工作流ID',
		name: 'workflowId',
		type: 'string',
		required: true,
		default: '0',
		displayOptions: {
			show: showOnlyForWorkflowGet,
		},
	},
];
