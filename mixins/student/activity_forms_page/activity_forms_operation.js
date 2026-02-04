export default {
    methods: {
        // Activity forms page
        async activity_forms_operation(class_code, classwork_id){
            this.page_view = true;
            document.querySelector('.main_comp').style.backgroundColor = '#ede7f6';

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

            let response = await this.activity_forms_request(request); // Await response from the backend

            // Analyze the response recieved
            if (response.status === true){
                let data_status = this.activity_forms_response(response.result); // Validate the response

                // Check the status of the response
                if (data_status.status === 'error'){
                    this.loading_linear = true;
                    this.is_loading = true;                    

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
                    window.location.href = `/login/`; // Redirect the user to the login page
                } else if (data_status.status === 'success'){
                    if (data_status.new_access_token !== null){
                        let environment = this.$config.environment; // Environment mode

                        if (environment === 'development'){
                            localStorage.setItem('access_token', data_status.new_access_token); // Update access token
                        } else if (environment === 'production'){
                            this.$store.commit('app_tokens/update_login_access_token', { value: data_status.new_access_token }); // Update access token
                        }
                    }

                    if (data_status.state === true){
                        this.class_code = class_code;
                        this.classwork_id = classwork_id;

                        let data = data_status.details;
                        this.email = data.acct_email;
                        this.profile_img = data.profile_image;
                        this.classwork_title = data.classwork_title;
                        this.classwork_instruction = data.classwork_instruction;
                        this.classwork_type_value = data.classwork_type;

                        if (this.classwork_type_value === 'assignment' || this.classwork_type_value === 'classwork'){
                            this.questions = data.questions;

                            this.questions.forEach(question => {
                                question["answer"] = null;
                            });
                        }

                        this.loading_linear = false;
                        this.is_loading = false;

                        document.title = this.classwork_title;

                        // Update the err msg dialog through vuex
                        let obj = {
                            value: true,
                            msg: `Welcome, This is where you can take your assignments, classworks and attendances!`,
                            err: false
                        }
    
                        this.$store.commit(this.$config.VUEX_UPDATE_ERR_MSG_DIALOG, obj);
                        //---------------------------------------------
                    } else if (data_status.state === false){
                        this.class_code = class_code;
                        this.classwork_id = classwork_id;

                        this.loading_linear = true;
                        this.is_loading = true;

                        // Update the err msg dialog through vuex
                        let obj = {
                            value: true,
                            msg: `This ${data_status.classwork_type} has expired, so you cannot attempt it anymore!`,
                            err: true
                        }

                        document.title = data_status.classwork_title;
    
                        this.$store.commit(this.$config.VUEX_UPDATE_ERR_MSG_DIALOG, obj);
                        //---------------------------------------------
                    } else if (data_status.state === 'work_submitted'){
                        this.class_code = class_code;
                        this.classwork_id = classwork_id;

                        this.loading_linear = true;
                        this.is_loading = true;

                        // Update the err msg dialog through vuex
                        let obj = {
                            value: true,
                            msg: `You have submitted this ${data_status.classwork_type} already, Go back to view your score!`,
                            err: true
                        }
    
                        this.$store.commit(this.$config.VUEX_UPDATE_ERR_MSG_DIALOG, obj);
                        //---------------------------------------------
                    }
                } else if (data_status.status === 'classwork_not_found'){
                    this.loading_linear = true;
                    this.is_loading = true;

                    window.location.href = `/student/classwork?class_code=${class_code}`;
                } else if (data_status.status === 'not_part_of_class'){
                    this.loading_linear = true;
                    this.is_loading = true;

                    window.location.href = `/student/classes`;
                } else if (data_status.status === 'class_does_not_exist'){
                    this.loading_linear = true;
                    this.is_loading = true;

                    window.location.href = `/student/classes`;
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
                    window.location.href = `/login/`; // Redirect the user to the login page
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
                    window.location.href = `/login/`; // Redirect the user to the login page
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
                    window.location.href = `/login/`; // Redirect the user to the login page
                }
                //--------------------------------------
            } else if (response.status === false){
                let route_name = this.$route.name;

                if (route_name === 'student-activity_forms'){
                    this.loading_linear = true;
                    this.is_loading = true;

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