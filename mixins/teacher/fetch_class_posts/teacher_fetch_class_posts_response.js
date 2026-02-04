export default {
    methods: {
        // Check and validate the response gotten from the fetch post endpoint
        teacher_fetch_class_posts_response(data){
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
            } else if (data.status === 'posts_available' || data.status === 'no_posts'){
                let state = '';
                let access_token = null;
                let offset = null;
                let classwork_details = null;
                let classwork_available = null;

                if (data.status === 'posts_available'){
                    state = 'posts_available';
                    offset = data.offset;
                } else if (data.status === 'no_posts'){
                    state = 'no_posts';
                    offset = null;
                }

                if (data.classwork_available === true){
                    classwork_available = true;
                    classwork_details = data.classwork_data;
                } else if (data.classwork_available === false){
                    classwork_available = false;
                    classwork_details = null;
                }

                if (data.token_info === 'token_available'){
                    access_token = data.new_accessToken;
                } else if (data.token_info === 'no_token'){
                    access_token = null;
                }

                let obj = {
                    status: 'success',
                    state: state,
                    class_posts: data.class_posts,
                    new_access_token: access_token,
                    offset: offset,
                    total_posts_length: data.total_posts_length,
                    classwork_available: classwork_available,
                    classwork_details: classwork_details
                }

                return obj;
            } else if (data.status === 'not_teacher_of_class'){
                let access_token = null;

                if (data.token_info === 'token_available'){
                    access_token = data.new_accessToken;
                } else if (data.token_info === 'no_token'){
                    access_token = null;
                }

                let obj = {
                    status: 'not_teacher_of_class',
                    new_access_token: access_token
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