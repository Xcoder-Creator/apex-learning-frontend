export default {
    methods: {
        // Update user settings mixin method to update the users settings
        async update_user_settings(option){
            if (this.switch_clicked === false){
                this.switch_clicked = true;
                let switch_value = null;
                this.display_one = true;

                if (option === 1){
                    if (this.$store.state.user_details.user_details.details.user_settings.allow_email_notif === true){
                        //this.$store.commit('user_details/user_details/update_settings', { option: option, value: false });
                        this.$store.commit('app_components/update_loading_linear', { value: true });
                        this.option_one = false;
                        switch_value = 'false';
                    } else {
                        //this.$store.commit('user_details/user_details/update_settings', { option: option, value: true });
                        this.$store.commit('app_components/update_loading_linear', { value: true });
                        this.option_one = true;
                        switch_value = 'true';
                    }
                }

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
                            option: option,
                            state: switch_value
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
                            option: option,
                            state: switch_value
                        }),
                        signal: this.controller.signal
                    }
                    //--------------------------------
                }

                let response = await this.update_user_settings_request(request); // Await response from the backend

                if (response.status === true){
                    let data_status = this.update_user_settings_response(response.result); // Validate the response

                    // Check the status of the response
                    if (data_status.status === 'error'){
                        this.$store.commit('app_components/update_loading_linear', { value: false });
                        this.option_one = this.$store.state.user_details.user_details.details.user_settings.allow_email_notif;
                        this.switch_clicked = false;
                        this.display_one = false;

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

                        this.$store.commit('app_components/update_loading_linear', { value: false });
                        this.switch_clicked = false;
                        this.display_one = false;

                        if (option === 1){
                            if (this.$store.state.user_details.user_details.details.user_settings.allow_email_notif === true){
                                this.$store.commit('user_details/user_details/update_settings', { option: option, value: false });
                                this.option_one = this.$store.state.user_details.user_details.details.user_settings.allow_email_notif;
                            } else {
                                this.$store.commit('user_details/user_details/update_settings', { option: option, value: true });
                                this.option_one = this.$store.state.user_details.user_details.details.user_settings.allow_email_notif;
                            }
                        }

                        // Update the err msg dialog through vuex
                        let obj = {
                            value: true,
                            msg: 'Setting\'s updated successfully!',
                            err: false
                        }

                        this.$store.commit(this.$config.VUEX_UPDATE_ERR_MSG_DIALOG, obj);
                        //---------------------------------------------
                    }
                    //----------------------------------------
                } else if (response.status === false){
                    this.$store.commit('app_components/update_loading_linear', { value: false });
                    if (option === 1){
                        this.option_one = this.$store.state.user_details.user_details.details.user_settings.allow_email_notif;
                    }
                    this.switch_clicked = false;
                    this.display_one = false;

                    // Update the err msg dialog through vuex
                    let obj = {
                        value: true,
                        msg: 'Couldn\'t update settings!',
                        err: true
                    }

                    this.$store.commit(this.$config.VUEX_UPDATE_ERR_MSG_DIALOG, obj);
                    //---------------------------------------------
                }
            } else if (this.switch_clicked === true){
                this.$store.commit('dialog/msg_dialog/update_dialog', { value: true, msg: 'Please wait for the previous setting to be updated!' });
            }
        }
        //-----------------------------------------------
    }
}