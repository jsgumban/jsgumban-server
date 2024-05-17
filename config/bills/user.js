
const userConfig = {
	common: [
		{
			name: 'username',
			type: 'String',
			required: true,
			reactType: 'text',
			placeholder: 'Username',
			initialState: '',
		},
		{
			name: 'password',
			type: 'String',
			required: true,
			reactType: 'password',
			placeholder: 'Password',
			initialState: '',
		},
		{
			name: 'email',
			type: 'String',
			required: true,
			reactType: 'email',
			placeholder: 'Email',
			initialState: '',
		},
		{
			name: 'role',
			type: 'String',
			required: true,
			reactType: 'select',
			placeholder: 'Role',
			source: [],
			initialState: 'user', // Default role
		}
	]
};

module.exports = userConfig;
