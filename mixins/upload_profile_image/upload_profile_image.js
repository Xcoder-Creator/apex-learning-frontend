import { compressAccurately } from 'image-conversion'

export default {
    methods: {
        // Upload profile image mixin method to update the users profile image
        async upload_profile_image(image_file){
            // Compress image file
            compressAccurately(image_file, {
                size: 100,
                type: "image/jpeg",
                width: 249,
                height: 249,
            }).then(async res => {
                let environment = this.$config.environment; // Environment mode
                var request = null; // Request variable

                if (environment === 'development'){
                    var form_data = new FormData();
                    form_data.append('access_token', localStorage.getItem('access_token')); // Access token
                    form_data.append('file', res);

                    // Constructed request object
                    request = {
                        method: 'POST',
                        headers: {
                            Authorization: `Bearer ${ localStorage.getItem('refresh_token') }`
                        },
                        body: form_data,
                        signal: this.controller.signal
                    }
                    //--------------------------------
                } else if (environment === 'production'){
                    let access_token = this.$store.state.app_tokens.login_access_token; // Access token
                    var form_data = new FormData();
                    form_data.append('file', res);

                    // Constructed request object
                    request = {
                        method: 'POST',
                        headers: {
                            Authorization: `Bearer ${ access_token }`
                        },
                        body: form_data,
                        signal: this.controller.signal
                    }
                    //--------------------------------
                }

                this.$store.commit('settings_page/settings_route_config/update_enable_update_profile_image', { value: false });

                let response = await this.upload_profile_image_request(request); // Await response from the backend

                if (response.status === true){
                    let data_status = this.upload_profile_image_response(response.result); // Validate the response

                    // Check the status of the response
                    if (data_status.status === 'error'){
                        this.loading_linear = false;

                        this.$store.commit('settings_page/settings_route_config/update_enable_update_profile_image', { value: true });

                        // Update the err msg dialog through vuex
                        let obj = {
                            value: true,
                            msg: data_status.msg,
                            err: true
                        }

                        this.$store.commit(this.$config.VUEX_UPDATE_ERR_MSG_DIALOG, obj);
                        //---------------------------------------------
                    } else if (data_status.status === 'token_expired'){
                        let environment = this.$config.environment; // Environment mode

                        if (environment === 'development'){
                            localStorage.removeItem('access_token'); // Remove access token
                            localStorage.removeItem('refresh_token');  // Remove refresh token
                        } else if (environment === 'production'){
                            this.$store.commit('app_tokens/update_login_access_token', { value: null }); // Remove access token

                        }

                        this.$store.commit('app_components/reset_data'); // Reset app components in vuex
                        this.$store.commit('class_details/reset_data'); // Reset class details in vuex
                        this.$store.commit('page_loading/page_loading/update_data', { value: true }); // Page loading
                        this.$store.commit('user_details/user_details/reset_data'); // Reset user details
                        this.$router.push('/login/'); // Redirect the user to the login page
                    } else if (data_status.status === 'success'){
                        // Check if there was an access token gotten from the backend
                        if (data_status.access_token !== null){
                            let environment = this.$config.environment; // Environment mode

                            if (environment === 'development'){
                                localStorage.setItem('access_token', data_status.access_token); // Update the access token in localstorage
                            } else if (environment === 'production'){
                                this.$store.commit('app_tokens/update_login_access_token', { value: data_status.access_token }); // Update the access token in vuex store
                            }
                        }
                        //-----------------------------------------

                        this.loading_linear = false;

                        this.$store.commit('user_details/user_details/update_profile_image', { image: data_status.image_url });
                        this.$store.commit('settings_page/settings_route_config/update_enable_update_profile_image', { value: true });

                        // Update the err msg dialog through vuex
                        let obj = {
                            value: true,
                            msg: 'Profile image updated successfully!',
                            err: false
                        }

                        this.$store.commit(this.$config.VUEX_UPDATE_ERR_MSG_DIALOG, obj);
                        //---------------------------------------------
                    }
                    //----------------------------------------
                } else if (response.status === false){
                    this.loading_linear = false;

                    this.$store.commit('settings_page/settings_route_config/update_enable_update_profile_image', { value: true });

                    // Update the err msg dialog through vuex
                    let obj = {
                        value: true,
                        msg: 'Couldn\'t update your profile image!',
                        err: true
                    }

                    this.$store.commit(this.$config.VUEX_UPDATE_ERR_MSG_DIALOG, obj);
                    //---------------------------------------------
                }
            })
            .catch((err) => {
                this.loading_linear = false;

                this.$store.commit('settings_page/settings_route_config/update_enable_update_profile_image', { value: true });

                // Update the err msg dialog through vuex
                let obj = {
                    value: true,
                    msg: 'This file is unsupported!',
                    err: true
                }

                this.$store.commit(this.$config.VUEX_UPDATE_ERR_MSG_DIALOG, obj);
                //---------------------------------------------
            })
            //------------------------------------
        }
        //-------------------------------------------
    }
}