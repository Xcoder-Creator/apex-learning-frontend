export default {
    methods: {
        // Check and validate the response gotten from the login activity endpoint
        login_activity_operation_response(data){
            if (data.status === 'missing_credentials'){
                let obj = {
                    status: 'error'
                }

                return obj;
            } else if (data.status === 'error_occured'){
                let obj = {
                    status: 'error_occured',
                    msg: 'An error just occured!'
                }

                return obj;
            } else if (data.status === 'token_expired'){
                let obj = {
                    status: 'error'
                }

                return obj;
            } else if (data.status === 'invalid_token'){
                let obj = {
                    status: 'error'
                }

                return obj;
            } else if (data.status === 'no_access'){
                let obj = {
                    status: 'error'
                }

                return obj;
            } else if (data.status === 'user_does_not_exist'){
                let obj = {
                    status: 'error'
                }

                return obj;
            } else if (data.status === true){
                let user_details = data.details;
                user_details['user_settings'] = data.user_settings;

                let obj = {
                    status: 'success',
                    user_details: user_details,
                    access_token: data.accessToken
                }

                return obj;
            }
        }
        //----------------------------------------------------
    }
}