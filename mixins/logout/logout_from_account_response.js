export default {
    methods: {
        // Check and validate the response gotten from the logout from account endpoint
        logout_from_account_response(data){
            if (data.status === 'missing_credentials'){
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
            } else if (data.status === 'token_expired'){
                let obj = {
                    status: 'token_expired',
                    msg: 'An error just occured!'
                }

                return obj;
            } else if (data.status === 'logged_out_successfully'){
                let obj = {
                    status: 'success'
                }

                return obj;
            } else if (data.status === 'invalid_token'){
                let obj = {
                    status: 'invalid_token',
                    msg: 'An error just occured!'
                }

                return obj;
            }
        }
        //----------------------------------------------------
    }
}