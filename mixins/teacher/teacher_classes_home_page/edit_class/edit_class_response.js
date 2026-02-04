export default {
    methods: {
        // Edit a particular class
        edit_class_response(data){
            if (data.status === 'missing_credentials' || data.status === 'invalid_credentials'){
                let obj = {
                    status: 'error',
                    for_prod: true,
                    msg: 'Couldn\'t edit class!'
                }

                return obj;
            } else if (data.status === 'error_occured'){
                let obj = {
                    status: 'error',
                    for_prod: false,
                    msg: 'Couldn\'t edit class!'
                }

                return obj;
            } else if (data.status === 'token_expired'){
                let obj = {
                    status: 'token_expired'
                }

                return obj;
            } else if (data.status === 'class_details_updated_successfully'){
                if (data.token_info === 'token_available'){
                    let access_token = data.new_accessToken;
                    let obj = {
                        status: 'success',
                        access_token: access_token,
                        msg: 'Class edited successfully!'
                    }

                    return obj;
                } else if (data.token_info === 'no_token'){
                    let obj = {
                        status: 'success',
                        access_token: null,
                        msg: 'Class edited successfully!'
                    }

                    return obj;
                }
            } else if (data.status === 'role_error'){
                let obj = {
                    status: 'role_error'
                }

                return obj;
            } else if (data.status === 'not_allowed'){
                let obj = {
                    status: 'error',
                    for_prod: false,
                    msg: 'Couldn\'t edit class!'
                }

                return obj;
            } else if (data.status === 'user_not_found'){
                let obj = {
                    status: 'error',
                    for_prod: false,
                    msg: 'Couldn\'t edit class!'
                }

                return obj;
            } else if (data.status === 'invalid_token'){
                let obj = {
                    status: 'invalid_token'
                }

                return obj;
            }
        }
        //------------------------------------------------
    }
}