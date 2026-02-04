export default {
    methods: {
        // Check and validate the response gotten from the activity forms endpoint
        activity_forms_response(data){
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

                let details = {
                    acct_email: data.acct_email, 
                    profile_image: data.profile_image, 
                    classwork_title: data.classwork_title, 
                    classwork_instruction: data.classwork_instruction, 
                    classwork_type: data.classwork_type,
                    questions: data.questions
                }

                let obj = {
                    status: 'success',
                    new_access_token: access_token,
                    state: true,
                    details: details
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
                    classwork_type: data.classwork_type,
                    classwork_title: data.classwork_title,
                    state: false
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
                    classwork_type: data.classwork_type,
                    state: 'work_submitted'
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