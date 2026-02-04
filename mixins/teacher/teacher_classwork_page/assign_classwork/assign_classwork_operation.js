export default {
    methods: {
        // Assign classwork operation mixin method to assign a new classwork to a particular class
        async assign_classwork_operation(title, instruction, points, time, date_object, questions_array, classwork_type, class_code){
            this.$store.commit('teacher_streams_page/stream_comp/update_loading_linear', { value: true }) // Update loading linear property from vuex
            this.$store.commit('teacher_streams_page/stream_comp/update_refresh_data', { value: false }); // Refresh data property from vuex
            this.$store.commit('teacher_classwork_page/classwork_comp/update_classwork_fetched', { value: false }); // Classwork fetched property from vuex
            this.$store.commit('teacher_classwork_page/classwork_comp/empty_classwork_for_class', { class_code: class_code }); // Remove the classworks for a particular class from vuex
            
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
                        title: title,
                        instruction: instruction,
                        points: points,
                        time: time,
                        date_object: JSON.stringify(date_object),
                        questions_array: JSON.stringify(questions_array),
                        classwork_type: classwork_type,
                        class_code: class_code
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
                        title: title,
                        instruction: instruction,
                        points: points,
                        time: time,
                        date_object: JSON.stringify(date_object),
                        questions_array: JSON.stringify(questions_array),
                        classwork_type: classwork_type,
                        class_code: class_code
                    }),
                    signal: this.controller.signal
                }
                //--------------------------------
            }

            let response = await this.assign_classwork_request(request); // Await response from the backend

            // Analyze the response recieved
            if (response.status === true){
                let data_status = this.assign_classwork_response(response.result); // Validate the response

                // Check the status of the response
                if (data_status.status === 'error'){
                    this.$store.commit('teacher_streams_page/stream_comp/update_loading_linear', { value: true }) // Update loading linear property from vuex
                    this.$store.commit('teacher_streams_page/stream_comp/update_refresh_data', { value: true }); // Refresh data property from vuex
                    this.$store.commit('teacher_classwork_page/classwork_comp/update_classwork_fetched', { value: false }); // Classwork fetched property from vuex

                    // Update the err msg dialog through vuex
                    let obj = {
                        value: true,
                        msg: 'Couldn\'t assign classwork!',
                        err: true
                    }

                    this.$store.commit(this.$config.VUEX_UPDATE_ERR_MSG_DIALOG, obj);
                    //---------------------------------------------

                    this.can_reset = true;
                    this.assign_btn = true;
                    this.assign_btn_load = false;
                    this.can_assign_work = true;

                    this.reset_dialog_utility();
                    this.$store.commit('create_assignment_dialog/update_dialog', { value: false });
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

                    if (data_status.state === 'classworks_available'){
                        this.$store.commit('teacher_streams_page/stream_comp/update_loading_linear', { value: false }) // Update loading linear property from vuex
                        this.$store.commit('teacher_streams_page/stream_comp/update_refresh_data', { value: true }); // Refresh data property from vuex
                        this.$store.commit('teacher_classwork_page/classwork_comp/add_new_classwork', { class_code: data_status.class_code, classworks: data_status.classworks }); // Add new classworks for a particular class
                        this.$store.commit('teacher_classwork_page/classwork_comp/update_classwork_fetched', { value: true }); // Classwork fetched property from vuex
                        
                        // Update the err msg dialog through vuex
                        let obj = {
                            value: true,
                            msg: 'Work assigned successfully!',
                            err: false
                        }

                        this.$store.commit(this.$config.VUEX_UPDATE_ERR_MSG_DIALOG, obj);
                        //---------------------------------------------

                        this.can_reset = true;
                        this.assign_btn = true;
                        this.assign_btn_load = false;
                        this.can_assign_work = true;

                        this.reset_dialog_utility();
                        this.$store.commit('create_assignment_dialog/update_dialog', { value: false });
                        this.$store.commit('create_classwork_dialog/update_dialog', { value: false });
                        this.$store.commit('create_attendance_dialog/update_dialog', { value: false });
                    } else if (data_status.state === 'no_classworks'){
                        this.$store.commit('teacher_streams_page/stream_comp/update_loading_linear', { value: false }) // Update loading linear property from vuex
                        this.$store.commit('teacher_streams_page/stream_comp/update_refresh_data', { value: true }); // Refresh data property from vuex
                        this.$store.commit('teacher_classwork_page/classwork_comp/update_classwork_fetched', { value: 'no_classwork' }); // Classwork fetched property from vuex
                    
                        // Update the err msg dialog through vuex
                        let obj = {
                            value: true,
                            msg: 'Work assigned successfully!',
                            err: false
                        }

                        this.$store.commit(this.$config.VUEX_UPDATE_ERR_MSG_DIALOG, obj);
                        //---------------------------------------------

                        this.can_reset = true;
                        this.assign_btn = true;
                        this.assign_btn_load = false;
                        this.can_assign_work = true;

                        this.reset_dialog_utility();
                        this.$store.commit('create_assignment_dialog/update_dialog', { value: false });
                    }
                } else if (data_status.status === 'not_teacher_of_class'){
                    if (data_status.new_access_token !== null){
                        let environment = this.$config.environment; // Environment mode

                        if (environment === 'development'){
                            localStorage.setItem('access_token', data_status.new_access_token); // Update access token
                        } else if (environment === 'production'){
                            this.$store.commit('app_tokens/update_login_access_token', { value: data_status.new_access_token }); // Update access token
                        }
                    }

                    this.page_view = false; // Hide contents of page

                    this.$store.commit('teacher_streams_page/stream_comp/update_loading_linear', { value: false }) // Update loading linear property from vuex
                    this.$store.commit('teacher_streams_page/stream_comp/update_refresh_data', { value: false }); // Refresh data property from vuex
                    this.$store.commit('teacher_classwork_page/classwork_comp/update_classwork_fetched', { value: false }); // Classwork fetched property from vuex
                    this.$store.commit('teacher_classwork_page/classwork_comp/empty_classwork_for_class', { class_code: class_code }); // Remove the classworks for a particular class from vuex

                    this.$router.push(this.$config.teacher_classesUrl); // Redirect user to teacher classes home page
                } else if (data_status.status === 'class_does_not_exist'){
                    if (data_status.new_access_token !== null){
                        let environment = this.$config.environment; // Environment mode

                        if (environment === 'development'){
                            localStorage.setItem('access_token', data_status.new_access_token); // Update access token
                        } else if (environment === 'production'){
                            this.$store.commit('app_tokens/update_login_access_token', { value: data_status.new_access_token }); // Update access token
                        }
                    }

                    this.page_view = false; // Hide contents of page

                    this.$store.commit('teacher_streams_page/stream_comp/update_loading_linear', { value: false }) // Update loading linear property from vuex
                    this.$store.commit('teacher_streams_page/stream_comp/update_refresh_data', { value: false }); // Refresh data property from vuex
                    this.$store.commit('teacher_classwork_page/classwork_comp/update_classwork_fetched', { value: false }); // Classwork fetched property from vuex
                    this.$store.commit('teacher_classwork_page/classwork_comp/empty_classwork_for_class', { class_code: class_code }); // Remove the classworks for a particular class from vuex

                    this.$router.push(this.$config.teacher_classesUrl); // Redirect user to teacher classes home page
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

                if (route_name === 'teacher-classwork'){
                    this.$store.commit('teacher_streams_page/stream_comp/update_loading_linear', { value: true }) // Update loading linear property from vuex
                    this.$store.commit('teacher_streams_page/stream_comp/update_refresh_data', { value: true }); // Refresh data property from vuex
                    this.$store.commit('teacher_classwork_page/classwork_comp/update_classwork_fetched', { value: false }); // Classwork fetched property from vuex

                    // Update the err msg dialog through vuex
                    let obj = {
                        value: true,
                        msg: 'Couldn\'t assign work!',
                        err: true
                    }

                    this.$store.commit(this.$config.VUEX_UPDATE_ERR_MSG_DIALOG, obj);
                    //---------------------------------------------

                    this.can_reset = true;
                    this.assign_btn = true;
                    this.assign_btn_load = false;
                    this.can_assign_work = true;

                    this.reset_dialog_utility();
                    this.$store.commit('create_assignment_dialog/update_dialog', { value: false });
                }
            }
            //---------------------------------------
        }
        //---------------------------------------------------------------------
    }
}