<template>
    <v-form v-model="forgot_password" ref="form" lazy-validation>
        <div id="email_box_padding">
            <v-text-field
                outlined
                label="Email..."
                autocomplete="off"
                v-model="email"
                :rules="emailRules"
                append-icon="mdi-email"
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
                :disabled="!forgot_password"
                v-if="checkEmail_btn"
                @click="checkEmail()"
            >
                Send
            </v-btn>

            <v-btn
                v-else-if="checkEmail_btn_load"
                :loading="loading"
                :disabled="loading"
                color="primary"
                loader = 'loading'
            >
                Send
            </v-btn>
        </v-card-actions>
    </v-form>
</template>

<script>
// Imported mixins
import check_email from '../../../mixins/login/check_email_operation/check_email'
import check_email_fetch_request from '../../../mixins/login/check_email_operation/check_email_fetch_request'
import check_email_response from '../../../mixins/login/check_email_operation/check_email_response'
//-------------------

import { AbortController } from "node-abort-controller"; // AbortController polyfill
import fetch from "node-fetch"; // Fetch API polyfill

export default {
    name: 'ForgotPasswordForm', // Component name

    // Registered mixins
    mixins: [
        check_email,

        check_email_fetch_request,

        check_email_response
    ],
    //-------------------

    // Reactive data properties
    data(){
        return {
            forgot_password: false, // V model value for the forgot password form

            email: '', // User email input value

            is_aborting_from_close: false,

            // Email validation rules
            emailRules: [
                v => !/^ *$/.test(v.replace(/^[ ]+|[ ]+$/g, '').split('"').join('')) || 'E-mail is required',
                v => /.+@.+\..+/.test(v.replace(/^[ ]+|[ ]+$/g, '').split('"').join('')) || 'E-mail must be valid',
                v => !/\s/.test(v) || 'No spaces allowed in email',
            ],
            //---------------------------

            checkEmail_btn: true, // Check email button visibility. Eg: True - Show check email button || False - Hide check email button

            checkEmail_btn_load: false, // Set the loading button to false to hide it and bring up the normal check email button instead

            loading: true, // Set the spiral loading animation to true to enable it

            controller_x: new AbortController()
        }
    },
    //---------------------------

    // Watch property
    watch: {
        loader (){
            const l = this.loader
        }
    },
    //-----------------

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
        // Close the forgot password dialog
        close_dialog(){
            this.is_aborting_from_close = true;
            this.email = '';
            this.$store.commit(this.$config.VUEX_LOGIN_ROUTE_CLOSE_FORGOT_PASSWORD_DIALOG);
            this.controller.abort();
            this.controller = new AbortController();
        },
        //----------------------------------

        // Check the email of the user to ensure that it belongs to a particular account
        checkEmail(){
            let enable_check_email = this.$store.state.login.login_route_config.enable_check_email; // Enable check_email property from vuex

            // Check whether the user is permitted to send in their email for validation or not
            if (enable_check_email === true){

                // Validate the forgot password form
                this.$refs.form.validate()

                if (this.$refs.form.validate() === true){
                    this.$store.commit(this.$config.VUEX_LOGIN_ROUTE_UPDATE_ENABLE_CHECK_EMAIL, false); // Disable the user from sending in their email for validation until initial validation is complete

                    this.check_email(this.email); // Check email operation mixin method
                }
                //------------------------------------
            }
            //--------------------------------------------------
        }
        //---------------------------------------------
    },
    //------------------------

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