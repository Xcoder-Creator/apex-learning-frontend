<template>
    <v-row justify="center">
        <v-dialog
            v-model="reset_code_dialog"
            persistent
            max-width="390"
        >
            <v-card>
                <v-card-title class="text-h5">
                    Reset Code
                </v-card-title>

                <v-card-text>Copy and paste the reset code from the mail sent to you below:</v-card-text>

                <ResetCodeForm />
            </v-card>
        </v-dialog>
    </v-row>
</template>

<script>
// Single file component imports
import ResetCodeForm from '../login/reset_code_form/ResetCodeForm'
//-------------------------------

export default {
    name: 'ResetCodeDialog', // Component name

    // Registered components
    components: {
        ResetCodeForm
    },
    //-------------------------

    // Computed properties
    computed: {
        // Vuex property to enable or disable the reset code dialog
        reset_code_dialog: function(){
            return this.$store.state.dialog.forgot_password_login.reset_code_dialog.value;
        }
        //------------------------------------------------
    }
    //-------------------------
}
</script>

<style scoped>
@import url('../../assets/login.css'); /* CSS stylesheet file for the login route */
</style>