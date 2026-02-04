export default {
    methods: {
        // Fetch archived classes
        async fetch_archived_classes(restore_value, delete_value, edit_class_value){
            this.$store.commit('app_components/update_loading_linear', { value: true });
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
                        'Authorization': `Bearer ${ access_token }`
                    },
                    signal: this.controller.signal
                }
                //--------------------------------
            }

            let response = await this.fetch_archived_classes_request(request); // Await response from the backend

            if (response.status === true){
                let data_status = this.fetch_archived_classes_response(response.result); // Validate the response

                // Check the status of the response
                if (data_status.status === 'error'){
                    this.$store.commit('app_components/update_loading_linear', { value: true });

                    this.$store.commit('archived_classes_page/page_comp/update_is_data_loaded', { value: false });
                    this.$store.commit('archived_classes_page/page_comp/update_is_data_available', { value: false });

                    // Update snackbar text from vuex
                    let obj = {
                        value: true,
                        text: 'An error just occured!'
                    }

                    this.$store.commit(this.$config.VUEX_UPDATE_SNACKBAR, obj);
                    //--------------------------------------
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
                } else if (data_status.status === true){
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

                    this.$store.commit('archived_classes_page/page_comp/update_archived_classes', { archived_classes: data_status.archived_classes });

                    this.$store.commit('archived_classes_page/page_comp/update_is_data_loaded', { value: true });
                    this.$store.commit('archived_classes_page/page_comp/update_is_data_available', { value: true });

                    if (restore_value === true){
                        // Update the err msg dialog through vuex
                        let obj = {
                            value: true,
                            msg: 'Class restored successfully!',
                            err: false
                        }

                        this.$store.commit(this.$config.VUEX_UPDATE_ERR_MSG_DIALOG, obj);
                        //---------------------------------------------
                    }

                    if (delete_value === true){
                        // Update the err msg dialog through vuex
                        let obj = {
                            value: true,
                            msg: 'Class deleted successfully!',
                            err: false
                        }

                        this.$store.commit(this.$config.VUEX_UPDATE_ERR_MSG_DIALOG, obj);
                        //---------------------------------------------
                    }

                    setTimeout(() => {
                        this.$store.commit('app_components/update_loading_linear', { value: false });
                    }, 50);
                } else if (data_status.status === false){
                    this.$store.commit('archived_classes_page/page_comp/update_archived_classes', { archived_classes: [] });

                    this.$store.commit('archived_classes_page/page_comp/update_is_data_loaded', { value: true });
                    this.$store.commit('archived_classes_page/page_comp/update_is_data_available', { value: false });

                    if (restore_value === true){
                        // Update the err msg dialog through vuex
                        let obj = {
                            value: true,
                            msg: 'Class restored successfully!',
                            err: false
                        }

                        this.$store.commit(this.$config.VUEX_UPDATE_ERR_MSG_DIALOG, obj);
                        //---------------------------------------------
                    }

                    if (delete_value === true){
                        // Update the err msg dialog through vuex
                        let obj = {
                            value: true,
                            msg: 'Class deleted successfully!',
                            err: false
                        }

                        this.$store.commit(this.$config.VUEX_UPDATE_ERR_MSG_DIALOG, obj);
                        //---------------------------------------------
                    }

                    setTimeout(() => {
                        this.$store.commit('app_components/update_loading_linear', { value: false });
                    }, 50);
                }
                //--------------------------------------
            } else if (response.status === false){
                var route_name = this.$route.name; // Name of the current route

                // Check if the current route is the student stream page or teacher stream page
                if (route_name === 'student-archived_classes' || route_name === 'teacher-archived_classes'){
                    this.$store.commit('app_components/update_loading_linear', { value: true });

                    this.$store.commit('archived_classes_page/page_comp/update_is_data_loaded', { value: false });
                    this.$store.commit('archived_classes_page/page_comp/update_is_data_available', { value: false });

                    // Update snackbar text from vuex
                    let obj = {
                        value: true,
                        text: 'An error just occured!'
                    }

                    this.$store.commit(this.$config.VUEX_UPDATE_SNACKBAR, obj);
                    //--------------------------------------
                }
                //-------------------------------------------------
            }
        }
        //---------------------------------
    }
}