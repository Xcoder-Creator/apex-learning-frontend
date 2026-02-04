export default {
    methods: {
        // Teacher delete class mixin method to delete a particular class
        async teacher_delete_class(class_code){
            this.$store.commit('app_components/update_loading_linear', { value: true });
            this.$store.commit('archived_classes_page/page_comp/update_is_data_loaded', { value: false });
            this.$store.commit('archived_classes_page/page_comp/update_is_data_available', { value: false });

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
                        class_code: class_code
                    }),
                    signal: this.controller.signal
                }
                //--------------------------------
            }

            let response = await this.teacher_delete_class_request(request); // Await response from the backend

            // Analyze the response recieved
            if (response.status === true){
                let data_status = this.teacher_delete_class_response(response.result); // Validate the response

                // Check the status of the response
                if (data_status.status === 'error'){
                    let archived_classes = this.$store.state.archived_classes_page.page_comp.archived_classes;

                    if (archived_classes.length > 0){
                        this.$store.commit('app_components/update_loading_linear', { value: false });
                        this.$store.commit('archived_classes_page/page_comp/update_is_data_loaded', { value: true });
                        this.$store.commit('archived_classes_page/page_comp/update_is_data_available', { value: true }); 

                        // Update the err msg dialog through vuex
                        let obj = {
                            value: true,
                            msg: 'Error, couldn\'t delete class',
                            err: true
                        }

                        this.$store.commit(this.$config.VUEX_UPDATE_ERR_MSG_DIALOG, obj);
                        //---------------------------------------------
                    } else {
                        this.$store.commit('app_components/update_loading_linear', { value: true });
                        this.$store.commit('archived_classes_page/page_comp/update_is_data_loaded', { value: false });
                        this.$store.commit('archived_classes_page/page_comp/update_is_data_available', { value: false });

                        // Update the err msg dialog through vuex
                        let obj = {
                            value: true,
                            msg: 'Error, couldn\'t delete class',
                            err: true
                        }

                        this.$store.commit(this.$config.VUEX_UPDATE_ERR_MSG_DIALOG, obj);
                        //---------------------------------------------
                    }                   
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

                    this.teacher_fetch_class_list(class_code, null, true, null); // Fetch class list
                } else if (data_status.status === 'not_allowed'){
                    let archived_classes = this.$store.state.archived_classes_page.page_comp.archived_classes;

                    if (archived_classes.length > 0){
                        this.$store.commit('app_components/update_loading_linear', { value: false });
                        this.$store.commit('archived_classes_page/page_comp/update_is_data_loaded', { value: true });
                        this.$store.commit('archived_classes_page/page_comp/update_is_data_available', { value: true }); 

                        // Update the err msg dialog through vuex
                        let obj = {
                            value: true,
                            msg: 'Error, couldn\'t delete class',
                            err: true
                        }

                        this.$store.commit(this.$config.VUEX_UPDATE_ERR_MSG_DIALOG, obj);
                        //---------------------------------------------
                    } else {
                        this.$store.commit('app_components/update_loading_linear', { value: true });
                        this.$store.commit('archived_classes_page/page_comp/update_is_data_loaded', { value: false });
                        this.$store.commit('archived_classes_page/page_comp/update_is_data_available', { value: false });
                        
                        // Update the err msg dialog through vuex
                        let obj = {
                            value: true,
                            msg: 'Error, couldn\'t delete class',
                            err: true
                        }

                        this.$store.commit(this.$config.VUEX_UPDATE_ERR_MSG_DIALOG, obj);
                        //---------------------------------------------
                    }                   
                } else if (data_status.status === 'class_does_not_exist'){
                    if (data_status.new_access_token !== null){
                        let environment = this.$config.environment; // Environment mode

                        if (environment === 'development'){
                            localStorage.setItem('access_token', data_status.new_access_token); // Update access token
                        } else if (environment === 'production'){
                            this.$store.commit('app_tokens/update_login_access_token', { value: data_status.new_access_token }); // Update access token
                        }
                    }

                    let archived_classes = this.$store.state.archived_classes_page.page_comp.archived_classes;

                    if (archived_classes.length > 0){
                        this.$store.commit('app_components/update_loading_linear', { value: false });
                        this.$store.commit('archived_classes_page/page_comp/update_is_data_loaded', { value: true });
                        this.$store.commit('archived_classes_page/page_comp/update_is_data_available', { value: true }); 

                        // Update the err msg dialog through vuex
                        let obj = {
                            value: true,
                            msg: 'Error, couldn\'t delete class',
                            err: true
                        }

                        this.$store.commit(this.$config.VUEX_UPDATE_ERR_MSG_DIALOG, obj);
                        //---------------------------------------------
                    } else {
                        this.$store.commit('app_components/update_loading_linear', { value: true });
                        this.$store.commit('archived_classes_page/page_comp/update_is_data_loaded', { value: false });
                        this.$store.commit('archived_classes_page/page_comp/update_is_data_available', { value: false });
                        
                        // Update the err msg dialog through vuex
                        let obj = {
                            value: true,
                            msg: 'Error, couldn\'t delete class',
                            err: true
                        }

                        this.$store.commit(this.$config.VUEX_UPDATE_ERR_MSG_DIALOG, obj);
                        //---------------------------------------------
                    }                   
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
                    this.$store.commit('user_details/user_details/reset_data'); // Reset user details
                    this.$router.push('/login/'); // Redirect the user to the login page
                }
                //--------------------------------------
            } else if (response.status === false){
                let route_name = this.$route.name;

                if (route_name === 'teacher-archived_classes'){
                    let archived_classes = this.$store.state.archived_classes_page.page_comp.archived_classes;

                    if (archived_classes.length > 0){
                        this.$store.commit('app_components/update_loading_linear', { value: false });
                        this.$store.commit('archived_classes_page/page_comp/update_is_data_loaded', { value: true });
                        this.$store.commit('archived_classes_page/page_comp/update_is_data_available', { value: true }); 

                        // Update the err msg dialog through vuex
                        let obj = {
                            value: true,
                            msg: 'Error, couldn\'t delete class',
                            err: true
                        }

                        this.$store.commit(this.$config.VUEX_UPDATE_ERR_MSG_DIALOG, obj);
                        //---------------------------------------------
                    } else {
                        this.$store.commit('app_components/update_loading_linear', { value: true });
                        this.$store.commit('archived_classes_page/page_comp/update_is_data_loaded', { value: false });
                        this.$store.commit('archived_classes_page/page_comp/update_is_data_available', { value: false });
                        
                        // Update the err msg dialog through vuex
                        let obj = {
                            value: true,
                            msg: 'Error, couldn\'t delete class',
                            err: true
                        }

                        this.$store.commit(this.$config.VUEX_UPDATE_ERR_MSG_DIALOG, obj);
                        //---------------------------------------------
                    }       
                }
            }
            //---------------------------------------
        }
        //---------------------------------------------------------------------
    }
}