export default {
    methods: {
        // Refresh the data contents of the page
        async refresh_data(){
            let refresh_data = this.$store.state.student_streams_page.stream_comp.refresh_data; // Refresh data property from vuex

            if (refresh_data === true){
                if (this.$route.query.class_code){
                    let class_code = this.$route.query.class_code; // Class code

                    // Display snackbar
                    let obj = {
                        value: false,
                        text: 'An error just occured!'
                    }

                    this.$store.commit(this.$config.VUEX_UPDATE_SNACKBAR, obj);
                    //---------------------------

                    if (this.$route.name === 'student-stream'){
                        this.$store.commit('student_streams_page/stream_comp/update_loaded_posts', { value: false }); // Update loaded posts from vuex
                        this.$store.commit('student_streams_page/stream_comp/update_loading_linear', { value: true }); // Update loading linear from vuex
                        this.$store.commit('student_streams_page/stream_comp/remove_class_post', { class_code: class_code }); // Remove class posts from vuex
                        this.$store.commit('student_streams_page/stream_comp/update_posts_array', { value: [] }); // Update posts array from vuex
                        this.$store.commit('student_streams_page/stream_comp/remove_upcoming_work_data', { class_code: class_code }); // Remove upcoming work data from vuex
                        this.$store.commit('student_streams_page/stream_comp/update_refresh_data', { value: false }); // Refresh data property from vuex
                        this.$store.commit('student_streams_page/stream_comp/update_can_create_post', { value: false });
                        this.$store.commit('student_streams_page/student_stream_route_config/update_fetch_more_posts', { value: false });
                        this.$store.commit('student_streams_page/stream_comp/update_spinner', { value: false });
                        this.$store.commit('student_streams_page/student_stream_route_config/update_delete_class_post', { value: false });
                    } else if (this.$route.name === 'student-people'){
                        this.$store.commit('student_people_page/people_comp/update_people_data_fetched', { value: false }); // People data fetched property from vuex
                        this.$store.commit('student_streams_page/stream_comp/update_loading_linear', { value: true }) // Update loading linear property from vuex
                        this.$store.commit('student_streams_page/stream_comp/update_refresh_data', { value: false }); // Refresh data property from vuex
                        this.$store.commit('student_people_page/people_comp/update_active_people', { value: [], class_code: class_code }); // Update active people property from vuex
                        this.$store.commit('student_people_page/people_comp/update_people_data_array', { value: [] }); // Update people data array property from vuex
                        this.$store.commit('student_people_page/people_comp/update_active_teacher', { value: [], class_code: class_code }); // Update active teacher property from vuex
                        this.$store.commit('student_people_page/people_comp/update_teacher_data_array', { value: {} }); // Update teacher data array property from vuex
                    } else if (this.$route.name === 'student-view_classwork'){
                        this.$store.commit('student_streams_page/stream_comp/update_loading_linear', { value: true }) // Update loading linear property from vuex
                        this.$store.commit('student_streams_page/stream_comp/update_refresh_data', { value: false }); // Refresh data property from vuex
                        this.$store.commit('student_view_classwork_page/classwork_details_comp/reset_data'); // Reset classwork details
                        this.$store.commit('dialog/student_private_comment_dialog/reset_data');
                    }

                    if (this.$route.name === 'student-people'){
                        this.student_people_refresh_page(class_code); // Refresh student people page
                    } else if (this.$route.name === 'student-classwork'){
                        this.student_classwork_refresh_page(class_code); // Refresh student classwork page
                    } else if (this.$route.name === 'student-view_classwork'){
                        if (this.$route.query.id){
                            this.student_view_classwork_refresh_page(class_code, this.$route.query.id);
                        } else {
                            if (this.$store.state.user_details.user_details.is_logged_in === true){
                                this.$router.push(this.$config.teacher_classesUrl); // Redirect user to teacher classes home page
                            } else {
                                let environment = this.$config.environment; // Environment mode
        
                                if (environment === 'development'){
                                    localStorage.removeItem('access_token'); // Remove access token
                                    localStorage.removeItem('refresh_token');  // Remove refresh token
                                } else if (environment === 'production'){
                                    this.$store.commit('app_tokens/update_login_access_token', { value: null }); // Remove access token
                                }
        
                                this.$store.commit('page_loading/page_loading/update_data', { value: true }); // Page loading
                                this.$store.commit('teacher_streams_page/stream_comp/reset_data'); // Reset data
                                this.$store.commit('user_details/user_details/reset_data'); // Reset user details
                                this.$router.push('/login/'); // Redirect the user to the login page
                            }
                        }
                    } else if (this.$route.name === 'student-stream'){
                        let environment = this.$config.environment; // Environment mode
                        var request = null;

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
                            //----------------------------------
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
                            //----------------------------------
                        }

                        let response = await this.keep_user_logged_in_request(request); // Await response from the backend

                        if (response.status === true){
                            let data_status = this.keep_user_logged_in_response(response.result); // Validate the response

                            // Check the status of the response
                            if (data_status.status === 'error'){
                                this.$store.commit('student_streams_page/stream_comp/update_refresh_data', { value: true }); // Refresh data property from vuex
                                this.$store.commit('student_streams_page/stream_comp/update_can_create_post', { value: false });
                                this.$store.commit('student_streams_page/student_stream_route_config/update_fetch_more_posts', { value: false });
                                this.$store.commit('student_streams_page/stream_comp/update_spinner', { value: false });
                                this.$store.commit('student_streams_page/student_stream_route_config/update_delete_class_post', { value: false });

                                // Display snackbar
                                let obj = {
                                    value: true,
                                    text: 'An error just occured!'
                                }

                                this.$store.commit(this.$config.VUEX_UPDATE_SNACKBAR, obj);
                                //---------------------------
                            } else if (data_status.status === 'token_expired'){
                                let environment = this.$config.environment; // Environment mode

                                if (environment === 'development'){
                                    localStorage.removeItem('access_token'); // Remove access token
                                    localStorage.removeItem('refresh_token');  // Remove refresh token
                                } else if (environment === 'production'){
                                    this.$store.commit('app_tokens/update_login_access_token', { value: null }); // Remove access token
                                }

                                this.$store.commit('page_loading/page_loading/update_data', { value: true }); // Page loading
                                this.$store.commit('student_streams_page/stream_comp/reset_data'); // Reset data
                                this.$store.commit('user_details/user_details/reset_data'); // Reset user details
                                this.$router.push('/login/'); // Redirect the user to the login page
                            } else if (data_status.status === 'unk_error'){
                                if (this.$store.state.user_details.user_details.is_logged_in === true){
                                    if (this.$store.state.user_details.user_details.details.user_role === 'Student'){
                                        this.$router.push(this.$config.student_classesUrl); // Redirect user to student classes home page
                                    } else if (this.$store.state.user_details.user_details.details.user_role === 'Teacher'){
                                        this.$router.push(this.$config.teacher_classesUrl); // Redirect user to teacher classes home page
                                    }
                                } else {
                                    let environment = this.$config.environment; // Environment mode

                                    if (environment === 'development'){
                                        localStorage.removeItem('access_token'); // Remove access token
                                        localStorage.removeItem('refresh_token');  // Remove refresh token
                                    } else if (environment === 'production'){
                                        this.$store.commit('app_tokens/update_login_access_token', { value: null }); // Remove access token
                                    }

                                    this.$store.commit('page_loading/page_loading/update_data', { value: true }); // Page loading
                                    this.$store.commit('student_streams_page/stream_comp/reset_data'); // Reset data
                                    this.$store.commit('user_details/user_details/reset_data'); // Reset user details
                                    this.$router.push('/login/'); // Redirect the user to the login page
                                }
                            } else if (data_status.status === 'unauthorized'){
                                let environment = this.$config.environment; // Environment mode

                                if (environment === 'development'){
                                    localStorage.removeItem('access_token'); // Remove access token
                                    localStorage.removeItem('refresh_token');  // Remove refresh token
                                } else if (environment === 'production'){
                                    this.$store.commit('app_tokens/update_login_access_token', { value: null }); // Remove access token
                                }

                                this.$store.commit('page_loading/page_loading/update_data', { value: true }); // Page loading
                                this.$store.commit('student_streams_page/stream_comp/reset_data'); // Reset data
                                this.$store.commit('user_details/user_details/reset_data'); // Reset user details
                                this.$router.push('/login/'); // Redirect the user to the login page
                            } else if (data_status.status === 'success'){
                                this.$store.commit('dialog/comment_dialog/reset_data');
                                this.$store.commit(this.$config.VUEX_STORE_USER_DETAILS, data_status.user_details); // Store user details in vuex

                                // Check if there was an access token gotten from the backend
                                if (data_status.access_token !== null){
                                    let environment = this.$config.environment; // Environment mode

                                    if (environment === 'development'){
                                        localStorage.setItem('access_token', data_status.access_token); // Update access token
                                    } else if (environment === 'production'){
                                        this.$store.commit('app_tokens/update_login_access_token', { value: data_status.access_token }); // Update access token
                                    }
                                }
                                //-----------------------------------------

                                this.fetch_class_posts(class_code, 0); // Fetch class posts
                            }
                            //--------------------------------------
                        } else if (response.status === false){
                            this.$store.commit('student_streams_page/stream_comp/update_refresh_data', { value: true }); // Refresh data property from vuex
                            this.$store.commit('student_streams_page/stream_comp/update_can_create_post', { value: false });
                            this.$store.commit('student_streams_page/student_stream_route_config/update_fetch_more_posts', { value: false });
                            this.$store.commit('student_streams_page/stream_comp/update_spinner', { value: false });
                            this.$store.commit('student_streams_page/student_stream_route_config/update_delete_class_post', { value: false });

                            // Display snackbar
                            let obj = {
                                value: true,
                                text: 'An error just occured!'
                            }

                            this.$store.commit(this.$config.VUEX_UPDATE_SNACKBAR, obj);
                            //---------------------------
                        }
                        //------------------------------------------
                    }
                } else {
                    if (this.$store.state.user_details.user_details.is_logged_in === true){
                        if (this.$store.state.user_details.user_details.details.user_role === 'Student'){
                            this.$router.push(this.$config.student_classesUrl); // Redirect user to student classes home page
                        } else if (this.$store.state.user_details.user_details.details.user_role === 'Teacher'){
                            this.$router.push(this.$config.teacher_classesUrl); // Redirect user to teacher classes home page
                        }
                    } else {
                        let environment = this.$config.environment; // Environment mode

                        if (environment === 'development'){
                            localStorage.removeItem('access_token'); // Remove access token
                            localStorage.removeItem('refresh_token');  // Remove refresh token
                        } else if (environment === 'production'){
                            this.$store.commit('app_tokens/update_login_access_token', { value: null }); // Remove access token
                        }

                        this.$store.commit('page_loading/page_loading/update_data', { value: true }); // Page loading
                        this.$store.commit('student_streams_page/stream_comp/reset_data'); // Reset data
                        this.$store.commit('user_details/user_details/reset_data'); // Reset user details
                        this.$router.push('/login/'); // Redirect the user to the login page
                    }
                }
            } else if (refresh_data === false){
                this.$store.commit('dialog/msg_dialog/update_dialog', { value: true, msg: 'Can\'t refresh at this point!' }); // Display the msg dialog
            }
        }
        //--------------------------------------------------------
    }
}