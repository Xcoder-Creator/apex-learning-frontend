export default {
    methods: {
        // Add a user to a particular class
        async join_class_operation(class_code){
            this.classCode_btn = false; // Class code button
            this.classCode_btn_load = true; // Class code button load
            this.$store.commit('app_components/update_refresh_data', { value: false }); // Prevent user from refreshing data contents
            this.$store.commit('unenroll_from_class/update_started_unenroll', { value: true }); // Set started unenroll property from vuex to true
            this.$store.commit('classes_home_page/classes_home_route_config/update_enable_unenroll_user', { value: false }); // Prevent user from unenrolling from a class

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
                        class_code: class_code
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
                        class_code: class_code
                    }),
                    signal: this.controller.signal
                }
                //--------------------------------
            }

            this.$store.commit('student_streams_page/stream_comp/reset_data'); // Reset stream comp data

            let response = await this.join_class_request(request); // Await response from the backend

            if (response.status === true){
                let data_status = this.join_class_response(response.result); // Validate the response

                // Check the status of the response
                if (data_status.status === 'error'){
                    let environment = this.$config.environment; // Environment mode

                    if (environment === 'development'){
                        this.classCode_btn = true; // Class code button
                        this.classCode_btn_load = false; // Class code button load
                        this.$store.commit('app_components/update_refresh_data', { value: true }); // Allow user to refresh data contents
                        this.$store.commit('unenroll_from_class/update_started_unenroll', { value: false }); // Set started unenroll property from vuex to false
                        this.$store.commit('classes_home_page/classes_home_route_config/update_enable_join_class', { value: true }); // Enable user to join class
                        this.$store.commit('classes_home_page/classes_home_route_config/update_enable_unenroll_user', { value: true }); // Allow user to unenroll from a class

                        // Update the err msg dialog through vuex
                        let obj = {
                            value: true,
                            msg: data_status.msg,
                            err: true
                        }

                        this.$store.commit(this.$config.VUEX_UPDATE_ERR_MSG_DIALOG, obj);
                        //---------------------------------------------
                    } else if (environment === 'production'){
                        if (data_status.for_prod === true){
                            this.$store.commit('app_tokens/update_login_access_token', { value: null }); // Set login access token
                            this.$store.commit('user_details/user_details/reset_data'); // Reset user details from vuex
                            this.$store.commit('class_details/reset_data'); // Reset class details
                            this.$store.commit('app_components/reset_data'); // Reset app components in vuex
                            this.$store.commit('unenroll_from_class/update_unenroll_from_class', { value: false }); // Unenroll from class property update
                            this.$store.commit('unenroll_from_class/update_started_unenroll', { value: false }); // Set started unenroll property from vuex to false
                            this.$store.commit(this.$config.VUEX_PAGE_LOADING_UPDATE_DATA, { value: true}); // Set is loading to true
                            this.$router.push('/login/');
                        } else {
                            this.classCode_btn = true; // Class code button
                            this.classCode_btn_load = false; // Class code button load
                            this.$store.commit('app_components/update_refresh_data', { value: true }); // Allow user to refresh data contents
                            this.$store.commit('unenroll_from_class/update_started_unenroll', { value: false }); // Set started unenroll property from vuex to false
                            this.$store.commit('classes_home_page/classes_home_route_config/update_enable_join_class', { value: true }); // Enable user to join class
                            this.$store.commit('classes_home_page/classes_home_route_config/update_enable_unenroll_user', { value: true }); // Allow user to unenroll from a class

                            // Update the err msg dialog through vuex
                            let obj = {
                                value: true,
                                msg: data_status.msg,
                                err: true
                            }

                            this.$store.commit(this.$config.VUEX_UPDATE_ERR_MSG_DIALOG, obj);
                            //---------------------------------------------
                        }
                    }
                } else if (data_status.status === 'invalid_token'){
                    let environment = this.$config.environment; // Environment mode

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
                } else if (data_status.status === 'token_expired'){
                    let environment = this.$config.environment; // Environment mode

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
                } else if (data_status.status === 'already_joined_class'){
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

                    this.classCode_btn = true; // Class code button
                    this.classCode_btn_load = false; // Class code button load
                    this.$store.commit('app_components/update_refresh_data', { value: true }); // Allow user to refresh data contents
                    this.$store.commit('unenroll_from_class/update_started_unenroll', { value: false }); // Set started unenroll property from vuex to false
                    this.$store.commit('classes_home_page/classes_home_route_config/update_enable_join_class', { value: true }); // Enable user to join class
                    this.$store.commit('classes_home_page/classes_home_route_config/update_enable_unenroll_user', { value: true }); // Allow user to unenroll from a class

                    // Update the err msg dialog through vuex
                    let obj = {
                        value: true,
                        msg: data_status.msg,
                        err: true
                    }

                    this.$store.commit(this.$config.VUEX_UPDATE_ERR_MSG_DIALOG, obj);
                    //---------------------------------------------
                } else if (data_status.status === 'role_error'){
                    let environment = this.$config.environment; // Environment mode

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
                    this.$store.commit('dialog/comment_dialog/reset_data');
                    this.classCode_btn = true; // Class code button
                    this.classCode_btn_load = false; // Class code button load
                    this.$store.commit('app_components/update_refresh_data', { value: true }); // Allow user to refresh data contents
                    this.$store.commit('unenroll_from_class/update_started_unenroll', { value: false }); // Set started unenroll property from vuex to false
                    this.$store.commit('classes_home_page/classes_home_route_config/update_enable_unenroll_user', { value: true }); // Allow user to unenroll from a class

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

                    this.$store.commit('app_components/update_is_data_loaded', { value: true }); // Set is data loaded to true
                    this.$store.commit('class_details/update_class_data', { value: data_status.class_data.length }); // No of classes

                    // Check the number of classes that the user is a part of
                    if (data_status.class_data.length > 0){
                        this.$store.commit('app_components/update_is_data_available', { value: true });
                    } else {
                        this.$store.commit('app_components/update_is_data_available', { value: false });
                    }
                    //-------------------------------------------

                    this.$store.commit('class_details/update_class_list', { details: data_status.class_data }); // Update the class list from vuex

                    let class_array = this.$store.state.class_details.class_list; // Class list
                    let class_info = []; // Class info for a particular class

                    // Check if the number of classes is greater than zero
                    if (class_array.length > 0){
                        class_array.forEach(class_data => {
                            if (class_data.class_code === class_code){
                                class_info.push(class_data);
                            }
                        });

                        if (class_info.length > 0 && class_info.length === 1){
                            this.$store.commit('class_id/update_class_id', { value: class_info[0].id });
                        }
                    }
                    //--------------------------------------------

                    setTimeout(() => {
                        this.$router.push(`/student/stream?class_code=${ data_status.class_code }`); // Redirect user to the student stream page
                    }, 50);
                }
                //--------------------------------------
            } else if (response.status === false){
                this.classCode_btn = true; // Class code button
                this.classCode_btn_load = false; // Class code button load
                this.$store.commit('app_components/update_refresh_data', { value: true }); // Allow user to refresh data contents
                this.$store.commit('unenroll_from_class/update_started_unenroll', { value: false }); // Set started unenroll property from vuex to false
                this.$store.commit('classes_home_page/classes_home_route_config/update_enable_join_class', { value: true }); // Enable user to join class
                this.$store.commit('classes_home_page/classes_home_route_config/update_enable_unenroll_user', { value: true }); // Allow user to unenroll from a class

                var route_name = this.$route.name; // Name of the current route

                // Check if the current route is the student classes home page
                if (route_name === 'student-classes'){
                    // Update the err msg dialog through vuex
                    let obj = {
                        value: true,
                        msg: 'Couldn\'t join class!',
                        err: true
                    }

                    this.$store.commit(this.$config.VUEX_UPDATE_ERR_MSG_DIALOG, obj);
                    //---------------------------------------------
                }
                //-------------------------------------------------
            }
        }
        //--------------------------------------------------------
    }
}