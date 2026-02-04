export default {
    methods: {
        // Login operation mixin method to login a particular user
        async login_operation(email, password){
            this.login_btn = false; // Hide the login button
            this.login_loading_btn = true; // Show the login loading button
            this.loader = 'loading'; // Set loader to loading to enable the loading spinner animation

            // Constructed request object
            const request = {
                method: 'POST',
                body: new URLSearchParams({
                    email: email,
                    password: password
                }),
                signal: this.controller.signal
            }
            //-------------------------------

            let response = await this.login_fetch_request(request); // Await response from the backend

            // Analyze the response recieved
            if (response.status === true){
                let data_status = this.login_operation_response(response.result); // Validate the response

                // Check the status of the response
                if (data_status.status === 'error'){
                    this.login_btn = true; // Show the login button
                    this.login_loading_btn = false; // Hide the login loading button
                    this.loader = 'loading'; // Set loader to loading to enable the loading spinner animation

                    // Update the err msg dialog through vuex
                    let obj = {
                        value: true,
                        msg: data_status.msg,
                        err: true
                    }

                    this.$store.commit(this.$config.VUEX_UPDATE_ERR_MSG_DIALOG, obj);
                    //---------------------------------------------

                    this.$store.commit(this.$config.VUEX_LOGIN_ROUTE_UPDATE_ENABLE_LOGIN, true); // Enable the user to login
                } else if (data_status.status === 'successful'){
                    this.$store.commit(this.$config.VUEX_STORE_USER_DETAILS, data_status.user_details); // Store user details in vuex

                    let environment = this.$config.environment; // Environment mode

                    if (environment === 'development'){
                        // Store access and refresh tokens in localstorage
                        localStorage.setItem('access_token', data_status.access_token);
                        localStorage.setItem('refresh_token', data_status.refresh_token);
                        //-------------------------------------------
                    } else if (environment === 'production'){
                        this.$store.commit('app_tokens/update_login_access_token', { value: data_status.access_token }); // Update access token
                    }

                    // Check if the user is making use of a student or teachers account
                    if (data_status.user_details.user_role === 'Student'){
                        this.$router.push(this.$config.student_classesUrl);
                    } else if (data_status.user_details.user_role === 'Teacher'){
                        this.$router.push(this.$config.teacher_classesUrl);
                    }
                    //--------------------------------------------------------
                } else if (data_status.status === 'not_verified'){
                    let environment = this.$config.environment; // Environment mode

                    if (environment === 'development'){
                        localStorage.setItem('verify_acct_token', data_status.access_token); // Store access token for account verification in localstorage
                    } else if (environment === 'production'){
                        this.$store.commit('app_tokens/update_verify_account_token', { value: data_status.access_token }); // Update verify account token
                    }

                    this.login_btn = true; // Show the login button
                    this.login_loading_btn = false; // Hide the login loading button
                    this.loader = 'loading'; // Set loader to loading to enable the loading spinner animation

                    this.$store.commit(this.$config.VUEX_UPDATE_VERIF_ACCT_DIALOG_LOGIN, { name: data_status.name, email: data_status.email }); // Update the account verification dialog properties in vuex
                    this.$store.commit(this.$config.VUEX_LOGIN_ROUTE_UPDATE_ENABLE_LOGIN, true); // Enable the user to login
                }
                //--------------------------------------------
            } else if (response.status === false){
                this.login_btn = true; // Show the login button
                this.login_loading_btn = false; // Hide the login loading button
                this.loader = 'loading'; // Set loader to loading to enable the loading spinner animation

                this.$store.commit(this.$config.VUEX_LOGIN_ROUTE_UPDATE_ENABLE_LOGIN, true); // Enable the user to login

                // Update the err msg dialog through vuex
                let obj = {
                    value: true,
                    msg: 'An error just occured!',
                    err: true
                }

                this.$store.commit(this.$config.VUEX_UPDATE_ERR_MSG_DIALOG, obj);
                //------------------------------------------
            }
            //---------------------------------
        }
        //------------------------------------------------------
    }
}