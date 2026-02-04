export default {
    methods: {
        // Login activity operation mixin method to check if there was any recent login activity on the users device
        async login_activity_operation(){
            if (this.$route.name === 'student-stream'){
                this.$store.commit('student_streams_page/stream_comp/update_refresh_data', { value: false }); // Refresh data property from vuex
                this.$store.commit('student_streams_page/stream_comp/update_can_create_post', { value: false });
                this.$store.commit('student_streams_page/student_stream_route_config/update_fetch_more_posts', { value: false });
                this.$store.commit('student_streams_page/stream_comp/update_spinner', { value: false });
                this.$store.commit('student_streams_page/student_stream_route_config/update_delete_class_post', { value: false });
            } else if (this.$route.name === 'student-classwork'){
                this.$store.commit('student_streams_page/stream_comp/update_loading_linear', { value: true }) // Update loading linear property from vuex
                this.$store.commit('student_streams_page/stream_comp/update_refresh_data', { value: false }); // Refresh data property from vuex
                this.$store.commit('student_classwork_page/classwork_comp/update_classwork_fetched', { value: false }); // Classwork fetched property from vuex
            } else if (this.$route.name === 'student-people'){
                this.$store.commit('student_streams_page/stream_comp/update_loading_linear', { value: true }) // Update loading linear property from vuex
                this.$store.commit('student_streams_page/stream_comp/update_refresh_data', { value: false }); // Refresh data property from vuex
                this.$store.commit('student_people_page/people_comp/update_people_data_fetched', { value: false }); // Classwork fetched property from vuex
            } else if (this.$route.name === 'teacher-stream'){
                this.$store.commit('teacher_streams_page/stream_comp/update_refresh_data', { value: false }); // Refresh data property from vuex
                this.$store.commit('teacher_streams_page/stream_comp/update_can_create_post', { value: false });
                this.$store.commit('teacher_streams_page/teacher_stream_route_config/update_fetch_more_posts', { value: false });
                this.$store.commit('teacher_streams_page/stream_comp/update_spinner', { value: false });
                this.$store.commit('teacher_streams_page/teacher_stream_route_config/update_delete_class_post', { value: false });
            } else if (this.$route.name === 'teacher-classwork'){
                this.$store.commit('teacher_streams_page/stream_comp/update_loading_linear', { value: true }) // Update loading linear property from vuex
                this.$store.commit('teacher_streams_page/stream_comp/update_refresh_data', { value: false }); // Refresh data property from vuex
                this.$store.commit('teacher_classwork_page/classwork_comp/update_classwork_fetched', { value: false }); // Classwork fetched property from vuex
            } else if (this.$route.name === 'teacher-people'){
                this.$store.commit('teacher_streams_page/stream_comp/update_loading_linear', { value: true }) // Update loading linear property from vuex
                this.$store.commit('teacher_streams_page/stream_comp/update_refresh_data', { value: false }); // Refresh data property from vuex
                this.$store.commit('teacher_people_page/people_comp/update_people_data_fetched', { value: false }); // Classwork fetched property from vuex
            } else if (this.$route.name === 'teacher-view_classwork'){
                this.$store.commit('teacher_streams_page/stream_comp/update_loading_linear', { value: true }) // Update loading linear property from vuex
                this.$store.commit('teacher_streams_page/stream_comp/update_refresh_data', { value: false }); // Refresh data property from vuex
                this.$store.commit('teacher_view_classwork_page/classwork_details_comp/update_classwork_details_fetched', { value: false }); // Classwork details fetched property from vuex
            } else if (this.$route.name === 'student-view_classwork'){
                this.$store.commit('student_streams_page/stream_comp/update_loading_linear', { value: true }) // Update loading linear property from vuex
                this.$store.commit('student_streams_page/stream_comp/update_refresh_data', { value: false }); // Refresh data property from vuex
                this.$store.commit('student_view_classwork_page/classwork_details_comp/update_classwork_details_fetched', { value: false }); // Classwork details fetched property from vuex
            }

            // Constructed request object
            const request = {
                method: 'GET',
                signal: this.controller.signal
            }
            //----------------------------------

            let response = await this.login_activity_operation_request(request); // Await response from the backend

            // Analyze the response recieved
            if (response.status === true){
                let data_status = this.login_activity_operation_response(response.result); // Validate the response

                // Check the status of the response
                if (data_status.status === 'error'){
                    this.$store.commit('app_tokens/update_login_access_token', { value: null }); // Set login access token

                    var route_name = this.$route.name; // Name of the current route

                    // Check if the current route is the student classes home page
                    if (route_name === 'student-classes' || route_name === 'student-stream' || route_name === 'student-classwork' || route_name === 'student-people' || route_name === 'student-settings' || route_name === 'student-archived_classes' || route_name === 'student-view_classwork' || route_name === 'student-activity_forms' || route_name === 'teacher-classes' || route_name === 'teacher-stream' || route_name === 'teacher-classwork' || route_name === 'teacher-people' || route_name === 'teacher-settings' || route_name === 'teacher-archived_classes' || route_name === 'teacher-view_classwork'){
                        if (route_name === 'student-activity_forms'){
                            window.location.href = `/login/`; // Redirect user to the login page
                        } else {
                            this.$router.push('/login/'); // Redirect user to the login page
                        }
                    } else {
                        setTimeout(() => {
                            this.$store.commit('page_loading/page_loading/update_data', { value: false }); // Update page loading
                        }, 3000);
                    }
                } else if (data_status.status === 'error_occured'){
                    // Snackbar component data
                    let obj = {
                        value: true,
                        text: 'An error just occured!'
                    }
                    //----------------------------

                    this.$store.commit(this.$config.VUEX_UPDATE_SNACKBAR, obj); // Update snackbar component from vuex
                } else if (data_status.status === 'success'){
                    this.$store.commit(this.$config.VUEX_STORE_USER_DETAILS, data_status.user_details); // Store user details in vuex
                    this.$store.commit('app_tokens/update_login_access_token', { value: data_status.access_token }); // Set login access token

                    // Check if the user is making use of a student or teachers account
                    if (data_status.user_details.user_role === 'Student'){
                        var route_name = this.$route.name; // Name of the current route

                        // Check if the current route is the student classes home page
                        if (route_name === 'student-classes' || route_name === 'student-settings' || route_name === 'student-archived_classes'){
                            setTimeout(() => {
                                this.$store.commit('page_loading/page_loading/update_data', { value: false }); // Update page loading
                                this.fetch_class_list(); // A mixin method to fetch all available classes that a user is part of
                            }, 3000);
                        } else if (route_name === 'student-stream' || route_name === 'student-classwork' || route_name === 'student-people' || route_name === 'student-view_classwork'){
                            if (this.$route.query.class_code){
                                let class_code = this.$route.query.class_code; // Class code from query parameter
                                this.fetch_class_list(class_code); // A mixin method to fetch all available classes that a user is part of
                            } else {
                                this.$router.push(this.$config.student_classesUrl); // Redirect user to student classes home page
                            }
                        } else if (route_name === 'student-activity_forms'){
                            if (this.$route.query.class_code && this.$route.query.id){
                                let class_code = this.$route.query.class_code; // Class code
                                let classwork_id = this.$route.query.id; // Classwork id

                                setTimeout(() => {
                                    this.isLoading = false; // Disabling the page loading screen
                                    this.activity_forms_operation(class_code, classwork_id);
                                }, 3000);
                            } else {
                                window.location.href = `${this.$config.student_classesUrl}`; // Redirect user to student classes home page
                            }
                        } else {
                            this.$router.push(this.$config.student_classesUrl); // Redirect user to student classes home page
                        }
                        //----------------------------------------------------
                    } else if (data_status.user_details.user_role === 'Teacher'){
                        var route_name = this.$route.name; // Name of the current route

                        // Check if the current route is the student classes home page
                        if (route_name === 'teacher-classes' || route_name === 'teacher-settings' || route_name === 'teacher-archived_classes'){
                            setTimeout(() => {
                                this.isLoading = false; // Disabling the page loading screen
                                this.teacher_fetch_class_list(null, null, null, null); // A mixin method to fetch all available classes that a user is part of
                            }, 3000);
                        } else if (route_name === 'teacher-stream' || route_name === 'teacher-classwork' || route_name === 'teacher-people' || route_name === 'teacher-view_classwork'){
                            let class_code = this.$route.query.class_code; // Class code from router parameter
                            this.teacher_fetch_class_list(class_code, null, null, null); // Fetch class list
                        } else {
                            this.$router.push(this.$config.teacher_classesUrl); // Redirect user to teacher classes home page
                        }
                        //----------------------------------------------------
                    }
                    //--------------------------------------------------------
                }
                //--------------------------------------
            } else if (response.status === false){
                // Snackbar component data
                let obj = {
                    value: true,
                    text: 'An error just occured!'
                }
                //----------------------------

                this.$store.commit(this.$config.VUEX_UPDATE_SNACKBAR, obj); // Update snackbar component from vuex
            }
            //---------------------------------------
        }
        //---------------------------------------------------------------------
    }
}