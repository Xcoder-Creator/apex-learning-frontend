export default {
    methods: {
        // Check and validate the response gotten from the keep user logged in endpoint
        keep_user_logged_in_response(data){
            if (data.status === 'missing_credentials'){
                let obj = {
                    status: 'error',
                    for_prod: true,
                    msg: 'An error just occured'
                }

                return obj;
            } else if (data.status === 'error_occured'){
                let obj = {
                    status: 'error',
                    for_prod: false,
                    msg: 'An error just occured'
                }

                return obj;
            } else if (data.status === 'token_expired'){
                let obj = {
                    status: 'token_expired'
                }

                return obj;
            } else if (data.status === false){
                let obj = {
                    status: 'unk_error',
                    msg: 'An error just occured'
                }

                return obj;
            } else if (data.status === 'no_access'){
                let obj = {
                    status: 'unauthorized',
                    msg: 'An error just occured'
                }

                return obj;
            } else if (data.status === true){
                let user_details = data.details;
                user_details['user_settings'] = data.user_settings;

                if (data.token_info === 'token_available'){
                    let obj = {
                        status: 'success',
                        user_details: user_details,
                        access_token: data.new_accessToken
                    }

                    return obj;
                } else if (data.token_info === 'no_token'){
                    let obj = {
                        status: 'success',
                        user_details: data.details,
                        access_token: null
                    }

                    return obj;
                }
            }
        }
        //----------------------------------------------------
    }
}