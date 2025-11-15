import type { INodeProperties } from 'n8n-workflow';
import { taskGetDescription } from './getTask';
import { workflowGetDescription } from './getWorkfowInfo';
import { createTaskDescription } from './createTask';
import { taskGetOutputDescription } from './getTaskOutput';

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
				name: 'Get Workflow Info',
				value: 'getWorkfowInfo',
				action: 'Get workflow',
				description: 'Get workflow infomation',
			},
			{
				name: 'Create Task',
				value: 'createTask',
				action: 'Create task',
				description: 'Create a comfyui task',
			},
			{
				name: 'Get Task Info',
				value: 'getTaskInfo',
				action: 'Get task',
				description: 'Get task infomation',
			},
			{
				name: 'Cancel Task',
				value: 'cancelTask',
				action: 'Cancel task',
				description: 'Cancel task',
			},
			{
				name: 'Get Task Output',
				value: 'getTaskOutput',
				action: 'Get task output',
				description: 'Get task output',
			},
		],
		default: 'getTaskInfo',
	},
	...taskGetDescription,
	...workflowGetDescription,
	...createTaskDescription,
	...taskGetOutputDescription,
];
