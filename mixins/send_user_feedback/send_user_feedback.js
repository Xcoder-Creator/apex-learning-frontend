export default {
    methods: {
        // Send feedback mixin method to send a users feedback
        async send_user_feedback(feedback){
            if (this.can_send_feedback === true){
                this.can_send_feedback = false;

                if (/^ *$/.test(feedback)){
                    this.can_send_feedback = true;
                    this.$store.commit('dialog/msg_dialog/update_dialog', { value: true, msg: 'Please, Type something...' }); // Display the msg dialog
                } else {
                    if (feedback.length <= 500 && feedback.length !== 0){
                        this.send_feedback_btn = false;
                        this.send_feedback_btn_load = true;
    
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
                                    feedback: feedback
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
                                    feedback: feedback
                                }),
                                signal: this.controller.signal
                            }
                            //--------------------------------
                        }
    
                        let response = await this.send_user_feedback_request(request); // Await response from the backend
    
                        if (response.status === true){
                            let data_status = this.send_user_feedback_response(response.result); // Validate the response
    
                            // Check the status of the response
                            if (data_status.status === 'error'){
                                this.$store.commit('dialog/msg_dialog/update_dialog', { value: false, msg: 'Please wait, Sending feedback....' }); // Display the msg dialog
                                
                                this.send_feedback_btn = true;
                                this.send_feedback_btn_load = false;

                                this.can_send_feedback = true;
    
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
    
                                this.send_feedback_btn = true;
                                this.send_feedback_btn_load = false;
    
                                this.$store.commit('dialog/msg_dialog/update_dialog', { value: false, msg: 'Please wait, Sending feedback....' }); // Display the msg dialog
                                this.$store.commit('dialog/send_feedback_dialog/update_dialog', { value: false });
                                this.feedback_data = '';
                                this.can_send_feedback = true;

                                setTimeout(() => {
                                    // Update the err msg dialog through vuex
                                    let obj = {
                                        value: true,
                                        msg: 'Feedback sent successfully!',
                                        err: false
                                    }
    
                                    this.$store.commit(this.$config.VUEX_UPDATE_ERR_MSG_DIALOG, obj);
                                    //---------------------------------------------
                                }, 30);
                            }
                            //--------------------------------------
                        } else if (response.status === false){
                            this.$store.commit('dialog/msg_dialog/update_dialog', { value: false, msg: 'Please wait, Sending feedback....' }); // Display the msg dialog
                                
                            this.send_feedback_btn = true;
                            this.send_feedback_btn_load = false;

                            this.can_send_feedback = true;
    
                            var route_name = this.$route.name; // Name of the current route
    
                            // Check if the current route is the student stream page or teacher stream page
                            if (route_name === 'student-people' || route_name === 'student-archived_classes' || route_name === 'student-settings' || route_name === 'student-classes' || route_name === 'student-stream' || route_name === 'student-view_classwork' || route_name === 'teacher-stream' || route_name === 'teacher-settings' || route_name === 'teacher-archived_classes' || route_name === 'teacher-view_classwork' || route_name === 'teacher-people' || route_name === 'teacher-classes'){
                                // Update the err msg dialog through vuex
                                let obj = {
                                    value: true,
                                    msg: 'Couldn\'t send feedback!',
                                    err: true
                                }
    
                                this.$store.commit(this.$config.VUEX_UPDATE_ERR_MSG_DIALOG, obj);
                                //---------------------------------------------
                            }
                            //-------------------------------------------------
                        }
                    } else {
                        this.can_send_feedback = true;

                        // Update the err msg dialog through vuex
                        let obj = {
                            value: true,
                            msg: 'Feedback is too long. Make sure your feedback is less than five hundred characters!',
                            err: true
                        }
    
                        this.$store.commit(this.$config.VUEX_UPDATE_ERR_MSG_DIALOG, obj);
                        //---------------------------------------------
                    }
                }
            } else {
                this.$store.commit('dialog/msg_dialog/update_dialog', { value: true, msg: 'Please wait, feedback is still sending...' }); // Display the msg dialog
            }
        }
        //--------------------------------------------------------
    }
}