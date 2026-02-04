export default {
    methods: {
        // Reset password operation mixin method to update the users current password with the new password stated by the user
        async login_reset_password(new_password){
            this.resetPassword_btn = false; // Hide the reset password button
            this.resetPassword_btn_load = true; // Show the reset password loading button
            this.loader = 'loading'; // Set loader to loading to enable the loading spinner animation

            let environment = this.$config.environment; // Environment mode
            var request = null;

            if (environment === 'development'){
                let access_token = localStorage.getItem('password_reset_token'); // Password reset token from local storage

                // Constructed request object
                request = {
                    method: 'POST',
                    headers: {
                        Authorization: `Bearer ${ access_token }`
                    },
                    body: new URLSearchParams({
                        password: new_password,
                        reset_code: this.$store.state.user_details.reset_code.reset_code_value
                    }),
                    signal: this.controller.signal
                }
                //----------------------------------
            } else if (environment === 'production'){
                let access_token = this.$store.state.app_tokens.password_reset_token; // Password reset token from vuex store

                // Constructed request object
                request = {
                    method: 'POST',
                    headers: {
                        Authorization: `Bearer ${ access_token }`
                    },
                    body: new URLSearchParams({
                        password: new_password,
                        reset_code: this.$store.state.user_details.reset_code.reset_code_value
                    }),
                    signal: this.controller.signal
                }
                //----------------------------------
            }

            let response = await this.login_reset_password_fetch_request(request); // Await response from the backend

            // Analyze the response recieved
            if (response.status === true){
                let data_status = this.login_reset_password_response(response.result); // Validate the response

                // Check the status of the response
                if (data_status.status === 'error'){
                    this.resetPassword_btn = true; // Show the reset password button
                    this.resetPassword_btn_load = false; // Hide the reset password loading button
                    this.loader = 'loading'; // Set loader to loading to enable the loading spinner animation

                    this.$store.commit(this.$config.VUEX_LOGIN_ROUTE_UPDATE_ENABLE_RESET_PASSWORD, true); // Enable the user to reset their password

                    this.$store.commit(this.$config.VUEX_LOGIN_ROUTE_CLOSE_RESET_PASSWORD_DIALOG); // Close the reset password dialog

                    this.new_password = ''; // Clear the new password from the input field

                    this.confirm_new_password = ''; // Clear the confirm new password from the input field

                    this.$store.commit(this.$config.VUEX_PASSWORD_RESET_CODE_UPDATE, { reset_code: '' }); // Remove the reset code from the vuex data store

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
                } else if (data_status.status === 'password_taken_error'){
                    this.resetPassword_btn = true; // Show the reset password button
                    this.resetPassword_btn_load = false; // Hide the reset password loading button
                    this.loader = 'loading'; // Set loader to loading to enable the loading spinner animation

                    this.$store.commit(this.$config.VUEX_LOGIN_ROUTE_UPDATE_ENABLE_RESET_PASSWORD, true); // Enable the user to reset their password

                    // Update the err msg dialog through vuex
                    let obj = {
                        value: true,
                        msg: data_status.msg,
                        err: true
                    }

                    this.$store.commit(this.$config.VUEX_UPDATE_ERR_MSG_DIALOG, obj);
                    //------------------------------------------
                } else if (data_status.status === 'reset_code_expired'){
                    this.resetPassword_btn = true; // Show the reset password button
                    this.resetPassword_btn_load = false; // Hide the reset password loading button
                    this.loader = 'loading'; // Set loader to loading to enable the loading spinner animation

                    this.$store.commit(this.$config.VUEX_LOGIN_ROUTE_UPDATE_ENABLE_RESET_PASSWORD, true); // Enable the user to reset their password

                    this.$store.commit(this.$config.VUEX_LOGIN_ROUTE_CLOSE_RESET_PASSWORD_DIALOG); // Close the reset password dialog

                    this.new_password = ''; // Clear the new password from the input field

                    this.confirm_new_password = ''; // Clear the confirm new password from the input field

                    this.$store.commit(this.$config.VUEX_PASSWORD_RESET_CODE_UPDATE, { reset_code: '' }); // Remove the reset code from the vuex data store

                    let environment = this.$config.environment; // Environment mode

                    if (environment === 'development'){
                        // Remove password reset token from local storage
                        if (localStorage.getItem('password_reset_token')){
                            localStorage.removeItem('password_reset_token');
                        }
                        //---------------------------------------------------
                    } else if (environment === 'production'){
                        // Remove password reset token from vuex store
                        let access_token = this.$store.state.app_tokens.password_reset_token;

                        if (access_token !== 'TEST_TOKEN'){
                            this.$store.commit('app_tokens/update_password_reset_token', { value: 'TEST_TOKEN' });
                        }
                        //---------------------------------------------------
                    }

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
                } else if (data_status.status === 'invalid_reset_code'){
                    this.resetPassword_btn = true; // Show the reset password button
                    this.resetPassword_btn_load = false; // Hide the reset password loading button
                    this.loader = 'loading'; // Set loader to loading to enable the loading spinner animation

                    this.$store.commit(this.$config.VUEX_LOGIN_ROUTE_UPDATE_ENABLE_RESET_PASSWORD, true); // Enable the user to reset their password

                    this.$store.commit(this.$config.VUEX_LOGIN_ROUTE_CLOSE_RESET_PASSWORD_DIALOG); // Close the reset password dialog

                    this.new_password = ''; // Clear the new password from the input field

                    this.confirm_new_password = ''; // Clear the confirm new password from the input field

                    this.$store.commit(this.$config.VUEX_PASSWORD_RESET_CODE_UPDATE, { reset_code: '' }); // Remove the reset code from the vuex data store

                    let environment = this.$config.environment; // Environment mode

                    if (environment === 'development'){
                        // Remove password reset token from local storage
                        if (localStorage.getItem('password_reset_token')){
                            localStorage.removeItem('password_reset_token');
                        }
                        //---------------------------------------------------
                    } else if (environment === 'production'){
                        // Remove password reset token from vuex store
                        let access_token = this.$store.state.app_tokens.password_reset_token;

                        if (access_token !== 'TEST_TOKEN'){
                            this.$store.commit('app_tokens/update_password_reset_token', { value: 'TEST_TOKEN' });
                        }
                        //---------------------------------------------------
                    }

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
                    this.resetPassword_btn = true; // Show the reset password button
                    this.resetPassword_btn_load = false; // Hide the reset password loading button
                    this.loader = 'loading'; // Set loader to loading to enable the loading spinner animation

                    this.$store.commit(this.$config.VUEX_LOGIN_ROUTE_UPDATE_ENABLE_RESET_PASSWORD, true); // Enable the user to reset their password

                    this.$store.commit(this.$config.VUEX_LOGIN_ROUTE_CLOSE_RESET_PASSWORD_DIALOG); // Close the reset password dialog

                    this.new_password = ''; // Clear the new password from the input field

                    this.confirm_new_password = ''; // Clear the confirm new password from the input field

                    let environment = this.$config.environment; // Environment mode

                    if (environment === 'development'){
                        // Remove password reset token from local storage
                        if (localStorage.getItem('password_reset_token')){
                            localStorage.removeItem('password_reset_token');
                        }
                        //---------------------------------------------------
                    } else if (environment === 'production'){
                        // Remove password reset token from vuex store
                        let access_token = this.$store.state.app_tokens.password_reset_token;

                        if (access_token !== 'TEST_TOKEN'){
                            this.$store.commit('app_tokens/update_password_reset_token', { value: 'TEST_TOKEN' });
                        }
                        //---------------------------------------------------
                    }

                    this.$store.commit(this.$config.VUEX_PASSWORD_RESET_CODE_UPDATE, { reset_code: '' }); // Remove the reset code from the vuex data store

                    setTimeout(() => {
                        // Update the err msg dialog through vuex
                        let obj = {
                            value: true,
                            msg: data_status.msg,
                            err: false
                        }

                        this.$store.commit(this.$config.VUEX_UPDATE_ERR_MSG_DIALOG, obj);
                        //------------------------------------------
                    }, 200);
                }
                //-------------------------------------
            } else if (response.status === false){
                this.resetPassword_btn = true; // Show the reset password button
                this.resetPassword_btn_load = false; // Hide the reset password loading button
                this.loader = 'loading'; // Set loader to loading to enable the loading spinner animation

                this.$store.commit(this.$config.VUEX_LOGIN_ROUTE_UPDATE_ENABLE_RESET_PASSWORD, true); // Enable the user to reset their password

                this.$store.commit(this.$config.VUEX_LOGIN_ROUTE_CLOSE_RESET_PASSWORD_DIALOG); // Close the reset password dialog

                this.new_password = ''; // Clear the new password from the input field

                this.confirm_new_password = ''; // Clear the confirm new password from the input field

                this.$store.commit(this.$config.VUEX_PASSWORD_RESET_CODE_UPDATE, { reset_code: '' }); // Remove the reset code from the vuex data store

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
            //-------------------------------------
        }
        //--------------------------------------------------------
    }
}