export default {
    methods: {
        // Fetch archived classes
        fetch_archived_classes_response(data){
            if (data.status === 'missing_credentials' || data.status === 'invalid_token'){
                let obj = {
                    status: 'error',
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
            } else if (data.status === 'user_not_found'){
                let obj = {
                    status: 'error',
                    msg: 'An error just occured!'
                }

                return obj;
            } else if (data.status === true){
                if (data.token_info === 'token_available'){
                    let access_token = data.new_accessToken;
                    let obj = {
                        status: 'success',
                        access_token: access_token,
                        archived_classes: data.archived_classes
                    }

                    return obj;
                } else if (data.token_info === 'no_token'){
                    let obj = {
                        status: true,
                        access_token: null,
                        archived_classes: data.archived_classes
                    }

                    return obj;
                }
            } else if (data.status === false){
                let obj = {
                    status: false
                }

                return obj;
            }
        }
        //------------------------------------------------
    }
}