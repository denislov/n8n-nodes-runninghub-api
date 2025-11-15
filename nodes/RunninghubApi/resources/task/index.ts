import type { INodeProperties } from 'n8n-workflow';
import { taskGetDescription } from './getTask';
import { workflowGetDescription } from './getWorkfowInfo';

const showOnlyForTasks = {
	resource: ['task'],
};

export const taskDescription: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: showOnlyForTasks,
		},
		options: [
			{
				name: 'Get Task Info',
				value: 'getTaskInfo',
				action: 'Get task',
				description: 'Get task infomation',
				routing: {
					request: {
						method: 'POST',
						url: '/task/openapi/status',
						body: {
							taskId: '={{$parameter.taskId}}',
							extensions: 'all',
						},
					},
				},
			},
			{
				name: 'Get Workflow Info',
				value: 'getWorkfowInfo',
				action: 'Get workflow',
				description: 'Get workflow infomation',
				routing: {
					request: {
						method: 'POST',
						url: '/api/openapi/getJsonApiFormat',
						body: {
							workflowId: '={{$parameter.workflowId}}',
							extensions: 'all',
						},
					},
				},
			},
			{
				name: 'Create Task',
				value: 'createTask',
				action: 'Create task',
				description: 'Create a comfyui task',
				routing: {
					request: {
						method: 'POST',
						url: '/task/openapi/create',
						body: {
							workflowId: '={{$parameter.workflowId}}',
							nodeInfoList: '={{$parameter?.nodeInfoList}}',
							extensions: 'all',
						},
					},
				},
			},
		],
		default: 'getTaskInfo',
	},
	...taskGetDescription,
	...workflowGetDescription,
];
