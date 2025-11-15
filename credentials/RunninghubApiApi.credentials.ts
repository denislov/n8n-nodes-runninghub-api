import type {
	IAuthenticateGeneric,
	Icon,
	ICredentialTestRequest,
	ICredentialType,
	INodeProperties,
} from 'n8n-workflow';

export class RunninghubApiApi implements ICredentialType {
	name = 'runninghubApiApi';

	displayName = 'Runninghub Api API';

	icon: Icon = {
		light: 'file:../icons/runninghub-light.svg',
		dark: 'file:../icons/runninghub-dark.svg',
	};

	// Link to your community node's README
	documentationUrl = 'https://github.com/denislov/n8n-nodes-runninghub-api?tab=readme#credentials';

	properties: INodeProperties[] = [
		{
			displayName: 'API Key',
			name: 'apiKey',
			type: 'string',
			typeOptions: { password: true },
			required: true,
			default: '',
		},
	];

	authenticate: IAuthenticateGeneric = {
		type: 'generic',
		properties: {
			body: {
				apikey: '={{$credentials.apiKey}}',
				extension: 'all'
			},
		},
	};

	test: ICredentialTestRequest = {
		request: {
			baseURL: 'https://www.runninghub.cn',
			url: '/uc/openapi/accountStatus',
		},
	};
}
