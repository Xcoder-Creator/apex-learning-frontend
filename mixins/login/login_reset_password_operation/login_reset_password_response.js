export default {
    methods: {
        // Check and validate the response gotten from the reset password endpoint
        login_reset_password_response(data){
            if (data.status === 'missing_credentials' || data.status === 'invalid_password'){
                if (data.status === 'missing_credentials'){
                    let obj = {
                        status: 'error',
                        msg: 'An error just occured!'
                    }
    
                    return obj;
                } else if (data.status === 'invalid_password'){
                    let obj = {
                        status: 'error',
                        msg: 'This password is invalid!'
                    }
    
                    return obj;
                }
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
            } else if (data.status === 'password_already_taken'){
                let obj = {
                    status: 'password_taken_error',
                    msg: 'Use a stronger password!'
                }

                return obj;
            } else if (data.status === 'user_does_not_exist'){
                let obj = {
                    status: 'error',
                    msg: 'This user does not exist!'
                }

                return obj;
            } else if (data.status === 'reset_code_expired'){
                let obj = {
                    status: 'reset_code_expired',
                    msg: 'This reset code has expired!'
                }

                return obj;
            } else if (data.status === 'invalid_reset_code'){
                let obj = {
                    status: 'invalid_reset_code',
                    msg: 'An error just occured!'
                }

                return obj;
            } else if (data.status === 'account_not_verified'){
                let obj = {
                    status: 'error',
                    msg: 'This account is not verified!'
                }

                return obj;
            } else if (data.status === 'password_changed_successfully'){
                let obj = {
                    status: 'success',
                    msg: 'Your password has been changed successfully. Check your mail inbox to get your new login details.'
                }

                return obj;
            }
        }
        //----------------------------------------------------
    }
}