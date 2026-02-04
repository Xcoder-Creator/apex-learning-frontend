export default {
    methods: {
        // Archive a particular class
        async archive_class_operation(){
            this.$store.commit('app_components/update_loading_linear', { value: true });
            this.$store.commit('app_components/update_refresh_data', { value: false }); // Prevent user from refreshing data contents
            this.$store.commit('archive_a_class/update_started_archive', { value: true }); // Set started archive property from vuex to true
            this.$store.commit('app_components/reset_data'); // Reset app components in vuex
            this.$store.commit('class_details/reset_data'); // Reset class details in vuex

            let class_code = this.$store.state.dialog.archive_dialog.archive_dialog.class_code;

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
                        class_code: class_code
                    }),
                    signal: this.controller.signal
                }
                //--------------------------------
            } else if (environment === 'production'){
                let access_token = this.$store.state.app_tokens.login_access_token;

                // Constructed request object
                request = {
                    method: 'POST',
                    headers: {
                        Authorization: `Bearer ${ access_token }`
                    },
                    body: new URLSearchParams({
                        class_code: class_code
                    }),
                    signal: this.controller.signal
                }
                //--------------------------------
            }

            this.$store.commit('teacher_streams_page/stream_comp/reset_data'); // Reset stream comp data

            let response = await this.archive_class_request(request); // Await response from the backend

            if (response.status === true){
                let data_status = this.archive_class_response(response.result); // Validate the response

                // Check the status of the response
                if (data_status.status === 'error'){
                    if (environment === 'development'){
                        this.archive_class_loading = false;
                        this.$store.commit('archive_a_class/update_started_archive', { value: false }); // Set started archive property from vuex to false
                        this.$store.commit('dialog/archive_dialog/archive_dialog/update_value', { value: false });
                        this.$store.commit('app_components/update_loading_linear', { value: true });
                        this.$store.commit('app_components/update_refresh_data', { value: true }); // Allow user to refresh data contents

                        setTimeout(() => {
                            // Update the err msg dialog through vuex
                            let obj = {
                                value: true,
                                msg: data_status.msg,
                                err: true
                            }

                            this.$store.commit(this.$config.VUEX_UPDATE_ERR_MSG_DIALOG, obj);
                            //---------------------------------------------
                        }, 150);
                    } else if (environment === 'production'){
                        if (data_status.for_prod === true){
                            this.$store.commit('app_tokens/update_login_access_token', { value: null }); // Set login access token
                            this.$store.commit('user_details/user_details/reset_data'); // Reset user details from vuex
                            this.$store.commit('class_details/reset_data'); // Reset class details
                            this.$store.commit('app_components/reset_data'); // Reset app components in vuex
                            this.$store.commit('archive_a_class/update_archive_class', { value: false }); // Archive class property update
                            this.$store.commit('archive_a_class/update_started_archive', { value: false }); // Set started archive property from vuex to false
                            this.$store.commit(this.$config.VUEX_PAGE_LOADING_UPDATE_DATA, { value: true}); // Set is loading to true
                            this.$router.push('/login/');
                        } else {
                            this.archive_class_loading = false;
                            this.$store.commit('archive_a_class/update_started_archive', { value: false }); // Set started archive property from vuex to false
                            this.$store.commit('dialog/archive_dialog/archive_dialog/update_value', { value: false });
                            this.$store.commit('app_components/update_loading_linear', { value: true });
                            this.$store.commit('app_components/update_refresh_data', { value: true }); // Allow user to refresh data contents

                            setTimeout(() => {
                                // Update the err msg dialog through vuex
                                let obj = {
                                    value: true,
                                    msg: data_status.msg,
                                    err: true
                                }

                                this.$store.commit(this.$config.VUEX_UPDATE_ERR_MSG_DIALOG, obj);
                                //---------------------------------------------
                            }, 150);
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
                    this.$store.commit('archive_a_class/update_archive_class', { value: false }); // Archive class property update
                    this.$router.push('/login'); // Redirect user to login page
                } else if (data_status.status === 'token_expired'){
                    this.$store.commit('archive_a_class/update_started_archive', { value: false }); // Set started archive property from vuex to false

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

                    this.$store.commit('archive_a_class/update_archive_class', { value: true }); // Archive class property update
                    this.$store.commit('teacher_people_page/people_comp/update_active_people', { value: [], class_code: class_code }); // Update active people property from vuex
                    this.$store.commit('teacher_people_page/people_comp/update_people_data_array', { value: [] }); // Update people data array property from vuex
                    this.$store.commit('teacher_people_page/people_comp/update_active_teacher', { value: [], class_code: class_code }); // Update active teacher property from vuex
                    this.$store.commit('teacher_people_page/people_comp/update_teacher_data_array', { value: {} }); // Update teacher data array property from vuex
                    this.$store.commit('dialog/comment_dialog/remove_class_comments', { class_code: class_code });

                    this.teacher_fetch_class_list(null, null, null, null); // A mixin method to fetch all available classes that a user is part of
                }
                //--------------------------------------
            } else if (response.status === false){
                this.$store.commit('archive_a_class/update_started_archive', { value: false }); // Set started archive property from vuex to false

                var route_name = this.$route.name; // Name of the current route

                // Check if the current route is the student classes home page
                if (route_name === 'teacher-classes'){
                    this.archive_class_loading = false;
                    this.$store.commit('dialog/archive_dialog/archive_dialog/update_value', { value: false });
                    this.$store.commit('app_components/update_loading_linear', { value: true });

                    setTimeout(() => {
                        // Update the err msg dialog through vuex
                        let obj = {
                            value: true,
                            msg: 'Couldn\'t archive class!',
                            err: true
                        }

                        this.$store.commit(this.$config.VUEX_UPDATE_ERR_MSG_DIALOG, obj);
                        //---------------------------------------------
                    }, 150);

                    this.$store.commit('app_components/update_refresh_data', { value: true }); // Allow user to refresh data contents
                } else {
                    this.$store.commit('app_components/update_refresh_data', { value: true }); // Allow user to refresh data contents
                    this.$store.commit('app_components/update_loading_linear', { value: true }); // Set loading linear to true
                }
                //-------------------------------------------------
            }
        }
        //--------------------------------------------------------
    }
}