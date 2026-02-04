export default {
    methods: {
        // Create a new post
        async send_request(request_obj, class_code, post_type, post_data){
            let response = await this.create_new_post_request(request_obj); // Await response from the backend

            // Analyze the response recieved
            if (response.status === true){
                let data_status = this.create_new_post_response(response.result); // Validate the response

                // Check the status of the response
                if (data_status.status === 'error'){
                    this.post_bool = true; // Disable button loader

                    // Update the err msg dialog through vuex
                    let obj = {
                        value: true,
                        msg: data_status.msg,
                        err: true
                    }

                    this.$store.commit(this.$config.VUEX_UPDATE_ERR_MSG_DIALOG, obj);
                    //---------------------------------------------

                    this.$store.commit('student_streams_page/stream_comp/update_refresh_data', { value: true }); // Refresh data property from vuex
                    this.$store.commit('student_streams_page/stream_comp/update_can_create_post', { value: true });
                    this.$store.commit('student_streams_page/student_stream_route_config/update_fetch_more_posts', { value: true });
                    this.$store.commit('student_streams_page/stream_comp/update_spinner', { value: false });
                    this.$store.commit('student_streams_page/student_stream_route_config/update_delete_class_post', { value: true });
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
                            localStorage.setItem('access_token', data_status.access_token); // Update access token
                        } else if (environment === 'production'){
                            this.$store.commit('app_tokens/update_login_access_token', { value: data_status.access_token }); // Update access token
                        }
                    }

                    let active_class_posts = this.$store.state.student_streams_page.stream_comp.active_class_posts; // All active class posts from vuex

                    if (active_class_posts.hasOwnProperty(class_code)){
                        if (post_type === 'plain_post'){
                            let post = {
                                id: data_status.last_post_id,
                                user_name: this.$store.state.user_details.user_details.details.user_name,
                                post_creators_id: this.$store.state.user_details.user_details.details.user_id,
                                title: null,
                                post_due_date: null,
                                date: data_status.post_date,
                                user_image: this.$store.state.user_details.user_details.details.profile_image,
                                post_data: post_data,
                                post_point: null,
                                post_comments: [],
                                post_type: post_type,
                                submit_assignment_attachment: {
                                    file_name: null,
                                    file_url: null
                                },
                                added_att: false,
                                assignment_status: null,
                                score_value: null,
                                att_files: null,
                                new_material_files: null
                            }

                            this.$store.commit('student_streams_page/stream_comp/add_new_post', { class_code: class_code, post: post }); // Add new post
                            this.$store.commit('student_streams_page/stream_comp/update_loaded_posts', { value: true }); // Show the loaded posts
                        } else if (post_type === 'post_with_attachment'){
                            let post = {
                                id: data_status.last_post_id,
                                user_name: this.$store.state.user_details.user_details.details.user_name,
                                post_creators_id: this.$store.state.user_details.user_details.details.user_id,
                                title: null,
                                post_due_date: null,
                                date: data_status.post_date,
                                user_image: this.$store.state.user_details.user_details.details.profile_image,
                                post_data: post_data,
                                post_point: null,
                                post_comments: [],
                                post_type: post_type,
                                submit_assignment_attachment: {
                                    file_name: null,
                                    file_url: null
                                },
                                added_att: false,
                                assignment_status: null,
                                score_value: null,
                                att_files: data_status.attached_files,
                                new_material_files: null
                            }

                            this.$store.commit('student_streams_page/stream_comp/add_new_post', { class_code: class_code, post: post }); // Add new post
                            this.$store.commit('student_streams_page/stream_comp/update_loaded_posts', { value: true }); // Show the loaded posts
                        }

                        // Reset post box and text editor
                        this.files = [];
                        this.add_file = false;
                        this.post_bool = true;
                        this.post_loading = true;
                        this.loading = true;
                        this.html_data = "<p>Share something with your class...</p>";
                        this.$store.commit('text_editor_control/reset_data');
                        //--------------------------------------

                        // Update the err msg dialog through vuex
                        let obj = {
                            value: true,
                            msg: 'Post created successfully!',
                            err: false
                        }

                        this.$store.commit(this.$config.VUEX_UPDATE_ERR_MSG_DIALOG, obj);
                        //---------------------------------------------

                        this.$store.commit('student_streams_page/stream_comp/update_refresh_data', { value: true }); // Refresh data property from vuex
                        this.$store.commit('student_streams_page/stream_comp/update_can_create_post', { value: true });
                        this.$store.commit('student_streams_page/student_stream_route_config/update_fetch_more_posts', { value: true });
                        this.$store.commit('student_streams_page/stream_comp/update_spinner', { value: false });
                        this.$store.commit('student_streams_page/student_stream_route_config/update_delete_class_post', { value: true });
                    } else {
                        if (post_type === 'plain_post'){
                            let post = {
                                id: data_status.last_post_id,
                                user_name: this.$store.state.user_details.user_details.details.user_name,
                                post_creators_id: this.$store.state.user_details.user_details.details.user_id,
                                title: null,
                                post_due_date: null,
                                date: data_status.post_date,
                                user_image: this.$store.state.user_details.user_details.details.profile_image,
                                post_data: post_data,
                                post_point: null,
                                post_comments: [],
                                post_type: post_type,
                                submit_assignment_attachment: {
                                    file_name: null,
                                    file_url: null
                                },
                                added_att: false,
                                assignment_status: null,
                                score_value: null,
                                att_files: null,
                                new_material_files: null
                            }

                            this.$store.commit('student_streams_page/stream_comp/add_new_post', { class_code: class_code, post: post }); // Add new post
                            this.$store.commit('student_streams_page/stream_comp/update_loaded_posts', { value: true }); // Show the loaded posts
                        } else if (post_type === 'post_with_attachment'){
                            let post = {
                                id: data_status.last_post_id,
                                user_name: this.$store.state.user_details.user_details.details.user_name,
                                post_creators_id: this.$store.state.user_details.user_details.details.user_id,
                                title: null,
                                post_due_date: null,
                                date: data_status.post_date,
                                user_image: this.$store.state.user_details.user_details.details.profile_image,
                                post_data: post_data,
                                post_point: null,
                                post_comments: [],
                                post_type: post_type,
                                submit_assignment_attachment: {
                                    file_name: null,
                                    file_url: null
                                },
                                added_att: false,
                                assignment_status: null,
                                score_value: null,
                                att_files: data_status.attached_files,
                                new_material_files: null
                            }

                            this.$store.commit('student_streams_page/stream_comp/add_new_post', { class_code: class_code, post: post }); // Add new post
                            this.$store.commit('student_streams_page/stream_comp/update_loaded_posts', { value: true }); // Show the loaded posts
                        }

                        this.$store.commit('student_streams_page/stream_comp/update_active_post_offset', { class_code: class_code, offset: 0 }); // Update offset

                        // Reset post box and text editor
                        this.files = [];
                        this.add_file = false;
                        this.post_bool = true;
                        this.post_loading = true;
                        this.loading = true;
                        this.html_data = "<p>Share something with your class...</p>";
                        this.$store.commit('text_editor_control/reset_data');
                        //---------------------------------------

                        // Update the err msg dialog through vuex
                        let obj = {
                            value: true,
                            msg: 'Post created successfully!',
                            err: false
                        }

                        this.$store.commit(this.$config.VUEX_UPDATE_ERR_MSG_DIALOG, obj);
                        //---------------------------------------------

                        this.$store.commit('student_streams_page/stream_comp/update_refresh_data', { value: true }); // Refresh data property from vuex
                        this.$store.commit('student_streams_page/stream_comp/update_can_create_post', { value: true });
                        this.$store.commit('student_streams_page/student_stream_route_config/update_fetch_more_posts', { value: true });
                        this.$store.commit('student_streams_page/stream_comp/update_spinner', { value: false });
                        this.$store.commit('student_streams_page/student_stream_route_config/update_delete_class_post', { value: true });
                    }
                }
                //--------------------------------------
            } else if (response.status === false){
                this.post_bool = true; // Disable button loader

                // Update the err msg dialog through vuex
                let obj = {
                    value: true,
                    msg: 'Couldn\'t create post!',
                    err: true
                }

                this.$store.commit(this.$config.VUEX_UPDATE_ERR_MSG_DIALOG, obj);
                //---------------------------------------------

                this.$store.commit('student_streams_page/stream_comp/update_refresh_data', { value: true }); // Refresh data property from vuex
                this.$store.commit('student_streams_page/stream_comp/update_can_create_post', { value: true });
                this.$store.commit('student_streams_page/student_stream_route_config/update_fetch_more_posts', { value: true });
                this.$store.commit('student_streams_page/stream_comp/update_spinner', { value: false });
                this.$store.commit('student_streams_page/student_stream_route_config/update_delete_class_post', { value: true });
            }
            //---------------------------------------
        }
        //-------------------------------------------------------
    }
}