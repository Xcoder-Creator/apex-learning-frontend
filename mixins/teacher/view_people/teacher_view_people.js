export default {
    methods: {
        // Get all students and teacher of a particular class
        async teacher_view_people(class_code){
            this.$store.commit('teacher_streams_page/stream_comp/update_loading_linear', { value: true }) // Update loading linear property from vuex
            this.$store.commit('teacher_streams_page/stream_comp/update_refresh_data', { value: false }); // Refresh data property from vuex
            this.$store.commit('teacher_people_page/people_comp/update_people_data_fetched', { value: false }); // People fetched property from vuex

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

            let response = await this.teacher_view_people_request(request); // Await response from the backend

            // Analyze the response recieved
            if (response.status === true){
                let data_status = this.teacher_view_people_response(response.result); // Validate the response

                // Check the status of the response
                if (data_status.status === 'error'){
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

                    // Check if the user is making use of a student or teachers account
                    if (this.$store.state.user_details.user_details.details.user_role === 'Student'){
                        this.$router.push(this.$config.student_classesUrl); // Redirect user to student classes home page
                    } else if (this.$store.state.user_details.user_details.details.user_role === 'Teacher'){
                        this.$router.push(this.$config.teacher_classesUrl); // Redirect user to teacher classes home page
                    }
                    //--------------------------------------------------------
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
                    this.$store.commit('teacher_streams_page/stream_comp/reset_data'); // Reset data
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

                    if (data_status.value === 'data_available'){
                        this.$store.commit('teacher_people_page/people_comp/update_active_people', { value: data_status.students, class_code: class_code }); // Update active people property from vuex
                        this.$store.commit('teacher_people_page/people_comp/update_people_data_array', { value: data_status.students }); // Update people data array property from vuex
                        this.$store.commit('teacher_people_page/people_comp/update_active_teacher', { value: data_status.teacher, class_code: class_code }); // Update active teacher property from vuex
                        this.$store.commit('teacher_people_page/people_comp/update_teacher_data_array', { value: data_status.teacher }); // Update teacher data array property from vuex
                        this.$store.commit('teacher_streams_page/stream_comp/update_loading_linear', { value: false }) // Update loading linear property from vuex
                        this.$store.commit('teacher_streams_page/stream_comp/update_refresh_data', { value: true }); // Refresh data property from vuex
                        this.$store.commit('teacher_people_page/people_comp/update_people_data_fetched', { value: true }); // People fetched property from vuex
                    } else if (data_status.value === 'no_data'){
                        this.$store.commit('teacher_people_page/people_comp/update_active_people', { value: [], class_code: class_code }); // Update active people property from vuex
                        this.$store.commit('teacher_people_page/people_comp/update_people_data_array', { value: [] }); // Update people data array property from vuex
                        this.$store.commit('teacher_people_page/people_comp/update_active_teacher', { value: data_status.teacher, class_code: class_code }); // Update active teacher property from vuex
                        this.$store.commit('teacher_people_page/people_comp/update_teacher_data_array', { value: data_status.teacher }); // Update teacher data array property from vuex
                        this.$store.commit('teacher_streams_page/stream_comp/update_loading_linear', { value: false }) // Update loading linear property from vuex
                        this.$store.commit('teacher_streams_page/stream_comp/update_refresh_data', { value: true }); // Refresh data property from vuex
                        this.$store.commit('teacher_people_page/people_comp/update_people_data_fetched', { value: true }); // People fetched property from vuex
                    }
                } else if (data_status.status === 'not_part_of_class'){
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

                    // Check if the user is making use of a student or teachers account
                    if (this.$store.state.user_details.user_details.details.user_role === 'Student'){
                        this.$router.push(this.$config.student_classesUrl); // Redirect user to student classes home page
                    } else if (this.$store.state.user_details.user_details.details.user_role === 'Teacher'){
                        this.$router.push(this.$config.teacher_classesUrl); // Redirect user to teacher classes home page
                    }
                    //--------------------------------------------------------
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

                    // Check if the user is making use of a student or teachers account
                    if (this.$store.state.user_details.user_details.details.user_role === 'Student'){
                        this.$router.push(this.$config.student_classesUrl); // Redirect user to student classes home page
                    } else if (this.$store.state.user_details.user_details.details.user_role === 'Teacher'){
                        this.$router.push(this.$config.teacher_classesUrl); // Redirect user to teacher classes home page
                    }
                    //--------------------------------------------------------
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
                    this.$store.commit('teacher_streams_page/stream_comp/reset_data'); // Reset data
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
                    this.$store.commit('teacher_streams_page/stream_comp/reset_data'); // Reset data
                    this.$store.commit('teacher_people_page/people_comp/reset_data'); // Reset data
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
                    this.$store.commit('teacher_streams_page/stream_comp/reset_data'); // Reset data
                    this.$store.commit('teacher_people_page/people_comp/reset_data'); // Reset data
                    this.$store.commit('user_details/user_details/reset_data'); // Reset user details
                    this.$router.push('/login/'); // Redirect the user to the login page
                }
                //--------------------------------------
            } else if (response.status === false){
                let route_name = this.$route.name;

                if (route_name === 'teacher-people'){
                    this.$store.commit('teacher_streams_page/stream_comp/update_loading_linear', { value: true }) // Update loading linear property from vuex
                    this.$store.commit('teacher_streams_page/stream_comp/update_refresh_data', { value: true }); // Refresh data property from vuex
                    this.$store.commit('teacher_people_page/people_comp/update_people_data_fetched', { value: false }); // People fetched property from vuex

                    // Update snackbar text from vuex
                    let obj = {
                        value: true,
                        text: 'An error just occured!'
                    }

                    this.$store.commit(this.$config.VUEX_UPDATE_SNACKBAR, obj);
                    //--------------------------------------
                }
            }
            //---------------------------------------
        }
        //---------------------------------------------------------------------
    }
}