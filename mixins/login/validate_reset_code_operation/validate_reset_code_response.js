export default {
    methods: {
        // Check and validate the response gotten from the validate reset code endpoint
        validate_reset_code_response(data){
            if (data.status === 'missing_reset_code'){
                let obj = {
                    status: 'error',
                    msg: 'An error just occured!'
                }

                return obj;
            } else if (data.status === 'invalid_credentails'){
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
            } else if (data.status === 'reset_code_expired'){
                let obj = {
                    status: 'error',
                    msg: 'This reset code has expired!'
                }

                return obj;
            } else if (data.status === 'invalid_reset_code'){
                let obj = {
                    status: 'error',
                    msg: 'This reset code is invalid!'
                }

                return obj;
            } else if (data.status === 'account_not_verified'){
                let obj = {
                    status: 'error',
                    msg: 'This account is not verified!'
                }

                return obj;
            } else if (data.status === 'user_does_not_exist'){
                let obj = {
                    status: 'error',
                    msg: 'This user does not exist!'
                }

                return obj;
            } else if (data.status === 'direct_access'){
                let obj = {
                    status: 'success',
                    reset_code: data.resetCode
                }

                return obj;
            }
        }
        //------------------------------------------------
    }
}