export default {
    methods: {
        // Check and validate the response gotten from the send reset code endpoint
        check_email_response(data){
            if (data.status === 'invalid_credentials'){
                let obj = {
                    status: 'error',
                    msg: 'An error just occured!'
                }

                return obj;
            } else if (data.status === 'error_occured'){
                let obj = {
                    status: 'error',
                    msg: 'An error just occured!'
                }

                return obj;
            } else if (data.status === 'account_not_verified'){
                let obj = {
                    status: 'error',
                    msg: 'This account is not verified!'
                }

                return obj;
            } else if (data.status === 'email_not_found'){
                let obj = {
                    status: 'error',
                    msg: 'This email was not found!'
                }

                return obj;
            } else if (data.status === true){
                let obj = {
                    status: 'success',
                    access_token: data.accessToken
                }

                return obj;
            }
        }
        //------------------------------------------------
    }
}