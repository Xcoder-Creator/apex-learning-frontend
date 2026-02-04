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
                    Change name and email

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
                                        v-model="name"
                                        label="Name"
                                        outlined
                                        :rules="nameRules"
                                        required
                                    ></v-text-field>
                                </v-col>

                                <v-col cols="12">
                                    <v-text-field
                                        v-model="email"
                                        label="Email"
                                        outlined
                                        :rules="emailRules"
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
import change_name_and_email from '../../mixins/change_name_and_email/change_name_and_email'
import change_name_and_email_request from '../../mixins/change_name_and_email/change_name_and_email_request'
import change_name_and_email_response from '../../mixins/change_name_and_email/change_name_and_email_response'
//-------------------------------------

export default {
    name: 'ChangeNameAndEmailDialog', // Component name

    // Registered mixins
    mixins: [
        change_name_and_email,

        change_name_and_email_request,

        change_name_and_email_response
    ],
    //--------------------------------------

    // Data property
    data(){
        return {
            window_width: '', // Window width property
            
            valid: true,
            
            name: this.$store.state.user_details.user_details.details.user_name,
            
            email: this.$store.state.user_details.user_details.details.user_email,

            update_data_btn: true,

            update_data_btn_load: false, 

            loading: true,

            controller_x: new AbortController(), // Abort Controller

            // Name validation rules
            nameRules: [
                v => !/^ *$/.test(v.replace(/^[ ]+|[ ]+$/g, '').split('"').join('')) || 'Name must be valid',
                v => !!v || 'Name is required',
                v => (v && v.length <= 30) || 'Name must be less than 10 characters',
            ],
            //----------------------------

            // Email validation rules
            emailRules: [
                v => !/^ *$/.test(v.replace(/^[ ]+|[ ]+$/g, '').split('"').join('')) || 'E-mail must be valid',
                v => !/\s/.test(v) || 'No spaces allowed in email',
                v => !!v || 'Email is required',
                v => (v && v.length <= 230) || 'Email must be equals to or less than 230 characters'
            ],
            //------------------------------
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
                if (this.$store.state.dialog.change_name_and_email_dialog.value === true){
                    // Listen to changes in window screen width
                    window.onresize = () => {
                        this.window_width = window.innerWidth;
                    }
                    //------------------------------------
                }

                return this.$store.state.dialog.change_name_and_email_dialog.value;
            },

            set(value){
                this.name = this.$store.state.user_details.user_details.details.user_name;
                this.email = this.$store.state.user_details.user_details.details.user_email;
                this.$store.commit('dialog/change_name_and_email_dialog/update_dialog', { value: value });
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
            this.name = this.$store.state.user_details.user_details.details.user_name;
            this.email = this.$store.state.user_details.user_details.details.user_email;
            this.controller.abort(); // Abort all pending fetch api requests
            this.controller = new AbortController(); // Generate a new abort controller object
        },
        //-------------------------------

        // Update the users name and email
        save_data(){
            if (this.$refs.form.validate() === true){
                this.change_name_and_email(this.name, this.email); // Execute mixin method
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