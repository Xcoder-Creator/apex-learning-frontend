export default {
    methods: {
        // Send a comment
        send_comment_operation_response(data){
            if (data.status === 'missing_credentials' || data.status === 'invalid_token'){
                let obj = {
                    status: 'error',
                    msg: 'Couldn\'t send comment!'
                }

                return obj;
            } else if (data.status === 'class_not_active'){
                let obj = {
                    status: 'error',
                    msg: 'Couldn\'t send comment!'
                }

                return obj;
            } else if (data.status === 'missing_comment'){
                let obj = {
                    status: 'error',
                    msg: 'Comment is missing!'
                }

                return obj;
            } else if (data.status === 'invalid_comment'){
                let obj = {
                    status: 'error',
                    msg: 'Comment must not be longer than 100 characters!'
                }

                return obj;
            } else if (data.status === 'error_occured'){
                let obj = {
                    status: 'error',
                    msg: 'Couldn\'t send comment!'
                }

                return obj;
            } else if (data.status === 'token_expired'){
                let obj = {
                    status: 'token_expired'
                }

                return obj;
            } else if (data.status === 'classwork_not_found'){
                let obj = {
                    status: 'classwork_not_found',
                    msg: 'Couldn\'t send comment!'
                }

                return obj;
            } else if (data.status === 'user_not_found'){
                let obj = {
                    status: 'error',
                    msg: 'Couldn\'t send comment!'
                }

                return obj;
            } else if (data.status === 'comment_created'){
                if (data.token_info === 'token_available'){
                    let access_token = data.new_accessToken;
                    let obj = {
                        status: 'success',
                        access_token: access_token,
                        comment_data: data.details
                    }

                    return obj;
                } else if (data.token_info === 'no_token'){
                    let obj = {
                        status: 'success',
                        access_token: null,
                        comment_data: data.details
                    }

                    return obj;
                }
            }
        }
        //------------------------------------------------
    }
}