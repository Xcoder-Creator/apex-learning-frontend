export default {
    methods: {
        // Check and validate the response gotten from the fetch classworks endpoint
        teacher_fetch_classworks_response(data){
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
            } else if (data.status === 'successfull'){
                let state = '';
                let access_token = null;

                if (data.result.value === true){
                    state = 'classworks_available';
                } else if (data.result.value === false){
                    state = 'no_classworks';
                }

                if (data.token_info === 'token_available'){
                    access_token = data.new_accessToken;
                } else if (data.token_info === 'no_token'){
                    access_token = null;
                }

                let obj = {
                    status: 'success',
                    state: state,
                    classworks: data.result.classworks,
                    class_code: data.class_code,
                    new_access_token: access_token
                }

                return obj;
            } else if (data.status === 'not_teacher_of_class'){
                let obj = {
                    status: 'not_teacher_of_class'
                }

                return obj;
            } else if (data.status === 'class_does_not_exist'){
                let access_token = null;

                if (data.token_info === 'token_available'){
                    access_token = data.new_accessToken;
                } else if (data.token_info === 'no_token'){
                    access_token = null;
                }

                let obj = {
                    status: 'class_does_not_exist',
                    new_access_token: access_token
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