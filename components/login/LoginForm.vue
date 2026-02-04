<template>
    <v-form v-model="login" ref="form" lazy-validation>
        <div id="email_poo9i">
            <p id="label_vvtxt">Email</p>
            <v-text-field
                autocomplete="off"
                v-model="email"
                :rules="emailRules"
                type="email"
                id="inp_field"
                placeholder="Enter your email"
                outlined
                required
            ></v-text-field>
        </div>

        <div id="password_poo9i">
            <p id="label_vvtxt">Password</p>
            <v-text-field
                :type="show ? 'text' : 'password'"
                v-model="password"
                autocomplete="off"
                :rules="passwordRules"
                :append-icon="show ? 'mdi-eye' : 'mdi-eye-off'"
                @click:append="show = !show"
                id="inp_field"
                placeholder="Enter your password"
                outlined
                required
            ></v-text-field>
        </div>

        <div id="frjs7">
            <a id="forgot_pw_lnk" @click="open_forgot_password_dialog" href="javascript:void(0)">Forgot password</a>
        </div>

        <div id="login_space_cxc">
            <v-btn
                block
                color="primary"
                id="signin_btn"
                v-if="login_btn"
                :disabled="!login"
                @click="validate"
            >
                Sign in
            </v-btn>

            <v-btn
                block
                id="signin_btn"
                v-else-if="login_loading_btn"
                :loading="loading"
                :disabled="loading"
                color="secondary"
                loader = 'loading'
            >
                Sign in
            </v-btn>
        </div>
    </v-form>
</template>

<script>
// Imported mixins
import login_operation from '../../mixins/login/login_operation/login_operation'
import login_fetch_request from '../../mixins/login/login_fetch_request/login_fetch_request'
import login_operation_response from '../../mixins/login/login_operation/login_operation_response'
import login_route_leave from '../../mixins/login/clean_route_before_leaving/login_route_leave'
//-------------------------

import { AbortController } from "node-abort-controller"; // AbortController polyfill
import fetch from "node-fetch"; // Fetch API polyfill

export default {
    name: 'LoginForm', // Component name

    // Registered mixins
    mixins: [
        login_operation,

        login_fetch_request,

        login_operation_response,

        login_route_leave
    ],
    //-----------------------

    // Reactive data properties
    data(){
        return {
            // Email validation rules
            emailRules: [
                v => !/^ *$/.test(v.replace(/^[ ]+|[ ]+$/g, '').split('"').join('')) || 'E-mail is required'
            ],
            //----------------------

            // Password validation rules
            passwordRules: [
                v => !/^ *$/.test(v.replace(/^[ ]+|[ ]+$/g, '').split('"').join('')) || 'Valid password is required'
            ],
            //---------------------------

            login: false, // V model value for the login form

            email: '', // User email input value

            password: '', // User password input value

            show: false,

            login_btn: true, // Login button visibility. Eg: True - Show login button || False - Hide login button

            login_loading_btn: false, // Set the loading button to false to hide it and bring up the normal login button instead

            loading: true, // Set the spiral loading animation to true to enable it

            controller_x: new AbortController()
        }
    },
    //--------------------------------

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

    // Watch property
    watch: {
        loader (){
            const l = this.loader
        }
    },
    //-----------------

    // Methods or functions
    methods: {
        // Open the forgot password dialog
        open_forgot_password_dialog(){
            this.$store.commit(this.$config.VUEX_LOGIN_ROUTE_OPEN_FORGOT_PASSWORD_DIALOG, true);
        },
        //---------------------------------
        
        // Run login form validation
        validate(){
            let enable_login = this.$store.state.login.login_route_config.enable_login; // Enable login property from vuex

            // Check whether the user is permitted to login or not
            if (enable_login === true){

                // Validate the login form
                this.$refs.form.validate()

                if (this.$refs.form.validate() === true){
                    this.$store.commit(this.$config.VUEX_LOGIN_ROUTE_UPDATE_ENABLE_LOGIN, false); // Disable the user from logging in

                    this.login_operation(this.email, this.password); // Login operation mixin method
                }
                //-------------------------
            }
            //--------------------------------------------
        }
        //------------------------------------
    },
    //---------------------------

    // The code here gets executed once the component is about to be removed from the DOM
    beforeDestroy(){
        this.controller.abort(); // Cancel pending fetch requests

        this.controller = new AbortController(); // Create new Abort Controller

        // Clean up the login route before leaving
        setTimeout(() => {
            this.login_route_leave();
        }, 30);
        //--------------------------------------------
    }
    //------------------------------------------------------------
}
</script>

<style scoped>
@import url('../../assets/new_login_page.css'); /* CSS stylesheet file for the login page */
</style>