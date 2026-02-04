export default {
    methods: {
        // Send user report
        submit_a_report_response(data){
            if (data.status === 'missing_credentials' || data.status === 'unauthorized'){
                let obj = {
                    status: 'error',
                    msg: 'Couldn\'t send report!'
                }

                return obj;
            } else if (data.status === 'error_occured'){
                let obj = {
                    status: 'error',
                    msg: 'Couldn\'t send report!'
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
                    msg: 'Couldn\'t send report!'
                }

                return obj;
            } else if (data.status === 'invalid_token'){
                let obj = {
                    status: 'error',
                    msg: 'Couldn\'t send report!'
                }

                return obj;
            } else if (data.status === 'invalid_report_type' || data.status === 'invalid_report_option'){
                let obj = {
                    status: 'error',
                    msg: 'Couldn\'t send report!'
                }

                return obj;
            } else if (data.status === 'post_not_found' || data.status === 'class_not_active'){
                let obj = {
                    status: 'error',
                    msg: 'Couldn\'t send report!'
                }

                return obj;
            } else if (data.status === 'report_created'){
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