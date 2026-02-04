<template>
    <v-row justify="center">
        <v-dialog
            v-model="forgotPassword_dialog"
            persistent
            max-width="390"
        >
            <v-card>
                <v-card-title class="text-h5">
                    Forgot Password
                </v-card-title>

                <v-card-text>In order to retrieve your password, you have to provide the email that you used in creating your apex learning account below:</v-card-text>

                <ForgotPasswordForm />
            </v-card>
        </v-dialog>
    </v-row>
</template>

<script>
// Single file component imports
import ForgotPasswordForm from '../login/forgot_password_form/ForgotPasswordForm'
//-------------------------------

export default {
    name: 'ForgotPasswordDialog', // Component name

    // Registered components
    components: {
        ForgotPasswordForm
    },
    //-------------------------

    // Computed properties
    computed: {
        // Vuex property to enable or disable the forgot password dialog
        forgotPassword_dialog: function(){
            return this.$store.state.dialog.forgot_password_login.forgot_password_dialog.value;
        }
        //------------------------------------------------
    }
    //-------------------------
}
</script>

<style scoped>
@import url('../../assets/login.css'); /* CSS stylesheet file for the forgot password dialog component */
</style>