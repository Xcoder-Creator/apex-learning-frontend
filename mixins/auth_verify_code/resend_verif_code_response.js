export default {
    methods: {
        // Verify the response gotten from the resend verification code endpoint
        resend_verif_code_response(data){
            if (data.status === 'invalid_credentials'){
                let obj = {
                    status: 'error',
                    msg: 'An error just occured!'
                }

                return obj;
            } else if (data.status === 'access_denied'){
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
            } else if (data.status === 'verification_code_sent'){
                let obj = {
                    status: 'code_sent',
                    msg: 'A new reset code has been sent to your email!',
                    access_token: data.accessToken
                }

                return obj;
            } else if (data.status === 'user_does_not_exist'){
                let obj = {
                    status: 'error',
                    msg: 'This user does not exist!'
                }

                return obj;
            } else if (data.status === 'already_verified'){
                let obj = {
                    status: 'error',
                    msg: 'This account is already verified!'
                }

                return obj;
            }
        }
        //--------------------------------------------------
    }
}