export default {
    methods: {
        // Delete a particular post from a class response
        delete_class_post_response(data){
            if (data.status === 'missing_credentials'){
                let obj = {
                    status: 'error',
                    msg: 'Couldn\'t delete post!'
                }

                return obj;
            } else if (data.status === 'error_occured'){
                let obj = {
                    status: 'error',
                    msg: 'Couldn\'t delete post!'
                }

                return obj;
            } else if (data.status === 'token_expired'){
                let obj = {
                    status: 'token_expired'
                }

                return obj;
            } else if (data.status === 'post_deleted'){
                if (data.token_info === 'token_available'){
                    let access_token = data.new_accessToken;
                    let obj = {
                        status: 'success',
                        access_token: access_token
                    }

                    return obj;
                } else if (data.token_info === 'no_token'){
                    let obj = {
                        status: 'success',
                        access_token: null
                    }

                    return obj;
                }
            } else if (data.status === 'post_does_not_exist'){
                let obj = {
                    status: 'post_does_not_exist',
                    msg: 'This post does not exist!'
                }

                return obj;
            } else if (data.status === 'user_id_mismatch'){
                let obj = {
                    status: 'error',
                    msg: 'Couldn\'t delete post!'
                }

                return obj;
            } else if (data.status === 'class_does_not_exist'){
                let obj = {
                    status: 'error',
                    msg: 'Couldn\'t delete post!'
                }

                return obj;
            } else if (data.status === 'role_error'){
                let obj = {
                    status: 'role_error'
                }

                return obj;
            } else if (data.status === 'user_not_found'){
                let obj = {
                    status: 'user_not_found'
                }

                return obj;
            } else if (data.status === 'invalid_token'){
                let obj = {
                    status: 'invalid_token'
                }

                return obj;
            } else if (data.status === 'not_part_of_class'){
                let obj = {
                    status: 'not_part_of_class'
                }

                return obj;
            }
        }
        //------------------------------------------------
    }
}