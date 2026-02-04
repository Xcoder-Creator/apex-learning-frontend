export default {
    methods: {
        // Unenroll a user from a particular class
        unenroll_from_class_response(data){
            if (data.status === 'missing_credentials'){
                let obj = {
                    status: 'error',
                    for_prod: true,
                    msg: 'Couldn\'t unenroll from class!'
                }

                return obj;
            } else if (data.status === 'error_occured'){
                let obj = {
                    status: 'error',
                    for_prod: false,
                    msg: 'Couldn\'t unenroll from class!'
                }

                return obj;
            } else if (data.status === 'token_expired'){
                let obj = {
                    status: 'token_expired'
                }

                return obj;
            } else if (data.status === 'unenrolled_from_class_successfully'){
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
            } else if (data.status === 'not_member_of_class'){
                let obj = {
                    status: 'error',
                    for_prod: false,
                    msg: 'You are not a member of this class!'
                }

                return obj;
            } else if (data.status === 'class_does_not_exist'){
                let obj = {
                    status: 'error',
                    for_prod: false,
                    msg: 'This class does not exist!'
                }

                return obj;
            } else if (data.status === 'user_does_not_exist'){
                let obj = {
                    status: 'error',
                    for_prod: false,
                    msg: 'This user does not exist!'
                }

                return obj;
            } else if (data.status === 'invalid_token'){
                let obj = {
                    status: 'invalid_token',
                    msg: 'Couldn\'t unenroll from class!'
                }

                return obj;
            }
        }
        //------------------------------------------------
    }
}