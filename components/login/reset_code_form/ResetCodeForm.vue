<template>
    <v-form v-model="reset_code" ref="form" lazy-validation>
        <div id="email_box_padding">
            <v-text-field
                outlined
                label="Reset code..."
                autocomplete="off"
                v-model="reset_code_value"
                :rules="resetCode_rules"
                append-icon="mdi-lock-reset"
                :counter="6"
                clearable
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
                :disabled="!reset_code"
                v-if="resetCode_btn"
                @click="resetCode"
            >
                Verify
            </v-btn>
            <v-btn
                v-else-if="resetCode_btn_load"
                :loading="loading"
                :disabled="loading"
                color="primary"
                loader = 'loading'
            >
                Verify
            </v-btn>
        </v-card-actions>
    </v-form>
</template>

<script>
// Imported mixins
import validate_reset_code from '../../../mixins/login/validate_reset_code_operation/validate_reset_code'
import validate_reset_code_fetch_request from '../../../mixins/login/validate_reset_code_operation/validate_reset_code_fetch_request'
import validate_reset_code_response from '../../../mixins/login/validate_reset_code_operation/validate_reset_code_response'
//-------------------

import { AbortController } from "node-abort-controller"; // AbortController polyfill
import fetch from "node-fetch"; // Fetch API polyfill

export default {
    name: 'ResetCodeForm', // Component name

    // Registered mixins
    mixins: [
        validate_reset_code,

        validate_reset_code_fetch_request,

        validate_reset_code_response
    ],
    //-------------------

    // Reactive data properties
    data(){
        return {
            reset_code: false,

            reset_code_value: '',

            resetCode_rules: [
                v => !/^ *$/.test(v.replace(/^[ ]+|[ ]+$/g, '').split('"').join('')) || 'Reset code is required',
                v => v.replace(/^[ ]+|[ ]+$/g, '').split('"').join('').length === 6 || 'Reset code must be equals to 6 characters',
                v => v.length === 6 || 'Reset code must be equals to 6 characters'
            ],

            is_aborting_from_close: false,

            resetCode_btn: true, // Check the reset code button visibility. Eg: True - Show the reset code button || False - Hide the reset code button

            resetCode_btn_load: false, // Set the loading button to false to hide it and bring up the reset code button instead

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
        // Close the reset code dialog
        close_dialog(){
            this.is_aborting_from_close = true;
            this.reset_code_value = '';
            this.$store.commit(this.$config.VUEX_LOGIN_ROUTE_CLOSE_RESET_CODE_DIALOG);
            this.controller.abort();
            this.controller = new AbortController();
        },
        //----------------------------------

        // Validate the reset code sent in by the user to ensure that it is valid and was assigned to a particular account
        resetCode(){
            let enable_validate_reset_code = this.$store.state.login.login_route_config.enable_validate_reset_code; // Enable validate_reset_code property from vuex

            // Check whether the user is permitted to send in their reset code for validation or not
            if (enable_validate_reset_code === true){

                // Validate the reset code form
                this.$refs.form.validate()

                if (this.$refs.form.validate() === true){
                    this.$store.commit(this.$config.VUEX_LOGIN_ROUTE_UPDATE_ENABLE_VALIDATE_RESET_CODE, false); // Disable the user from sending in their reset code for validation until initial validation is complete

                    this.validate_reset_code(this.reset_code_value); // Validate reset code operation mixin method
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