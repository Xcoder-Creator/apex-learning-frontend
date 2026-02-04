export default {
    methods: {
        // Submit class activity
        async submit_activity_work(class_code, classwork_id, questions, classwork_type_value){
            if (this.can_submit === true){
                this.can_submit = false;
                this.is_option_disabled = true;
                this.can_select_option = false;
                this.loading_linear = true;

                if (classwork_type_value === 'assignment' || classwork_type_value === 'classwork'){
                    this.submit_work_btn = false;
                    this.submit_work_loading_btn = true;
                } else if (classwork_type_value === 'attendance'){
                    this.submit_work_attendance_btn = false;
                    this.submit_work_attendance_loading_btn = true;
                }

                let new_data = JSON.stringify(questions);

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
                            class_code: class_code,
                            classwork_id: classwork_id,
                            student_answers: new_data
                        }),
                        signal: this.controller.signal
                    }
                    //------------------------------
                } else if (environment === 'production'){
                    let access_token = this.$store.state.app_tokens.login_access_token; // Access token

                    // Constructed request object
                    request = {
                        method: 'POST',
                        headers: {
                            Authorization: `Bearer ${ access_token }`
                        },
                        body: new URLSearchParams({
                            class_code: class_code,
                            classwork_id: classwork_id,
                            student_answers: new_data
                        }),
                        signal: this.controller.signal
                    }
                    //--------------------------------
                }

                let response = await this.submit_activity_work_request(request); // Await response from the backend

                // Analyze the response recieved
                if (response.status === true){
                    let data_status = this.submit_activity_work_response(response.result); // Validate the response

                    // Check the status of the response
                    if (data_status.status === 'error'){
                        this.can_submit = true;
                        this.is_option_disabled = false;
                        this.can_select_option = true;
                        this.loading_linear = false;    
                        
                        if (classwork_type_value === 'assignment' || classwork_type_value === 'classwork'){
                            this.submit_work_btn = true;
                            this.submit_work_loading_btn = false;
                        } else if (classwork_type_value === 'attendance'){
                            this.submit_work_attendance_btn = true;
                            this.submit_work_attendance_loading_btn = false;
                        }

                        this.submit_work_dialog = false;

                        setTimeout(() => {
                            // Update the err msg dialog through vuex
                            let obj = {
                                value: true,
                                msg: `An error just occured!`,
                                err: true
                            }
        
                            this.$store.commit(this.$config.VUEX_UPDATE_ERR_MSG_DIALOG, obj);
                            //---------------------------------------------
                        }, 120);
                    } else if (data_status.status === 'token_expired'){
                        let environment = this.$config.environment; // Environment mode

                        if (environment === 'development'){
                            localStorage.removeItem('access_token'); // Remove access token
                            localStorage.removeItem('refresh_token');  // Remove refresh token
                        } else if (environment === 'production'){
                            this.$store.commit('app_tokens/update_login_access_token', { value: null }); // Remove access token
                        }

                        this.$store.commit('page_loading/page_loading/update_data', { value: true }); // Page loading
                        this.$store.commit('app_components/reset_data'); // Reset app components in vuex
                        this.$store.commit('class_details/reset_data'); // Reset class details in vuex
                        this.$store.commit('student_streams_page/stream_comp/reset_data'); // Reset data
                        this.$store.commit('user_details/user_details/reset_data'); // Reset user details
                        window.location.href = `/login/`; // Redirect the user to the login page
                    } else if (data_status.status === 'success'){
                        if (data_status.new_access_token !== null){
                            let environment = this.$config.environment; // Environment mode

                            if (environment === 'development'){
                                localStorage.setItem('access_token', data_status.new_access_token); // Update access token
                            } else if (environment === 'production'){
                                this.$store.commit('app_tokens/update_login_access_token', { value: data_status.new_access_token }); // Update access token
                            }
                        }

                        if (data_status.state === true){
                            let classwork_type = data_status.classwork_type;

                            this.can_submit = false;
                            this.is_option_disabled = true;
                            this.can_select_option = false;
                            this.loading_linear = true;
                            this.is_loading = true;

                            if (classwork_type_value === 'assignment' || classwork_type_value === 'classwork'){
                                this.submit_work_btn = false;
                                this.submit_work_loading_btn = true;
                            } else if (classwork_type_value === 'attendance'){
                                this.submit_work_attendance_btn = false;
                                this.submit_work_attendance_loading_btn = true;
                            }

                            this.submit_work_dialog = false;

                            setTimeout(() => {
                                // Update the err msg dialog through vuex
                                let obj = {
                                    value: true,
                                    msg: `Your ${classwork_type} has been submitted successfully!\nRedirecting...`,
                                    err: false
                                }
            
                                this.$store.commit(this.$config.VUEX_UPDATE_ERR_MSG_DIALOG, obj);
                                //---------------------------------------------

                                setTimeout(() => {
                                    window.location.href = `/student/view_classwork?class_code=${class_code}&id=${classwork_id}`;
                                }, 1300);
                            }, 120);
                        } else if (data_status.state === false){
                            let classwork_type = data_status.classwork_type;

                            this.can_submit = false;
                            this.is_option_disabled = true;
                            this.can_select_option = false;
                            this.loading_linear = true;
                            this.is_loading = true;

                            if (classwork_type_value === 'assignment' || classwork_type_value === 'classwork'){
                                this.submit_work_btn = false;
                                this.submit_work_loading_btn = true;
                            } else if (classwork_type_value === 'attendance'){
                                this.submit_work_attendance_btn = false;
                                this.submit_work_attendance_loading_btn = true;
                            }

                            this.submit_work_dialog = false;

                            setTimeout(() => {
                                // Update the err msg dialog through vuex
                                let obj = {
                                    value: true,
                                    msg: `This ${classwork_type} has expired, so you cannot attempt it anymore!\nRedirecting...`,
                                    err: true
                                }
            
                                this.$store.commit(this.$config.VUEX_UPDATE_ERR_MSG_DIALOG, obj);
                                //---------------------------------------------

                                setTimeout(() => {
                                    window.location.href = `/student/view_classwork?class_code=${class_code}&id=${classwork_id}`;
                                }, 1300);
                            }, 120);
                        } else if (data_status.state === 'work_submitted'){
                            let classwork_type = data_status.classwork_type;

                            this.can_submit = false;
                            this.is_option_disabled = true;
                            this.can_select_option = false;
                            this.loading_linear = true;
                            this.is_loading = true;

                            if (classwork_type_value === 'assignment' || classwork_type_value === 'classwork'){
                                this.submit_work_btn = false;
                                this.submit_work_loading_btn = true;
                            } else if (classwork_type_value === 'attendance'){
                                this.submit_work_attendance_btn = false;
                                this.submit_work_attendance_loading_btn = true;
                            }

                            this.submit_work_dialog = false;

                            setTimeout(() => {
                                // Update the err msg dialog through vuex
                                let obj = {
                                    value: true,
                                    msg: `You have already submitted this ${classwork_type}!\nRedirecting...`,
                                    err: true
                                }
            
                                this.$store.commit(this.$config.VUEX_UPDATE_ERR_MSG_DIALOG, obj);
                                //---------------------------------------------

                                setTimeout(() => {
                                    window.location.href = `/student/view_classwork?class_code=${class_code}&id=${classwork_id}`;
                                }, 1300);
                            }, 120);
                        }
                    } else if (data_status.status === 'classwork_not_found'){
                        this.can_submit = false;
                        this.is_option_disabled = true;
                        this.can_select_option = false;
                        this.loading_linear = true;

                        window.location.href = `/student/classwork?class_code=${class_code}`; // Redirect user to the classwork page
                    } else if (data_status.status === 'not_part_of_class'){
                        this.can_submit = false;
                        this.is_option_disabled = true;
                        this.can_select_option = false;
                        this.loading_linear = true;

                        window.location.href = `${this.$config.student_classesUrl}`; // Redirect user to the classes home page
                    } else if (data_status.status === 'class_does_not_exist'){
                        this.can_submit = false;
                        this.is_option_disabled = true;
                        this.can_select_option = false;
                        this.loading_linear = true;

                        window.location.href = `${this.$config.student_classesUrl}`; // Redirect user to the classes home page
                    } else if (data_status.status === 'role_error'){
                        let environment = this.$config.environment; // Environment mode

                        if (environment === 'development'){
                            localStorage.removeItem('access_token'); // Remove access token
                            localStorage.removeItem('refresh_token');  // Remove refresh token
                        } else if (environment === 'production'){
                            this.$store.commit('app_tokens/update_login_access_token', { value: null }); // Remove access token
                        }

                        this.$store.commit('page_loading/page_loading/update_data', { value: true }); // Page loading
                        this.$store.commit('app_components/reset_data'); // Reset app components in vuex
                        this.$store.commit('class_details/reset_data'); // Reset class details in vuex
                        this.$store.commit('student_streams_page/stream_comp/reset_data'); // Reset data
                        this.$store.commit('user_details/user_details/reset_data'); // Reset user details
                        window.location.href = `/login/`; // Redirect the user to the login page
                    } else if (data_status.status === 'user_not_found'){
                        let environment = this.$config.environment; // Environment mode

                        if (environment === 'development'){
                            localStorage.removeItem('access_token'); // Remove access token
                            localStorage.removeItem('refresh_token');  // Remove refresh token
                        } else if (environment === 'production'){
                            this.$store.commit('app_tokens/update_login_access_token', { value: null }); // Remove access token
                        }

                        this.$store.commit('page_loading/page_loading/update_data', { value: true }); // Page loading
                        this.$store.commit('app_components/reset_data'); // Reset app components in vuex
                        this.$store.commit('class_details/reset_data'); // Reset class details in vuex
                        this.$store.commit('student_streams_page/stream_comp/reset_data'); // Reset data
                        this.$store.commit('user_details/user_details/reset_data'); // Reset user details
                        window.location.href = `/login/`; // Redirect the user to the login page
                    } else if (data_status.status === 'invalid_token'){
                        let environment = this.$config.environment; // Environment mode

                        if (environment === 'development'){
                            localStorage.removeItem('access_token'); // Remove access token
                            localStorage.removeItem('refresh_token');  // Remove refresh token
                        } else if (environment === 'production'){
                            this.$store.commit('app_tokens/update_login_access_token', { value: null }); // Remove access token
                        }

                        this.$store.commit('page_loading/page_loading/update_data', { value: true }); // Page loading
                        this.$store.commit('app_components/reset_data'); // Reset app components in vuex
                        this.$store.commit('class_details/reset_data'); // Reset class details in vuex
                        this.$store.commit('student_streams_page/stream_comp/reset_data'); // Reset data
                        this.$store.commit('user_details/user_details/reset_data'); // Reset user details
                        window.location.href = `/login/`; // Redirect the user to the login page
                    }
                    //--------------------------------------
                } else if (response.status === false){
                    let route_name = this.$route.name;

                    if (route_name === 'student-activity_forms'){
                        this.can_submit = true;
                        this.is_option_disabled = false;
                        this.can_select_option = true;
                        this.loading_linear = false;

                        if (classwork_type_value === 'assignment' || classwork_type_value === 'classwork'){
                            this.submit_work_btn = true;
                            this.submit_work_loading_btn = false;
                        } else if (classwork_type_value === 'attendance'){
                            this.submit_work_attendance_btn = true;
                            this.submit_work_attendance_loading_btn = false;
                        }

                        this.submit_work_dialog = false;

                        setTimeout(() => {
                            // Update the err msg dialog through vuex
                            let obj = {
                                value: true,
                                msg: `An error just occured!`,
                                err: true
                            }
        
                            this.$store.commit(this.$config.VUEX_UPDATE_ERR_MSG_DIALOG, obj);
                            //---------------------------------------------
                        }, 120);
                    }
                }
                //---------------------------------------
            }
        }
        //---------------------------------------------------------------------
    }
}