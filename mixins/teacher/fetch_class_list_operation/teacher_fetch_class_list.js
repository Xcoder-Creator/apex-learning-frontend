export default {
    methods: {
        // Fetch class list operation mixin method to get all available classes that a user is part of
        async teacher_fetch_class_list(class_code, restore_value, delete_value, edit_class_value){
            if (this.$route.name === 'teacher-stream'){
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
            } else if (this.$route.name === 'teacher-archived_classes'){
                this.$store.commit('app_components/update_loading_linear', { value: true });
            } else if (this.$route.name === 'teacher-classes'){
                if (edit_class_value === true){
                    this.$store.commit('snackbar/snackbar/reset_data');
                    this.$store.commit('app_components/reset_data'); // Reset app components in vuex
                    this.$store.commit('class_details/reset_data'); // Reset class details in vuex
                    this.$store.commit('app_components/update_refresh_data', { value: false }); // Prevent user from refreshing data contents
                }
            }

            this.$store.commit('app_components/update_loading_linear', { value: true });

            var request = null; // Request variable

            // Fetch classes method
            const fetch_classes = async (request) => {
                this.$store.commit('app_components/update_loading_linear', { value: true });
                let response = await this.teacher_fetch_class_list_fetch_request(request); // Await response from the backend

                // Analyze the response recieved
                if (response.status === true){
                    let data_status = this.teacher_fetch_class_list_response(response.result); // Validate the response

                    this.$store.commit('app_components/update_loading_linear', { value: true });

                    // Check the status of the response
                    if (data_status.status === 'error'){
                        this.$store.commit('unenroll_from_class/update_started_unenroll', { value: false }); // Set started unenroll property from vuex to false

                        var route_name = this.$route.name; // Name of the current route

                        // Check if the current route is the student classes home page
                        if (route_name === 'teacher-classes' || route_name === 'teacher-settings' || route_name === 'teacher-archived_classes'){
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

                            if (this.$route.name === 'teacher-stream'){
                                this.$store.commit('teacher_streams_page/stream_comp/update_refresh_data', { value: true }); // Refresh data property from vuex
                                this.$store.commit('teacher_streams_page/stream_comp/update_can_create_post', { value: false });
                                this.$store.commit('teacher_streams_page/teacher_stream_route_config/update_fetch_more_posts', { value: false });
                                this.$store.commit('teacher_streams_page/stream_comp/update_spinner', { value: false });
                                this.$store.commit('teacher_streams_page/teacher_stream_route_config/update_delete_class_post', { value: false });
                                this.$store.commit('dialog/bg_class_img_list_dialog/update_disable_select_theme', { value: false });
                                this.$store.commit('archive_a_class/update_started_archive', { value: false }); // Set started archive property from vuex to false
                                this.$store.commit('classes_home_page/classes_home_route_config/update_enable_edit_class', { value: true }); // Enable user to join class
                                this.$store.commit('classes_home_page/classes_home_route_config/update_enable_archive_class', { value: true }); // Allow user to archive a class
                            } else if (this.$route.name === 'teacher-classwork'){
                                this.$store.commit('teacher_streams_page/stream_comp/update_loading_linear', { value: true }) // Update loading linear property from vuex
                                this.$store.commit('teacher_streams_page/stream_comp/update_refresh_data', { value: true }); // Refresh data property from vuex
                                this.$store.commit('teacher_classwork_page/classwork_comp/update_classwork_fetched', { value: false }); // Classwork fetched property from vuex
                            } else if (this.$route.name === 'teacher-people'){
                                this.$store.commit('teacher_streams_page/stream_comp/update_loading_linear', { value: true }) // Update loading linear property from vuex
                                this.$store.commit('teacher_streams_page/stream_comp/update_refresh_data', { value: true }); // Refresh data property from vuex
                                this.$store.commit('teacher_people_page/people_comp/update_people_data_fetched', { value: false }); // People data fetched property from vuex
                            } else if (this.$route.name === 'teacher-view_classwork'){
                                this.$store.commit('teacher_streams_page/stream_comp/update_loading_linear', { value: true }) // Update loading linear property from vuex
                                this.$store.commit('teacher_streams_page/stream_comp/update_refresh_data', { value: true }); // Refresh data property from vuex
                                this.$store.commit('teacher_view_classwork_page/classwork_details_comp/update_classwork_details_fetched', { value: false }); // Classwork details fetched property from vuex
                            }
                        }
                        //-------------------------------------------------

                        if (this.$route.name !== 'teacher-stream'){
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

                        if (route_name === 'teacher-stream' || route_name === 'teacher-classwork' || route_name === 'teacher-people' || route_name === 'teacher-view_classwork'){
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

                                        if (route_name === 'teacher-stream'){
                                            this.teacher_fetch_class_posts(class_code, 0); // Fetch class posts
                                        } else if (route_name === 'teacher-classwork'){
                                            this.teacher_fetch_classworks(class_code);
                                        } else if (route_name === 'teacher-people'){
                                            this.teacher_view_people(class_code); // View people
                                        } else if (route_name === 'teacher-view_classwork'){
                                            if (this.$route.query.id){
                                                this.teacher_fetch_classwork_details(class_code, this.$route.query.id); // Fetch classwork details
                                            } else {
                                                this.$router.push('/teacher/classes/');
                                            } 
                                        }
                                    } else {
                                        this.$router.push('/teacher/classes/');
                                    }
                                } else {
                                    this.$router.push('/teacher/classes/');
                                }
                            } else {
                                this.$router.push('/teacher/classes/');
                            }
                        } else {
                            let extra_process = async () => {
                                if (this.$route.name === 'teacher-classes'){
                                    if (edit_class_value === true){
                                        // Nothing
                                    } else {
                                        await this.fetch_archived_classes(null, null, null);
                                    }
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

                                let archive_complete = this.$store.state.archive_a_class.archive_class;

                                this.$store.commit('dialog/archive_dialog/archive_dialog/update_value', { value: false });

                                this.archive_class_loading = false;

                                if (archive_complete === true){
                                    // Update the err msg dialog through vuex
                                    let obj = {
                                        value: true,
                                        msg: 'Archived class successfully!',
                                        err: false
                                    }

                                    this.$store.commit(this.$config.VUEX_UPDATE_ERR_MSG_DIALOG, obj);
                                    //---------------------------------------------

                                    this.$store.commit('archive_a_class/update_archive_class', { value: false }); // Archive class property update
                                }

                                if (this.$route.name === 'teacher-archived_classes'){
                                    this.$store.commit('app_components/update_loading_linear', { value: true });
                                    if (restore_value === true){
                                        this.fetch_archived_classes(true, null, null);
                                    } else {
                                        if (delete_value === true){
                                            this.fetch_archived_classes(null, true, null);
                                        } else {
                                            this.fetch_archived_classes(null, null, null);
                                        }
                                    }
                                }

                                if (this.$route.name === 'teacher-classes'){
                                    this.$store.commit('app_components/update_loading_linear', { value: true });
                                    if (edit_class_value === true){
                                        this.$store.commit('classes_home_page/classes_home_route_config/update_enable_edit_class', { value: true }); // Enable the user to edit any class
                                        this.$store.commit('app_components/update_refresh_data', { value: true }); // Allow user to refresh data contents
                                        this.$store.commit('archive_a_class/reset_data'); // Set started archive property from vuex to true
                                        this.$store.commit('classes_home_page/classes_home_route_config/reset_data'); // Allow user to archive a class

                                        // Update the err msg dialog through vuex
                                        let obj = {
                                            value: true,
                                            msg: 'Class edited successfully!',
                                            err: false
                                        }

                                        this.$store.commit(this.$config.VUEX_UPDATE_ERR_MSG_DIALOG, obj);
                                        //---------------------------------------------

                                        this.$store.commit('edit_class_dialog/update_edit_class_btn', { value: true });
                                        this.$store.commit('edit_class_dialog/update_edit_class_btn_load', { value: false });
                                    }
                                }

                                this.$store.commit('dialog/bg_class_img_list_dialog/update_disable_select_theme', { value: false });

                                // Update loading linear value from vuex
                                setTimeout(() => {
                                    this.$store.commit('unenroll_from_class/update_started_unenroll', { value: false }); // Set started unenroll property from vuex to false
                                    this.$store.commit('app_components/update_refresh_data', { value: true }); // Allow user to refresh data contents
                                    if (this.$route.name === 'teacher-stream'){
                                        this.$store.commit('teacher_streams_page/stream_comp/update_refresh_data', { value: true }); // Refresh data property from vuex
                                        this.$store.commit('teacher_streams_page/stream_comp/update_can_create_post', { value: true });
                                        this.$store.commit('teacher_streams_page/teacher_stream_route_config/update_fetch_more_posts', { value: true });
                                        this.$store.commit('teacher_streams_page/stream_comp/update_spinner', { value: false });
                                        this.$store.commit('teacher_streams_page/teacher_stream_route_config/update_delete_class_post', { value: true });
                                    } else if (this.$route.name === 'teacher-classwork'){
                                        this.$store.commit('teacher_streams_page/stream_comp/update_loading_linear', { value: false }) // Update loading linear property from vuex
                                        this.$store.commit('teacher_streams_page/stream_comp/update_refresh_data', { value: true }); // Refresh data property from vuex
                                        this.$store.commit('teacher_classwork_page/classwork_comp/update_classwork_fetched', { value: true }); // Classwork fetched property from vuex
                                    } else if (this.$route.name === 'teacher-people'){
                                        this.$store.commit('teacher_streams_page/stream_comp/update_loading_linear', { value: false }) // Update loading linear property from vuex
                                        this.$store.commit('teacher_streams_page/stream_comp/update_refresh_data', { value: true }); // Refresh data property from vuex
                                        this.$store.commit('teacher_people_page/people_comp/update_people_data_fetched', { value: true }); // People data fetched property from vuex
                                    } else if (this.$route.name === 'teacher-view_classwork'){
                                        this.$store.commit('teacher_streams_page/stream_comp/update_loading_linear', { value: false }) // Update loading linear property from vuex
                                        this.$store.commit('teacher_streams_page/stream_comp/update_refresh_data', { value: true }); // Refresh data property from vuex
                                        this.$store.commit('teacher_view_classwork_page/classwork_details_comp/update_classwork_details_fetched', { value: true }); // Classwork details fetched property from vuex
                                    } else if (this.$route.name === 'teacher-classes'){
                                        this.$store.commit('app_components/update_loading_linear', { value: false });
                                        this.$store.commit('classes_home_page/classes_home_route_config/update_enable_create_class', { value: true }); // Allow the user to create a class
                                    } else if (this.$route.name === 'teacher-settings'){
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
                    if (route_name === 'teacher-classes' || route_name === 'teacher-settings' || route_name === 'teacher-archived_classes'){
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

                        if (this.$route.name === 'teacher-stream'){
                            this.$store.commit('teacher_streams_page/stream_comp/update_refresh_data', { value: true }); // Refresh data property from vuex
                            this.$store.commit('teacher_streams_page/stream_comp/update_can_create_post', { value: false });
                            this.$store.commit('teacher_streams_page/teacher_stream_route_config/update_fetch_more_posts', { value: false });
                            this.$store.commit('teacher_streams_page/stream_comp/update_spinner', { value: false });
                            this.$store.commit('teacher_streams_page/teacher_stream_route_config/update_delete_class_post', { value: false });
                            this.$store.commit('dialog/bg_class_img_list_dialog/update_disable_select_theme', { value: false });
                        } else if (this.$route.name === 'teacher-classwork'){
                            this.$store.commit('teacher_streams_page/stream_comp/update_loading_linear', { value: true }) // Update loading linear property from vuex
                            this.$store.commit('teacher_streams_page/stream_comp/update_refresh_data', { value: true }); // Refresh data property from vuex
                            this.$store.commit('teacher_classwork_page/classwork_comp/update_classwork_fetched', { value: false }); // Classwork fetched property from vuex
                        } else if (this.$route.name === 'teacher-people'){
                            this.$store.commit('teacher_streams_page/stream_comp/update_loading_linear', { value: true }) // Update loading linear property from vuex
                            this.$store.commit('teacher_streams_page/stream_comp/update_refresh_data', { value: true }); // Refresh data property from vuex
                            this.$store.commit('teacher_people_page/people_comp/update_people_data_fetched', { value: false }); // People data fetched property from vuex
                        } else if (this.$route.name === 'teacher-view_classwork'){
                            this.$store.commit('teacher_streams_page/stream_comp/update_loading_linear', { value: true }) // Update loading linear property from vuex
                            this.$store.commit('teacher_streams_page/stream_comp/update_refresh_data', { value: true }); // Refresh data property from vuex
                            this.$store.commit('teacher_view_classwork_page/classwork_details_comp/update_classwork_details_fetched', { value: false }); // Classwork details fetched property from vuex
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

            if (route === 'teacher-stream' || route === 'teacher-classwork' || route === 'teacher-people' || route === 'teacher-view_classwork'){
                fetch_classes(request); // Execute method
            } else if (route === 'teacher-archived_classes'){
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
                        if (edit_class_value === true){
                            fetch_classes(request);
                        } else {
                            this.$store.commit('app_components/update_loading_linear', { value: false });
                        }
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