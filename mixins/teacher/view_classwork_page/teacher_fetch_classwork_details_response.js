export default {
    methods: {
        // Check and validate the response gotten from the fetch classwork details endpoint
        teacher_fetch_classwork_details_response(data){
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
                    data_details: data.data_details,
                    classwork_type: data.classwork_type,
                    classwork_title: data.classwork_title,
                    date_created: data.date_created,
                    user_name: data.user_name,
                    classwork_points: data.classwork_points,
                    classwork_due_date_time: data.classwork_due_date_time,
                    total_no_of_students: data.total_no_of_students,
                    total_no_of_students_that_have_submitted_work: data.total_no_of_students_that_have_submitted_work,
                    new_access_token: access_token
                }

                return obj;
            } else if (data.status === 'classwork_not_found'){
                let obj = {
                    status: 'classwork_not_found'
                }

                return obj;
            } else if (data.status === 'no_students_available'){
                let access_token = null;

                if (data.token_info === 'token_available'){
                    access_token = data.new_accessToken;
                } else if (data.token_info === 'no_token'){
                    access_token = null;
                }

                let obj = {
                    status: 'no_students_available',
                    classwork_type: data.classwork_type,
                    classwork_title: data.classwork_title,
                    date_created: data.date_created,
                    user_name: data.user_name,
                    classwork_points: data.classwork_points,
                    classwork_due_date_time: data.classwork_due_date_time,
                    new_access_token: access_token
                }

                return obj;
            } else if (data.status === 'not_teacher_of_class'){
                let obj = {
                    status: 'not_teacher_of_class'
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