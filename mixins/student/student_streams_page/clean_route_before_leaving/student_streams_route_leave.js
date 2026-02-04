export default {
    methods: {
        student_streams_route_leave(){
            // If the user is not logged in, clear their details from the vuex data store
            if (this.$store.state.user_details.user_details.is_logged_in === false){
                let user_details = {
                    value: false,
                    user_name: '',
                    user_email: '',
                    user_role: '',
                    user_id: 0,
                    user_profile_image: '',
                    user_settings: {}
                }

                this.$store.commit(this.$config.VUEX_STORE_USER_DETAILS, user_details); // Update user details in vuex
                this.$store.commit('student_streams_page/stream_comp/reset_data'); // Reset data
            }
            //-----------------------------------------------------------------

            this.$store.commit('student_streams_page/stream_comp/update_refresh_data', { value: false }) // Update refresh data property from vuex

            // Update the err msg dialog through vuex
            let obj1 = {
                value: false,
                msg: '',
                err: false
            }

            this.$store.commit(this.$config.VUEX_UPDATE_ERR_MSG_DIALOG, obj1);
            //---------------------------------------------

            // Update snackbar text from vuex
            let obj2 = {
                value: false,
                text: ''
            }

            this.$store.commit(this.$config.VUEX_UPDATE_SNACKBAR, obj2);
            //--------------------------------------

            this.$store.commit('classes_home_page/utils/update_value', { value: false }); // Update is sncakbar displayed property in vuex

            this.$store.commit('dialog/msg_dialog/reset_data'); // Reset the msg dialog from vuex

            this.$store.commit('dialog/logout_dialog/reset_data'); // Reset logout dialog from vuex

            this.$store.commit('logout_user/reset_data'); // Reset is logging out property from vuex

            this.$store.commit('dialog/about_class_dialog/reset_data'); // Reset data in about class dialog from vuex

            this.$store.commit('student_streams_page/stream_comp/update_can_create_post', { value: false });

            this.$store.commit('student_streams_page/student_stream_route_config/update_fetch_more_posts', { value: false });

            this.$store.commit('student_streams_page/stream_comp/update_spinner', { value: false });

            this.$store.commit('student_streams_page/student_stream_route_config/update_delete_class_post', { value: false });

            this.$store.commit('dialog/delete_post_dialog/reset_data'); // Reset data

            this.$store.commit('text_editor_control/reset_data'); // Reset data

            this.$store.commit('dialog/view_post_dialog/update_dialog', { value: false }); // Reset data

            this.$store.commit('dialog/view_post_dialog/reset_data'); // Reset data

            this.$store.commit('dialog/view_file_dialog/reset_data'); // Reset data

            this.$store.commit('dialog/view_file_details_dialog/reset_data'); // Reset data

            this.$store.commit('dialog/comment_dialog/update_dialog', { value: false }); // Reset data

            this.$store.commit('student_streams_page/comment_linear_loader/update_value', { value: false });

            this.$store.commit('dialog/coming_soon_dialog/reset_data'); // Reset coming soon dialog
        }
    }
}