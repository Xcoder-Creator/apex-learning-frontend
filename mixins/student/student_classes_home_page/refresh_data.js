export default {
    methods: {
        // Refresh the data contents of the page
        async refresh_data(){
            this.$store.commit('snackbar/snackbar/reset_data');
            this.$store.commit('app_components/reset_data'); // Reset app components in vuex
            this.$store.commit('class_details/reset_data'); // Reset class details in vuex
            this.$store.commit('app_components/update_refresh_data', { value: false }); // Prevent user from refreshing data contents
            this.$store.commit('classes_home_page/classes_home_route_config/update_enable_create_class', { value: false }); // Disable the user from createing any class

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
                        access_token: localStorage.getItem('access_token')
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
                    signal: this.controller.signal
                }
                //--------------------------------
            }

            this.$store.commit('student_streams_page/stream_comp/reset_data'); // Reset stream comp data
            this.$store.commit('teacher_streams_page/stream_comp/reset_data'); // Reset stream comp data

            let response = await this.keep_user_logged_in_request(request); // Await response from the backend

            if (response.status === true){
                let data_status = this.keep_user_logged_in_response(response.result); // Validate the response

                // Check the status of the response
                if (data_status.status === 'error'){
                    this.$store.commit('app_components/reset_data'); // Reset app components in vuex
                    this.$store.commit('class_details/reset_data'); // Reset class details in vuex

                    var route_name = this.$route.name; // Name of the current route

                    // Check if the current route is the student or teacher classes home page
                    if (route_name === 'student-classes' || route_name === 'teacher-classes'){
                        this.$store.commit('classes_home_page/utils/update_value', { value: true }); // Update is sncakbar displayed property in vuex

                        let environment = this.$config.environment; // Environment mode

                        if (environment === 'development'){
                            // Update snackbar text from vuex
                            let obj = {
                                value: true,
                                text: data_status.msg
                            }

                            this.$store.commit(this.$config.VUEX_UPDATE_SNACKBAR, obj);
                            //--------------------------------------
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
                                // Update snackbar text from vuex
                                let obj = {
                                    value: true,
                                    text: data_status.msg
                                }

                                this.$store.commit(this.$config.VUEX_UPDATE_SNACKBAR, obj);
                                //--------------------------------------
                            }
                        }
                    } else {
                        // Update snackbar text from vuex
                        let obj = {
                            value: true,
                            text: data_status.msg
                        }

                        this.$store.commit(this.$config.VUEX_UPDATE_SNACKBAR, obj);
                        //--------------------------------------
                    }
                    //-------------------------------------------------
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
                } else if (data_status.status === 'unk_error'){
                    this.$store.commit('app_components/reset_data'); // Reset app components in vuex
                    this.$store.commit('class_details/reset_data'); // Reset class details in vuex

                    var route_name = this.$route.name; // Name of the current route

                    // Check if the current route is the student or teachers classes home page
                    if (route_name === 'student-classes' || route_name === 'teacher-classes'){
                        this.$store.commit('classes_home_page/utils/update_value', { value: true }); // Update is sncakbar displayed property in vuex

                        // Update snackbar text from vuex
                        let obj = {
                            value: true,
                            text: data_status.msg
                        }

                        this.$store.commit(this.$config.VUEX_UPDATE_SNACKBAR, obj);
                        //--------------------------------------
                    } else {
                        // Update snackbar text from vuex
                        let obj = {
                            value: true,
                            text: data_status.msg
                        }

                        this.$store.commit(this.$config.VUEX_UPDATE_SNACKBAR, obj);
                        //--------------------------------------
                    }
                    //-------------------------------------------------
                } else if (data_status.status === 'unauthorized'){
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
                    this.$store.commit(this.$config.VUEX_STORE_USER_DETAILS, data_status.user_details); // Store user details in vuex

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

                    if (this.$route.name === 'student-classes'){
                        this.fetch_class_list(); // A mixin method to fetch all available classes that a user is part of
                    } else if (this.$route.name === 'teacher-classes'){
                        this.teacher_fetch_class_list(null, null, null, null);
                    }
                }
                //--------------------------------------
            } else if (response.status === false){
                this.$store.commit('app_components/reset_data'); // Reset app components in vuex
                this.$store.commit('class_details/reset_data'); // Reset class details in vuex

                var route_name = this.$route.name; // Name of the current route

                // Check if the current route is the student or teacher classes home page
                if (route_name === 'student-classes' || route_name === 'teacher-classes'){
                    this.$store.commit('classes_home_page/utils/update_value', { value: true }); // Update is sncakbar displayed property in vuex

                    // Display snackbar
                    let obj = {
                        value: true,
                        text: 'An error just occured!'
                    }

                    this.$store.commit(this.$config.VUEX_UPDATE_SNACKBAR, obj);
                    //---------------------------

                    this.$store.commit('app_components/update_refresh_data', { value: true }); // Allow user to refresh data contents

                    this.$store.commit('app_components/update_refresh_data', { value: true }); // Allow user to refresh data contents
                    this.$store.commit('app_components/update_loading_linear', { value: true }); // Set loading linear to true
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