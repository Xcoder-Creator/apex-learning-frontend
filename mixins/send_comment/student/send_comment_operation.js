export default {
    methods: {
        // Send private comment
        async send_comment_operation(comment, class_code, classwork_id, teacher_id){
            if (this.can_comment === true){
                this.can_comment = false;

                if (/^ *$/.test(comment)){
                    this.can_comment = true;
                    this.$store.commit('dialog/msg_dialog/update_dialog', { value: true, msg: 'Please, Type something...' }); // Display the msg dialog
                } else {
                    if (comment.length <= 500 && comment.length !== 0){
                        if (this.$route.name === 'student-view_classwork'){
                            this.$store.commit('student_streams_page/comment_linear_loader/update_value', { value: true });
                        } else if (this.$route.name === 'teacher-view_classwork'){
                            this.$store.commit('teacher_streams_page/comment_linear_loader/update_value', { value: true });
                        }
    
                        let environment = this.$config.environment; // Environment mode
                        var request = null; // Request variable
    
                        if (environment === 'development'){
                            // Constructed request object
                            request = {
                                method: 'POST',
                                headers: {
                                    'Authorization': `Bearer ${ localStorage.getItem('refresh_token') }`
                                },
                                body: new URLSearchParams({
                                    access_token: localStorage.getItem('access_token'),
                                    class_code: class_code,
                                    classwork_id: classwork_id,
                                    comment: comment,
                                    teacher_user_id: teacher_id
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
                                    'Authorization': `Bearer ${ access_token }`
                                },
                                body: new URLSearchParams({
                                    class_code: class_code,
                                    classwork_id: classwork_id,
                                    comment: comment,
                                    teacher_user_id: teacher_id
                                }),
                                signal: this.controller.signal
                            }
                            //--------------------------------
                        }
    
                        let response = await this.send_comment_operation_request(request); // Await response from the backend
    
                        if (response.status === true){
                            let data_status = this.send_comment_operation_response(response.result); // Validate the response
    
                            // Check the status of the response
                            if (data_status.status === 'error'){
                                this.$store.commit('dialog/msg_dialog/update_dialog', { value: false, msg: 'Please wait, Sending comment....' }); // Display the msg dialog

                                if (this.$route.name === 'student-stream'){
                                    this.$store.commit('student_streams_page/comment_linear_loader/update_value', { value: false });
                                } else if (this.$route.name === 'teacher-stream'){
                                    this.$store.commit('teacher_streams_page/comment_linear_loader/update_value', { value: false });
                                }

                                this.can_comment = true;
    
                                setTimeout(() => {
                                    // Update the err msg dialog through vuex
                                    let obj = {
                                        value: true,
                                        msg: data_status.msg,
                                        err: true
                                    }
    
                                    this.$store.commit(this.$config.VUEX_UPDATE_ERR_MSG_DIALOG, obj);
                                    //---------------------------------------------
                                }, 30);
                            } else if (data_status.status === 'classwork_not_found'){
                                this.$store.commit('dialog/msg_dialog/update_dialog', { value: false, msg: 'Please wait, Sending comment....' }); // Display the msg dialog
                                
                                if (this.$route.name === 'student-view_classwork'){
                                    this.$store.commit('student_streams_page/comment_linear_loader/update_value', { value: false });
                                } else if (this.$route.name === 'teacher-view_classwork'){
                                    this.$store.commit('teacher_streams_page/comment_linear_loader/update_value', { value: false });
                                }

                                this.can_comment = true;
                                this.comment_data = '';
                                this.$store.commit('dialog/student_private_comment_dialog/update_dialog', { value: false });

                                setTimeout(() => {
                                    // Update the err msg dialog through vuex
                                    let obj = {
                                        value: true,
                                        msg: data_status.msg,
                                        err: true
                                    }
    
                                    this.$store.commit(this.$config.VUEX_UPDATE_ERR_MSG_DIALOG, obj);
                                    //---------------------------------------------
                                }, 30);
                            } else if (data_status.status === 'token_expired'){
                                if (environment === 'development'){
                                    localStorage.removeItem('access_token'); // Remove access token
                                    localStorage.removeItem('refresh_token');  // Remove refresh token
                                } else if (environment === 'production'){
                                    this.$store.commit('app_tokens/update_login_access_token', { value: null }); // Remove access token
                                }
    
                                this.$store.commit('logout_user/update_is_logging_out', { value: false }); // Update is logging out property from vuex
                                this.$store.commit('unenroll_from_class/update_started_unenroll', { value: false }); // Set started unenroll property from vuex to false
                                this.$store.commit(this.$config.VUEX_PAGE_LOADING_UPDATE_DATA, { value: true}); // Set is loading to true
                                this.$store.commit('user_details/user_details/reset_data'); // Reset user details from vuex
                                this.$store.commit('class_details/reset_data'); // Reset class details
                                this.$store.commit('app_components/reset_data'); // Reset app components in vuex
                                this.$store.commit('unenroll_from_class/update_unenroll_from_class', { value: false }); // Unenroll from class property update
                                this.$router.push('/login'); // Redirect user to login page
                            } else if (data_status.status === 'success'){
                                // Check if there was an access token gotten from the backend
                                if (data_status.access_token !== null){
                                    let environment = this.$config.environment; // Environment mode
    
                                    if (environment === 'development'){
                                        localStorage.setItem('access_token', data_status.access_token); // Update the access token in localstorage
                                    } else if (environment === 'production'){
                                        this.$store.commit('app_tokens/update_login_access_token', { value: data_status.access_token }); // Update the access token in vuex store
                                    }
                                }
                                //-----------------------------------------
    
                                let comment_data = data_status.comment_data;
    
                                this.comment_data = '';

                                this.can_comment = true;
    
                                if (this.$route.name === 'student-view_classwork'){
                                    this.$store.commit('student_streams_page/comment_linear_loader/update_value', { value: false });
                                } else if (this.$route.name === 'teacher-view_classwork'){
                                    this.$store.commit('teacher_streams_page/comment_linear_loader/update_value', { value: false });
                                }
    
                                this.$store.commit('dialog/student_private_comment_dialog/add_new_comment', { comment_data: comment_data });
    
                                this.$store.commit('dialog/msg_dialog/update_dialog', { value: false, msg: 'Please wait, Sending comment....' }); // Display the msg dialog
    
                                setTimeout(() => {
                                    // Update the err msg dialog through vuex
                                    let obj = {
                                        value: true,
                                        msg: 'Comment sent successfully!',
                                        err: false
                                    }
    
                                    this.$store.commit(this.$config.VUEX_UPDATE_ERR_MSG_DIALOG, obj);
                                    //---------------------------------------------
                                }, 30);
                            }
                            //--------------------------------------
                        } else if (response.status === false){
                            this.$store.commit('dialog/msg_dialog/update_dialog', { value: false, msg: 'Please wait, Sending comment....' }); // Display the msg dialog
                            
                            if (this.$route.name === 'student-view_classwork'){
                                this.$store.commit('student_streams_page/comment_linear_loader/update_value', { value: false });
                            } else if (this.$route.name === 'teacher-view_classwork'){
                                this.$store.commit('teacher_streams_page/comment_linear_loader/update_value', { value: false });
                            }

                            this.can_comment = true;
    
                            var route_name = this.$route.name; // Name of the current route
    
                            // Check if the current route is the student stream page or teacher stream page
                            if (route_name === 'student-view_classwork' || route_name === 'teacher-view_classwork'){
                                // Update the err msg dialog through vuex
                                let obj = {
                                    value: true,
                                    msg: 'Couldn\'t send comment!',
                                    err: true
                                }
    
                                this.$store.commit(this.$config.VUEX_UPDATE_ERR_MSG_DIALOG, obj);
                                //---------------------------------------------
                            }
                            //-------------------------------------------------
                        }
                    } else {
                        this.can_comment = true;

                        // Update the err msg dialog through vuex
                        let obj = {
                            value: true,
                            msg: 'Comment is too long. Make sure your comment is less than five hundred characters!',
                            err: true
                        }
    
                        this.$store.commit(this.$config.VUEX_UPDATE_ERR_MSG_DIALOG, obj);
                        //---------------------------------------------
                    }
                }
            } else {
                this.$store.commit('dialog/msg_dialog/update_dialog', { value: true, msg: 'Please wait, comment is still sending...' }); // Display the msg dialog
            }
        }
        //--------------------------------------------------------
    }
}