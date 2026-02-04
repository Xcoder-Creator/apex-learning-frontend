export default {
    methods: {
        // Update user settings
        update_user_settings_response(data){
            if (data.status === 'missing_credentials' || data.status === 'unauthorized'){
                let obj = {
                    status: 'error',
                    msg: 'Couldn\'t update settings!'
                }

                return obj;
            } else if (data.status === 'error_occured'){
                let obj = {
                    status: 'error',
                    msg: 'Couldn\'t update settings!'
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
                    msg: 'Couldn\'t update settings!'
                }

                return obj;
            } else if (data.status === 'invalid_token'){
                let obj = {
                    status: 'error',
                    msg: 'Couldn\'t update settings!'
                }

                return obj;
            } else if (data.status === 'settings_updated'){
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
        //------------------------------------------------
    }
}