export default {
    methods: {
        // Add a user to a particular class
        join_class_response(data){
            if (data.status === 'missing_credentials'){
                let obj = {
                    status: 'error',
                    for_prod: true,
                    msg: 'Couldn\'t join class!'
                }

                return obj;
            } else if (data.status === 'missing_class_code'){
                let obj = {
                    status: 'error',
                    for_prod: false,
                    msg: 'Couldn\'t join class!'
                }

                return obj;
            } else if (data.status === 'error_occured'){
                let obj = {
                    status: 'error',
                    for_prod: false,
                    msg: 'Couldn\'t join class!'
                }

                return obj;
            } else if (data.status === 'token_expired'){
                let obj = {
                    status: 'token_expired'
                }

                return obj;
            } else if (data.status === 'already_joined_class'){
                if (data.token_info === 'token_available'){
                    let access_token = data.new_accessToken;
                    let obj = {
                        status: 'already_joined_class',
                        access_token: access_token,
                        msg: 'You are already part of this class!'
                    }

                    return obj;
                } else if (data.token_info === 'no_token'){
                    let obj = {
                        status: 'already_joined_class',
                        access_token: null,
                        msg: 'You are already part of this class!'
                    }

                    return obj;
                }
            } else if (data.status === 'joined_class_successfully'){
                if (data.token_info === 'token_available'){
                    let access_token = data.new_accessToken;
                    let obj = {
                        status: 'success',
                        access_token: access_token,
                        class_code: data.class_code,
                        class_data: data.details
                    }

                    return obj;
                } else if (data.token_info === 'no_token'){
                    let obj = {
                        status: 'success',
                        access_token: null,
                        class_code: data.class_code,
                        class_data: data.details
                    }

                    return obj;
                }
            } else if (data.status === 'role_error'){
                let obj = {
                    status: 'role_error'
                }

                return obj;
            } else if (data.status === 'class_does_not_exist'){
                let obj = {
                    status: 'error',
                    for_prod: false,
                    msg: 'This class does not exist!'
                }

                return obj;
            } else if (data.status === 'user_not_found'){
                let obj = {
                    status: 'error',
                    for_prod: false,
                    msg: 'Couldn\'t join class!'
                }

                return obj;
            } else if (data.status === 'invalid_token'){
                let obj = {
                    status: 'invalid_token',
                    msg: 'Couldn\'t join class!'
                }

                return obj;
            }
        }
        //------------------------------------------------
    }
}