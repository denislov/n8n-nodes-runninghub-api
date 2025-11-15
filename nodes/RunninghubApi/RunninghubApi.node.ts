import { NodeConnectionTypes, type INodeType, type INodeTypeDescription } from 'n8n-workflow';
import { accountDescription } from './resources/account';
import { taskDescription } from './resources/task';

export class RunninghubApi implements INodeType {
	description: INodeTypeDescription = {
		displayName: 'Runninghub Api',
		name: 'runninghubApi',
		icon: { light: 'file:runninghubApi.svg', dark: 'file:runninghubApi.dark.svg' },
		group: ['transform'],
		version: 1,
		subtitle: '={{$parameter["operation"] + ": " + $parameter["resource"]}}',
		description: 'Interact with the Runninghub Api API',
		defaults: {
			name: 'Runninghub Api',
		},
		usableAsTool: true,
		inputs: [NodeConnectionTypes.Main],
		outputs: [NodeConnectionTypes.Main],
		credentials: [{ name: 'runninghubApiApi', required: true }],
		requestDefaults: {
			baseURL: 'https://www.runninghub.cn',
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json',
				Host: 'www.runninghub.cn',
			},
		},
		properties: [
			{
				displayName: 'Resource',
				name: 'resource',
				type: 'options',
				noDataExpression: true,
				options: [
					{
						name: 'Task',
						value: 'task',
					},
					{
						name: 'Account',
						value: 'account',
					},
					{
						name: 'File',
						value: 'file',
					},
				],
				default: 'account',
			},
			...accountDescription,
			...taskDescription,
		],
	};
}
