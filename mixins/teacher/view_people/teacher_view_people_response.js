export default {
    methods: {
        // Check and validate the response gotten from the view people endpoint
        teacher_view_people_response(data){
            if (data.status === 'missing_credentials'){
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
            } else if (data.status === 'data_available'){
                let students = data.students;
                let teacher = data.teacher;

                if (data.token_info === 'token_available'){
                    let access_token = data.new_accessToken;

                    let obj = {
                        status: 'success',
                        new_access_token: access_token,
                        students: students,
                        teacher: teacher,
                        value: 'data_available'
                    }

                    return obj;
                } else if (data.token_info === 'no_token'){
                    let obj = {
                        status: 'success',
                        new_access_token: null,
                        students: students,
                        teacher: teacher,
                        value: 'data_available'
                    }

                    return obj;
                }
            } else if (data.status === 'no_data'){
                let teacher = data.teacher;

                if (data.token_info === 'token_available'){
                    let access_token = data.new_accessToken;

                    let obj = {
                        status: 'success',
                        new_access_token: access_token,
                        teacher: teacher,
                        value: 'no_data'
                    }

                    return obj;
                } else if (data.token_info === 'no_token'){
                    let obj = {
                        status: 'success',
                        new_access_token: null,
                        teacher: teacher,
                        value: 'no_data'
                    }

                    return obj;
                }
            } else if (data.status === 'not_teacher_of_class'){
                let obj = {
                    status: 'error',
                    msg: 'An error just occured!'
                }

                return obj;
            } else if (data.status === 'class_does_not_exist'){
                let obj = {
                    status: 'error',
                    msg: 'An error just occured!'
                }

                return obj;
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
            }
        }
        //------------------------------------------------
    }
}