import React from 'react';

import { View } from 'react-native';
import { LoginManager, AccessToken, GraphRequest, GraphRequestManager } from 'react-native-fbsdk';
import MANDATORY_REGISTRATION_FIELDS from './../../../helpers/mandatory-registration-fields';
import InputButton from './../../../components/input/InputButton';
import { royalBlue } from './../../../styles/common.style';

interface IAuthFacebookButtonProps {
	onFacebookLogin: Function,
	isLoading: boolean
}

const AuthFacebookButton = ({ onFacebookLogin, isLoading = false }: IAuthFacebookButtonProps) => {

	const handlePress = async () => {
		LoginManager.logInWithPermissions(MANDATORY_REGISTRATION_FIELDS).then(
			(result: any) => {
				if (result.isCancelled) {
					alert('Login was cancelled');
				} else {
					// onFacebookLogin(result);
					AccessToken.getCurrentAccessToken().then((accessToken: any) => {
						onFacebookLogin(result, accessToken.accessToken);
					})
				}
			},
			(error) => {
				alert('Login failed with error: ' + error);
			}
		);

		const logInManagerResult = await LoginManager.logInWithPermissions(MANDATORY_REGISTRATION_FIELDS);

		if (logInManagerResult.isCancelled) {
			alert('Login was cancelled');
			return null
		}

		const accessToken = await AccessToken.getCurrentAccessToken();

		const responseInfoCallback = (error: any, responseInfoResult: any) => {
			if (error) {
				console.log('Error fetching data: ' + error.toString());
			} else {
				onFacebookLogin(logInManagerResult, accessToken, responseInfoResult);
			}
		}

		const profileRequestParams = {
			fields: {
				string: 'id, name, email, first_name, last_name, gender, birthday, picture.heigth(480)'
			}
		}

		const profileRequestConfig = {
			httpMethod: 'GET',
			version: 'v2.5',
			parameters: profileRequestParams,
			accessToken: accessToken?.accessToken.toString()
		}

		const infoRequest = new GraphRequest(
			'/me',
			profileRequestConfig,
			responseInfoCallback,
		);

		new GraphRequestManager().addRequest(infoRequest).start();
	}

	return (
		<>
			<View>
				<InputButton title={'Facebook'} onPress={handlePress} style={{
					backgroundColor: royalBlue
				}} isLoading={isLoading} />
			</View>
		</>
	)
};

export default AuthFacebookButton;