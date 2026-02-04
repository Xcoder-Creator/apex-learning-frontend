export default {
    methods: {
        // Check the validate reset code operation mixin method to know if the provided reset code by the user is valid and authentic
        async validate_reset_code(reset_code){
            this.resetCode_btn = false; // Hide the reset code button
            this.resetCode_btn_load = true; // Set the loading button to false to hide it and bring up the reset code button instead
            this.loader = 'loading'; // Set the spiral loading animation to true to enable it

            let environment = this.$config.environment; // Environment mode
            var request = null;

            if (environment === 'development'){
                let password_reset_token = localStorage.getItem('password_reset_token'); // Password reset token

                // Constructed request object
                request = {
                    method: 'POST',
                    headers: {
                        Authorization: `Bearer ${ password_reset_token }`
                    },
                    body: new URLSearchParams({
                        reset_code: reset_code
                    }),
                    signal: this.controller.signal
                }
                //-------------------------------
            } else if (environment === 'production'){
                let password_reset_token = this.$store.state.app_tokens.password_reset_token; // Password reset token

                // Constructed request object
                request = {
                    method: 'POST',
                    headers: {
                        Authorization: `Bearer ${ password_reset_token }`
                    },
                    body: new URLSearchParams({
                        reset_code: reset_code
                    }),
                    signal: this.controller.signal
                }
                //-------------------------------
            }

            let response = await this.validate_reset_code_fetch_request(request); // Await response from the backend

            // Analyze the response recieved
            if (response.status === true){
                let data_status = this.validate_reset_code_response(response.result); // Validate the response

                // Check the status of the response
                if (data_status.status === 'error'){
                    this.resetCode_btn = true; // Show the reset code button
                    this.resetCode_btn_load = false; // Hide the reset code loading button
                    this.loader = 'loading'; // Set the spiral loading animation to true to enable it

                    this.$store.commit(this.$config.VUEX_LOGIN_ROUTE_UPDATE_ENABLE_VALIDATE_RESET_CODE, true); // Enable the user to send their reset code for validation

                    this.$store.commit(this.$config.VUEX_LOGIN_ROUTE_CLOSE_RESET_CODE_DIALOG); // Close the reset code dialog

                    this.reset_code_value = ''; // Clear the reset code value from the input field

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
                    this.resetCode_btn = true; // Show the reset code button
                    this.resetCode_btn_load = false; // Hide the reset code loading button
                    this.loader = 'loading'; // Set the spiral loading animation to true to enable it

                    this.$store.commit(this.$config.VUEX_PASSWORD_RESET_CODE_UPDATE, { reset_code: data_status.reset_code });

                    this.$store.commit(this.$config.VUEX_LOGIN_ROUTE_UPDATE_ENABLE_VALIDATE_RESET_CODE, true); // Enable the user to send their reset code for validation

                    this.$store.commit(this.$config.VUEX_LOGIN_ROUTE_CLOSE_RESET_CODE_DIALOG); // Close the reset code dialog

                    this.reset_code_value = ''; // Clear the reset code value from the input field

                    setTimeout(() => {
                        this.$store.commit(this.$config.VUEX_LOGIN_ROUTE_UPDATE_RESET_PASSWORD_DIALOG, true); // Open the reset password dialog
                    }, 200);
                }
                //-------------------------------------
            } else if (response.status === false){
                this.resetCode_btn = true; // Show the reset code button
                this.resetCode_btn_load = false; // Hide the reset code loading button
                this.loader = 'loading'; // Set the spiral loading animation to true to enable it

                this.$store.commit(this.$config.VUEX_LOGIN_ROUTE_UPDATE_ENABLE_VALIDATE_RESET_CODE, true); // Enable the user to send their reset code for validation

                this.$store.commit(this.$config.VUEX_LOGIN_ROUTE_CLOSE_RESET_CODE_DIALOG); // Close the reset code dialog

                this.reset_code_value = ''; // Clear the reset code value from the input field

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
    }
}