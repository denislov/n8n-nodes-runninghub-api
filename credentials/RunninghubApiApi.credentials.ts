import type {
	IAuthenticateGeneric,
	ICredentialTestRequest,
	ICredentialType,
	INodeProperties,
} from 'n8n-workflow';

export class RunninghubApiApi implements ICredentialType {
	name = 'runninghubApiApi';

	displayName = 'Runninghub Api API';

	// Link to your community node's README
	documentationUrl = 'https://github.com/org/-runninghub-api?tab=readme-ov-file#credentials';

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
