export default {
    methods: {
        // Delete class post mixin method to delete a particular post from a class
        async teacher_delete_class_post_operation(post_id, class_code, user_id){
            let delete_class_post = this.$store.state.teacher_streams_page.teacher_stream_route_config.delete_class_post;

            if (delete_class_post === true){
                this.delete_post_loading = true; // Delete post loading property
                this.$store.commit('teacher_streams_page/stream_comp/update_loaded_posts', { value: false });
                this.$store.commit('teacher_streams_page/stream_comp/update_loading_linear', { value: true });
                this.$store.commit('teacher_streams_page/stream_comp/update_refresh_data', { value: false }); // Refresh data property from vuex
                this.$store.commit('teacher_streams_page/stream_comp/update_can_create_post', { value: false });
                this.$store.commit('teacher_streams_page/teacher_stream_route_config/update_fetch_more_posts', { value: false });
                this.$store.commit('teacher_streams_page/stream_comp/update_spinner', { value: false });
                this.$store.commit('teacher_streams_page/teacher_stream_route_config/update_delete_class_post', { value: false });

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
                            post_id: post_id,
                            user_id: user_id
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
                            post_id: post_id,
                            user_id: user_id
                        }),
                        signal: this.controller.signal
                    }
                    //--------------------------------
                }

                let response = await this.teacher_delete_class_post_request(request); // Await response from the backend

                // Analyze the response recieved
                if (response.status === true){
                    let data_status = this.teacher_delete_class_post_response(response.result); // Validate the response

                    // Check the status of the response
                    if (data_status.status === 'error'){
                        this.$store.commit('dialog/delete_post_dialog/reset_data'); // Close delete post dialog
                        this.delete_post_loading = false; // Delete post loading property
                        this.$store.commit('teacher_streams_page/stream_comp/update_loaded_posts', { value: true });
                        this.$store.commit('teacher_streams_page/stream_comp/update_loading_linear', { value: false });

                        this.$store.commit('teacher_streams_page/stream_comp/update_refresh_data', { value: true }); // Refresh data property from vuex
                        this.$store.commit('teacher_streams_page/stream_comp/update_can_create_post', { value: true });
                        this.$store.commit('teacher_streams_page/teacher_stream_route_config/update_fetch_more_posts', { value: true });
                        this.$store.commit('teacher_streams_page/stream_comp/update_spinner', { value: false });
                        this.$store.commit('teacher_streams_page/teacher_stream_route_config/update_delete_class_post', { value: true });

                        setTimeout(() => {
                            // Update the err msg dialog through vuex
                            let obj = {
                                value: true,
                                msg: data_status.msg,
                                err: true
                            }

                            this.$store.commit(this.$config.VUEX_UPDATE_ERR_MSG_DIALOG, obj);
                            //---------------------------------------------
                        }, 200);
                    } else if (data_status.status === 'post_does_not_exist'){
                        this.$store.commit('dialog/delete_post_dialog/reset_data'); // Close delete post dialog
                        this.delete_post_loading = false; // Delete post loading property
                        this.$store.commit('teacher_streams_page/stream_comp/update_loaded_posts', { value: true });
                        this.$store.commit('teacher_streams_page/stream_comp/update_loading_linear', { value: false });

                        this.$store.commit('teacher_streams_page/stream_comp/update_refresh_data', { value: true }); // Refresh data property from vuex
                        this.$store.commit('teacher_streams_page/stream_comp/update_can_create_post', { value: true });
                        this.$store.commit('teacher_streams_page/teacher_stream_route_config/update_fetch_more_posts', { value: true });
                        this.$store.commit('teacher_streams_page/stream_comp/update_spinner', { value: false });
                        this.$store.commit('teacher_streams_page/teacher_stream_route_config/update_delete_class_post', { value: true });

                        this.$store.commit('teacher_streams_page/stream_comp/remove_deleted_post', { class_code: class_code, post_id: post_id }); 
                        this.$store.commit('dialog/comment_dialog/delete_comments_for_post', { class_code: class_code, post_id: post_id });

                        setTimeout(() => {
                            // Update the err msg dialog through vuex
                            let obj = {
                                value: true,
                                msg: data_status.msg,
                                err: true
                            }

                            this.$store.commit(this.$config.VUEX_UPDATE_ERR_MSG_DIALOG, obj);
                            //---------------------------------------------
                        }, 200);
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
                                localStorage.setItem('access_token', data_status.access_token); // Update access token
                            } else if (environment === 'production'){
                                this.$store.commit('app_tokens/update_login_access_token', { value: data_status.access_token }); // Update access token
                            }
                        }

                        this.$store.commit('teacher_streams_page/stream_comp/update_class_post', { class_code: class_code, post_id: post_id });
                        this.$store.commit('dialog/delete_post_dialog/reset_data'); // Close delete post dialog
                        this.delete_post_loading = false; // Delete post loading property
                        this.$store.commit('teacher_streams_page/stream_comp/update_loading_linear', { value: false });

                        this.$store.commit('teacher_streams_page/stream_comp/update_refresh_data', { value: true }); // Refresh data property from vuex
                        this.$store.commit('teacher_streams_page/stream_comp/update_can_create_post', { value: true });
                        this.$store.commit('teacher_streams_page/teacher_stream_route_config/update_fetch_more_posts', { value: false });
                        this.$store.commit('teacher_streams_page/stream_comp/update_spinner', { value: false });
                        this.$store.commit('teacher_streams_page/teacher_stream_route_config/update_delete_class_post', { value: true });
                        this.$store.commit('dialog/comment_dialog/delete_comments_for_post', { class_code: class_code, post_id: post_id });

                        let active_class_posts = this.$store.state.teacher_streams_page.stream_comp.active_class_posts;

                        if (active_class_posts.hasOwnProperty(class_code)){
                            if (active_class_posts[class_code].length === 0){
                                this.$store.commit('teacher_streams_page/stream_comp/update_loaded_posts', { value: 'no_posts' });
                                this.$store.commit('teacher_streams_page/stream_comp/remove_class_post', { class_code: class_code });
                                this.$store.commit('teacher_streams_page/stream_comp/remove_offset', { class_code: class_code });
                            } else {
                                this.$store.commit('teacher_streams_page/stream_comp/update_loaded_posts', { value: true });
                            }
                        }

                        setTimeout(() => {
                            // Update the err msg dialog through vuex
                            let obj = {
                                value: true,
                                msg: 'Post deleted successfully!',
                                err: false
                            }

                            this.$store.commit(this.$config.VUEX_UPDATE_ERR_MSG_DIALOG, obj);
                            //---------------------------------------------
                        }, 200);
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
                        this.$store.commit('user_details/user_details/reset_data'); // Reset user details
                        this.$router.push('/login/'); // Redirect the user to the login page
                    } else if (data_status.status === 'not_part_of_class'){
                        this.$router.push('/teacher/classes/');
                    }
                    //--------------------------------------
                } else if (response.status === false){
                    this.$store.commit('dialog/delete_post_dialog/reset_data'); // Close delete post dialog
                    this.delete_post_loading = false; // Delete post loading property
                    this.$store.commit('teacher_streams_page/stream_comp/update_loaded_posts', { value: true });
                    this.$store.commit('teacher_streams_page/stream_comp/update_loading_linear', { value: false });
                    this.$store.commit('teacher_streams_page/stream_comp/update_refresh_data', { value: true }); // Refresh data property from vuex
                    this.$store.commit('teacher_streams_page/stream_comp/update_can_create_post', { value: true });
                    this.$store.commit('teacher_streams_page/teacher_stream_route_config/update_fetch_more_posts', { value: true });
                    this.$store.commit('teacher_streams_page/stream_comp/update_spinner', { value: false });
                    this.$store.commit('teacher_streams_page/teacher_stream_route_config/update_delete_class_post', { value: true });

                    setTimeout(() => {
                        // Update the err msg dialog through vuex
                        let obj = {
                            value: true,
                            msg: 'Couldn\'t delete post!',
                            err: true
                        }

                        this.$store.commit(this.$config.VUEX_UPDATE_ERR_MSG_DIALOG, obj);
                        //---------------------------------------------
                    }, 200);
                }
                //---------------------------------------
            } else if (delete_class_post === false){
                this.$store.commit('dialog/msg_dialog/update_dialog', { value: true, msg: 'Can\'t delete post at this point!' });
            }
        }
        //---------------------------------------------------------------------
    }
}