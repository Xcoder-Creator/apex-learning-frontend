export default {
    methods: {
        // Check and validate the response gotten from the fetch classwork details endpoint
        student_fetch_classwork_details_response(data){
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
                let access_token = null;

                if (data.token_info === 'token_available'){
                    access_token = data.new_accessToken;
                } else if (data.token_info === 'no_token'){
                    access_token = null;
                }

                let obj = {
                    status: 'success',
                    your_response: data.your_response,
                    private_comments: data.private_comments,
                    classwork_type: data.classwork_type,
                    classwork_title: data.classwork_title,
                    date_created: data.date_created,
                    user_name: data.user_name,
                    teacher_id: data.teacher_id,
                    classwork_points: data.classwork_points,
                    classwork_due_date_time: data.classwork_due_date_time,
                    classwork_instruction: data.classwork_instruction,
                    new_access_token: access_token
                }

                return obj;
            } else if (data.status === 'classwork_not_found'){
                let obj = {
                    status: 'classwork_not_found'
                }

                return obj;
            } else if (data.status === 'not_teacher_of_class'){
                let obj = {
                    status: 'not_teacher_of_class'
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