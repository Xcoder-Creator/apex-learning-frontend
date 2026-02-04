export default {
    methods: {
        // Change class bg image mixin method to change the background image of a class
        async change_class_bg_img_operation(class_bg_img_id, class_code){
            this.$store.commit('dialog/bg_class_img_list_dialog/update_can_select_bg', { value: false });

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
                        bg_img_id: class_bg_img_id
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
                    body: new URLSearchParams({
                        class_code: class_code,
                        bg_img_id: class_bg_img_id
                    }),
                    signal: this.controller.signal
                }
                //--------------------------------
            }

            let response = await this.change_class_bg_img_request(request); // Await response from the backend

            if (response.status === true){
                let data_status = this.change_class_bg_img_response(response.result); // Validate the response

                // Check the status of the response
                if (data_status.status === 'error'){
                    this.loading_linear = false;
                    this.$store.commit('dialog/bg_class_img_list_dialog/update_disable_select_theme', { value: false });
                    document.querySelector('#btn_txt').innerText = 'Select class theme';
                    this.$store.commit('dialog/bg_class_img_list_dialog/update_can_select_bg', { value: true });

                    // Update the err msg dialog through vuex
                    let obj = {
                        value: true,
                        msg: data_status.msg,
                        err: true
                    }

                    this.$store.commit(this.$config.VUEX_UPDATE_ERR_MSG_DIALOG, obj);
                    //---------------------------------------------
                } else if (data_status.status === 'token_expired'){
                    let environment = this.$config.environment; // Environment mode

                    if (environment === 'development'){
                        localStorage.removeItem('access_token'); // Remove access token
                        localStorage.removeItem('refresh_token');  // Remove refresh token
                    } else if (environment === 'production'){
                        this.$store.commit('app_tokens/update_login_access_token', { value: null }); // Remove access token
                    }

                    this.$store.commit('app_components/reset_data'); // Reset app components in vuex
                    this.$store.commit('class_details/reset_data'); // Reset class details in vuex
                    this.$store.commit('page_loading/page_loading/update_data', { value: true }); // Page loading
                    this.$store.commit('user_details/user_details/reset_data'); // Reset user details
                    this.$router.push('/login/'); // Redirect the user to the login page
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

                    this.$store.commit('dialog/class_bg_image_dialog/update_dialog', { value: false });
                    this.$store.commit('dialog/bg_class_img_list_dialog/update_dialog', { value: false });

                    setTimeout(() => {
                        this.loading_linear = false;
                        this.$store.commit('dialog/bg_class_img_list_dialog/update_disable_select_theme', { value: true });
                        document.querySelector('#btn_txt').innerText = 'Select class theme';
                        this.$store.commit('dialog/bg_class_img_list_dialog/update_can_select_bg', { value: true });

                        // Update the err msg dialog through vuex
                        let obj = {
                            value: true,
                            msg: 'Background image changed successfully!',
                            err: false
                        }

                        this.$store.commit(this.$config.VUEX_UPDATE_ERR_MSG_DIALOG, obj);
                        //---------------------------------------------
                    }, 50);
                    
                    this.$store.commit('teacher_streams_page/stream_comp/update_loaded_posts', { value: false }); // Update loaded posts from vuex
                    this.$store.commit('teacher_streams_page/stream_comp/update_loading_linear', { value: true }); // Update loading linear from vuex
                    this.$store.commit('teacher_streams_page/stream_comp/remove_class_post', { class_code: class_code }); // Remove class posts from vuex
                    this.$store.commit('teacher_streams_page/stream_comp/update_posts_array', { value: [] }); // Update posts array from vuex

                    this.$store.commit('teacher_streams_page/stream_comp/update_refresh_data', { value: false }); // Refresh data property from vuex
                    this.$store.commit('teacher_streams_page/stream_comp/update_can_create_post', { value: false });
                    this.$store.commit('teacher_streams_page/teacher_stream_route_config/update_fetch_more_posts', { value: false });
                    this.$store.commit('teacher_streams_page/stream_comp/update_spinner', { value: false });
                    this.$store.commit('teacher_streams_page/teacher_stream_route_config/update_delete_class_post', { value: false });

                    let bg = document.querySelectorAll('[data-bg]');
                    let svg = document.querySelectorAll('[data-svg]');

                    bg.forEach(elem => {
                        elem.style.border = 'unset';
                    });

                    svg.forEach(elem => {
                        elem.style.display = 'none';
                        elem.removeAttribute("fill");
                    });

                    this.$store.commit('dialog/bg_class_img_list_dialog/update_bg_class_img', { value: null });
                    this.$store.commit('dialog/bg_class_img_list_dialog/update_disable_select_theme', { value: true });

                    this.teacher_fetch_class_list(class_code, null, null, null);
                }
                //----------------------------------------
            } else if (response.status === false){
                if (this.$route.name === 'teacher-stream'){
                    this.loading_linear = false;
                    this.$store.commit('dialog/bg_class_img_list_dialog/update_disable_select_theme', { value: true });
                    document.querySelector('#btn_txt').innerText = 'Select class theme';
                    this.$store.commit('dialog/bg_class_img_list_dialog/update_can_select_bg', { value: true });

                    // Update the err msg dialog through vuex
                    let obj = {
                        value: true,
                        msg: 'Couldn\'t change background image!',
                        err: true
                    }

                    this.$store.commit(this.$config.VUEX_UPDATE_ERR_MSG_DIALOG, obj);
                    //---------------------------------------------
                }
            }
        }
        //-----------------------------------------------------------------
    }
}