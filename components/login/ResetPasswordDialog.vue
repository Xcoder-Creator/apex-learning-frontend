<template>
    <v-row justify="center">
        <v-dialog
            v-model="reset_password_dialog"
            persistent
            max-width="390"
        >
            <v-card>
                <v-card-title class="text-h5">
                    Reset Password
                </v-card-title>

                <v-card-text>Enter a new password below:</v-card-text>

                <ResetPasswordForm />
            </v-card>
        </v-dialog>
    </v-row>
</template>

<script>
// Imported mixins
import ResetPasswordForm from '../../components/login/reset_password_form/ResetPasswordForm'
//---------------------
export default {
    name: 'ResetPasswordDialog', // Component name

    // Registered components
    components: {
        ResetPasswordForm
    },
    //-------------------------

    // Computed properties
    computed: {
        // Vuex property to enable or disable the reset password dialog
        reset_password_dialog: {
            get(){
                if (this.$store.state.dialog.forgot_password_login.reset_password_dialog.value === false){
                    this.$store.commit('user_details/reset_code/reset_data');
                }
                
                return this.$store.state.dialog.forgot_password_login.reset_password_dialog.value;
            },

            set(value){
                this.$store.commit('dialog/forgot_password_login/reset_password_dialog/update_data', { value: value });
            }
        }
        //------------------------------------------------
    }
    //-------------------------
}
</script>

<style scoped>
@import url('../../assets/login.css'); /* CSS stylesheet file for the login page */
</style>