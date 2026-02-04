export default {
    methods: {
        // Resend verification code mixin method to send the user a new verification code
        async resend_verification_code(){
            let environment = this.$config.environment; // Environment mode

            if (environment === 'development'){
                if (localStorage.getItem('verify_acct_token')){
                    this.resendVerifCode_btn = false; // Hide the resend verification code button
                    this.resendVerifCode_btn_load = true; // Show the resend verification code loading button
                    this.loader = 'loading'; // Set loader to loading to enable the loading spinner animation

                    let access_token = localStorage.getItem('verify_acct_token'); // Get the verify account token from localstorage

                    // Constructed request object
                    const request = {
                        method: 'POST',
                        headers: {
                            Authorization: `Bearer ${ access_token }`
                        },
                        body: new URLSearchParams({
                            data: 'resend_verification_code'
                        }),
                        signal: this.controller.signal
                    }
                    //------------------------------


                    let response = await this.resend_verif_code_request(request); // Await response from the backend

                    // Analyze the response recieved
                    if (response.status === true){
                        let data_status = this.resend_verif_code_response(response.result); // Validate the response

                        if (data_status.status === 'error'){
                            this.resendVerifCode_btn = true; // Show the resend verification code button
                            this.resendVerifCode_btn_load = false; // Hide the resend verification code loading button
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
                                this.$store.commit(this.$config.VUEX_LOGIN_ROUTE_UPDATE_ENABLE_RESEND_VERIF_CODE, true); // Enable the user to send a new verification code to their email
                            } else if (route_name === 'signup'){
                                this.$store.commit(this.$config.VUEX_SIGNUP_ROUTE_UPDATE_ENABLE_RESEND_VERIF_CODE, true); // Enable the user to send a new verification code to their email
                            }
                        } else if (data_status.status === 'code_sent'){
                            this.resendVerifCode_btn = true; // Show the resend verification code button
                            this.resendVerifCode_btn_load = false; // Hide the resend verification code loading button
                            this.loader = 'loading'; // Set loader to loading to enable the loading spinner animation

                            localStorage.setItem('verify_acct_token', data_status.access_token); // Store new verify account token in localstorage

                            // Update the err msg dialog through vuex
                            let obj = {
                                value: true,
                                msg: data_status.msg,
                                err: false
                            }

                            this.$store.commit(this.$config.VUEX_UPDATE_ERR_MSG_DIALOG, obj);
                            //------------------------------------------

                            let route_name = this.$route.name;

                            if (route_name === 'login'){
                                this.$store.commit(this.$config.VUEX_LOGIN_ROUTE_UPDATE_ENABLE_RESEND_VERIF_CODE, true); // Enable the user to send a new verification code to their email
                            } else if (route_name === 'signup'){
                                this.$store.commit(this.$config.VUEX_SIGNUP_ROUTE_UPDATE_ENABLE_RESEND_VERIF_CODE, true); // Enable the user to send a new verification code to their email
                            }
                        }
                    } else if (response.status === false){
                        this.resendVerifCode_btn = true; // Show the resend verification code button
                        this.resendVerifCode_btn_load = false; // Hide the resend verification code loading button
                        this.loader = 'loading'; // Set loader to loading to enable the loading spinner animation

                        let route_name = this.$route.name;

                        if (route_name === 'login'){
                            this.$store.commit(this.$config.VUEX_LOGIN_ROUTE_UPDATE_ENABLE_RESEND_VERIF_CODE, true); // Enable the user to send a new verification code to their email
                        } else if (route_name === 'signup'){
                            this.$store.commit(this.$config.VUEX_SIGNUP_ROUTE_UPDATE_ENABLE_RESEND_VERIF_CODE, true); // Enable the user to send a new verification code to their email
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
                    //------------------------------------
                } else {
                    // Update the err msg dialog through vuex
                    let obj = {
                        value: true,
                        msg: 'An error just occured!',
                        err: true
                    }

                    this.$store.commit(this.$config.VUEX_UPDATE_ERR_MSG_DIALOG, obj);
                    //------------------------------------------

                    let route_name = this.$route.name;

                    if (route_name === 'login'){
                        this.$store.commit(this.$config.VUEX_LOGIN_ROUTE_UPDATE_ENABLE_RESEND_VERIF_CODE, true); // Enable the user to send a new verification code to their email
                    } else if (route_name === 'signup'){
                        this.$store.commit(this.$config.VUEX_SIGNUP_ROUTE_UPDATE_ENABLE_RESEND_VERIF_CODE, true); // Enable the user to send a new verification code to their email
                    }
                }
            } else if (environment === 'production'){
                let access_token = this.$store.state.app_tokens.verify_account_token; // Get the verify account token from vuex store

                if (access_token !== 'TEST_TOKEN'){
                    this.resendVerifCode_btn = false; // Hide the resend verification code button
                    this.resendVerifCode_btn_load = true; // Show the resend verification code loading button
                    this.loader = 'loading'; // Set loader to loading to enable the loading spinner animation

                    let access_token = this.$store.state.app_tokens.verify_account_token; // Get the verify account token from vuex store

                    // Constructed request object
                    const request = {
                        method: 'POST',
                        headers: {
                            Authorization: `Bearer ${ access_token }`
                        },
                        body: new URLSearchParams({
                            data: 'resend_verification_code'
                        }),
                        signal: this.controller.signal
                    }
                    //------------------------------


                    let response = await this.resend_verif_code_request(request); // Await response from the backend

                    // Analyze the response recieved
                    if (response.status === true){
                        let data_status = this.resend_verif_code_response(response.result); // Validate the response

                        if (data_status.status === 'error'){
                            this.resendVerifCode_btn = true; // Show the resend verification code button
                            this.resendVerifCode_btn_load = false; // Hide the resend verification code loading button
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
                                this.$store.commit(this.$config.VUEX_LOGIN_ROUTE_UPDATE_ENABLE_RESEND_VERIF_CODE, true); // Enable the user to send a new verification code to their email
                            } else if (route_name === 'signup'){
                                this.$store.commit(this.$config.VUEX_SIGNUP_ROUTE_UPDATE_ENABLE_RESEND_VERIF_CODE, true); // Enable the user to send a new verification code to their email
                            }
                        } else if (data_status.status === 'code_sent'){
                            this.resendVerifCode_btn = true; // Show the resend verification code button
                            this.resendVerifCode_btn_load = false; // Hide the resend verification code loading button
                            this.loader = 'loading'; // Set loader to loading to enable the loading spinner animation

                            this.$store.commit('app_tokens/update_verify_account_token', { value: data_status.access_token }); // Store new verify account token in vuex store

                            // Update the err msg dialog through vuex
                            let obj = {
                                value: true,
                                msg: data_status.msg,
                                err: false
                            }

                            this.$store.commit(this.$config.VUEX_UPDATE_ERR_MSG_DIALOG, obj);
                            //------------------------------------------

                            let route_name = this.$route.name;

                            if (route_name === 'login'){
                                this.$store.commit(this.$config.VUEX_LOGIN_ROUTE_UPDATE_ENABLE_RESEND_VERIF_CODE, true); // Enable the user to send a new verification code to their email
                            } else if (route_name === 'signup'){
                                this.$store.commit(this.$config.VUEX_SIGNUP_ROUTE_UPDATE_ENABLE_RESEND_VERIF_CODE, true); // Enable the user to send a new verification code to their email
                            }
                        }
                    } else if (response.status === false){
                        this.resendVerifCode_btn = true; // Show the resend verification code button
                        this.resendVerifCode_btn_load = false; // Hide the resend verification code loading button
                        this.loader = 'loading'; // Set loader to loading to enable the loading spinner animation

                        let route_name = this.$route.name;

                        if (route_name === 'login'){
                            this.$store.commit(this.$config.VUEX_LOGIN_ROUTE_UPDATE_ENABLE_RESEND_VERIF_CODE, true); // Enable the user to send a new verification code to their email
                        } else if (route_name === 'signup'){
                            this.$store.commit(this.$config.VUEX_SIGNUP_ROUTE_UPDATE_ENABLE_RESEND_VERIF_CODE, true); // Enable the user to send a new verification code to their email
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
                    //------------------------------------
                } else {
                    // Update the err msg dialog through vuex
                    let obj = {
                        value: true,
                        msg: 'An error just occured!',
                        err: true
                    }

                    this.$store.commit(this.$config.VUEX_UPDATE_ERR_MSG_DIALOG, obj);
                    //------------------------------------------

                    let route_name = this.$route.name;

                    if (route_name === 'login'){
                        this.$store.commit(this.$config.VUEX_LOGIN_ROUTE_UPDATE_ENABLE_RESEND_VERIF_CODE, true); // Enable the user to send a new verification code to their email
                    } else if (route_name === 'signup'){
                        this.$store.commit(this.$config.VUEX_SIGNUP_ROUTE_UPDATE_ENABLE_RESEND_VERIF_CODE, true); // Enable the user to send a new verification code to their email
                    }
                }
            }
        }
        //------------------------------------------------------------------------------
    }
}