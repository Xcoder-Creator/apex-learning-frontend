export default {
    methods: {
        // Check and validate the response gotten from the fetch class list endpoint
        fetch_class_list_response(data){
            if (data.status === 'missing_credentials'){
                let obj = {
                    status: 'error',
                    for_prod: true,
                    msg: 'An error just occured!'
                }

                return obj;
            } else if (data.status === 'error_occured'){
                let obj = {
                    status: 'error',
                    msg: 'An error just occured!'
                }

                return obj;
            } else if (data.status === 'token_expired'){
                let obj = {
                    status: 'token_expired'
                }

                return obj;
            } else if (data.status === 'details_fetched_successfully'){
                if (data.token_info === 'token_available'){
                    let access_token = data.new_accessToken;
                    let class_data = data.details;
                    let obj = {
                        status: 'success',
                        new_access_token: access_token,
                        class_data: class_data,
                        value: 'token_available'
                    }

                    return obj;
                } else if (data.token_info === 'no_token'){
                    let class_data = data.details;
                    let obj = {
                        status: 'success',
                        class_data: class_data,
                        value: 'no_token'
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
                    msg: 'An error just occured!'
                }

                return obj;
            } else if (data.status === 'invalid_token'){
                let obj = {
                    status: 'error',
                    msg: 'An error just occured!'
                }

                return obj;
            }
        }
        //------------------------------------------------
    }
}