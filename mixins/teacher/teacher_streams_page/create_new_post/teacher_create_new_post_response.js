export default {
    methods: {
        // Create a new post response
        teacher_create_new_post_response(data){
            if (data.status === 'missing_credentials'){
                let obj = {
                    status: 'error',
                    msg: 'Couldn\'t create post!'
                }

                return obj;
            } else if (data.status === 'error_occured'){
                let obj = {
                    status: 'error',
                    msg: 'Couldn\'t create post!'
                }

                return obj;
            } else if (data.status === 'class_not_active'){
                let obj = {
                    status: 'error',
                    msg: 'Couldn\'t create post!'
                }

                return obj;
            } else if (data.status === 'token_expired'){
                let obj = {
                    status: 'token_expired'
                }

                return obj;
            } else if (data.status === 'post_created_successfully'){
                if (data.token_info === 'token_available'){
                    if (data.post_type === 'plain_post'){
                        let access_token = data.new_accessToken;
                        let obj = {
                            status: 'success',
                            access_token: access_token,
                            last_post_id: data.last_post_id,
                            post_date: data.post_creation_date
                        }

                        return obj;
                    } else if (data.post_type === 'post_with_attachment'){
                        let access_token = data.new_accessToken;
                        let obj = {
                            status: 'success',
                            access_token: access_token,
                            last_post_id: data.last_post_id,
                            post_date: data.post_creation_date,
                            attached_files: data.attached_files
                        }

                        return obj;
                    }
                } else if (data.token_info === 'no_token'){
                    if (data.post_type === 'plain_post'){
                        let obj = {
                            status: 'success',
                            access_token: null,
                            last_post_id: data.last_post_id,
                            post_date: data.post_creation_date
                        }

                        return obj;
                    } else if (data.post_type === 'post_with_attachment'){
                        let obj = {
                            status: 'success',
                            access_token: null,
                            last_post_id: data.last_post_id,
                            post_date: data.post_creation_date,
                            attached_files: data.attached_files
                        }

                        return obj;
                    }
                }
            } else if (data.status === 'not_a_member_of_class' || data.status === 'class_not_active'){
                let obj = {
                    status: 'error',
                    msg: 'Couldn\'t create post!'
                }

                return obj;
            } else if (data.status === 'class_does_not_exist'){
                let obj = {
                    status: 'error',
                    msg: 'Couldn\'t create post!'
                }

                return obj;
            } else if (data.status === 'error_in_file_length'){
                let obj = {
                    status: 'error',
                    msg: 'Couldn\'t create post!'
                }

                return obj;
            } else if (data.status === 'file_error' || data.status === 'file_length_error'){
                let obj = {
                    status: 'error',
                    msg: 'Couldn\'t create post!'
                }

                return obj;
            } else if (data.status === 'user_does_not_exist'){
                let obj = {
                    status: 'error',
                    msg: 'Couldn\'t create post!'
                }

                return obj;
            } else if (data.status === 'invalid_token'){
                let obj = {
                    status: 'error',
                    msg: 'Couldn\'t create post!'
                }

                return obj;
            }
        }
        //------------------------------------------------
    }
}