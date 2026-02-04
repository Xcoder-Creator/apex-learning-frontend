export default {
    methods: {
        // Student view classwork refresh page mixin method to fetch the details of a particular classwork
        async student_view_classwork_refresh_page(class_code, classwork_id){
            this.$store.commit('student_streams_page/stream_comp/update_loading_linear', { value: true }); // Update loading linear property from vuex
            this.$store.commit('student_streams_page/stream_comp/update_refresh_data', { value: false }); // Refresh data property from vuex
            this.$store.commit('student_view_classwork_page/classwork_details_comp/update_classwork_details_fetched', { value: false }); // Classwork details fetched property from vuex
            this.$store.commit('student_view_classwork_page/classwork_details_comp/empty_classwork_details_for_class'); // Remove the classwork details for a particular class from vuex

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
                        class_code: class_code,
                        classwork_id: classwork_id
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
                        class_code: class_code,
                        classwork_id: classwork_id
                    }),
                    signal: this.controller.signal
                }
                //--------------------------------
            }

            let response = await this.student_fetch_classwork_details_request(request); // Await response from the backend

            // Analyze the response recieved
            if (response.status === true){
                let data_status = this.student_fetch_classwork_details_response(response.result); // Validate the response

                // Check the status of the response
                if (data_status.status === 'error'){
                    this.$store.commit('student_streams_page/stream_comp/update_loading_linear', { value: true }) // Update loading linear property from vuex
                    this.$store.commit('student_streams_page/stream_comp/update_refresh_data', { value: true }); // Refresh data property from vuex
                    this.$store.commit('student_view_classwork_page/classwork_details_comp/update_classwork_details_fetched', { value: false }); // Classwork details fetched property from vuex
                    this.$store.commit('student_view_classwork_page/classwork_details_comp/empty_classwork_details_for_class'); // Remove the classwork details for a particular class from vuex

                    // Update snackbar text from vuex
                    let obj = {
                        value: true,
                        text: 'An error just occured!'
                    }

                    this.$store.commit(this.$config.VUEX_UPDATE_SNACKBAR, obj);
                    //--------------------------------------
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

                    this.$store.commit('student_view_classwork_page/classwork_details_comp/update_classwork_details_fetched', { value: true }); // Update classwork details fetched

                    let details = data_status;

                    let data = {
                        classwork_type: details.classwork_type,
                        classwork_title: details.classwork_title,
                        date_created: details.date_created,
                        user_name: details.user_name,
                        classwork_points: details.classwork_points,
                        classwork_due_date_time: details.classwork_due_date_time,
                        classwork_instruction: details.classwork_instruction,
                        teacher_id: details.teacher_id,
                        your_response: details.your_response
                    }

                    document.title = details.classwork_title;

                    this.$store.commit('student_view_classwork_page/classwork_details_comp/update_classwork_details', { details: data }); // Update classwork details
                    this.$store.commit('dialog/student_private_comment_dialog/update_comment_data', { classwork_id: classwork_id, private_comments: details.private_comments, teacher_id: details.teacher_id }); // Update private comments
                    this.$store.commit('student_streams_page/stream_comp/update_loading_linear', { value: false }) // Update loading linear property from vuex
                    this.$store.commit('student_streams_page/stream_comp/update_refresh_data', { value: true }); // Refresh data property from vuex
                } else if (data_status.status === 'classwork_not_found'){
                    this.$store.commit('student_streams_page/stream_comp/update_loading_linear', { value: false }) // Update loading linear property from vuex
                    this.$store.commit('student_streams_page/stream_comp/update_refresh_data', { value: false }); // Refresh data property from vuex
                    this.$store.commit('student_view_classwork_page/classwork_details_comp/reset_data'); // Reset classwork details

                    this.$router.push(`/teacher/classwork?class_code=${class_code}`); // Redirect user to the classwork page
                } else if (data_status.status === 'no_students_available'){
                    this.$store.commit('student_view_classwork_page/classwork_details_comp/update_classwork_details_fetched', { value: true }); // Update classwork details fetched

                    let data = {
                        classwork_type: data_status.classwork_type,
                        classwork_title: data_status.classwork_title,
                        date_created: data_status.date_created,
                        user_name: data_status.user_name,
                        classwork_points: data_status.classwork_points,
                        classwork_due_date_time: data_status.classwork_due_date_time
                    }

                    document.title = data.classwork_title;

                    this.$store.commit('student_view_classwork_page/classwork_details_comp/update_classwork_details_array', { value: [] }); // Update classwork details fetched
                    this.$store.commit('student_view_classwork_page/classwork_details_comp/update_classwork_details', { details: data }); // Update classwork details
                    this.$store.commit('student_view_classwork_page/classwork_details_comp/update_students_available', { value: false }); // Update students available value
                    this.$store.commit('student_streams_page/stream_comp/update_loading_linear', { value: false }) // Update loading linear property from vuex
                    this.$store.commit('student_streams_page/stream_comp/update_refresh_data', { value: true }); // Refresh data property from vuex
                } else if (data_status.status === 'not_teacher_of_class'){
                    this.page_view = false; // Hide contents of page

                    this.$store.commit('student_streams_page/stream_comp/update_loading_linear', { value: false }) // Update loading linear property from vuex
                    this.$store.commit('student_streams_page/stream_comp/update_refresh_data', { value: false }); // Refresh data property from vuex
                    this.$store.commit('student_view_classwork_page/classwork_details_comp/reset_data'); // Reset classwork details

                    this.$router.push(this.$config.teacher_classesUrl); // Redirect user to teacher classes home page
                } else if (data_status.status === 'class_does_not_exist'){
                    this.page_view = false; // Hide contents of page

                    this.$store.commit('student_streams_page/stream_comp/update_loading_linear', { value: false }) // Update loading linear property from vuex
                    this.$store.commit('student_streams_page/stream_comp/update_refresh_data', { value: false }); // Refresh data property from vuex
                    this.$store.commit('student_view_classwork_page/classwork_details_comp/reset_data'); // Reset classwork details

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

                if (route_name === 'student-view_classwork'){
                    this.$store.commit('student_streams_page/stream_comp/update_loading_linear', { value: true }) // Update loading linear property from vuex
                    this.$store.commit('student_streams_page/stream_comp/update_refresh_data', { value: true }); // Refresh data property from vuex
                    this.$store.commit('student_view_classwork_page/classwork_details_comp/reset_data'); // Reset classwork details

                    setTimeout(() => {
                        // Update snackbar text from vuex
                        let obj = {
                            value: true,
                            text: 'An error just occured!'
                        }

                        this.$store.commit(this.$config.VUEX_UPDATE_SNACKBAR, obj);
                        //--------------------------------------
                    }, 50);
                }
            }
            //---------------------------------------
        }
        //---------------------------------------------------------------------
    }
}