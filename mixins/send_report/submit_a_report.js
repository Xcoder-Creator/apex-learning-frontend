export default {
    methods: {
        // Submit a report mixin method to send a users report
        async submit_a_report(report_type, report_option){
            if (this.can_send_report === true){
                this.can_send_report = false;
                this.loading_linear = true;

                let environment = this.$config.environment; // Environment mode
                var request = null; // Request variable

                if (environment === 'development'){
                    // Constructed request object
                    request = {
                        method: 'POST',
                        headers: {
                            'Authorization': `Bearer ${ localStorage.getItem('refresh_token') }`
                        },
                        body: new URLSearchParams({
                            access_token: localStorage.getItem('access_token'),
                            report_type: report_type,
                            report_option: report_option,
                            class_code: this.$store.state.dialog.report_dialog.class_code,
                            post_id: this.$store.state.dialog.report_dialog.post_id
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
                            'Authorization': `Bearer ${ access_token }`
                        },
                        body: new URLSearchParams({
                            report_type: report_type,
                            report_option: report_option,
                            class_code: this.$store.state.dialog.report_dialog.class_code,
                            post_id: this.$store.state.dialog.report_dialog.post_id
                        }),
                        signal: this.controller.signal
                    }
                    //--------------------------------
                }

                let response = await this.submit_a_report_request(request); // Await response from the backend

                if (response.status === true){
                    let data_status = this.submit_a_report_response(response.result); // Validate the response

                    // Check the status of the response
                    if (data_status.status === 'error'){
                        this.can_send_report = true;
                        this.loading_linear = false;

                        this.$store.commit('dialog/report_dialog/reset_data');

                        setTimeout(() => {
                            // Update the err msg dialog through vuex
                            let obj = {
                                value: true,
                                msg: data_status.msg,
                                err: true
                            }

                            this.$store.commit(this.$config.VUEX_UPDATE_ERR_MSG_DIALOG, obj);
                            //---------------------------------------------
                        }, 30);
                    } else if (data_status.status === 'token_expired'){
                        if (environment === 'development'){
                            localStorage.removeItem('access_token'); // Remove access token
                            localStorage.removeItem('refresh_token');  // Remove refresh token
                        } else if (environment === 'production'){
                            this.$store.commit('app_tokens/update_login_access_token', { value: null }); // Remove access token

                        }

                        this.$store.commit('logout_user/update_is_logging_out', { value: false }); // Update is logging out property from vuex
                        this.$store.commit('unenroll_from_class/update_started_unenroll', { value: false }); // Set started unenroll property from vuex to false
                        this.$store.commit(this.$config.VUEX_PAGE_LOADING_UPDATE_DATA, { value: true}); // Set is loading to true
                        this.$store.commit('user_details/user_details/reset_data'); // Reset user details from vuex
                        this.$store.commit('class_details/reset_data'); // Reset class details
                        this.$store.commit('app_components/reset_data'); // Reset app components in vuex
                        this.$store.commit('unenroll_from_class/update_unenroll_from_class', { value: false }); // Unenroll from class property update
                        this.$router.push('/login'); // Redirect user to login page
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

                        this.can_send_report = true;
                        this.loading_linear = false;

                        this.$store.commit('dialog/report_dialog/reset_data');

                        setTimeout(() => {
                            // Update the err msg dialog through vuex
                            let obj = {
                                value: true,
                                msg: 'Report sent successfully!',
                                err: false
                            }

                            this.$store.commit(this.$config.VUEX_UPDATE_ERR_MSG_DIALOG, obj);
                            //---------------------------------------------
                        }, 30);
                    }
                    //--------------------------------------
                } else if (response.status === false){
                    this.can_send_report = true;
                    this.loading_linear = false;

                    this.$store.commit('dialog/report_dialog/reset_data');

                    setTimeout(() => {
                        // Update the err msg dialog through vuex
                        let obj = {
                            value: true,
                            msg: 'Couldn\'t send report!',
                            err: true
                        }

                        this.$store.commit(this.$config.VUEX_UPDATE_ERR_MSG_DIALOG, obj);
                        //---------------------------------------------
                    }, 30);
                }
            }
        }
        //--------------------------------------------------------
    }
}