export default {
    methods: {
        // Verify the response gotten from the update details endpoint
        change_name_and_email_response(data){
            if (data.status === 'missing_credentials' || data.status === 'unauthorized'){
                let obj = {
                    status: 'error',
                    msg: 'Couldn\'t update your details!'
                }

                return obj;
            } else if (data.status === 'missing_name'){
                let obj = {
                    status: 'error',
                    msg: 'Couldn\'t update your details!'
                }

                return obj;
            } else if (data.status === 'missing_email'){
                let obj = {
                    status: 'error',
                    msg: 'Couldn\'t update your details!'
                }

                return obj;
            } else if (data.status === 'invalid_email'){
                let obj = {
                    status: 'error',
                    msg: 'Couldn\'t update your details!'
                }

                return obj;
            } else if (data.status === 'error_occured'){
                let obj = {
                    status: 'error',
                    msg: 'Couldn\'t update your details!'
                }

                return obj;
            } else if (data.status === 'token_expired'){
                let obj = {
                    status: 'token_expired'
                }

                return obj;
            } else if (data.status === 'user_not_found'){
                let obj = {
                    status: 'error',
                    msg: 'Couldn\'t update your details!'
                }

                return obj;
            } else if (data.status === 'email_already_used'){
                let obj = {
                    status: 'error',
                    msg: 'This email is already in use!'
                }

                return obj;
            } else if (data.status === 'invalid_token'){
                let obj = {
                    status: 'error',
                    msg: 'Couldn\'t update your details!'
                }

                return obj;
            } else if (data.status === 'details_updated'){
                if (data.token_info === 'token_available'){
                    let access_token = data.new_accessToken;
                    let obj = {
                        status: 'success',
                        access_token: access_token,
                        details: data.details
                    }

                    return obj;
                } else if (data.token_info === 'no_token'){
                    let obj = {
                        status: 'success',
                        access_token: null,
                        details: data.details
                    }

                    return obj;
                }
            }
        }
        //--------------------------------------------------
    }
}