export default {
    methods: {
        // Update user password
        update_password_response(data){
            if (data.status === 'missing_credentials' || data.status === 'unauthorized'){
                let obj = {
                    status: 'error',
                    msg: 'Couldn\'t update password!'
                }

                return obj;
            } else if (data.status === 'missing_password'){
                let obj = {
                    status: 'error',
                    msg: 'Couldn\'t update password!'
                }

                return obj;
            } else if (data.status === 'password_length_error'){
                let obj = {
                    status: 'error',
                    msg: 'Password should not be more or less than 10!'
                }

                return obj;
            } else if (data.status === 'error_occured'){
                let obj = {
                    status: 'error',
                    msg: 'Couldn\'t update password!'
                }

                return obj;
            } else if (data.status === 'token_expired'){
                let obj = {
                    status: 'token_expired'
                }

                return obj;
            } else if (data.status === 'try_a_different_password'){
                let obj = {
                    status: 'error',
                    msg: 'Try a different password!'
                }

                return obj;
            } else if (data.status === 'user_not_found'){
                let obj = {
                    status: 'error',
                    msg: 'Couldn\'t update password!'
                }

                return obj;
            } else if (data.status === 'invalid_token'){
                let obj = {
                    status: 'error',
                    msg: 'Couldn\'t update password!'
                }

                return obj;
            } else if (data.status === 'invalid_password'){
                let obj = {
                    status: 'error',
                    msg: 'This password is invalid!'
                }

                return obj;
            } else if (data.status === 'password_updated'){
                if (data.token_info === 'token_available'){
                    let access_token = data.new_accessToken;
                    let obj = {
                        status: 'success',
                        access_token: access_token
                    }

                    return obj;
                } else if (data.token_info === 'no_token'){
                    let obj = {
                        status: 'success',
                        access_token: null
                    }

                    return obj;
                }
            } 
        }
        //------------------------------------------------
    }
}