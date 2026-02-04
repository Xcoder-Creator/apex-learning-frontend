<template>
    <v-form v-model="valid" ref="form" lazy-validation>
        <div id="inp_flex_box">
            <div id="inp_row">
                <div id="poo9i">
                    <p id="label_vvtxt">Name</p>
                    <v-text-field
                        autocomplete="off"
                        type="name"
                        id="inp_field"
                        placeholder="Your name"
                        v-model="name"
                        :rules="nameRules"
                        outlined
                        required
                    ></v-text-field>
                </div>

                <div id="poo9i">
                    <p id="label_vvtxt">Email</p>
                    <v-text-field
                        type="email'"
                        autocomplete="off"
                        id="inp_field"
                        placeholder="Your email"
                        v-model="email"
                        :rules="emailRules"
                        outlined
                        required
                    ></v-text-field>
                </div>
            </div>

            <div id="inp_row">
                <div id="poo9i">
                    <p id="label_vvtxt">Role</p>
                    <v-select
                        :items="items"
                        :rules="[v => !!v || 'Item is required']"
                        label="Pick a role..."
                        v-model="select_role"
                        outlined
                        required
                    >
                    </v-select>
                </div>

                <div id="poo9i">
                    <p id="label_vvtxt">Password</p>
                    <v-text-field
                        autocomplete="off"
                        id="inp_field"
                        placeholder="Your password"
                        :type="show ? 'text' : 'password'"
                        v-model="password"
                        :rules="passwordRules"
                        :append-icon="show ? 'mdi-eye' : 'mdi-eye-off'"
                        @click:append="show = !show"
                        outlined
                        required
                    ></v-text-field>
                </div>
            </div>
        </div>

        <div id="shhs6xz">
            <div id="signup_space_cxc">
                <v-btn
                    block
                    color="primary"
                    id="signup_btn"
                    v-if="signup_btn"
                    :disabled="!valid"
                    @click="validate"
                >
                    Sign up
                </v-btn>

                <v-btn
                    block
                    color="secondary"
                    id="signup_btn"
                    v-else-if="loading_btn"
                    :loading="loading"
                    :disabled="loading"
                    loader = 'loading'
                >
                    Sign up
                </v-btn>
            </div>
        </div>
    </v-form>
</template>

<script>
// Imported mixins
import signup_operation from '../../mixins/signup/signup_operation/signup_operation'
import signup_fetch_request from '../../mixins/signup/signup_fetch_request/signup_fetch_request'
import signup_operation_response from '../../mixins/signup/signup_operation/signup_operation_response'
import signup_route_leave from '../../mixins/signup/clean_route_before_leaving/signup_route_leave'
//-------------------------

import { AbortController } from "node-abort-controller"; // AbortController polyfill
import fetch from "node-fetch"; // Fetch API polyfill

export default {
    name: 'SignupForm', // Component name

    // Registered mixins
    mixins: [
        signup_operation,

        signup_fetch_request,

        signup_operation_response,

        signup_route_leave
    ],
    //-----------------------

    // Reactive data properties
    data(){
        return {
            valid: false, // V model value for the signup form

            name: '', // Name of the user

            email: '', // Email of the user

            // Name validation rules
            nameRules: [
                v => !!v || 'Name is required',
                v => (v && v.length <= 30) || 'Name must be less than 10 characters',
            ],
            //----------------------------

            // Email validation rules
            emailRules: [
                v => /.+@.+\..+/.test(v.replace(/^[ ]+|[ ]+$/g, '').split('"').join('')) || 'E-mail must be valid',
                v => !/\s/.test(v) || 'No spaces allowed in email',
                v => !!v || 'Email is required',
                v => (v && v.length <= 230) || 'Emial must be equals to or less than 230 characters'
            ],
            //------------------------------

            // Password validation rules
            passwordRules: [
                v => !!(v || '').match(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*(_|[^\w])).+$/) || 'Password must contain an upper case letter, a numeric character, and a special character',
                v => !/\s/.test(v) || 'No spaces allowed in password',
                v => (v && v.length === 10) || 'Password must be equals to 10 characters'
            ],
            //---------------------------------

            items: ['Student', 'Teacher'], // Array of possible roles

            select_role: null, // Role selected by the user

            password: '', // Users password

            signup_btn: true, // Signup button

            loading_btn: false, // Signup loading button

            loader: 'loading', // Loader

            loading: true, // Loading

            show: false,

            controller_x: new AbortController() // Abort controller object
        }
    },
    //-----------------------------------------------------

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
        // Run signup operation
        validate(){
            let enable_signup = this.$store.state.signup.signup_route_config.enable_signup; // Enable signup property from vuex

            // Check whether the user is permitted to signup or not
            if (enable_signup === true){

                // Validate the signup form
                this.$refs.form.validate()

                if (this.$refs.form.validate() === true){
                    this.$store.commit(this.$config.VUEX_SIGNUP_ROUTE_UPDATE_ENABLE_SIGNUP, false); // Disable the user from signing up

                    this.signup_operation(this.name, this.email, this.password, this.select_role); // Signup operation mixin method
                }
                //------------------------------
            }
            //--------------------------------------------
        },
        //-----------------------------
    },
    //---------------------------------

    // The code here gets executed once the component is about to be removed from the DOM
    beforeDestroy(){
        this.controller.abort(); // Cancel pending fetch requests

        this.controller = new AbortController(); // Create new Abort Controller

        // Clean up the signup route before leaving
        setTimeout(() => {
            this.signup_route_leave();
        }, 30);
        //--------------------------------------------
    }
    //------------------------------------------------------------
}
</script>

<style scoped>
@import url('../../assets/new_signup_page.css'); /* CSS stylesheet file for the signup page */
</style>