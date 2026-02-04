export default {
    methods: {
        // Upload profile image
        upload_profile_image_response(data){
            if (data.status === 'missing_credentials'){
                let obj = {
                    status: 'error',
                    msg: 'Couldn\'t update your profile image!'
                }

                return obj;
            } else if (data.status === 'error_occured'){
                let obj = {
                    status: 'error',
                    msg: 'Couldn\'t update your profile image!'
                }

                return obj;
            } else if (data.status === 'token_expired'){
                let obj = {
                    status: 'token_expired'
                }

                return obj;
            } else if (data.status === 'file_size_too_big'){
                let obj = {
                    status: 'error',
                    msg: 'The size of this image is more than 200kb, Please upload a smaller image!'
                }

                return obj;
            } else if (data.status === 'file_not_supported'){
                let obj = {
                    status: 'error',
                    msg: 'This file is unsupported!'
                }

                return obj;
            } else if (data.status === 'user_not_found'){
                let obj = {
                    status: 'error',
                    msg: 'Couldn\'t update your profile image!'
                }

                return obj;
            } else if (data.status === 'profile_image_updated'){
                if (data.token_info === 'token_available'){
                    let access_token = data.new_accessToken;
                    let obj = {
                        status: 'success',
                        access_token: access_token,
                        image_url: data.image_url
                    }

                    return obj;
                } else if (data.token_info === 'no_token'){
                    let obj = {
                        status: 'success',
                        access_token: null,
                        image_url: data.image_url
                    }

                    return obj;
                }
            } 
        }
        //------------------------------------------------
    }
}