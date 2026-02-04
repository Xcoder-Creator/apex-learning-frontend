export default {
    methods: {
        // Authentication verification code mixin method to authenticate and verify the users account
        async auth_verification_code(verification_code){
            let environment = this.$config.environment; // Environment mode

            if (environment === 'development'){
                if (localStorage.getItem('verify_acct_token')){
                    this.verify_btn = false; // Hide the verify button
                    this.verify_btn_load = true; // Show the verify loading button
                    this.loader = 'loading'; // Set loader to loading to enable the loading spinner animation
                    let access_token = localStorage.getItem('verify_acct_token'); // Get the verify account token from localstorage

                    // Constructed request object
                    const request = {
                        method: 'POST',
                        headers: {
                            Authorization: `Bearer ${ access_token }`
                        },
                        body: new URLSearchParams({
                            verification_code: verification_code
                        }),
                        signal: this.controller.signal
                    }
                    //------------------------------

                    let response = await this.verify_acct_request(request); // Await response from the backend

                    // Analyze the response recieved
                    if (response.status === true){
                        let data_status = this.auth_verification_code_response(response.result); // Validate the response

                        if (data_status.status === 'error'){
                            this.verify_btn = true; // Show the verify button
                            this.verify_btn_load = false; // Hide the verify loading button
                            this.loader = 'loading'; // Set loader to loading to enable the loading spinner animation

                            // Update the err msg dialog through vuex
                            let obj = {
                                value: true,
                                msg: data_status.msg,
                                err: true
                            }

                            this.$store.commit(this.$config.VUEX_UPDATE_ERR_MSG_DIALOG, obj);
                            //------------------------------------------

                            let route_name = this.$route.name;

                            if (route_name === 'login'){
                                this.$store.commit(this.$config.VUEX_LOGIN_ROUTE_UPDATE_ENABLE_VERIF_ACCT, true); // Enable the user to verify their account
                            } else if (route_name === 'signup'){
                                this.$store.commit(this.$config.VUEX_SIGNUP_ROUTE_UPDATE_ENABLE_VERIF_ACCT, true); // Enable the user to verify their account
                            }
                        } else if (data_status.status === 'successful'){
                            let route_name = this.$route.name;

                            localStorage.removeItem('verify_acct_token'); // Remove the verify account token from localstorage

                            this.verify_btn = true; // Show the verify button
                            this.verify_btn_load = false; // Hide the verify loading button
                            this.loader = 'loading'; // Set loader to loading to enable the loading spinner animation

                            if (route_name === 'login'){
                                this.$store.commit(this.$config.VUEX_LOGIN_ROUTE_UPDATE_ENABLE_RESEND_VERIF_CODE, false); // Disable the user from sending a new verification code to their email
                                this.$store.commit(this.$config.VUEX_LOGIN_ROUTE_UPDATE_ENABLE_LOGIN, false); // Disable the user from logging in
                            } else if (route_name === 'signup'){
                                this.$store.commit(this.$config.VUEX_SIGNUP_ROUTE_UPDATE_ENABLE_RESEND_VERIF_CODE, false); // Disable the user from sending a new verification code to their email
                                this.$store.commit(this.$config.VUEX_SIGNUP_ROUTE_UPDATE_ENABLE_SIGNUP, false); // Disable the user from beign able to create their account
                            }

                            this.$store.commit(this.$config.VUEX_STORE_USER_DETAILS, data_status.user_details); // Store user details in vuex

                            // Store both the access and refresh tokens in localstorage
                            localStorage.setItem('access_token', data_status.access_token);
                            localStorage.setItem('refresh_token', data_status.refresh_token);
                            //--------------------------------------------------

                            // Update the err msg dialog through vuex
                            let obj = {
                                value: true,
                                msg: data_status.msg,
                                err: false
                            }

                            this.$store.commit(this.$config.VUEX_UPDATE_ERR_MSG_DIALOG, obj);
                            //------------------------------------------

                            setTimeout(() => {
                                // Check if the user is making use of a student or teachers account
                                if (data_status.user_details.user_role === 'Student'){
                                    this.$router.push(this.$config.student_classesUrl);
                                } else if (data_status.user_details.user_role === 'Teacher'){
                                    this.$router.push(this.$config.teacher_classesUrl);
                                }
                                //--------------------------------------------------------
                            }, 2000);
                        }
                    } else if (response.status === false){
                        let route_name = this.$route.name;

                        this.verify_btn = true; // Show the verify button
                        this.verify_btn_load = false; // Hide the verify loading button
                        this.loader = 'loading'; // Set loader to loading to enable the loading spinner animation

                        if (route_name === 'login'){
                            this.$store.commit(this.$config.VUEX_LOGIN_ROUTE_UPDATE_ENABLE_VERIF_ACCT, true); // Enable the user to verify their account
                        } else if (route_name === 'signup'){
                            this.$store.commit(this.$config.VUEX_SIGNUP_ROUTE_UPDATE_ENABLE_VERIF_ACCT, true); // Enable the user to verify their account
                        }

                        if (route_name === 'login' || route_name === 'signup'){
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
                    //---------------------------------
                } else {
                    // Update the err msg dialog through vuex
                    let obj = {
                        value: true,
                        msg: 'An error just occured!',
                        err: true
                    }

                    this.$store.commit(this.$config.VUEX_UPDATE_ERR_MSG_DIALOG, obj);
                    //------------------------------------------

                    this.$store.commit(this.$config.VUEX_LOGIN_ROUTE_UPDATE_ENABLE_VERIF_ACCT, true); // Enable the user to verify their account
                }
            } else if (environment === 'production'){
                let access_token = this.$store.state.app_tokens.verify_account_token; // Get the verify account token from vuex store

                if (access_token !== 'TEST_TOKEN'){
                    this.verify_btn = false; // Hide the verify button
                    this.verify_btn_load = true; // Show the verify loading button
                    this.loader = 'loading'; // Set loader to loading to enable the loading spinner animation

                    let access_token = this.$store.state.app_tokens.verify_account_token; // Get the verify account token from vuex store

                    // Constructed request object
                    const request = {
                        method: 'POST',
                        headers: {
                            Authorization: `Bearer ${ access_token }`
                        },
                        body: new URLSearchParams({
                            verification_code: verification_code
                        }),
                        signal: this.controller.signal
                    }
                    //------------------------------

                    let response = await this.verify_acct_request(request); // Await response from the backend

                    // Analyze the response recieved
                    if (response.status === true){
                        let data_status = this.auth_verification_code_response(response.result); // Validate the response

                        if (data_status.status === 'error'){
                            this.verify_btn = true; // Show the verify button
                            this.verify_btn_load = false; // Hide the verify loading button
                            this.loader = 'loading'; // Set loader to loading to enable the loading spinner animation

                            // Update the err msg dialog through vuex
                            let obj = {
                                value: true,
                                msg: data_status.msg,
                                err: true
                            }

                            this.$store.commit(this.$config.VUEX_UPDATE_ERR_MSG_DIALOG, obj);
                            //------------------------------------------

                            let route_name = this.$route.name;

                            if (route_name === 'login'){
                                this.$store.commit(this.$config.VUEX_LOGIN_ROUTE_UPDATE_ENABLE_VERIF_ACCT, true); // Enable the user to verify their account
                            } else if (route_name === 'signup'){
                                this.$store.commit(this.$config.VUEX_SIGNUP_ROUTE_UPDATE_ENABLE_VERIF_ACCT, true); // Enable the user to verify their account
                            }
                        } else if (data_status.status === 'successful'){
                            let route_name = this.$route.name;

                            this.$store.commit('app_tokens/update_verify_account_token', { value: 'TEST_TOKEN' }); // Remove the verify account token from vuex store

                            this.verify_btn = true; // Show the verify button
                            this.verify_btn_load = false; // Hide the verify loading button
                            this.loader = 'loading'; // Set loader to loading to enable the loading spinner animation

                            if (route_name === 'login'){
                                this.$store.commit(this.$config.VUEX_LOGIN_ROUTE_UPDATE_ENABLE_RESEND_VERIF_CODE, false); // Disable the user from sending a new verification code to their email
                                this.$store.commit(this.$config.VUEX_LOGIN_ROUTE_UPDATE_ENABLE_LOGIN, false); // Disable the user from logging in
                            } else if (route_name === 'signup'){
                                this.$store.commit(this.$config.VUEX_SIGNUP_ROUTE_UPDATE_ENABLE_RESEND_VERIF_CODE, false); // Disable the user from sending a new verification code to their email
                                this.$store.commit(this.$config.VUEX_SIGNUP_ROUTE_UPDATE_ENABLE_SIGNUP, false); // Disable the user from beign able to create their account
                            }

                            this.$store.commit(this.$config.VUEX_STORE_USER_DETAILS, data_status.user_details); // Store user details in vuex

                            // Store the access token in vuex store
                            this.$store.commit('app_tokens/update_login_access_token', { value: data_status.access_token });
                            //--------------------------------------------------



                            // Update the err msg dialog through vuex
                            let obj = {
                                value: true,
                                msg: data_status.msg,
                                err: false
                            }

                            this.$store.commit(this.$config.VUEX_UPDATE_ERR_MSG_DIALOG, obj);
                            //------------------------------------------

                            setTimeout(() => {
                                // Check if the user is making use of a student or teachers account
                                if (data_status.user_details.user_role === 'Student'){
                                    this.$router.push(this.$config.student_classesUrl);
                                } else if (data_status.user_details.user_role === 'Teacher'){
                                    this.$router.push(this.$config.teacher_classesUrl);
                                }
                                //--------------------------------------------------------
                            }, 2000);
                        }
                    } else if (response.status === false){
                        let route_name = this.$route.name;

                        this.verify_btn = true; // Show the verify button
                        this.verify_btn_load = false; // Hide the verify loading button
                        this.loader = 'loading'; // Set loader to loading to enable the loading spinner animation

                        if (route_name === 'login'){
                            this.$store.commit(this.$config.VUEX_LOGIN_ROUTE_UPDATE_ENABLE_VERIF_ACCT, true); // Enable the user to verify their account
                        } else if (route_name === 'signup'){
                            this.$store.commit(this.$config.VUEX_SIGNUP_ROUTE_UPDATE_ENABLE_VERIF_ACCT, true); // Enable the user to verify their account
                        }

                        if (route_name === 'login' || route_name === 'signup'){
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
                    //---------------------------------
                } else {
                    // Update the err msg dialog through vuex
                    let obj = {
                        value: true,
                        msg: 'An error just occured!',
                        err: true
                    }

                    this.$store.commit(this.$config.VUEX_UPDATE_ERR_MSG_DIALOG, obj);
                    //------------------------------------------

                    this.$store.commit(this.$config.VUEX_LOGIN_ROUTE_UPDATE_ENABLE_VERIF_ACCT, true); // Enable the user to verify their account
                }
            }
        }
        //-----------------------------------------------------------------
    }
}