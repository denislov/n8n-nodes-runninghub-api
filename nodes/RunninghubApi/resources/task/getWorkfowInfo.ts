import type { INodeProperties } from 'n8n-workflow';

const showOnlyForWorkflowGet = {
	resource: ['task'],
	operation: ['getWorkfowInfo'],
};

export const workflowGetDescription: INodeProperties[] = [
	{
		displayName: 'Workflow ID',
		name: 'workflowId',
		type: 'string',
		required: true,
		default: '',
		displayOptions: {
			show: showOnlyForWorkflowGet,
		},
	},
];
