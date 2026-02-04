export default {
    methods: {
        // Verify the response gotten from the change class bg image endpoint
        change_class_bg_img_response(data){
            if (data.status === 'missing_credentials' || data.status === 'wrong_img_id'){
                let obj = {
                    status: 'error',
                    msg: 'Couldn\'t change background image!'
                }

                return obj;
            } else if (data.status === 'not_allowed'){
                let obj = {
                    status: 'error',
                    msg: 'Couldn\'t change background image!'
                }

                return obj;
            } else if (data.status === 'error_occured'){
                let obj = {
                    status: 'error',
                    msg: 'Couldn\'t change background image!'
                }

                return obj;
            } else if (data.status === 'token_expired'){
                let obj = {
                    status: 'token_expired'
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
            } else if (data.status === 'background_image_changed_successfully'){
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
            }
        }
        //--------------------------------------------------
    }
}