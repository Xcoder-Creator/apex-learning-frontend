export default {
    methods: {
        // Edit a particular class
        async edit_class_operation(class_code, class_name, class_section, class_subject, class_room){
            if (class_name === this.$store.state.edit_class_dialog.class_name && class_section === this.$store.state.edit_class_dialog.class_section && class_subject === this.$store.state.edit_class_dialog.class_subject && class_room === this.$store.state.edit_class_dialog.class_room){
                this.$store.commit('classes_home_page/classes_home_route_config/update_enable_edit_class', { value: true }); // Allow the user to edit any class
            } else {
                this.editClass_btn = false; // Edit class button
                this.editClass_btn_load = true; // Edit class button load
                this.$store.commit('app_components/update_refresh_data', { value: false }); // Prevent user from refreshing data contents
                this.$store.commit('archive_a_class/update_started_archive', { value: true }); // Set started archive property from vuex to true
                this.$store.commit('classes_home_page/classes_home_route_config/update_enable_archive_class', { value: false }); // Prevent user from archiving a class
                this.$store.commit('snackbar/snackbar/reset_data');
                this.$store.commit('app_components/update_refresh_data', { value: false }); // Prevent user from refreshing data contents

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
                            class_code: class_code,
                            class_name: class_name,
                            class_section: class_section,
                            class_subject: class_subject,
                            class_room: class_room
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
                            class_code: class_code,
                            class_name: class_name,
                            class_section: class_section,
                            class_subject: class_subject,
                            class_room: class_room
                        }),
                        signal: this.controller.signal
                    }
                    //--------------------------------
                }

                let response = await this.edit_class_request(request); // Await response from the backend

                if (response.status === true){
                    let data_status = this.edit_class_response(response.result); // Validate the response

                    // Check the status of the response
                    if (data_status.status === 'error'){
                        let environment = this.$config.environment; // Environment mode

                        if (environment === 'development'){
                            this.editClass_btn = true; // Edit class button
                            this.editClass_btn_load = false; // Edit class button load
                            this.$store.commit('app_components/update_refresh_data', { value: true }); // Allow user to refresh data contents
                            this.$store.commit('archive_a_class/update_started_archive', { value: false }); // Set started archive property from vuex to false
                            this.$store.commit('classes_home_page/classes_home_route_config/update_enable_edit_class', { value: true }); // Enable user to join class
                            this.$store.commit('classes_home_page/classes_home_route_config/update_enable_archive_class', { value: true }); // Allow user to archive a class

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
                                this.$store.commit('classes_home_page/classes_home_route_config/update_enable_archive_class', { value: false }); // Prevent user from archiving a class
                                this.$store.commit('archive_a_class/update_started_archive', { value: false }); // Set started archive property from vuex to false
                                this.$store.commit(this.$config.VUEX_PAGE_LOADING_UPDATE_DATA, { value: true}); // Set is loading to true
                                this.$router.push('/login/');
                            } else {
                                this.editClass_btn = true; // Edit class button
                                this.editClass_btn_load = false; // Edit class button load
                                this.$store.commit('app_components/update_refresh_data', { value: true }); // Allow user to refresh data contents
                                this.$store.commit('archive_a_class/update_started_archive', { value: false }); // Set started archive property from vuex to false
                                this.$store.commit('classes_home_page/classes_home_route_config/update_enable_edit_class', { value: true }); // Enable user to join class
                                this.$store.commit('classes_home_page/classes_home_route_config/update_enable_archive_class', { value: true }); // Allow user to archive a class

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
                        this.$store.commit('archive_a_class/update_started_archive', { value: false }); // Set started archive property from vuex to false
                        this.$store.commit(this.$config.VUEX_PAGE_LOADING_UPDATE_DATA, { value: true}); // Set is loading to true
                        this.$store.commit('user_details/user_details/reset_data'); // Reset user details from vuex
                        this.$store.commit('class_details/reset_data'); // Reset class details
                        this.$store.commit('app_components/reset_data'); // Reset app components in vuex
                        this.$store.commit('archive_a_class/update_archive_class', { value: false }); // Set archive class property from vuex to false
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
                        this.$store.commit('archive_a_class/update_started_archive', { value: false }); // Set started archive property from vuex to false
                        this.$store.commit(this.$config.VUEX_PAGE_LOADING_UPDATE_DATA, { value: true}); // Set is loading to true
                        this.$store.commit('user_details/user_details/reset_data'); // Reset user details from vuex
                        this.$store.commit('class_details/reset_data'); // Reset class details
                        this.$store.commit('app_components/reset_data'); // Reset app components in vuex
                        this.$store.commit('archive_a_class/update_archive_class', { value: false }); // Set archive class property from vuex to false
                        this.$router.push('/login'); // Redirect user to login page
                    } else if (data_status.status === 'role_error'){
                        let environment = this.$config.environment; // Environment mode

                        if (environment === 'development'){
                            localStorage.removeItem('access_token'); // Remove access token
                            localStorage.removeItem('refresh_token');  // Remove refresh token
                        } else if (environment === 'production'){
                            this.$store.commit('app_tokens/update_login_access_token', { value: null }); // Remove access token
                        }

                        this.$store.commit('logout_user/update_is_logging_out', { value: false }); // Update is logging out property from vuex
                        this.$store.commit('archive_a_class/update_started_archive', { value: false }); // Set started archive property from vuex to false
                        this.$store.commit(this.$config.VUEX_PAGE_LOADING_UPDATE_DATA, { value: true}); // Set is loading to true
                        this.$store.commit('user_details/user_details/reset_data'); // Reset user details from vuex
                        this.$store.commit('class_details/reset_data'); // Reset class details
                        this.$store.commit('app_components/reset_data'); // Reset app components in vuex
                        this.$store.commit('archive_a_class/update_archive_class', { value: false }); // Set archive class property from vuex to false
                        this.$router.push('/login'); // Redirect user to login page
                    } else if (data_status.status === 'success'){
                        this.$store.commit('app_components/update_refresh_data', { value: true }); // Allow user to refresh data contents
                        this.$store.commit('archive_a_class/update_started_archive', { value: false }); // Set started archive property from vuex to false
                        this.$store.commit('classes_home_page/classes_home_route_config/update_enable_archive_class', { value: true }); // Allow user to archive a class

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

                        this.teacher_fetch_class_list(class_code, null, null, true); // Fetch class list
                    }
                    //--------------------------------------
                } else if (response.status === false){
                    this.editClass_btn = true; // Edit class button
                    this.editClass_btn_load = false; // Edit class button load
                    this.$store.commit('app_components/update_refresh_data', { value: true }); // Allow user to refresh data contents
                    this.$store.commit('archive_a_class/update_started_archive', { value: false }); // Set started archive property from vuex to false
                    this.$store.commit('classes_home_page/classes_home_route_config/update_enable_edit_class', { value: true }); // Enable user to join class
                    this.$store.commit('classes_home_page/classes_home_route_config/update_enable_archive_class', { value: true }); // Allow user to archive a class

                    var route_name = this.$route.name; // Name of the current route

                    // Check if the current route is the student classes home page
                    if (route_name === 'teacher-classes' || route_name === 'teacher-stream'){
                        // Update the err msg dialog through vuex
                        let obj = {
                            value: true,
                            msg: 'Couldn\'t edit class!',
                            err: true
                        }

                        this.$store.commit(this.$config.VUEX_UPDATE_ERR_MSG_DIALOG, obj);
                        //---------------------------------------------
                    }
                    //-------------------------------------------------
                }
            }
        }
        //--------------------------------------------------------
    }
}