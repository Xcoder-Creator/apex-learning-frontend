export default {
    methods: {
        // Create a new class
        create_class_response(data){
            if (data.status === 'missing_credentials' || data.status === 'invalid_credentials'){
                let obj = {
                    status: 'error',
                    msg: 'Couldn\'t create class!'
                }

                return obj;
            } else if (data.status === 'error_occured'){
                let obj = {
                    status: 'error',
                    msg: 'Couldn\'t create class!'
                }

                return obj;
            } else if (data.status === 'token_expired'){
                let obj = {
                    status: 'token_expired'
                }

                return obj;
            } else if (data.status === 'class_created_successfully'){
                if (data.token_info === 'token_available'){
                    let access_token = data.new_accessToken;
                    let class_data = data.details;
                    let obj = {
                        status: 'success',
                        access_token: access_token,
                        class_code: data.class_code,
                        class_data: class_data,
                        class_code: data.class_code
                    }

                    return obj;
                } else if (data.token_info === 'no_token'){
                    let class_data = data.details;
                    let obj = {
                        status: 'success',
                        access_token: null,
                        class_code: data.class_code,
                        class_data: class_data,
                        class_code: data.class_code
                    }

                    return obj;
                }
            } else if (data.status === 'role_error'){
                let obj = {
                    status: 'role_error'
                }

                return obj;
            } else if (data.status === 'user_not_found'){
                let obj = {
                    status: 'error',
                    msg: 'Couldn\'t create class!'
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