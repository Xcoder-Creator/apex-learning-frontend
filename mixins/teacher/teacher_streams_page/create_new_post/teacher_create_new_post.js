export default {
    methods: {
        // Create a new post
        async teacher_create_new_post(post_data, files){
            let can_create_post = this.$store.state.teacher_streams_page.stream_comp.can_create_post;

            if (can_create_post === false){
                this.$store.commit('dialog/msg_dialog/update_dialog', { value: true, msg: 'Can\'t create a post at this point!' });
            } else if (can_create_post === true){
                this.$store.commit('teacher_streams_page/stream_comp/update_refresh_data', { value: false }); // Refresh data property from vuex
                this.$store.commit('teacher_streams_page/stream_comp/update_can_create_post', { value: false });
                this.$store.commit('teacher_streams_page/teacher_stream_route_config/update_fetch_more_posts', { value: false });
                this.$store.commit('teacher_streams_page/stream_comp/update_spinner', { value: false });
                this.$store.commit('teacher_streams_page/teacher_stream_route_config/update_delete_class_post', { value: false });

                let post_type = ''; // Post type
                var sanitized_post_data = this.stripAttributes(this.sanitizeString((this.stripElem(post_data)))); // Sanitize post data
                let is_empty = this.check_if_text_editor_is_empty(sanitized_post_data); // Validate post data

                if (is_empty.value === true){
                    this.$store.commit('dialog/msg_dialog/update_dialog', { value: true, msg: 'Please, Write something!' });

                    this.$store.commit('teacher_streams_page/stream_comp/update_refresh_data', { value: true }); // Refresh data property from vuex
                    this.$store.commit('teacher_streams_page/stream_comp/update_can_create_post', { value: true });
                    this.$store.commit('teacher_streams_page/teacher_stream_route_config/update_fetch_more_posts', { value: true });
                    this.$store.commit('teacher_streams_page/stream_comp/update_spinner', { value: false });
                    this.$store.commit('teacher_streams_page/teacher_stream_route_config/update_delete_class_post', { value: true });
                } else if (is_empty.value === false){
                    let data_content = is_empty.data;

                    if (files.length > 0){
                        post_type = 'post_with_attachment';

                        if (files.length > 3){
                            // Update the err msg dialog through vuex
                            let obj = {
                                value: true,
                                msg: 'Error, Can\'t upload more than 3 files!',
                                err: true
                            }

                            this.$store.commit(this.$config.VUEX_UPDATE_ERR_MSG_DIALOG, obj);
                            //---------------------------------------------

                            this.$store.commit('teacher_streams_page/stream_comp/update_refresh_data', { value: true }); // Refresh data property from vuex
                            this.$store.commit('teacher_streams_page/stream_comp/update_can_create_post', { value: true });
                            this.$store.commit('teacher_streams_page/teacher_stream_route_config/update_fetch_more_posts', { value: true });
                            this.$store.commit('teacher_streams_page/stream_comp/update_spinner', { value: false });
                            this.$store.commit('teacher_streams_page/teacher_stream_route_config/update_delete_class_post', { value: true });
                        } else {
                            let files_array_length = files.length;
                            let good_files = 0;

                            // Loop through all files in the files array
                            for (let file_object of files){
                                // Check if the file type for the files are supported
                                if (['image/jpeg', 'image/gif', 'image/png', 'image/svg+xml', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document', 'application/vnd.openxmlformats-officedocument.presentationml.presentation', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet', 'application/pdf', 'audio/mp4', 'audio/mpeg', 'video/mp4', 'audio/wave', 'audio/wav', 'video/webm', 'application/x-zip-compressed', 'application/zip', 'text/html', 'text/css', 'text/javascript', 'application/vnd.ms-powerpoint'].includes(file_object.type)){
                                    // Check if the file size is less than 100MB
                                    if (file_object.size < 100000000){
                                        good_files++;
                                    }
                                }
                            }
                            //---------------------------------------

                            if (good_files === files_array_length){
                                if (this.$route.query.class_code){
                                    this.post_bool = false; // Allow button loader to be displayed
                                    let class_code = this.$route.query.class_code; // Class code
                                    let environment = this.$config.environment; // Environment mode
                                    var request = null; // Request variable
                                    var form_data = new FormData();

                                    if (environment === 'development'){
                                        for (const file of files){
                                            form_data.append('file', file);
                                        }

                                        form_data.append('post_type_value', post_type); // Post type
                                        form_data.append('access_token', localStorage.getItem('access_token')); // Access token
                                        form_data.append('class_code', class_code); // Class code
                                        form_data.append('data_content', data_content); // Post data content

                                        request = {
                                            method: 'POST',
                                            headers: {
                                                Authorization: `Bearer ${ localStorage.getItem('refresh_token') }`
                                            },
                                            body: form_data,
                                            signal: this.controller.signal
                                        }

                                        this.teacher_send_request(request, class_code, post_type, data_content);
                                    } else if (environment === 'production'){
                                        let access_token = this.$store.state.app_tokens.login_access_token; // Access token

                                        for (const file of files){
                                            form_data.append('file', file);
                                        }

                                        form_data.append('post_type_value', post_type); // Post type
                                        form_data.append('class_code', class_code); // Class code
                                        form_data.append('data_content', data_content); // Post data content

                                        request = {
                                            method: 'POST',
                                            headers: {
                                                Authorization: `Bearer ${ access_token }`
                                            },
                                            body: form_data,
                                            signal: this.controller.signal
                                        }

                                        this.teacher_send_request(request, class_code, post_type, data_content);
                                    }
                                } else {
                                    this.$router.push('/teacher/classes/');
                                }
                            } else {
                                // Update the err msg dialog through vuex
                                let obj2 = {
                                    value: true,
                                    msg: 'Error, The file(s) is either too large or is not supported! (Maximum file size: 100MB)',
                                    err: true
                                }

                                this.$store.commit(this.$config.VUEX_UPDATE_ERR_MSG_DIALOG, obj2);
                                //---------------------------------------------

                                this.$store.commit('teacher_streams_page/stream_comp/update_refresh_data', { value: true }); // Refresh data property from vuex
                                this.$store.commit('teacher_streams_page/stream_comp/update_can_create_post', { value: true });
                                this.$store.commit('teacher_streams_page/teacher_stream_route_config/update_fetch_more_posts', { value: true });
                                this.$store.commit('teacher_streams_page/stream_comp/update_spinner', { value: false });
                                this.$store.commit('teacher_streams_page/teacher_stream_route_config/update_delete_class_post', { value: true });
                            }
                        }
                    } else {
                        post_type = 'plain_post';

                        if (this.$route.query.class_code){
                            this.post_bool = false; // Allow button loader to be displayed
                            let class_code = this.$route.query.class_code; // Class code
                            let environment = this.$config.environment; // Environment mode
                            var request = null; // Request variable
                            var form_data = new FormData();

                            if (environment === 'development'){
                                form_data.append('post_type_value', post_type); // Post type
                                form_data.append('access_token', localStorage.getItem('access_token')); // Access token
                                form_data.append('class_code', class_code); // Class code
                                form_data.append('data_content', data_content); // Post data content

                                request = {
                                    method: 'POST',
                                    headers: {
                                        Authorization: `Bearer ${ localStorage.getItem('refresh_token') }`
                                    },
                                    body: form_data,
                                    signal: this.controller.signal
                                }

                                this.teacher_send_request(request, class_code, post_type, data_content);
                            } else if (environment === 'production'){
                                let access_token = this.$store.state.app_tokens.login_access_token; // Access token
                                form_data.append('post_type_value', post_type); // Post type
                                form_data.append('class_code', class_code); // Class code
                                form_data.append('data_content', data_content); // Post data content

                                request = {
                                    method: 'POST',
                                    headers: {
                                        Authorization: `Bearer ${ access_token }`
                                    },
                                    body: form_data,
                                    signal: this.controller.signal
                                }

                                this.teacher_send_request(request, class_code, post_type, data_content);
                            }
                        } else {
                            this.$router.push('/teacher/classes/');
                        }
                    }
                }
            }
        }
        //---------------------------------------------------------------------
    }
}