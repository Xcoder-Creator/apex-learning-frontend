export default {
    methods: {
        // Check and validate the response gotten from the login endpoint
        login_operation_response(data){
            if (data.status === 'missing_email'){
                let obj = {
                    status: 'error',
                    msg: 'Email is missing!'
                }

                return obj;
            } else if (data.status === 'missing_password'){
                let obj = {
                    status: 'error',
                    msg: 'Password is missing!'
                }

                return obj;
            } else if (data.status === 'error_occured'){
                let obj = {
                    status: 'error',
                    msg: 'An error just occured!'
                }

                return obj;
            } else if (data.status === 'login_successfull'){
                let user_details = data.user_details;
                user_details['user_settings'] = data.user_settings;

                let obj = {
                    status: 'successful',
                    user_details: user_details,
                    access_token: data.accessToken,
                    refresh_token: data.refreshToken,
                    user_role: data.user_details.role
                }

                return obj;
            } else if (data.status === 'wrong_password'){
                let obj = {
                    status: 'error',
                    msg: 'Wrong password!'
                }

                return obj;
            } else if (data.status === 'login_successfull_but_not_verified'){
                let obj = {
                    status: 'not_verified',
                    name: data.user_name,
                    email: data.user_email,
                    access_token: data.accessToken
                }

                return obj;
            } else if (data.status === 'account_does_not_exist'){
                let obj = {
                    status: 'error',
                    msg: 'This account does not exist!'
                }

                return obj;
            } else if (data.status === 'invalid_password'){
                let obj = {
                    status: 'error',
                    msg: 'This password is invalid!'
                }

                return obj;
            } else if (data.status === 'invalid_email'){
                let obj = {
                    status: 'error',
                    msg: 'This email is invalid!'
                }

                return obj;
            } else if (data.status === 'invalid_credentials'){
                let obj = {
                    status: 'error',
                    msg: 'An error just occured!'
                }

                return obj;
            }
        }
        //------------------------------------------------
    }
}