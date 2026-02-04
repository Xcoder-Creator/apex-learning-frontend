export default {
    methods: {
        // Fetch class list operation mixin method to get all available classes that a user is part of
        async fetch_class_list(class_code, classwork_id){
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
            } else if (this.$route.name === 'student-archived_classes'){
                this.$store.commit('app_components/update_loading_linear', { value: true });
            } else if (this.$route.name === 'student-view_classwork'){
                this.$store.commit('student_streams_page/stream_comp/update_loading_linear', { value: true }) // Update loading linear property from vuex
                this.$store.commit('student_streams_page/stream_comp/update_refresh_data', { value: false }); // Refresh data property from vuex
                this.$store.commit('student_view_classwork_page/classwork_details_comp/update_classwork_details_fetched', { value: false }); // Classwork details fetched property from vuex
            }   

            var request = null; // Request variable

            // Fetch classes method
            const fetch_classes = async (request) => {
                this.$store.commit('app_components/update_loading_linear', { value: true });
                let response = await this.fetch_class_list_fetch_request(request); // Await response from the backend

                // Analyze the response recieved
                if (response.status === true){
                    let data_status = this.fetch_class_list_response(response.result); // Validate the response

                    this.$store.commit('app_components/update_loading_linear', { value: true });

                    // Check the status of the response
                    if (data_status.status === 'error'){
                        this.$store.commit('unenroll_from_class/update_started_unenroll', { value: false }); // Set started unenroll property from vuex to false

                        var route_name = this.$route.name; // Name of the current route

                        // Check if the current route is the student classes home page
                        if (route_name === 'student-classes' || route_name === 'student-settings' || route_name === 'student-archived_classes'){
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

                            if (this.$route.name === 'student-stream'){
                                this.$store.commit('student_streams_page/stream_comp/update_refresh_data', { value: true }); // Refresh data property from vuex
                                this.$store.commit('student_streams_page/stream_comp/update_can_create_post', { value: false });
                                this.$store.commit('student_streams_page/student_stream_route_config/update_fetch_more_posts', { value: false });
                                this.$store.commit('student_streams_page/stream_comp/update_spinner', { value: false });
                                this.$store.commit('student_streams_page/student_stream_route_config/update_delete_class_post', { value: false });
                            } else if (this.$route.name === 'student-classwork'){
                                this.$store.commit('student_streams_page/stream_comp/update_loading_linear', { value: true }) // Update loading linear property from vuex
                                this.$store.commit('student_streams_page/stream_comp/update_refresh_data', { value: true }); // Refresh data property from vuex
                                this.$store.commit('student_classwork_page/classwork_comp/update_classwork_fetched', { value: false }); // Classwork fetched property from vuex
                            } else if (this.$route.name === 'student-people'){
                                this.$store.commit('student_streams_page/stream_comp/update_loading_linear', { value: true }) // Update loading linear property from vuex
                                this.$store.commit('student_streams_page/stream_comp/update_refresh_data', { value: true }); // Refresh data property from vuex
                                this.$store.commit('student_people_page/people_comp/update_people_data_fetched', { value: false }); // People data fetched property from vuex
                            } else if (this.$route.name === 'student-view_classwork'){
                                this.$store.commit('student_streams_page/stream_comp/update_loading_linear', { value: true }) // Update loading linear property from vuex
                                this.$store.commit('student_streams_page/stream_comp/update_refresh_data', { value: false }); // Refresh data property from vuex
                                this.$store.commit('student_view_classwork_page/classwork_details_comp/update_classwork_details_fetched', { value: false }); // Classwork details fetched property from vuex
                            } 
                        }
                        //-------------------------------------------------

                        if (this.$route.name !== 'student-stream'){
                            this.is_data_loaded = false; // Set is data loaded to false
                            this.is_data_available = true; // Set is data available to true
                            this.loading_linear = true; // Set loading linear to true
                            this.$store.commit('class_details/reset_data'); // Reset class details from vuex
                            this.$store.commit('app_components/update_refresh_data', { value: true }); // Allow user to refresh data contents
                            this.$store.commit('unenroll_from_class/update_unenroll_from_class', { value: false }); // Unenroll from class property update
                        }
                    } else if (data_status.status === 'token_expired'){
                        this.$store.commit('unenroll_from_class/update_started_unenroll', { value: false }); // Set started unenroll property from vuex to false
                        this.$store.commit(this.$config.VUEX_PAGE_LOADING_UPDATE_DATA, { value: true}); // Set is loading to true

                        let environment = this.$config.environment; // Environment mode

                        if (environment === 'development'){
                            localStorage.removeItem('access_token'); // Remove access token from localstorage
                            localStorage.removeItem('refresh_token'); // Remove refresh token from localstorage
                        } else if (environment === 'production'){
                            this.$store.commit('app_tokens/update_login_access_token', { value: null }); // Remove access token from vuex store
                        }

                        this.$store.commit('user_details/user_details/reset_data'); // Reset user details from vuex
                        this.$store.commit('class_details/reset_data'); // Reset class details
                        this.$store.commit('app_components/reset_data'); // Reset app components in vuex
                        this.$store.commit('unenroll_from_class/update_unenroll_from_class', { value: false }); // Unenroll from class property update

                        this.$router.push('/login'); // Redirect user to login page
                    } else if (data_status.status === 'success'){
                        this.$store.commit('app_components/update_loading_linear', { value: true });

                        // Check if there is any access token available
                        if (data_status.value === 'token_available'){
                            let environment = this.$config.environment; // Environment mode

                            if (environment === 'development'){
                                localStorage.setItem('access_token', data_status.new_access_token); // Set access token
                            } else if (environment === 'production'){
                                this.$store.commit('app_tokens/update_login_access_token', { value: data_status.new_access_token }); // Set access token
                            }
                        }
                        //------------------------------------------------

                        let route_name = this.$route.name;

                        if (route_name === 'student-stream' || route_name === 'student-classwork' || route_name === 'student-people' || route_name === 'student-view_classwork'){
                            if (class_code){
                                this.$store.commit('class_details/update_class_data', { value: data_status.class_data.length }); // No of classes
                                this.$store.commit('class_details/update_class_list', { details: data_status.class_data }); // Update the class list from vuex

                                let class_array = this.$store.state.class_details.class_list;
                                let class_info = [];

                                if (class_array.length > 0){
                                    class_array.forEach(class_data => {
                                        if (class_data.class_code === class_code){
                                            class_info.push(class_data);
                                        }
                                    });

                                    if (class_info.length > 0 && class_info.length === 1){
                                        this.$store.commit('class_info/update_class_info', { value: class_info[0] }); // Update class info property from vuex
                                        this.$store.commit('class_id/update_class_id', { value: class_info[0].id });
                                        this.$store.commit('page_loading/page_loading/update_data', { value: false }); // Update page loading

                                        if (route_name === 'student-stream'){
                                            this.fetch_class_posts(class_code, 0); // Fetch class posts
                                        } else if (route_name === 'student-classwork'){
                                            this.student_fetch_classworks(class_code);
                                        } else if (route_name === 'student-people'){
                                            this.view_people(class_code); // View people
                                        } else if (route_name === 'student-view_classwork'){
                                            if (this.$route.query.id){
                                                this.student_fetch_classwork_details(class_code, this.$route.query.id); // Fetch classwork details
                                            } else {
                                                this.$router.push('/student/classes/');
                                            } 
                                        }
                                    } else {
                                        // Check if the user is making use of a student or teachers account
                                        if (this.$store.state.user_details.user_details.details.user_role === 'Student'){
                                            this.$router.push('/student/classes/');
                                        } else if (this.$store.state.user_details.user_details.details.user_role === 'Teacher'){
                                            this.$router.push('/teacher/classes/');
                                        }
                                        //-------------------------------------------------------
                                    }
                                } else {
                                    // Check if the user is making use of a student or teachers account
                                    if (this.$store.state.user_details.user_details.details.user_role === 'Student'){
                                        this.$router.push('/student/classes/');
                                    } else if (this.$store.state.user_details.user_details.details.user_role === 'Teacher'){
                                        this.$router.push('/teacher/classes/');
                                    }
                                    //-------------------------------------------------------
                                }
                            } else {
                                // Check if the user is making use of a student or teachers account
                                if (this.$store.state.user_details.user_details.details.user_role === 'Student'){
                                    this.$router.push('/student/classes/');
                                } else if (this.$store.state.user_details.user_details.details.user_role === 'Teacher'){
                                    this.$router.push('/teacher/classes/');
                                }
                                //-------------------------------------------------------
                            }
                        } else {
                            let extra_process = async () => {
                                if (this.$route.name === 'student-classes'){
                                    await this.fetch_archived_classes(null, null, null);
                                }
                                
                                this.$store.commit('classes_home_page/utils/update_value', { value: false }); // Update is sncakbar displayed property in vuex

                                // Display snackbar
                                let obj = {
                                    value: false,
                                    text: ''
                                }

                                this.$store.commit(this.$config.VUEX_UPDATE_SNACKBAR, obj);
                                //---------------------------

                                this.$store.commit('app_components/update_is_data_loaded', { value: true }); // Set is data loaded to true
                                this.$store.commit('class_details/update_class_data', { value: data_status.class_data.length }); // No of classes

                                // Check the number of classes that the user is a part of
                                if (data_status.class_data.length > 0){
                                    this.$store.commit('app_components/update_is_data_available', { value: true });
                                } else {
                                    this.$store.commit('app_components/update_is_data_available', { value: false });
                                }
                                //-------------------------------------------

                                this.$store.commit('class_details/update_class_list', { details: data_status.class_data }); // Update the class list from vuex

                                let unenroll_complete = this.$store.state.unenroll_from_class.unenroll_from_class;

                                this.$store.commit('dialog/unenroll_dialog/unenroll_dialog/update_value', { value: false });

                                this.unenroll_loading = false;

                                if (unenroll_complete === true){
                                    // Update the err msg dialog through vuex
                                    let obj = {
                                        value: true,
                                        msg: 'Unenrolled from class successfully!',
                                        err: false
                                    }

                                    this.$store.commit(this.$config.VUEX_UPDATE_ERR_MSG_DIALOG, obj);
                                    //---------------------------------------------

                                    this.$store.commit('unenroll_from_class/update_unenroll_from_class', { value: false }); // Unenroll from class property update
                                }

                                if (this.$route.name === 'student-archived_classes'){
                                    this.$store.commit('app_components/update_loading_linear', { value: true });
                                    this.fetch_archived_classes(null, null, null);
                                }

                                // Update loading linear value from vuex
                                setTimeout(() => {
                                    this.$store.commit('unenroll_from_class/update_started_unenroll', { value: false }); // Set started unenroll property from vuex to false
                                    this.$store.commit('app_components/update_refresh_data', { value: true }); // Allow user to refresh data contents
                                    if (this.$route.name === 'student-stream'){
                                        this.$store.commit('student_streams_page/stream_comp/update_refresh_data', { value: true }); // Refresh data property from vuex
                                        this.$store.commit('student_streams_page/stream_comp/update_can_create_post', { value: true });
                                        this.$store.commit('student_streams_page/student_stream_route_config/update_fetch_more_posts', { value: true });
                                        this.$store.commit('student_streams_page/stream_comp/update_spinner', { value: false });
                                        this.$store.commit('student_streams_page/student_stream_route_config/update_delete_class_post', { value: true });
                                    } else if (this.$route.name === 'student-classwork'){
                                        this.$store.commit('student_streams_page/stream_comp/update_loading_linear', { value: false }) // Update loading linear property from vuex
                                        this.$store.commit('student_streams_page/stream_comp/update_refresh_data', { value: true }); // Refresh data property from vuex
                                        this.$store.commit('student_classwork_page/classwork_comp/update_classwork_fetched', { value: true }); // Classwork fetched property from vuex
                                    } else if (this.$route.name === 'student-people'){
                                        this.$store.commit('student_streams_page/stream_comp/update_loading_linear', { value: false }) // Update loading linear property from vuex
                                        this.$store.commit('student_streams_page/stream_comp/update_refresh_data', { value: true }); // Refresh data property from vuex
                                        this.$store.commit('student_people_page/people_comp/update_people_data_fetched', { value: true }); // People data fetched property from vuex
                                    } else if (this.$route.name === 'student-view_classwork'){
                                        this.$store.commit('student_streams_page/stream_comp/update_loading_linear', { value: false }) // Update loading linear property from vuex
                                        this.$store.commit('student_streams_page/stream_comp/update_refresh_data', { value: true }); // Refresh data property from vuex
                                        this.$store.commit('student_view_classwork_page/classwork_details_comp/update_classwork_details_fetched', { value: true }); // Classwork details fetched property from vuex
                                    } else if (this.$route.name === 'student-classes'){
                                        this.$store.commit('app_components/update_loading_linear', { value: false });
                                    } else if (this.$route.name === 'student-settings'){
                                        this.$store.commit('app_components/update_loading_linear', { value: false });
                                    }
                                }, 1300);
                                //------------------------------------------
                            }

                            extra_process();
                        }
                    }
                    //-----------------------------------------------
                } else if (response.status === false){
                    this.$store.commit('unenroll_from_class/update_started_unenroll', { value: false }); // Set started unenroll property from vuex to false
                    this.$store.commit('app_components/reset_data'); // Reset app components in vuex
                    this.$store.commit('class_details/reset_data'); // Reset class details in vuex
                    this.$store.commit('unenroll_from_class/update_unenroll_from_class', { value: false }); // Unenroll from class property update

                    var route_name = this.$route.name; // Name of the current route

                    // Check if the current route is the student classes home page
                    if (route_name === 'student-classes' || route_name === 'student-settings' || route_name === 'student-archived_classes'){
                        this.$store.commit('classes_home_page/utils/update_value', { value: true }); // Update is sncakbar displayed property in vuex

                        // Display snackbar
                        let obj = {
                            value: true,
                            text: 'An error just occured!'
                        }

                        this.$store.commit(this.$config.VUEX_UPDATE_SNACKBAR, obj);
                        //---------------------------

                        this.$store.commit('app_components/update_refresh_data', { value: true }); // Allow user to refresh data contents

                        this.$store.commit('app_components/update_loading_linear', { value: true }); // Set loading linear to false
                    } else {
                        // Display snackbar
                        let obj = {
                            value: true,
                            text: 'An error just occured!'
                        }

                        this.$store.commit(this.$config.VUEX_UPDATE_SNACKBAR, obj);
                        //---------------------------

                        if (this.$route.name === 'student-stream'){
                            this.$store.commit('student_streams_page/stream_comp/update_refresh_data', { value: true }); // Refresh data property from vuex
                            this.$store.commit('student_streams_page/stream_comp/update_can_create_post', { value: false });
                            this.$store.commit('student_streams_page/student_stream_route_config/update_fetch_more_posts', { value: false });
                            this.$store.commit('student_streams_page/stream_comp/update_spinner', { value: false });
                            this.$store.commit('student_streams_page/student_stream_route_config/update_delete_class_post', { value: false });
                        } else if (this.$route.name === 'student-classwork'){
                            this.$store.commit('student_streams_page/stream_comp/update_loading_linear', { value: true }) // Update loading linear property from vuex
                            this.$store.commit('student_streams_page/stream_comp/update_refresh_data', { value: true }); // Refresh data property from vuex
                            this.$store.commit('student_classwork_page/classwork_comp/update_classwork_fetched', { value: false }); // Classwork fetched property from vuex
                        } else if (this.$route.name === 'student-people'){
                            this.$store.commit('student_streams_page/stream_comp/update_loading_linear', { value: true }) // Update loading linear property from vuex
                            this.$store.commit('student_streams_page/stream_comp/update_refresh_data', { value: true }); // Refresh data property from vuex
                            this.$store.commit('student_people_page/people_comp/update_people_data_fetched', { value: false }); // People data fetched property from vuex
                        } else if (this.$route.name === 'student-view_classwork'){
                            this.$store.commit('student_streams_page/stream_comp/update_loading_linear', { value: true }) // Update loading linear property from vuex
                            this.$store.commit('student_streams_page/stream_comp/update_refresh_data', { value: true }); // Refresh data property from vuex
                            this.$store.commit('student_view_classwork_page/classwork_details_comp/update_classwork_details_fetched', { value: false }); // Classwork details fetched property from vuex
                        }

                        this.$store.commit('app_components/update_loading_linear', { value: true }); // Set loading linear to true
                    }
                    //-------------------------------------------------
                }
                //-----------------------------------
            };
            //--------------------------------------------

            let environment = this.$config.environment; // Environment mode

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

            let route = this.$route.name; // Current route

            if (route === 'student-stream' || route === 'student-classwork' || route === 'student-people' || route === 'student-view_classwork'){
                fetch_classes(request); // Execute method
            } else if (route === 'student-archived_classes'){
                if (this.$store.state.archived_classes_page.page_comp.is_data_loaded === true){
                    if (this.$store.state.archived_classes_page.page_comp.is_data_available === true){
                        this.$store.commit('archived_classes_page/page_comp/update_is_data_loaded', { value: true });
                        this.$store.commit('archived_classes_page/page_comp/update_is_data_available', { value: true });
                        this.$store.commit('app_components/update_loading_linear', { value: false });
                    } else {
                        this.$store.commit('archived_classes_page/page_comp/update_is_data_loaded', { value: true });
                        this.$store.commit('archived_classes_page/page_comp/update_is_data_available', { value: false });
                        this.$store.commit('app_components/update_loading_linear', { value: false });
                    }
                } else {
                    this.$store.commit('archived_classes_page/page_comp/update_archived_classes', { archived_classes: [] });

                    this.$store.commit('app_components/update_loading_linear', { value: true });

                    this.$store.commit('archived_classes_page/page_comp/update_is_data_loaded', { value: false });
                    this.$store.commit('archived_classes_page/page_comp/update_is_data_available', { value: false });

                    fetch_classes(request); // Execute method
                }
            } else {
                let is_data_loaded = this.$store.state.app_components.is_data_loaded;

                if (is_data_loaded === true){
                    let is_data_available = this.$store.state.app_components.is_data_available;

                    if (is_data_available === null){
                        this.$store.commit('app_components/reset_data'); // Reset app components in vuex
                        this.$store.commit('app_components/update_refresh_data', { value: false }); // Prevent the user from refreshing data contents
                        this.$store.commit('class_details/reset_data'); // Reset class details in vuex
                        fetch_classes(request); // Execute method
                    } else if (is_data_available === false){
                        this.$store.commit('app_components/reset_data'); // Reset app components in vuex
                        this.$store.commit('app_components/update_refresh_data', { value: false }); // Prevent the user from refreshing data contents
                        this.$store.commit('class_details/reset_data'); // Reset class details in vuex
                        fetch_classes(request); // Execute method
                    } else {
                        this.$store.commit('app_components/update_loading_linear', { value: false });
                    }
                } else if (is_data_loaded === false){
                    this.$store.commit('app_components/reset_data'); // Reset app components in vuex
                    this.$store.commit('app_components/update_refresh_data', { value: false }); // Prevent the user from refreshing data contents
                    this.$store.commit('class_details/reset_data'); // Reset class details in vuex
                    fetch_classes(request); // Execute method
                }
            }
        }
        //----------------------------------------------------------------------
    }
}