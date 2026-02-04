<template>
    <v-form v-model="reset_password" ref="form" lazy-validation>
        <div id="email_box_padding" style="padding-bottom: 15px;">
            <v-text-field
                outlined
                label="New password..."
                autocomplete="off"
                v-model="new_password"
                :rules="password_rules"
                append-icon="mdi-lock-reset"
                :counter="10"
                type="password"
                required
            >
            </v-text-field>
        </div>

        <div id="email_box_padding">
            <v-text-field
                outlined
                label="Confirm new password..."
                autocomplete="off"
                v-model="confirm_new_password"
                :rules="confirm_password_rules"
                append-icon="mdi-lock-reset"
                type="password"
                required
            >
            </v-text-field>
        </div>

        <v-card-actions>
            <v-spacer></v-spacer>

            <v-btn
                color="primary"
                text
                @click="close_dialog()"
            >
                Close
            </v-btn>

            <v-btn
                color="primary"
                text
                :disabled="!reset_password"
                v-if="resetPassword_btn"
                @click="resetPassword()"
            >
                Reset
            </v-btn>

            <v-btn
                v-else-if="resetPassword_btn_load"
                :loading="loading"
                :disabled="loading"
                color="primary"
                loader = 'loading'
            >
                Reset
            </v-btn>
        </v-card-actions>
    </v-form>
</template>

<script>
// Imported mixins
import login_reset_password from '../../../mixins/login/login_reset_password_operation/login_reset_password'
import login_reset_password_fetch_request from '../../../mixins/login/login_reset_password_operation/login_reset_password_fetch_request'
import login_reset_password_response from '../../../mixins/login/login_reset_password_operation/login_reset_password_response'
//----------------------

import { AbortController } from "node-abort-controller"; // AbortController polyfill
import fetch from "node-fetch"; // Fetch API polyfill

export default {
    name: 'ResetPasswordForm', // Component name

    // Registerd mixins
    mixins: [
        login_reset_password,

        login_reset_password_fetch_request,

        login_reset_password_response
    ],
    //-----------------------

    data(){
        return {
            reset_password: false, // V model value for the reset password form

            new_password: '', // New password input value

            is_aborting_from_close: false,

            confirm_new_password: '', // Confirm new password input value

            resetPassword_btn: true, // Reset password button visibility. Eg: True - Show reset password button || False - Hide reset password button

            resetPassword_btn_load: false, // Set the loading button to false to hide it and bring up the normal reset password button instead

            loading: true, // Set the spiral loading animation to true to enable it

            // Password validation rules
            password_rules:[
                v => !/^ *$/.test(v.replace(/^[ ]+|[ ]+$/g, '').split('"').join('')) || 'Password must be valid',
                v => !/\s/.test(v) || 'No spaces allowed in password',
                v => !!(v || '').match(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*(_|[^\w])).+$/) || 'Password must contain an upper case letter, a numeric character, and a special character',
                v => (v && v.length === 10) || 'Password must be equals to 10 characters'
            ],
            //------------------------------

            confirm_password_rules: [
                v => !/^ *$/.test(v.replace(/^[ ]+|[ ]+$/g, '').split('"').join('')) || 'Password must be valid',
                v => !/\s/.test(v) || 'No spaces allowed in password',
                v => !!(v || '').match(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*(_|[^\w])).+$/) || 'Password must contain an upper case letter, a numeric character, and a special character',
                v => v === this.new_password || 'Password must be the same as the one above',
                v => (v && v.length === 10) || 'Password must be equals to 10 characters'
            ],

            controller_x: new AbortController()
        }
    },

    // Watch property
    watch: {
        loader (){
            const l = this.loader
        }
    },
    //-------------------

    // Computed properties
    computed: {
        // Abort controller for canceling pending fetch api requests
        controller: {
            get(){
                return this.controller_x;
            },

            set(value){
                this.controller_x = value;
            }
        }
        //--------------------------------------------------------
    },
    //----------------------------

    // Methods or functions
    methods: {
        // Close the reset password dialog
        close_dialog(){
            this.is_aborting_from_close = true;
            this.new_password = '';
            this.confirm_new_password = '';
            this.$store.commit(this.$config.VUEX_LOGIN_ROUTE_CLOSE_RESET_PASSWORD_DIALOG);
            this.controller.abort();
            this.controller = new AbortController();
        },
        //------------------------------------

        // Reset the users password by updating the users current password with the new password stated by the user
        resetPassword(){
            let enable_reset_password = this.$store.state.login.login_route_config.enable_reset_password; // Enable reset password property from vuex

            // Check if the user is permitted to reset their password or not
            if (enable_reset_password === true){

                // Validate the reset password form
                this.$refs.form.validate()

                if (this.$refs.form.validate() === true){
                    this.$store.commit(this.$config.VUEX_LOGIN_ROUTE_UPDATE_ENABLE_RESET_PASSWORD, false); // Disable the user from reseting their password until the previous reseting is complete

                    this.login_reset_password(this.new_password); // Reset password operation mixin method
                }
                //------------------------------------
            }
            //-------------------------------------------------------
        }
        //-------------------------------------------------
    },
    //------------------------------

    // The code here gets executed once the component is about to be removed from the DOM
    beforeDestroy(){
        this.controller.abort(); // Cancel pending fetch requests

        this.controller = new AbortController(); // Create new Abort Controller
    }
    //-------------------------------------------------
}
</script>

<style scoped>
@import url('../../../assets/login.css'); /* CSS stylesheet file for the login page */
</style>