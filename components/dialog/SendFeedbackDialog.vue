<template>
    <div class="text-center">
        <v-dialog
            v-model="dialog"
            width="500"
        >
            <v-card>
                <v-card-title style="background: #1976d2; color: #fff;" class="text-h5 lighten-2">
                    Send feedback
                </v-card-title>

                <v-card-text>
                    <v-textarea
                        style="margin-top: 30px;"
                        filled
                        name="input-7-4"
                        label="We would love to hear your feedback...."
                        v-model="feedback_data"
                    ></v-textarea>
                </v-card-text>

                <v-divider></v-divider>

                <v-card-actions id="feedback_btns">
                    <v-btn
                        v-if="send_feedback_btn"
                        color="primary"
                        class="mr-4"
                        @click="send_feedback()"
                    >
                        Send
                    </v-btn>

                    <v-btn
                        v-if="send_feedback_btn_load"
                        :loading="loading"
                        :disabled="loading"
                        loader='loading'
                        color="primary"
                        class="mr-4"
                    >
                        Send
                    </v-btn>

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
  </div>
</template>

<script>
// Imported mixins 
import send_user_feedback from '../../mixins/send_user_feedback/send_user_feedback'
import send_user_feedback_request from '../../mixins/send_user_feedback/send_user_feedback_request'
import send_user_feedback_response from '../../mixins/send_user_feedback/send_user_feedback_response'
//-------------------------------------

import { AbortController } from "node-abort-controller"; // AbortController polyfill
import fetch from "node-fetch"; // Fetch API polyfill

export default {
    name: 'SendFeedbackDialog', // Component name

    // Imported mixins
    mixins: [
        send_user_feedback,

        send_user_feedback_request, 

        send_user_feedback_response
    ],
    //-----------------------------------

    // Computed properties
    computed: {
        // Vuex property to toggle the visibility of the send feedback dialog
        dialog: {
            get(){
                if (this.$store.state.dialog.send_feedback_dialog.value === false){
                    this.feedback_data = '';

                    this.controller.abort(); // Abort all pending fetch api requests
                    this.controller = new AbortController(); // Generate a new abort controller object
                }

                return this.$store.state.dialog.send_feedback_dialog.value;
            },

            set(value){
                this.$store.commit('dialog/send_feedback_dialog/update_dialog', { value: value });
            }
        },
        //--------------------------------------------
    
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
    //--------------------------

    // Watch property
    watch: {
        loader () {
            const l = this.loader
        }
    },
    //------------------

    // Data property
    data(){
        return {
            feedback_data: '',
            
            send_feedback_btn: true,

            send_feedback_btn_load: false,
            
            can_send_feedback: true,

            loading: true,

            valid: true,

            controller_x: new AbortController(), // Abort Controller
        }
    },
    //------------------------------

    // Methods or functions
    methods: {
        // Close msg dialog from vuex
        close_dialog(){
            this.feedback_data = '';
            this.dialog = false;

            this.controller.abort(); // Abort all pending fetch api requests
            this.controller = new AbortController(); // Generate a new abort controller object
        },
        //---------------------------------

        // Send feedback
        send_feedback(){
            this.send_user_feedback(this.feedback_data);
        }
        //---------------------------------
    },
    //------------------------

    // This life cycle hook is called when the user leaves the current route
    beforeDestroy(){
        this.controller.abort(); // Abort all pending fetch api requests
        this.controller = new AbortController(); // Generate a new abort controller object
    }
    //------------------------------------------------------
}
</script>

<style scoped>
@import url('../../assets/classes_home_page.css'); /* CSS stylesheet file for the student classes page */
::v-deep .v-label {
    font-size: 0.95rem;
}
</style>