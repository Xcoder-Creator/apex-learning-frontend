export default {
    methods: {
        signup_route_leave(){
            this.$store.commit(this.$config.VUEX_SIGNUP_ROUTE_UPDATE_ENABLE_SIGNUP, true); // Enable the user to signup

            // Update the err msg dialog through vuex
            let obj = {
                value: false,
                msg: '',
                err: false
            }

            this.$store.commit(this.$config.VUEX_UPDATE_ERR_MSG_DIALOG, obj);
            //------------------------------------------

            this.$store.commit(this.$config.VUEX_UPDATE_VERIF_ACCT_DIALOG_SIGNUP, { name: '', email: '', value: false }); // Update the account verification dialog properties in vuex

            this.$store.commit(this.$config.VUEX_SIGNUP_ROUTE_UPDATE_ENABLE_VERIF_ACCT, true); // Disable the user from verifying their account

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

            this.$store.commit(this.$config.VUEX_SIGNUP_ROUTE_UPDATE_ENABLE_RESEND_VERIF_CODE, true); // Enable the user to send a new verification code to their email

            this.$store.commit('app_tokens/update_verify_account_token', { value: 'TEST_TOKEN' }); // Reset verify account token
        }
    }
}