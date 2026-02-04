<template>
    <v-row justify="center">
        <v-dialog
            v-model="dialog"
            scrollable
            :fullscreen="(window_width <= 415) ? true : false"
            max-width="500px"
        >
            <v-card>
                <v-card-title id="comment-head-comp">
                    Change password

                    <v-menu
                        left
                        bottom
                    >
                        <template v-slot:activator="{ on, attrs }">
                            <v-btn
                                icon
                                v-bind="attrs"
                                v-on="on"
                            >
                                <v-icon>mdi-dots-vertical</v-icon>
                            </v-btn>
                        </template>

                        <v-list>
                            <v-list-item @click="send_feedback()" link>
                                <v-list-item-title>Send feedback</v-list-item-title>
                            </v-list-item>
                        </v-list>
                    </v-menu>
                </v-card-title>

                <v-divider></v-divider>

                <v-card-text style="height: 350px; padding-top: 30px;">
                    <v-form
                        ref="form"
                        v-model="valid"
                        lazy-validation
                    >
                        <v-container>
                            <v-row>
                                <v-col cols="12">
                                    <v-text-field
                                        v-model="new_password"
                                        label="New Password"
                                        type="password"
                                        outlined
                                        :rules="passwordRules"
                                        :counter="10"
                                        required
                                    ></v-text-field>
                                </v-col>

                                <v-col cols="12">
                                    <v-text-field
                                        v-model="confirm_new_password"
                                        label="Confirm Password"
                                        type="password"
                                        outlined
                                        :rules="confirm_password_rules"
                                        :counter="10"
                                        required
                                    ></v-text-field>
                                </v-col>

                                <v-col cols="12">
                                    <v-btn
                                        v-if="update_data_btn"
                                        :disabled="!valid"
                                        color="primary"
                                        class="mr-4"
                                        @click="save_data()"
                                    >
                                        Save
                                    </v-btn>

                                    <v-btn
                                        v-if="update_data_btn_load"
                                        :loading="loading"
                                        :disabled="loading"
                                        loader='loading'
                                        color="primary"
                                        class="mr-4"
                                    >
                                        Save
                                    </v-btn>
                                </v-col>
                            </v-row>
                        </v-container>
                    </v-form>
                </v-card-text>

                <v-divider></v-divider>

                <v-card-actions>
                    <v-btn
                        color="primary"
                        text
                        @click="close_dialog()"
                    >
                        Close
                    </v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
    </v-row>
</template>

<script>
import { AbortController } from "node-abort-controller"; // AbortController polyfill
import fetch from "node-fetch"; // Fetch API polyfill

// Imported mixins 
import update_password from '../../mixins/update_password/update_password'
import update_password_request from '../../mixins/update_password/update_password_request'
import update_password_response from '../../mixins/update_password/update_password_response'
//-------------------------------------

export default {
    name: 'ChangePasswordDialog', // Component name

    // Registered mixins
    mixins: [
        update_password,

        update_password_request,

        update_password_response
    ],
    //--------------------------------------

    // Data property
    data(){
        return {
            window_width: '', // Window width property
            
            valid: true,
            
            new_password: '',
            
            confirm_new_password: '',

            update_data_btn: true,

            update_data_btn_load: false, 

            loading: true,

            controller_x: new AbortController(), // Abort Controller

            // Password validation rules
            passwordRules:[
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
            ]
        }
    },
    //------------------------------

    // Watch property
    watch: {
        loader () {
            const l = this.loader
        }
    },
    //------------------

    // Computed property
    computed: {
        // Dialog property from vuex
        dialog: {
            get(){
                if (this.$store.state.dialog.update_password_dialog.value === true){
                    // Listen to changes in window screen width
                    window.onresize = () => {
                        this.window_width = window.innerWidth;
                    }
                    //------------------------------------
                }

                return this.$store.state.dialog.update_password_dialog.value;
            },

            set(value){
                this.new_password = '';
                this.confirm_new_password = '';
                this.$store.commit('dialog/update_password_dialog/update_dialog', { value: value });
            }
        },
        //-------------------------------------------

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
    //------------------------------

    // Methods property
    methods: {
        // Close dialog
        close_dialog(){
            this.dialog = false;
            this.new_password = '';
            this.confirm_new_password = '';
            this.controller.abort(); // Abort all pending fetch api requests
            this.controller = new AbortController(); // Generate a new abort controller object
        },
        //-------------------------------

        // Update the users password
        save_data(){
            if (this.$refs.form.validate() === true){
                this.update_password(this.new_password); // Execute mixin method
            }
        },
        //----------------------------------

        // Send feedback
        send_feedback(){
            this.$store.commit('dialog/send_feedback_dialog/update_dialog', { value: true });
        }
        //-------------------------------
    },
    //------------------------------

    // Created lifecycle hook
    created(){
        this.window_width = window.innerWidth; // Current window screen width
    },
    //-----------------------------------

    // This life cycle hook is called when the user leaves the current route
    beforeDestroy(){
        this.controller.abort(); // Abort all pending fetch api requests
        this.controller = new AbortController(); // Generate a new abort controller object
    }
    //------------------------------------------------------
}
</script>

<style scoped>
@import url('../../assets/settings_page.css'); /* CSS stylesheet file for the settings page */
@import url('../../assets/class_stream_page.css'); /* CSS stylesheet file for the class stream page */
</style>