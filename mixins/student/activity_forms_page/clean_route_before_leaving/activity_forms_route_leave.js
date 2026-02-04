export default {
    methods: {
        activity_forms_route_leave(){
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
                this.$store.commit('app_components/reset_data'); // Reset app components in vuex
                this.$store.commit('class_details/reset_data'); // Reset class details in vuex
                this.$store.commit('classes_home_page/utils/reset_data'); // Reset sncakbar displayed property in vuex
                this.$store.commit('student_classwork_page/classwork_comp/reset_data'); // Reset teacher classwork page properties in vuex
            }
            //-----------------------------------------------------------------

            this.$store.commit('app_nav_bar/reset_data'); // Reset app nav bar component in vuex

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

            this.$store.commit('dialog/coming_soon_dialog/reset_data'); // Reset coming soon dialog
        }
    }
}