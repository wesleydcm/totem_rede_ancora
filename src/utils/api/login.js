/** Function for consume API - Rede Ancora */
async function handleLogin() {

	//PASSÍVEL DE LOOP PORQUE O USE FETCH API CALL O HANDLE LOGIN E DA LOOP -- PS APAGAR DEPOIS ESSE COMENTÁRIO

	const formData = createBodyLogin({
		client_id: '65tvh6rvn4d7uer3hqqm2p8k2pvnm5wx',
		client_secret: '9Gt2dBRFTUgunSeRPqEFxwNgAfjNUPLP5EBvXKCn',
		grant_type: 'client_credentials'
	});

	return fetch('https://sso-catalogo.redeancora.com.br/connect/token', {
			method: 'POST',
			headers: {
					'Content-Type': 'application/x-www-form-urlencoded'
			},
			body: formData.toString()
	})
	.then(data => data.json());
}

/** Function for create string body login */
function createBodyLogin(params) {
	const formData = new URLSearchParams();
	for (const [key, value] of Object.entries(params)) {
		formData.append(key, value);
	}
	return formData;
}

/** Handle login */
export const handleAccessToken = async () => {
	const response = await handleLogin();

	if ('access_token' in response) {
		return response['access_token'];
	} 

	console.error('Error: ' + response.error)
	return false;
}