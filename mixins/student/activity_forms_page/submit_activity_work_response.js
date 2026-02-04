export default {
    methods: {
        // Check and validate the response gotten from the submit activity work endpoint
        submit_activity_work_response(data){
            if (data.status === 'missing_credentials'){
                let obj = {
                    status: 'error'
                }

                return obj;
            } else if (data.status === 'error_occured'){
                let obj = {
                    status: 'error'
                }

                return obj;
            } else if (data.status === 'token_expired'){
                let obj = {
                    status: 'token_expired'
                }

                return obj;
            } else if (data.status === true){
                let access_token = null;

                if (data.token_info === 'token_available'){
                    access_token = data.new_accessToken;
                } else if (data.token_info === 'no_token'){
                    access_token = null;
                }

                let obj = {
                    status: 'success',
                    new_access_token: access_token,
                    state: true,
                    classwork_type: data.classwork_type
                }

                return obj;
            } else if (data.status === false){
                let access_token = null;

                if (data.token_info === 'token_available'){
                    access_token = data.new_accessToken;
                } else if (data.token_info === 'no_token'){
                    access_token = null;
                }

                let obj = {
                    status: 'success',
                    new_access_token: access_token,
                    state: false,
                    classwork_type: data.classwork_type
                }

                return obj;
            } else if (data.status === 'work_submitted'){
                let access_token = null;

                if (data.token_info === 'token_available'){
                    access_token = data.new_accessToken;
                } else if (data.token_info === 'no_token'){
                    access_token = null;
                }

                let obj = {
                    status: 'success',
                    new_access_token: access_token,
                    state: 'work_submitted',
                    classwork_type: data.classwork_type
                }

                return obj;
            } else if (data.status === 'classwork_not_found'){
                let obj = {
                    status: 'classwork_not_found'
                }

                return obj;
            } else if (data.status === 'not_part_of_class'){
                let obj = {
                    status: 'not_part_of_class'
                }

                return obj;
            } else if (data.status === 'class_does_not_exist'){
                let obj = {
                    status: 'class_does_not_exist'
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
            }
        }
        //----------------------------------------------------
    }
}