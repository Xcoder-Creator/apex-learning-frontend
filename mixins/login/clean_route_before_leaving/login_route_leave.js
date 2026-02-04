export default {
    methods: {
        login_route_leave(){
            this.$store.commit(this.$config.VUEX_LOGIN_ROUTE_UPDATE_ENABLE_LOGIN, true); // Enable the user to login

            // Update the err msg dialog through vuex
            let obj = {
                value: false,
                msg: '',
                err: false
            }

            this.$store.commit(this.$config.VUEX_UPDATE_ERR_MSG_DIALOG, obj);
            //------------------------------------------

            this.$store.commit(this.$config.VUEX_LOGIN_ROUTE_UPDATE_ENABLE_VERIF_ACCT, true); // Enable the user to verify their account

            this.$store.commit(this.$config.VUEX_LOGIN_ROUTE_UPDATE_ENABLE_RESEND_VERIF_CODE, true); // Enable the user to send a new verification code to their email

            this.$store.commit(this.$config.VUEX_UPDATE_VERIF_ACCT_DIALOG_LOGIN, { name: '', email: '' }); // Update the account verification dialog properties in vuex

            this.$store.commit(this.$config.VUEX_CLOSE_ACCT_VERIF_DIALOG); // Close the account verification dialog

            this.$store.commit(this.$config.VUEX_LOGIN_ROUTE_UPDATE_ENABLE_CHECK_EMAIL, true); // Enable the user to send their email for validation

            this.$store.commit(this.$config.VUEX_LOGIN_ROUTE_CLOSE_FORGOT_PASSWORD_DIALOG); // Close the forgot password dialog

            this.$store.commit(this.$config.VUEX_LOGIN_ROUTE_UPDATE_RESET_CODE_DIALOG, false); // Close the reset code dialog

            this.$store.commit(this.$config.VUEX_LOGIN_ROUTE_UPDATE_ENABLE_VALIDATE_RESET_CODE, true); // Enable the user to send their reset code for validation

            this.$store.commit(this.$config.VUEX_LOGIN_ROUTE_CLOSE_RESET_CODE_DIALOG); // Close the reset code dialog

            this.$store.commit(this.$config.VUEX_PASSWORD_RESET_CODE_UPDATE, { reset_code: '' });

            this.$store.commit(this.$config.VUEX_LOGIN_ROUTE_UPDATE_RESET_PASSWORD_DIALOG, false); // Close the reset password dialog

            this.$store.commit(this.$config.VUEX_LOGIN_ROUTE_UPDATE_ENABLE_RESET_PASSWORD, true); // Enable the user to reset their password

            this.$store.commit(this.$config.VUEX_LOGIN_ROUTE_CLOSE_RESET_PASSWORD_DIALOG); // Close the reset password dialog

            // If the user is not logged in, clear their details from the vuex data store
            if (this.$store.state.user_details.user_details.is_logged_in === false){
                let user_details = {
                    value: false,
                    user_name: '',
                    user_email: '',
                    user_role: '',
                    user_id: 0,
                    user_profile_image: '',
                    user_settings: {}
                }

                this.$store.commit(this.$config.VUEX_STORE_USER_DETAILS, user_details); // Update user details in vuex
            }
            //-----------------------------------------------------------------

            this.$store.commit('app_tokens/update_verify_account_token', { value: 'TEST_TOKEN' }); // Reset verify account token

            this.$store.commit('app_tokens/update_password_reset_token', { value: 'TEST_TOKEN' }); // Reset password reset token
        }
    }
}