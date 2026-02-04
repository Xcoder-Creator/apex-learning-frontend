export default {
    methods: {
        // Logout from account mixin method to log a user out of his or her account
        async logout_from_account(){
            this.$store.commit('student_streams_page/stream_comp/update_refresh_data', { value: false }); // Refresh data property from vuex
            this.$store.commit('app_components/update_refresh_data', { value: false }); // Prevent user from refreshing data contents

            let environment = this.$config.environment; // Environment mode
            var request = null;

            if (environment === 'development'){
                if (localStorage.getItem('access_token')){
                    if (localStorage.getItem('refresh_token')){
                        this.$store.commit('logout_user/update_is_logging_out', { value: true }); // Update is logging out property from vuex

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
                        //----------------------------------

                        let response = await this.logout_from_account_request(request); // Await response from the backend

                        // Analyze the response recieved
                        if (response.status === true){
                            let data_status = this.logout_from_account_response(response.result); // Validate the response

                            // Check the status of the response
                            if (data_status.status === 'error'){
                                this.logout_loading = false; // Logout loading property
                                this.$store.commit('dialog/logout_dialog/reset_data'); // Close the logout dialog
                                this.$store.commit('student_streams_page/stream_comp/update_refresh_data', { value: true }); // Refresh data property from vuex
                                this.$store.commit('app_components/update_refresh_data', { value: true }); // Allow user to refresh data contents

                                setTimeout(() => {
                                    this.$store.commit('logout_user/update_is_logging_out', { value: false }); // Update is logging out property from vuex

                                    // Update the err msg dialog through vuex
                                    let obj = {
                                        value: true,
                                        msg: data_status.msg,
                                        err: true
                                    }

                                    this.$store.commit(this.$config.VUEX_UPDATE_ERR_MSG_DIALOG, obj);
                                    //---------------------------------------------
                                }, 200);
                            } else if (data_status.status === 'invalid_token'){
                                // Check for and remove access and refresh tokens if they exist
                                if (localStorage.getItem('access_token')){
                                    localStorage.removeItem('access_token');

                                    if (localStorage.getItem('refresh_token')){
                                        localStorage.removeItem('refresh_token');
                                    }
                                } else if (localStorage.getItem('refresh_token')){
                                    localStorage.removeItem('refresh_token');
                                }
                                //---------------------------------------------------

                                this.$store.commit('logout_user/update_is_logging_out', { value: false }); // Update is logging out property from vuex
                                this.$store.commit('unenroll_from_class/update_started_unenroll', { value: false }); // Set started unenroll property from vuex to false
                                this.$store.commit(this.$config.VUEX_PAGE_LOADING_UPDATE_DATA, { value: true}); // Set is loading to true
                                this.$store.commit('user_details/user_details/reset_data'); // Reset user details from vuex
                                this.$store.commit('class_details/reset_data'); // Reset class details
                                this.$store.commit('app_components/reset_data'); // Reset app components in vuex
                                this.$store.commit('unenroll_from_class/update_unenroll_from_class', { value: false }); // Unenroll from class property update
                                this.$router.push('/login'); // Redirect user to login page
                            } else if (data_status.status === 'token_expired'){
                                // Check for and remove access and refresh tokens if they exist
                                if (localStorage.getItem('access_token')){
                                    localStorage.removeItem('access_token');

                                    if (localStorage.getItem('refresh_token')){
                                        localStorage.removeItem('refresh_token');
                                    }
                                } else if (localStorage.getItem('refresh_token')){
                                    localStorage.removeItem('refresh_token');
                                }
                                //---------------------------------------------------

                                this.$store.commit('logout_user/update_is_logging_out', { value: false }); // Update is logging out property from vuex
                                this.$store.commit('unenroll_from_class/update_started_unenroll', { value: false }); // Set started unenroll property from vuex to false
                                this.$store.commit(this.$config.VUEX_PAGE_LOADING_UPDATE_DATA, { value: true}); // Set is loading to true
                                this.$store.commit('user_details/user_details/reset_data'); // Reset user details from vuex
                                this.$store.commit('class_details/reset_data'); // Reset class details
                                this.$store.commit('app_components/reset_data'); // Reset app components in vuex
                                this.$store.commit('unenroll_from_class/update_unenroll_from_class', { value: false }); // Unenroll from class property update
                                this.$router.push('/login'); // Redirect user to login page
                            } else if (data_status.status === 'success'){
                                // Check for and remove access and refresh tokens if they exist
                                if (localStorage.getItem('access_token')){
                                    localStorage.removeItem('access_token');

                                    if (localStorage.getItem('refresh_token')){
                                        localStorage.removeItem('refresh_token');
                                    }
                                } else if (localStorage.getItem('refresh_token')){
                                    localStorage.removeItem('refresh_token');
                                }
                                //---------------------------------------------------

                                this.$store.commit('logout_user/update_is_logging_out', { value: false }); // Update is logging out property from vuex
                                this.$store.commit('unenroll_from_class/update_started_unenroll', { value: false }); // Set started unenroll property from vuex to false
                                this.$store.commit(this.$config.VUEX_PAGE_LOADING_UPDATE_DATA, { value: true}); // Set is loading to true
                                this.$store.commit('user_details/user_details/reset_data'); // Reset user details from vuex
                                this.$store.commit('class_details/reset_data'); // Reset class details
                                this.$store.commit('app_components/reset_data'); // Reset app components in vuex
                                this.$store.commit('unenroll_from_class/update_unenroll_from_class', { value: false }); // Unenroll from class property update
                                this.$router.push('/login'); // Redirect user to login page
                            }
                            //---------------------------------------
                        } else if (response.status === false){
                            this.$store.commit('logout_user/update_is_logging_out', { value: false }); // Update is logging out property from vuex
                            var route_name = this.$route.name; // Name of the current route

                            this.$store.commit('student_streams_page/stream_comp/update_refresh_data', { value: true }); // Refresh data property from vuex
                            this.$store.commit('app_components/update_refresh_data', { value: true }); // Allow user to refresh data contents

                            // Check if the current route is the student classes home page
                            if (route_name === 'student-classes' || route_name === 'teacher-classes'){
                                this.logout_loading = false; // Logout loading property
                                this.$store.commit('dialog/logout_dialog/reset_data'); // Close the logout dialog

                                setTimeout(() => {
                                    // Update the err msg dialog through vuex
                                    let obj = {
                                        value: true,
                                        msg: 'An error just occured!',
                                        err: true
                                    }

                                    this.$store.commit(this.$config.VUEX_UPDATE_ERR_MSG_DIALOG, obj);
                                    //---------------------------------------------
                                }, 200);
                            }
                            //-------------------------------------------------
                        }
                        //----------------------------------------
                    } else {
                        // Check for and remove access and refresh tokens if they exist
                        if (localStorage.getItem('access_token')){
                            localStorage.removeItem('access_token');

                            if (localStorage.getItem('refresh_token')){
                                localStorage.removeItem('refresh_token');
                            }
                        } else if (localStorage.getItem('refresh_token')){
                            localStorage.removeItem('refresh_token');
                        }
                        //---------------------------------------------------

                        this.$store.commit('unenroll_from_class/update_started_unenroll', { value: false }); // Set started unenroll property from vuex to false
                        this.$store.commit(this.$config.VUEX_PAGE_LOADING_UPDATE_DATA, { value: true}); // Set is loading to true
                        this.$store.commit('user_details/user_details/reset_data'); // Reset user details from vuex
                        this.$store.commit('class_details/reset_data'); // Reset class details
                        this.$store.commit('app_components/reset_data'); // Reset app components in vuex
                        this.$store.commit('unenroll_from_class/update_unenroll_from_class', { value: false }); // Unenroll from class property update
                        this.$router.push('/login'); // Redirect user to login page
                    }
                } else {
                    // Check for and remove access and refresh tokens if they exist
                    if (localStorage.getItem('access_token')){
                        localStorage.removeItem('access_token');

                        if (localStorage.getItem('refresh_token')){
                            localStorage.removeItem('refresh_token');
                        }
                    } else if (localStorage.getItem('refresh_token')){
                        localStorage.removeItem('refresh_token');
                    }
                    //---------------------------------------------------

                    this.$store.commit('unenroll_from_class/update_started_unenroll', { value: false }); // Set started unenroll property from vuex to false
                    this.$store.commit(this.$config.VUEX_PAGE_LOADING_UPDATE_DATA, { value: true}); // Set is loading to true
                    this.$store.commit('user_details/user_details/reset_data'); // Reset user details from vuex
                    this.$store.commit('class_details/reset_data'); // Reset class details
                    this.$store.commit('app_components/reset_data'); // Reset app components in vuex
                    this.$store.commit('unenroll_from_class/update_unenroll_from_class', { value: false }); // Unenroll from class property update
                    this.$router.push('/login'); // Redirect user to login page
                }
            } else if (environment === 'production'){
                let login_access_token = this.$store.state.app_tokens.login_access_token; // Password reset token

                if (login_access_token !== 'TEST_TOKEN'){
                    this.$store.commit('logout_user/update_is_logging_out', { value: true }); // Update is logging out property from vuex

                    // Constructed request object
                    request = {
                        method: 'POST',
                        headers: {
                            Authorization: `Bearer ${ login_access_token }`
                        },
                        signal: this.controller.signal
                    }
                    //----------------------------------

                    let response = await this.logout_from_account_request(request); // Await response from the backend

                    // Analyze the response recieved
                    if (response.status === true){
                        let data_status = this.logout_from_account_response(response.result); // Validate the response

                        // Check the status of the response
                        if (data_status.status === 'error'){
                            this.logout_loading = false; // Logout loading property
                            this.$store.commit('dialog/logout_dialog/reset_data'); // Close the logout dialog
                            this.$store.commit('student_streams_page/stream_comp/update_refresh_data', { value: true }); // Refresh data property from vuex
                            this.$store.commit('app_components/update_refresh_data', { value: true }); // Allow user to refresh data contents

                            setTimeout(() => {
                                this.$store.commit('logout_user/update_is_logging_out', { value: false }); // Update is logging out property from vuex

                                // Update the err msg dialog through vuex
                                let obj = {
                                    value: true,
                                    msg: data_status.msg,
                                    err: true
                                }

                                this.$store.commit(this.$config.VUEX_UPDATE_ERR_MSG_DIALOG, obj);
                                //---------------------------------------------
                            }, 200);
                        } else if (data_status.status === 'invalid_token'){
                            this.$store.commit('app_tokens/update_login_access_token', { value: null }); // Remove access token

                            this.$store.commit('logout_user/update_is_logging_out', { value: false }); // Update is logging out property from vuex
                            this.$store.commit('unenroll_from_class/update_started_unenroll', { value: false }); // Set started unenroll property from vuex to false
                            this.$store.commit(this.$config.VUEX_PAGE_LOADING_UPDATE_DATA, { value: true}); // Set is loading to true
                            this.$store.commit('user_details/user_details/reset_data'); // Reset user details from vuex

                            this.$store.commit('class_details/reset_data'); // Reset class details
                            this.$store.commit('app_components/reset_data'); // Reset app components in vuex
                            this.$store.commit('unenroll_from_class/update_unenroll_from_class', { value: false }); // Unenroll from class property update
                            this.$router.push('/login'); // Redirect user to login page
                        } else if (data_status.status === 'token_expired'){
                            this.$store.commit('app_tokens/update_login_access_token', { value: null }); // Update login access token
                            this.$store.commit('logout_user/update_is_logging_out', { value: false }); // Update is logging out property from vuex
                            this.$store.commit('unenroll_from_class/update_started_unenroll', { value: false }); // Set started unenroll property from vuex to false
                            this.$store.commit(this.$config.VUEX_PAGE_LOADING_UPDATE_DATA, { value: true}); // Set is loading to true
                            this.$store.commit('user_details/user_details/reset_data'); // Reset user details from vuex

                            this.$store.commit('class_details/reset_data'); // Reset class details
                            this.$store.commit('app_components/reset_data'); // Reset app components in vuex
                            this.$store.commit('unenroll_from_class/update_unenroll_from_class', { value: false }); // Unenroll from class property update
                            this.$router.push('/login'); // Redirect user to login page
                        } else if (data_status.status === 'success'){
                            this.$store.commit('app_tokens/update_login_access_token', { value: null }); // Update login access token
                            this.$store.commit('logout_user/update_is_logging_out', { value: false }); // Update is logging out property from vuex
                            this.$store.commit('unenroll_from_class/update_started_unenroll', { value: false }); // Set started unenroll property from vuex to false
                            this.$store.commit(this.$config.VUEX_PAGE_LOADING_UPDATE_DATA, { value: true}); // Set is loading to true
                            this.$store.commit('user_details/user_details/reset_data'); // Reset user details from vuex
                            this.$store.commit('class_details/reset_data'); // Reset class details
                            this.$store.commit('app_components/reset_data'); // Reset app components in vuex

                            this.$store.commit('unenroll_from_class/update_unenroll_from_class', { value: false }); // Unenroll from class property update
                            this.$router.push('/login'); // Redirect user to login page
                        }
                        //---------------------------------------
                    } else if (response.status === false){
                        this.$store.commit('logout_user/update_is_logging_out', { value: false }); // Update is logging out property from vuex
                        var route_name = this.$route.name; // Name of the current route
                        this.$store.commit('student_streams_page/stream_comp/update_refresh_data', { value: true }); // Refresh data property from vuex
                        this.$store.commit('app_components/update_refresh_data', { value: true }); // Allow user to refresh data contents

                        // Check if the current route is the student classes home page
                        if (route_name === 'student-classes' || route_name === 'teacher-classes'){
                            this.logout_loading = false; // Logout loading property
                            this.$store.commit('dialog/logout_dialog/reset_data'); // Close the logout dialog

                            setTimeout(() => {
                                // Update the err msg dialog through vuex
                                let obj = {
                                    value: true,
                                    msg: 'An error just occured!',
                                    err: true
                                }

                                this.$store.commit(this.$config.VUEX_UPDATE_ERR_MSG_DIALOG, obj);
                                //---------------------------------------------
                            }, 200);
                        }
                    }
                    //----------------------------------------
                } else {
                    this.$store.commit('app_tokens/update_login_access_token', { value: null }); // Update login access token
                    this.$store.commit('unenroll_from_class/update_started_unenroll', { value: false }); // Set started unenroll property from vuex to false
                    this.$store.commit(this.$config.VUEX_PAGE_LOADING_UPDATE_DATA, { value: true}); // Set is loading to true
                    this.$store.commit('user_details/user_details/reset_data'); // Reset user details from vuex
                    this.$store.commit('class_details/reset_data'); // Reset class details
                    this.$store.commit('app_components/reset_data'); // Reset app components in vuex
                    this.$store.commit('unenroll_from_class/update_unenroll_from_class', { value: false }); // Unenroll from class property update
                    this.$router.push('/login'); // Redirect user to login page
                }
            }
        }
        //------------------------------------------------------
    }
}