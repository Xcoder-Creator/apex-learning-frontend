export default {
    methods: {
        // Fetch class posts mixin method to fetch all available posts for a particular class
        async fetch_class_posts(class_code, offset){
            this.$store.commit('student_streams_page/stream_comp/update_refresh_data', { value: false }); // Refresh data property from vuex
            this.$store.commit('student_streams_page/stream_comp/update_can_create_post', { value: false });
            this.$store.commit('student_streams_page/student_stream_route_config/update_fetch_more_posts', { value: false });
            this.$store.commit('student_streams_page/stream_comp/update_spinner', { value: false });
            this.$store.commit('student_streams_page/student_stream_route_config/update_delete_class_post', { value: false });

            let class_info = [];
            let class_array = this.$store.state.class_details.class_list;

            if (class_array.length > 0){
                class_array.forEach(class_data => {
                    if (class_data.class_code === class_code){
                        class_info.push(class_data);
                    }
                });

                if (class_info.length > 0 && class_info.length === 1){
                    this.$store.commit('class_info/update_class_info', { value: class_info[0] }); // Update class info property from vuex
                    this.$store.commit('class_id/update_class_id', { value: class_info[0].id }); // Update class id property from vuex
                }
            }

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
                        offset: offset
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
                        offset: offset
                    }),
                    signal: this.controller.signal
                }
                //--------------------------------
            }

            let response = await this.fetch_class_posts_request(request); // Await response from the backend

            // Analyze the response recieved
            if (response.status === true){
                let data_status = this.fetch_class_posts_response(response.result); // Validate the response

                // Check the status of the response
                if (data_status.status === 'error'){
                    this.$store.commit('student_streams_page/stream_comp/update_loaded_posts', { value: false }) // Update loaded posts property from vuex
                    this.$store.commit('student_streams_page/stream_comp/update_loading_linear', { value: true }) // Update loading linear property from vuex
                    this.$store.commit('student_streams_page/stream_comp/update_refresh_data', { value: true }); // Refresh data property from vuex
                    this.$store.commit('student_streams_page/stream_comp/update_can_create_post', { value: false });
                    this.$store.commit('student_streams_page/student_stream_route_config/update_fetch_more_posts', { value: false });
                    this.$store.commit('student_streams_page/stream_comp/update_spinner', { value: false });
                    this.$store.commit('student_streams_page/student_stream_route_config/update_delete_class_post', { value: false });

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

                    if (data_status.classwork_available === true){
                        let data = {
                            state: true,
                            class_code: class_code,
                            classwork_data: data_status.classwork_details
                        }

                        this.$store.commit('student_streams_page/stream_comp/update_upcoming_work_data', data); // Update upcoming work data
                    } else if (data_status.classwork_available === false){
                        let data = {
                            state: false,
                            class_code: class_code
                        }

                        this.$store.commit('student_streams_page/stream_comp/update_upcoming_work_data', data); // Update upcoming work data
                    }

                    if (data_status.state === 'posts_available'){
                        let available_posts = data_status.class_posts;
                        let new_posts = [];

                        for (const post of available_posts){
                            let post_data = this.check_if_text_editor_is_empty(this.stripAttributes(this.sanitizeString((this.stripElem(post.post_data))))).data;
                            post['post_data'] = post_data;
                            new_posts.push(post);
                        }

                        this.$store.commit('student_streams_page/stream_comp/update_posts_array', { value: new_posts }); // Update posts array from vuex
                        let class_posts_array = this.$store.state.student_streams_page.stream_comp.posts_array;
                        let active_class_posts = this.$store.state.student_streams_page.stream_comp.active_class_posts;
                        let active_offsets = this.$store.state.student_streams_page.stream_comp.active_class_post_offset;

                        if (active_class_posts){
                            if (active_class_posts.hasOwnProperty(class_code)){
                                this.$store.commit('student_streams_page/stream_comp/update_active_class_posts', { class_code: class_code, class_posts: class_posts_array }); // Update posts for a particular class from vuex

                                if (active_offsets){
                                    if (active_offsets.hasOwnProperty(class_code)){
                                        this.$store.commit('student_streams_page/stream_comp/update_active_post_offset', { class_code: class_code, offset: data_status.offset }); // Update the offset for a particular classes posts from vuex
                                    } else {
                                        this.$store.commit('student_streams_page/stream_comp/update_active_post_offset', { class_code: class_code, offset: data_status.offset }); // Update the offset for a particular classes posts from vuex
                                    }
                                } else {
                                    this.$store.commit('student_streams_page/stream_comp/update_active_post_offset', { class_code: class_code, offset: data_status.offset }); // Update the offset for a particular classes posts from vuex
                                }

                                this.$store.commit('student_streams_page/stream_comp/update_loaded_posts', { value: true }) // Update loaded posts property from vuex

                                setTimeout(() => {
                                    this.$store.commit('student_streams_page/stream_comp/update_refresh_data', { value: true }); // Refresh data property from vuex
                                    this.$store.commit('student_streams_page/stream_comp/update_can_create_post', { value: true });
                                    this.$store.commit('student_streams_page/student_stream_route_config/update_fetch_more_posts', { value: true });
                                    this.$store.commit('student_streams_page/stream_comp/update_spinner', { value: false });
                                    this.$store.commit('student_streams_page/student_stream_route_config/update_delete_class_post', { value: true });
                                    this.$store.commit('student_streams_page/stream_comp/update_loading_linear', { value: false }) // Update loading linear property from vuex
                                }, 2000);
                            } else {
                                if (active_offsets){
                                    if (active_offsets.hasOwnProperty(class_code)){
                                        this.$store.commit('student_streams_page/stream_comp/update_active_post_offset', { class_code: class_code, offset: data_status.offset }); // Update the offset for a particular classes posts from vuex
                                    } else {
                                        this.$store.commit('student_streams_page/stream_comp/update_active_post_offset', { class_code: class_code, offset: data_status.offset }); // Update the offset for a particular classes posts from vuex
                                    }
                                } else {
                                    this.$store.commit('student_streams_page/stream_comp/update_active_post_offset', { class_code: class_code, offset: data_status.offset }); // Update the offset for a particular classes posts from vuex
                                }

                                this.$store.commit('student_streams_page/stream_comp/update_active_class_posts', { class_code: class_code, class_posts: class_posts_array }); // Update posts for a particular class from vuex
                                this.$store.commit('student_streams_page/stream_comp/update_loaded_posts', { value: true }) // Update loaded posts property from vuex

                                setTimeout(() => {
                                    this.$store.commit('student_streams_page/stream_comp/update_refresh_data', { value: true }); // Refresh data property from vuex
                                    this.$store.commit('student_streams_page/stream_comp/update_can_create_post', { value: true });
                                    this.$store.commit('student_streams_page/student_stream_route_config/update_fetch_more_posts', { value: true });
                                    this.$store.commit('student_streams_page/stream_comp/update_spinner', { value: false });
                                    this.$store.commit('student_streams_page/student_stream_route_config/update_delete_class_post', { value: true });
                                    this.$store.commit('student_streams_page/stream_comp/update_loading_linear', { value: false }) // Update loading linear property from vuex
                                }, 2000);
                            }
                        } else {
                            if (active_offsets){
                                if (active_offsets.hasOwnProperty(class_code)){
                                    this.$store.commit('student_streams_page/stream_comp/update_active_post_offset', { class_code: class_code, offset: data_status.offset }); // Update the offset for a particular classes posts from vuex
                                } else {
                                    this.$store.commit('student_streams_page/stream_comp/update_active_post_offset', { class_code: class_code, offset: data_status.offset }); // Update the offset for a particular classes posts from vuex
                                }
                            } else {
                                this.$store.commit('student_streams_page/stream_comp/update_active_post_offset', { class_code: class_code, offset: data_status.offset }); // Update the offset for a particular classes posts from vuex
                            }

                            this.$store.commit('student_streams_page/stream_comp/update_active_class_posts', { class_code: class_code, class_posts: class_posts_array }); // Update posts for a particular class from vuex
                            this.$store.commit('student_streams_page/stream_comp/update_loaded_posts', { value: true }) // Update loaded posts property from vuex

                            setTimeout(() => {
                                this.$store.commit('student_streams_page/stream_comp/update_refresh_data', { value: true }); // Refresh data property from vuex
                                this.$store.commit('student_streams_page/stream_comp/update_can_create_post', { value: true });
                                this.$store.commit('student_streams_page/student_stream_route_config/update_fetch_more_posts', { value: true });
                                this.$store.commit('student_streams_page/stream_comp/update_spinner', { value: false });
                                this.$store.commit('student_streams_page/student_stream_route_config/update_delete_class_post', { value: true });
                                this.$store.commit('student_streams_page/stream_comp/update_loading_linear', { value: false }) // Update loading linear property from vuex
                            }, 2000);
                        }
                    } else if (data_status.state === 'no_posts'){
                        if (data_status.total_posts_length === 0) {
                            this.$store.commit('student_streams_page/stream_comp/remove_class_post', { class_code: class_code }); // Remove class posts from vuex
                            this.$store.commit('student_streams_page/stream_comp/update_posts_array', { value: [] }); // Update posts array from vuex
                            this.$store.commit('student_streams_page/stream_comp/update_loaded_posts', { value: 'no_posts' }) // Update loaded posts property from vuex
                            
                            let class_info = [];
                            let class_array = this.$store.state.class_details.class_list;

                            if (class_array.length > 0){
                                class_array.forEach(class_data => {
                                    if (class_data.class_code === class_code){
                                        class_info.push(class_data);
                                    }
                                });

                                if (class_info.length > 0 && class_info.length === 1){
                                    this.$store.commit('class_info/update_class_info', { value: class_info[0] }); // Update class info property from vuex
                                    this.$store.commit('class_id/update_class_id', { value: class_info[0].id }); // Update class id property from vuex
                                }
                            }

                            setTimeout(() => {
                                this.$store.commit('student_streams_page/stream_comp/update_refresh_data', { value: true }); // Refresh data property from vuex
                                this.$store.commit('student_streams_page/stream_comp/update_can_create_post', { value: true });
                                this.$store.commit('student_streams_page/student_stream_route_config/update_fetch_more_posts', { value: false });
                                this.$store.commit('student_streams_page/stream_comp/update_spinner', { value: false });
                                this.$store.commit('student_streams_page/student_stream_route_config/update_delete_class_post', { value: true });
                                this.$store.commit('student_streams_page/stream_comp/update_loading_linear', { value: false }) // Update loading linear property from vuex
                            }, 2000);
                        }
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

                    this.$store.commit('student_streams_page/stream_comp/remove_class_post', { class_code: class_code });
                    this.$store.commit('student_streams_page/stream_comp/remove_offset', { class_code: class_code });

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

                    this.$store.commit('student_streams_page/stream_comp/remove_class_post', { class_code: class_code });
                    this.$store.commit('student_streams_page/stream_comp/remove_offset', { class_code: class_code });

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

                if (route_name === 'student-stream'){
                    this.$store.commit('student_streams_page/stream_comp/update_loaded_posts', { value: false }) // Update loaded posts property from vuex
                    this.$store.commit('student_streams_page/stream_comp/update_loading_linear', { value: true }) // Update loading linear property from vuex
                    this.$store.commit('student_streams_page/stream_comp/update_refresh_data', { value: true }); // Refresh data property from vuex
                    this.$store.commit('student_streams_page/stream_comp/update_can_create_post', { value: false });
                    this.$store.commit('student_streams_page/student_stream_route_config/update_fetch_more_posts', { value: false });
                    this.$store.commit('student_streams_page/stream_comp/update_spinner', { value: false });
                    this.$store.commit('student_streams_page/student_stream_route_config/update_delete_class_post', { value: false });

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