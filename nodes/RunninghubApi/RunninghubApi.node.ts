import { IExecuteFunctions, IHttpRequestOptions, INodeExecutionData, NodeConnectionTypes, NodeOperationError, type INodeType, type INodeTypeDescription } from 'n8n-workflow';
import { accountDescription } from './resources/account';
import { taskDescription } from './resources/task';

export class RunninghubApi implements INodeType {
	description: INodeTypeDescription = {
		displayName: 'Runninghub Api',
		name: 'runninghubApi',
		icon: {
			light: 'file:../../icons/runninghub-light.svg',
			dark: 'file:../../icons/runninghub-dark.svg',
		},
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
	async execute(this: IExecuteFunctions): Promise<INodeExecutionData[][]> {
		const items = this.getInputData();
		const returnData: INodeExecutionData[] = [];

		const credentials = await this.getCredentials('runninghubApiApi');

		if (!credentials?.apiKey){
			throw new NodeOperationError(this.getNode(), "No valid API key provided");
		}
		const resource = this.getNodeParameter('resource', 0);
		const operation = this.getNodeParameter('operation', 0);

		// Iterates over all input items and add the key "myString" with the
		// value the parameter "myString" resolves to.
		// (This could be a different value for each item in case it contains an expression)
		for (let itemIndex = 0; itemIndex < items.length; itemIndex++) {
			try {
				const requestBody = {
					apiKey: `${credentials?.apiKey}`,
				};
				let url = ""
				if (resource == "task"){
					if (operation == 'getTaskInfo') {
						url = '/task/openapi/status';
						const taskId = this.getNodeParameter('taskId', itemIndex, '') as string;
						Object.assign(requestBody, {
							taskId: taskId,
						});
					}
					if (operation == 'getWorkfowInfo') {
						url = '/api/openapi/getJsonApiFormat';
						const workflowId = this.getNodeParameter('workflowId', itemIndex, '') as string;
						Object.assign(requestBody, {
							workflowId: workflowId,
						});
					}
					if (operation == 'createTask') {
						url = '/task/openapi/create';
						const workflowId = this.getNodeParameter('workflowId', itemIndex, '') as string;
						Object.assign(requestBody, {
							workflowId: workflowId,
						});
						const sendNodeInfoList = this.getNodeParameter(
							'sendNodeInfoList',
							itemIndex,
							'',
						) as boolean;

						if (sendNodeInfoList){
							const nodeInfoList = this.getNodeParameter('nodeInfoList', itemIndex, '') as string;
							Object.assign(requestBody, {
								nodeInfoList: nodeInfoList,
							});
						}
					}
					if (operation == 'getTaskOutput') {
						url = '/task/openapi/outputs';
						const taskId = this.getNodeParameter('taskId', itemIndex, '') as string;
						Object.assign(requestBody, {
							taskId: taskId,
						});
					}
					if (operation == 'cancelTask') {
						url = '/task/openapi/cancel';
						const taskId = this.getNodeParameter('taskId', itemIndex, '') as string;
						Object.assign(requestBody, {
							taskId: taskId,
						});
					}
				}
				if (resource == "account"){
				    if (operation == 'getAccountInfo'){
						url = '/uc/openapi/accountStatus';
					}
				}

				const options: IHttpRequestOptions = {
					baseURL: 'https://www.runninghub.cn',
					url: url,
					headers: {
						Host: 'www.runninghub.cn',
						'Content-Type': 'application/json',
					},
					method: 'POST',
					body: requestBody,
				};
				const responseData = await this.helpers.httpRequest.call(this,options)

				returnData.push({
					json: responseData,
				});
			} catch (error) {
				// This node should never fail but we want to showcase how
				// to handle errors.
				if (this.continueOnFail()) {
					returnData.push({
						json: this.getInputData(itemIndex)[0].json,
						error,
						pairedItem: itemIndex,
					});
				} else {
					// Adding `itemIndex` allows other workflows to handle this error
					if (error.context) {
						// If the error thrown already contains the context property,
						// only append the itemIndex
						error.context.itemIndex = itemIndex;
						throw error;
					}
					throw new NodeOperationError(this.getNode(), error, {
						itemIndex,
					});
				}
			}
		}
		return [this.helpers.returnJsonArray(returnData)];
	}
}
