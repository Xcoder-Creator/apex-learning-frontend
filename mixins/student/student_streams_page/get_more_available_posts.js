export default {
    methods: {
        // Fetch class posts mixin method to fetch all available posts for a particular class
        async get_more_available_posts(class_code, offset){
            this.$store.commit('student_streams_page/stream_comp/update_refresh_data', { value: false }); // Refresh data property from vuex
            this.$store.commit('student_streams_page/stream_comp/update_can_create_post', { value: false });
            this.$store.commit('student_streams_page/student_stream_route_config/update_fetch_more_posts', { value: false });
            this.$store.commit('student_streams_page/stream_comp/update_spinner', { value: true });
            this.$store.commit('student_streams_page/student_stream_route_config/update_delete_class_post', { value: false });
            this.load_more_button = false;

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
                    this.$store.commit('student_streams_page/stream_comp/update_refresh_data', { value: true }); // Refresh data property from vuex
                    this.$store.commit('student_streams_page/stream_comp/update_can_create_post', { value: true });
                    this.$store.commit('student_streams_page/student_stream_route_config/update_fetch_more_posts', { value: true });
                    this.$store.commit('student_streams_page/stream_comp/update_spinner', { value: false });
                    this.$store.commit('student_streams_page/student_stream_route_config/update_delete_class_post', { value: true });
                    this.load_more_button = true;

                    // Update the err msg dialog through vuex
                    let obj = {
                        value: true,
                        msg: 'An error just occured!',
                        err: true
                    }

                    this.$store.commit(this.$config.VUEX_UPDATE_ERR_MSG_DIALOG, obj);
                    //---------------------------------------------
                } else if (data_status.status === 'token_expired'){
                    this.$store.commit('student_streams_page/stream_comp/update_refresh_data', { value: true }); // Refresh data property from vuex
                    this.$store.commit('student_streams_page/stream_comp/update_can_create_post', { value: true });
                    this.$store.commit('student_streams_page/student_stream_route_config/update_fetch_more_posts', { value: true });
                    this.$store.commit('student_streams_page/stream_comp/update_spinner', { value: false });
                    this.$store.commit('student_streams_page/student_stream_route_config/update_delete_class_post', { value: true });
                    this.load_more_button = true;


                    // Update the err msg dialog through vuex
                    let obj = {
                        value: true,
                        msg: 'An error just occured!',
                        err: true
                    }

                    this.$store.commit(this.$config.VUEX_UPDATE_ERR_MSG_DIALOG, obj);
                    //---------------------------------------------
                } else if (data_status.status === 'success'){
                    if (data_status.new_access_token !== null){
                        let environment = this.$config.environment; // Environment mode

                        if (environment === 'development'){
                            localStorage.setItem('access_token', data_status.new_access_token); // Update access token
                        } else if (environment === 'production'){
                            this.$store.commit('app_tokens/update_login_access_token', { value: data_status.new_access_token }); // Update access token
                        }
                    }

                    if (data_status.state === 'posts_available'){
                        let active_class_posts = this.$store.state.student_streams_page.stream_comp.active_class_posts;
                        let active_offsets = this.$store.state.student_streams_page.stream_comp.active_class_post_offset;

                        if (active_class_posts){
                            if (active_class_posts.hasOwnProperty(class_code)){
                                if (active_offsets){
                                    if (active_offsets.hasOwnProperty(class_code)){
                                        let available_posts = data_status.class_posts;
                                        this.$store.commit('student_streams_page/stream_comp/update_active_post_offset', { class_code: class_code, offset: data_status.offset }); // Add more posts
                                        let new_posts = [];
                                        let post_id_array = [];

                                        for (const post of active_class_posts[class_code]){
                                            post_id_array.push(post.id);
                                        }

                                        for (const post of available_posts){
                                            if (post_id_array.indexOf(post.id) !== -1){
                                                // Nothing
                                            } else {
                                                let post_data = this.check_if_text_editor_is_empty(this.stripAttributes(this.sanitizeString((this.stripElem(post.post_data))))).data;
                                                post['post_data'] = post_data;
                                                new_posts.push(post);
                                            }
                                        }

                                        if (new_posts.length > 0){
                                            new_posts.forEach(post => {
                                                this.$store.commit('student_streams_page/stream_comp/add_more_posts', { class_code: class_code, class_post: post }); // Add more posts
                                            });
                                        }

                                        this.$store.commit('student_streams_page/stream_comp/update_refresh_data', { value: true }); // Refresh data property from vuex
                                        this.$store.commit('student_streams_page/stream_comp/update_can_create_post', { value: true });
                                        this.$store.commit('student_streams_page/student_stream_route_config/update_fetch_more_posts', { value: true });
                                        this.$store.commit('student_streams_page/stream_comp/update_spinner', { value: false });
                                        this.$store.commit('student_streams_page/student_stream_route_config/update_delete_class_post', { value: true });
                                        this.load_more_button = true;
                                    } else {
                                        if (this.$store.state.student_streams_page.stream_comp.refresh_data === true){
                                            this.page_view = false; // Hide contents of page
                                        }

                                        this.$store.commit('student_streams_page/stream_comp/update_refresh_data', { value: false }); // Refresh data property from vuex
                                        this.$store.commit('student_streams_page/stream_comp/update_can_create_post', { value: false });
                                        this.$store.commit('student_streams_page/student_stream_route_config/update_fetch_more_posts', { value: false });
                                        this.$store.commit('student_streams_page/stream_comp/update_spinner', { value: false });
                                        this.$store.commit('student_streams_page/student_stream_route_config/update_delete_class_post', { value: false });
                                        this.load_more_button = false;

                                        // Check if the user is making use of a student or teachers account
                                        if (this.$store.state.user_details.user_details.details.user_role === 'Student'){
                                            this.$router.push(this.$config.student_classesUrl); // Redirect user to student classes home page
                                        } else if (this.$store.state.user_details.user_details.details.user_role === 'Teacher'){
                                            this.$router.push(this.$config.teacher_classesUrl); // Redirect user to teacher classes home page
                                        }
                                        //--------------------------------------------------------
                                    }
                                } else {
                                    if (this.$store.state.student_streams_page.stream_comp.refresh_data === true){
                                        this.page_view = false; // Hide contents of page
                                    }

                                    this.$store.commit('student_streams_page/stream_comp/update_refresh_data', { value: false }); // Refresh data property from vuex
                                    this.$store.commit('student_streams_page/stream_comp/update_can_create_post', { value: false });
                                    this.$store.commit('student_streams_page/student_stream_route_config/update_fetch_more_posts', { value: false });
                                    this.$store.commit('student_streams_page/stream_comp/update_spinner', { value: false });
                                    this.$store.commit('student_streams_page/student_stream_route_config/update_delete_class_post', { value: false });
                                    this.load_more_button = false;

                                    // Check if the user is making use of a student or teachers account
                                    if (this.$store.state.user_details.user_details.details.user_role === 'Student'){
                                        this.$router.push(this.$config.student_classesUrl); // Redirect user to student classes home page
                                    } else if (this.$store.state.user_details.user_details.details.user_role === 'Teacher'){
                                        this.$router.push(this.$config.teacher_classesUrl); // Redirect user to teacher classes home page
                                    }
                                    //--------------------------------------------------------
                                }
                            } else {
                                if (this.$store.state.student_streams_page.stream_comp.refresh_data === true){
                                    this.page_view = false; // Hide contents of page
                                }

                                this.$store.commit('student_streams_page/stream_comp/update_refresh_data', { value: false }); // Refresh data property from vuex
                                this.$store.commit('student_streams_page/stream_comp/update_can_create_post', { value: false });
                                this.$store.commit('student_streams_page/student_stream_route_config/update_fetch_more_posts', { value: false });
                                this.$store.commit('student_streams_page/stream_comp/update_spinner', { value: false });
                                this.$store.commit('student_streams_page/student_stream_route_config/update_delete_class_post', { value: false });
                                this.load_more_button = false;

                                // Check if the user is making use of a student or teachers account
                                if (this.$store.state.user_details.user_details.details.user_role === 'Student'){
                                    this.$router.push(this.$config.student_classesUrl); // Redirect user to student classes home page
                                } else if (this.$store.state.user_details.user_details.details.user_role === 'Teacher'){
                                    this.$router.push(this.$config.teacher_classesUrl); // Redirect user to teacher classes home page
                                }
                                //--------------------------------------------------------
                            }
                        } else {
                            if (this.$store.state.student_streams_page.stream_comp.refresh_data === true){
                                this.page_view = false; // Hide contents of page
                            }

                            this.$store.commit('student_streams_page/stream_comp/update_refresh_data', { value: false }); // Refresh data property from vuex
                            this.$store.commit('student_streams_page/stream_comp/update_can_create_post', { value: false });
                            this.$store.commit('student_streams_page/student_stream_route_config/update_fetch_more_posts', { value: false });
                            this.$store.commit('student_streams_page/stream_comp/update_spinner', { value: false });
                            this.$store.commit('student_streams_page/student_stream_route_config/update_delete_class_post', { value: false });
                            this.load_more_button = false;

                            // Check if the user is making use of a student or teachers account
                            if (this.$store.state.user_details.user_details.details.user_role === 'Student'){
                                this.$router.push(this.$config.student_classesUrl); // Redirect user to student classes home page
                            } else if (this.$store.state.user_details.user_details.details.user_role === 'Teacher'){
                                this.$router.push(this.$config.teacher_classesUrl); // Redirect user to teacher classes home page
                            }
                            //--------------------------------------------------------
                        }
                    } else if (data_status.state === 'no_posts'){
                        if (data_status.total_posts_length === 1 || data_status.total_posts_length > 1){
                            this.$store.commit('student_streams_page/stream_comp/update_refresh_data', { value: true }); // Refresh data property from vuex
                            this.$store.commit('student_streams_page/stream_comp/update_can_create_post', { value: true });
                            this.$store.commit('student_streams_page/student_stream_route_config/update_fetch_more_posts', { value: false });
                            this.$store.commit('student_streams_page/stream_comp/update_spinner', { value: false });
                            this.$store.commit('student_streams_page/student_stream_route_config/update_delete_class_post', { value: true });
                            this.load_more_button = false;
                        } else if (data_status.total_posts_length === 0) {
                            this.$store.commit('student_streams_page/stream_comp/update_refresh_data', { value: true }); // Refresh data property from vuex
                            this.$store.commit('student_streams_page/stream_comp/update_can_create_post', { value: true });
                            this.$store.commit('student_streams_page/student_stream_route_config/update_fetch_more_posts', { value: false });
                            this.$store.commit('student_streams_page/stream_comp/update_spinner', { value: false });
                            this.$store.commit('student_streams_page/student_stream_route_config/update_delete_class_post', { value: true });
                            this.load_more_button = false;
                        }
                    }
                } else if (data_status.status === 'not_part_of_class'){
                    this.$store.commit('student_streams_page/stream_comp/update_refresh_data', { value: true }); // Refresh data property from vuex
                    this.$store.commit('student_streams_page/stream_comp/update_can_create_post', { value: true });
                    this.$store.commit('student_streams_page/student_stream_route_config/update_fetch_more_posts', { value: false });
                    this.$store.commit('student_streams_page/stream_comp/update_spinner', { value: false });
                    this.$store.commit('student_streams_page/student_stream_route_config/update_delete_class_post', { value: true });
                    this.load_more_button = false;
                } else if (data_status.status === 'class_does_not_exist'){
                    this.$store.commit('student_streams_page/stream_comp/update_refresh_data', { value: true }); // Refresh data property from vuex
                    this.$store.commit('student_streams_page/stream_comp/update_can_create_post', { value: true });
                    this.$store.commit('student_streams_page/student_stream_route_config/update_fetch_more_posts', { value: false });
                    this.$store.commit('student_streams_page/stream_comp/update_spinner', { value: false });
                    this.$store.commit('student_streams_page/student_stream_route_config/update_delete_class_post', { value: true });
                    this.load_more_button = false;
                } else if (data_status.status === 'role_error'){
                    this.$store.commit('student_streams_page/stream_comp/update_refresh_data', { value: true }); // Refresh data property from vuex
                    this.$store.commit('student_streams_page/stream_comp/update_can_create_post', { value: true });
                    this.$store.commit('student_streams_page/student_stream_route_config/update_fetch_more_posts', { value: false });
                    this.$store.commit('student_streams_page/stream_comp/update_spinner', { value: false });
                    this.$store.commit('student_streams_page/student_stream_route_config/update_delete_class_post', { value: true });
                    this.load_more_button = false;
                } else if (data_status.status === 'user_not_found'){
                    this.$store.commit('student_streams_page/stream_comp/update_refresh_data', { value: true }); // Refresh data property from vuex
                    this.$store.commit('student_streams_page/stream_comp/update_can_create_post', { value: true });
                    this.$store.commit('student_streams_page/student_stream_route_config/update_fetch_more_posts', { value: false });
                    this.$store.commit('student_streams_page/stream_comp/update_spinner', { value: false });
                    this.$store.commit('student_streams_page/student_stream_route_config/update_delete_class_post', { value: true });
                    this.load_more_button = false;
                } else if (data_status.status === 'invalid_token'){
                    this.$store.commit('student_streams_page/stream_comp/update_refresh_data', { value: true }); // Refresh data property from vuex
                    this.$store.commit('student_streams_page/stream_comp/update_can_create_post', { value: true });
                    this.$store.commit('student_streams_page/student_stream_route_config/update_fetch_more_posts', { value: false });
                    this.$store.commit('student_streams_page/stream_comp/update_spinner', { value: false });
                    this.$store.commit('student_streams_page/student_stream_route_config/update_delete_class_post', { value: true });
                    this.load_more_button = false;
                }
                //--------------------------------------
            } else if (response.status === false){
                this.$store.commit('student_streams_page/stream_comp/update_refresh_data', { value: true }); // Refresh data property from vuex
                this.$store.commit('student_streams_page/stream_comp/update_can_create_post', { value: true });
                this.$store.commit('student_streams_page/student_stream_route_config/update_fetch_more_posts', { value: true });
                this.$store.commit('student_streams_page/stream_comp/update_spinner', { value: false });
                this.$store.commit('student_streams_page/student_stream_route_config/update_delete_class_post', { value: true });
                this.load_more_button = true;

                // Update the err msg dialog through vuex
                let obj = {
                    value: true,
                    msg: 'An error just occured!',
                    err: true
                }

                this.$store.commit(this.$config.VUEX_UPDATE_ERR_MSG_DIALOG, obj);
                //---------------------------------------------
            }
            //---------------------------------------
        }
        //---------------------------------------------------------------------
    }
}