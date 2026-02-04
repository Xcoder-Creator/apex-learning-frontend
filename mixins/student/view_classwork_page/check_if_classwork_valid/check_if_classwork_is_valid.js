export default {
    methods: {
        // Check if classwork is valid mixin method to check if a particular classwork is valid
        async check_if_classwork_is_valid(classwork_type, class_code, classwork_id){
            if (this.$store.state.student_view_classwork_page.page_settings.enable_check_classwork_valid === true){
                this.do_activity_btn = false;
                this.do_activity_loading_btn = true;
                this.$store.commit('student_streams_page/stream_comp/update_loading_linear', { value: true }); // Update loading linear property from vuex
                this.$store.commit('student_streams_page/stream_comp/update_refresh_data', { value: false }); // Refresh data property from vuex
                this.$store.commit('student_view_classwork_page/page_settings/update_enable_check_classwork_valid', { value: false }); // Enable check classwork valid property
                this.$store.commit('student_view_classwork_page/page_settings/update_enable_private_comment', { value: false }); // Enable private comment property

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
                            classwork_id: classwork_id
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
                            classwork_id: classwork_id
                        }),
                        signal: this.controller.signal
                    }
                    //--------------------------------
                }

                let response = await this.check_if_classwork_is_valid_request(request); // Await response from the backend

                // Analyze the response recieved
                if (response.status === true){
                    let data_status = this.check_if_classwork_is_valid_response(response.result); // Validate the response

                    // Check the status of the response
                    if (data_status.status === 'error'){
                        this.do_activity_btn = true;
                        this.do_activity_loading_btn = false;
                        this.$store.commit('student_streams_page/stream_comp/update_loading_linear', { value: false }); // Update loading linear property from vuex
                        this.$store.commit('student_streams_page/stream_comp/update_refresh_data', { value: true }); // Refresh data property from vuex
                        this.$store.commit('student_view_classwork_page/page_settings/update_enable_check_classwork_valid', { value: true }); // Enable check classwork valid property
                        this.$store.commit('student_view_classwork_page/page_settings/update_enable_private_comment', { value: true }); // Enable private comment property

                        // Update snackbar text from vuex
                        let obj = {
                            value: true,
                            text: 'An error just occured!'
                        }

                        this.$store.commit(this.$config.VUEX_UPDATE_SNACKBAR, obj);
                        //--------------------------------------
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
                        this.$router.push('/login/'); // Redirect the user to the login page
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
                            this.do_activity_btn = false;
                            this.do_activity_loading_btn = true;
                            this.$store.commit('student_streams_page/stream_comp/update_loading_linear', { value: true }); // Update loading linear property from vuex
                            this.$store.commit('student_streams_page/stream_comp/update_refresh_data', { value: false }); // Refresh data property from vuex
                            this.$store.commit('student_view_classwork_page/page_settings/update_enable_check_classwork_valid', { value: false }); // Enable check classwork valid property
                            this.$store.commit('student_view_classwork_page/page_settings/update_enable_private_comment', { value: false }); // Enable private comment property
                            
                            window.location.href = `/student/activity_forms?class_code=${class_code}&id=${classwork_id}`;
                        } else if (data_status.state === false){
                            this.do_activity_btn = true;
                            this.do_activity_loading_btn = false;
                            this.$store.commit('student_streams_page/stream_comp/update_loading_linear', { value: false }); // Update loading linear property from vuex
                            this.$store.commit('student_streams_page/stream_comp/update_refresh_data', { value: true }); // Refresh data property from vuex
                            this.$store.commit('student_view_classwork_page/page_settings/update_enable_check_classwork_valid', { value: true }); // Enable check classwork valid property
                            this.$store.commit('student_view_classwork_page/page_settings/update_enable_private_comment', { value: true }); // Enable private comment property

                            // Update the err msg dialog through vuex
                            let obj = {
                                value: true,
                                msg: `This ${classwork_type} has expired, so you cannot attempt it anymore!`,
                                err: true
                            }
        
                            this.$store.commit(this.$config.VUEX_UPDATE_ERR_MSG_DIALOG, obj);
                            //---------------------------------------------
                        } else if (data_status.state === 'work_submitted'){
                            this.do_activity_btn = true;
                            this.do_activity_loading_btn = false;
                            this.$store.commit('student_streams_page/stream_comp/update_loading_linear', { value: false }); // Update loading linear property from vuex
                            this.$store.commit('student_streams_page/stream_comp/update_refresh_data', { value: true }); // Refresh data property from vuex
                            this.$store.commit('student_view_classwork_page/page_settings/update_enable_check_classwork_valid', { value: true }); // Enable check classwork valid property
                            this.$store.commit('student_view_classwork_page/page_settings/update_enable_private_comment', { value: true }); // Enable private comment property

                            // Update the err msg dialog through vuex
                            let obj = {
                                value: true,
                                msg: `This ${classwork_type} has already been submitted. Refresh this page to view your score!`,
                                err: true
                            }
        
                            this.$store.commit(this.$config.VUEX_UPDATE_ERR_MSG_DIALOG, obj);
                            //---------------------------------------------
                        }
                    } else if (data_status.status === 'classwork_not_found'){
                        this.do_activity_btn = false;
                        this.do_activity_loading_btn = true;
                        this.$store.commit('student_streams_page/stream_comp/update_loading_linear', { value: true }); // Update loading linear property from vuex
                        this.$store.commit('student_streams_page/stream_comp/update_refresh_data', { value: false }); // Refresh data property from vuex
                        this.$store.commit('student_view_classwork_page/page_settings/update_enable_check_classwork_valid', { value: false }); // Enable check classwork valid property
                        this.$store.commit('student_view_classwork_page/page_settings/update_enable_private_comment', { value: false }); // Enable private comment property

                        this.$router.push(`/student/classwork?class_code=${class_code}`); // Redirect user to the classwork page
                    } else if (data_status.status === 'not_part_of_class'){
                        this.do_activity_btn = false;
                        this.do_activity_loading_btn = true;
                        this.$store.commit('student_streams_page/stream_comp/update_loading_linear', { value: true }); // Update loading linear property from vuex
                        this.$store.commit('student_streams_page/stream_comp/update_refresh_data', { value: false }); // Refresh data property from vuex
                        this.$store.commit('student_view_classwork_page/page_settings/update_enable_check_classwork_valid', { value: false }); // Enable check classwork valid property
                        this.$store.commit('student_view_classwork_page/page_settings/update_enable_private_comment', { value: false }); // Enable private comment property

                        this.$router.push(this.$config.student_classesUrl); // Redirect user to teacher classes home page
                    } else if (data_status.status === 'class_does_not_exist'){
                        this.page_view = false; // Hide contents of page

                        this.do_activity_btn = false;
                        this.do_activity_loading_btn = true;
                        this.$store.commit('student_streams_page/stream_comp/update_loading_linear', { value: true }); // Update loading linear property from vuex
                        this.$store.commit('student_streams_page/stream_comp/update_refresh_data', { value: false }); // Refresh data property from vuex
                        this.$store.commit('student_view_classwork_page/page_settings/update_enable_check_classwork_valid', { value: false }); // Enable check classwork valid property
                        this.$store.commit('student_view_classwork_page/page_settings/update_enable_private_comment', { value: false }); // Enable private comment property

                        this.$router.push(this.$config.student_classesUrl); // Redirect user to teacher classes home page
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
                        this.$router.push('/login/'); // Redirect the user to the login page
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
                        this.$router.push('/login/'); // Redirect the user to the login page
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
                        this.$router.push('/login/'); // Redirect the user to the login page
                    }
                    //--------------------------------------
                } else if (response.status === false){
                    let route_name = this.$route.name;

                    if (route_name === 'student-view_classwork'){
                        this.do_activity_btn = true;
                        this.do_activity_loading_btn = false;
                        this.$store.commit('student_streams_page/stream_comp/update_loading_linear', { value: false }); // Update loading linear property from vuex
                        this.$store.commit('student_streams_page/stream_comp/update_refresh_data', { value: true }); // Refresh data property from vuex
                        this.$store.commit('student_view_classwork_page/page_settings/update_enable_check_classwork_valid', { value: true }); // Enable check classwork valid property
                        this.$store.commit('student_view_classwork_page/page_settings/update_enable_private_comment', { value: true }); // Enable private comment property

                        setTimeout(() => {
                            // Update snackbar text from vuex
                            let obj = {
                                value: true,
                                text: 'An error just occured!'
                            }

                            this.$store.commit(this.$config.VUEX_UPDATE_SNACKBAR, obj);
                            //--------------------------------------
                        }, 50);
                    }
                }
                //---------------------------------------
            }
        }
        //---------------------------------------------------------------------
    }
}