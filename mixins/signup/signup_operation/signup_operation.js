export default {
    methods: {
        // Signup operation mixin method to create a new account
        async signup_operation(name, email, password, role){
            this.signup_btn = false; // Hide the signup button
            this.loading_btn = true; // Show the signup loading button
            this.loader = 'loading'; // Set loader to loading to enable the loading spinner animation

            // Constructed request object
            const request = {
                method: 'POST',
                body: new URLSearchParams({
                    name: name,
                    email: email,
                    password: password,
                    role: role
                }),
                signal: this.controller.signal
            }
            //-------------------------------

            let response = await this.signup_fetch_request(request); // Await response from the backend

            // Analyze the response recieved
            if (response.status === true){
                let data_status = this.signup_operation_response(response.result); // Validate the response

                // Check the status of the response
                if (data_status.status === 'error'){
                    this.signup_btn = true; // Show the signup button
                    this.loading_btn = false; // Hide the signup loading button
                    this.loader = 'loading'; // Set loader to loading to enable the loading spinner animation

                    // Update the err msg dialog through vuex
                    let obj = {
                        value: true,
                        msg: data_status.msg,
                        err: true
                    }

                    this.$store.commit(this.$config.VUEX_UPDATE_ERR_MSG_DIALOG, obj);
                    //---------------------------------------------

                    this.$store.commit(this.$config.VUEX_SIGNUP_ROUTE_UPDATE_ENABLE_SIGNUP, true); // Enable the user to signup
                } else if (data_status.status === 'successful'){
                    this.signup_btn = true; // Show the signup button
                    this.loading_btn = false; // Hide the signup loading button
                    this.loader = 'loading'; // Set loader to loading to enable the loading spinner animation

                    this.$store.commit(this.$config.VUEX_SIGNUP_ROUTE_UPDATE_ENABLE_SIGNUP, false); // Disable the user from being able to signup

                    let environment = this.$config.environment; // Environment mode

                    if (environment === 'development'){
                        localStorage.setItem('verify_acct_token', data_status.access_token); // Store access token for account verification in localstorage
                    } else if (environment === 'production'){
                        this.$store.commit('app_tokens/update_verify_account_token', { value: data_status.access_token }); // Store verify account token in vuex store
                    }

                    this.$store.commit(this.$config.VUEX_UPDATE_VERIF_ACCT_DIALOG_SIGNUP, { name: data_status.name, email: data_status.email, value: true }); // Update the account verification dialog properties in vuex
                }
                //--------------------------------------------
            } else if (response.status === false){
                this.signup_btn = true; // Show the signup button
                this.loading_btn = false; // Hide the signup loading button
                this.loader = 'loading'; // Set loader to loading to enable the loading spinner animation

                this.$store.commit(this.$config.VUEX_SIGNUP_ROUTE_UPDATE_ENABLE_SIGNUP, true); // Enable the user to signup

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