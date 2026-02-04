export default {
    methods: {
        // Change name and email mixin method to update a users name and email
        async change_name_and_email(name, email){
            if (name === this.$store.state.user_details.user_details.details.user_name && email === this.$store.state.user_details.user_details.details.user_email){
                // Nothing
            } else {
                this.update_data_btn = false; // Hide the update data button
                this.update_data_btn_load = true; // Show the update data loading button
                this.loader = 'loading'; // Set loader to loading to enable the loading spinner animation

                let environment = this.$config.environment; // Environment mode
                var request = null; // Request variable

                if (environment === 'development'){
                    // Constructed request object
                    request = {
                        method: 'POST',
                        headers: {
                            Authorization: `Bearer ${ localStorage.getItem('refresh_token') }`
                        },
                        body: new URLSearchParams({
                            access_token: localStorage.getItem('access_token'),
                            name: name,
                            email: email
                        }),
                        signal: this.controller.signal
                    }
                    //--------------------------------
                } else if (environment === 'production'){
                    let access_token = this.$store.state.app_tokens.login_access_token; // Access token

                    // Constructed request object
                    request = {
                        method: 'POST',
                        headers: {
                            Authorization: `Bearer ${ access_token }`
                        },
                        body: new URLSearchParams({
                            name: name,
                            email: email
                        }),
                        signal: this.controller.signal
                    }
                    //--------------------------------
                }

                let response = await this.change_name_and_email_request(request); // Await response from the backend

                if (response.status === true){
                    let data_status = this.change_name_and_email_response(response.result); // Validate the response

                    // Check the status of the response
                    if (data_status.status === 'error'){
                        this.update_data_btn = true; // Show the update data button
                        this.update_data_btn_load = false; // Hide the update data loading button
                        this.loader = 'loading'; // Set loader to loading to enable the loading spinner animation

                        this.name = this.$store.state.user_details.user_details.details.user_name;
                        this.email = this.$store.state.user_details.user_details.details.user_email;

                        // Update the err msg dialog through vuex
                        let obj = {
                            value: true,
                            msg: data_status.msg,
                            err: true
                        }

                        this.$store.commit(this.$config.VUEX_UPDATE_ERR_MSG_DIALOG, obj);
                        //---------------------------------------------
                    } else if (data_status.status === 'token_expired'){
                        let environment = this.$config.environment; // Environment mode

                        if (environment === 'development'){
                            localStorage.removeItem('access_token'); // Remove access token
                            localStorage.removeItem('refresh_token');  // Remove refresh token
                        } else if (environment === 'production'){
                            this.$store.commit('app_tokens/update_login_access_token', { value: null }); // Remove access token

                        }

                        this.$store.commit('app_components/reset_data'); // Reset app components in vuex
                        this.$store.commit('class_details/reset_data'); // Reset class details in vuex
                        this.$store.commit('page_loading/page_loading/update_data', { value: true }); // Page loading
                        this.$store.commit('user_details/user_details/reset_data'); // Reset user details
                        this.$router.push('/login/'); // Redirect the user to the login page
                    } else if (data_status.status === 'success'){
                        // Check if there was an access token gotten from the backend
                        if (data_status.access_token !== null){
                            let environment = this.$config.environment; // Environment mode

                            if (environment === 'development'){
                                localStorage.setItem('access_token', data_status.access_token); // Update the access token in localstorage
                            } else if (environment === 'production'){
                                this.$store.commit('app_tokens/update_login_access_token', { value: data_status.access_token }); // Update the access token in vuex store

                            }
                        }
                        //-----------------------------------------

                        this.update_data_btn = true; // Hide the update data button
                        this.update_data_btn_load = false; // Show the update data loading button
                        this.loader = 'loading'; // Set loader to loading to enable the loading spinner animation

                        this.$store.commit('user_details/user_details/update_name_and_email', { name: data_status.details.name, email: data_status.details.email });                        
                        
                        this.name = this.$store.state.user_details.user_details.details.user_name;
                        this.email = this.$store.state.user_details.user_details.details.user_email;

                        // Update the err msg dialog through vuex
                        let obj = {
                            value: true,
                            msg: 'Details updated successfully!',
                            err: false
                        }

                        this.$store.commit(this.$config.VUEX_UPDATE_ERR_MSG_DIALOG, obj);
                        //---------------------------------------------
                    }
                    //----------------------------------------
                } else if (response.status === false){
                    this.update_data_btn = true; // Show the update data button
                    this.update_data_btn_load = false; // Hide the update data loading button
                    this.loader = 'loading'; // Set loader to loading to enable the loading spinner animation

                    this.name = this.$store.state.user_details.user_details.details.user_name;
                    this.email = this.$store.state.user_details.user_details.details.user_email;

                    // Update the err msg dialog through vuex
                    let obj = {
                        value: true,
                        msg: 'Couldn\'t update your details!',
                        err: true
                    }

                    this.$store.commit(this.$config.VUEX_UPDATE_ERR_MSG_DIALOG, obj);
                    //---------------------------------------------
                }
            }
        }
        //-----------------------------------------------------------------
    }
}