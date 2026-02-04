export default {
    methods: {
        // Check and validate the response gotten from the signup endpoint
        signup_operation_response(data){
            if (data.status === 'missing_name'){
                let obj = {
                    status: 'error',
                    msg: 'Name is missing!'
                }

                return obj;
            } else if (data.status === 'name_length_error'){
                let obj = {
                    status: 'error',
                    msg: 'The name is too long!'
                }

                return obj;
            } else if (data.status === 'missing_email'){
                let obj = {
                    status: 'error',
                    msg: 'Email is missing!'
                }
            } else if (data.status === 'invalid_email'){
                let obj = {
                    status: 'error',
                    msg: 'This email is invalid!'
                }

                return obj;
            } else if (data.status === 'missing_role'){
                let obj = {
                    status: 'error',
                    msg: 'Role is missing!'
                }

                return obj;
            } else if (data.status === 'role_length_error'){
                let obj = {
                    status: 'error',
                    msg: 'Invalid role!'
                }

                return obj;
            } else if (data.status === 'missing_password' || data.status === 'invalid_password'){
                if (data.status === 'missing_password'){
                    let obj = {
                        status: 'error',
                        msg: 'Password is missing!'
                    }
    
                    return obj;
                } else if (data.status === 'invalid_password'){
                    let obj = {
                        status: 'error',
                        msg: 'Password is invalid!'
                    }
    
                    return obj;
                }
            } else if (data.status === 'password_length_error'){
                let obj = {
                    status: 'error',
                    msg: 'Invalid password!'
                }

                return obj;
            } else if (data.status === 'error_occured'){
                let obj = {
                    status: 'error',
                    msg: 'An error just occured, Try again!'
                }

                return obj;
            } else if (data.status === 'email_already_taken'){
                let obj = {
                    status: 'error',
                    msg: 'This email is already taken!'
                }

                return obj;
            } else if (data.status === 'password_already_taken'){
                let obj = {
                    status: 'error',
                    msg: 'This password is already taken!'
                }

                return obj;
            } else if (data.status === 'account_creation_successfull'){
                let obj = {
                    status: 'successful',
                    name: data.user_name,
                    email: data.user_email,
                    access_token: data.accessToken
                }

                return obj;
            } else if (data.status === 'unspecified_role'){
                let obj = {
                    status: 'error',
                    msg: 'Role wasn\'t specified!'
                }

                return obj;
            } else if (data.status === 'invalid_credentials'){
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