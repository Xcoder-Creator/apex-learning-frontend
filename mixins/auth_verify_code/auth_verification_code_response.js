export default {
    methods: {
        // Verify the response gotten from the verify account endpoint
        auth_verification_code_response(data){
            if (data.status === 'invalid_credentials'){
                let obj = {
                    status: 'error',
                    msg: 'An error just occured!'
                }

                return obj;
            } else if (data.status === 'access_denied'){
                let environment = this.$config.environment; // Environment mode

                if (environment === 'development'){
                    localStorage.removeItem('verify_acct_token'); // Remove verify account token
                } else if (environment === 'production'){
                    this.$store.commit('app_tokens/update_verify_account_token', { value: 'TEST_TOKEN' }); // Remove verify account token
                }

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
            } else if (data.status === 'account_verified_successfully'){
                let user_details = data.user_details;
                user_details['user_settings'] = data.user_settings;

                let obj = {
                    status: 'successful',
                    msg: 'Your account has been verified successfully!',
                    user_role: data.user_role,
                    access_token: data.accessToken,
                    refresh_token: data.refreshToken,
                    user_details: user_details
                }

                return obj;
            } else if (data.status === 'verification_code_expired'){
                let obj = {
                    status: 'error',
                    msg: 'This verification code has expired!'
                }

                return obj;
            } else if (data.status === 'invalid_verification_code'){
                let obj = {
                    status: 'error',
                    msg: 'Invalid verification code!'
                }

                return obj;
            } else if (data.status === 'already_verified'){
                let obj = {
                    status: 'error',
                    msg: 'This account is already verified!'
                }

                return obj;
            } else if (data.status === 'account_does_not_exist'){
                let obj = {
                    status: 'error',
                    msg: 'This account does not exist!'
                }

                return obj;
            }
        }
        //----------------------------------------------
    }
}