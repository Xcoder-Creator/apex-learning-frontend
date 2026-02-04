export default {
    methods: {
        // Check email operation mixin method to know if the provided email by the user belongs to a particular account or not
        async check_email(email){
            this.checkEmail_btn = false; // Hide the check email button
            this.checkEmail_btn_load = true; // Show the check email loading button
            this.loader = 'loading'; // Set loader to loading to enable the loading spinner animation

            // Constructed request object
            const request = {
                method: 'POST',
                body: new URLSearchParams({
                    email: email
                }),
                signal: this.controller.signal
            }
            //-------------------------------

            let response = await this.check_email_fetch_request(request); // Await response from the backend

            // Analyze the response recieved
            if (response.status === true){
                let data_status = this.check_email_response(response.result); // Validate the response

                // Check the status of the response
                if (data_status.status === 'error'){
                    this.checkEmail_btn = true; // Show the check email button
                    this.checkEmail_btn_load = false; // Hide the check email loading button
                    this.loader = 'loading'; // Set loader to loading to enable the loading spinner animation

                    this.$store.commit(this.$config.VUEX_LOGIN_ROUTE_UPDATE_ENABLE_CHECK_EMAIL, true); // Enable the user to send their email for validation

                    this.$store.commit(this.$config.VUEX_LOGIN_ROUTE_CLOSE_FORGOT_PASSWORD_DIALOG); // Close the forgot password dialog

                    this.email = '';

                    setTimeout(() => {
                        // Update the err msg dialog through vuex
                        let obj = {
                            value: true,
                            msg: data_status.msg,
                            err: true
                        }

                        this.$store.commit(this.$config.VUEX_UPDATE_ERR_MSG_DIALOG, obj);
                        //------------------------------------------
                    }, 200);
                } else if (data_status.status === 'success'){
                    this.checkEmail_btn = true; // Show the check email button
                    this.checkEmail_btn_load = false; // Hide the check email loading button
                    this.loader = 'loading'; // Set loader to loading to enable the loading spinner animation

                    this.$store.commit(this.$config.VUEX_LOGIN_ROUTE_UPDATE_ENABLE_CHECK_EMAIL, true); // Enable the user to send their email for validation

                    this.$store.commit(this.$config.VUEX_LOGIN_ROUTE_CLOSE_FORGOT_PASSWORD_DIALOG); // Close the forgot password dialog

                    this.email = ''; // Empty the email input field

                    let environment = this.$config.environment; // Environment mode

                    if (environment === 'development'){
                        localStorage.setItem('password_reset_token', data_status.access_token);
                    } else if (environment === 'production'){
                        this.$store.commit('app_tokens/update_password_reset_token', { value: data_status.access_token }); // Update the password reset token from vuex store
                    }

                    setTimeout(() => {
                        this.$store.commit(this.$config.VUEX_LOGIN_ROUTE_UPDATE_RESET_CODE_DIALOG, true); // Open the reset code dialog
                    }, 200);
                }
                //-----------------------------------------------
            } else if (response.status === false){
                this.checkEmail_btn = true; // Show the check email button
                this.checkEmail_btn_load = false; // Hide the check email loading button
                this.loader = 'loading'; // Set loader to loading to enable the loading spinner animation

                this.$store.commit(this.$config.VUEX_LOGIN_ROUTE_UPDATE_ENABLE_CHECK_EMAIL, true); // Enable the user to send their email for validation

                this.$store.commit(this.$config.VUEX_LOGIN_ROUTE_CLOSE_FORGOT_PASSWORD_DIALOG); // Close the forgot password dialog

                this.email = ''; // Clear the email from the input field

                let route_name = this.$route.name;

                if (route_name === 'login'){
                    if (this.is_aborting_from_close === false){
                        setTimeout(() => {
                            // Update the err msg dialog through vuex
                            let obj = {
                                value: true,
                                msg: 'An error just occured!',
                                err: true
                            }

                            this.$store.commit(this.$config.VUEX_UPDATE_ERR_MSG_DIALOG, obj);
                            //------------------------------------------
                        }, 200);
                    } else {
                        this.is_aborting_from_close = false;
                    }
                }
            }
            //-----------------------------------
        }
        //------------------------------------------------------
    }
}