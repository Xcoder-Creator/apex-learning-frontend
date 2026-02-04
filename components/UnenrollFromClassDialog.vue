<template>
    <v-row justify="center">
        <v-dialog
            v-model="unenroll_dialog"
            persistent
            max-width="350"
        >
            <v-card>
                <v-card-title id="fs_xcv">
                    <span id="unenroll_dialog_title_txt">Unenroll from {{ class_name }}?</span>
                </v-card-title>

                <v-card-text id="card_txt_body">You won't be able to see or participate in the class anymore.</v-card-text>

                <v-card-actions>
                    <v-spacer></v-spacer>

                    <v-btn
                        color="primary"
                        text
                        style="font-size: 0.88rem;"
                        @click="close_dialog()"
                    >
                        Cancel
                    </v-btn>

                    <v-btn
                        color="primary"
                        :loading="unenroll_loading"
                        class="ma-1"
                        style="font-size: 0.88rem;"
                        text
                        @click="unenroll_user()"
                    >
                        Unenroll
                    </v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
    </v-row>
</template>

<script>
// Imported mixins
import unenroll_from_class_operation from '../mixins/student/student_classes_home_page/unenroll_from_class/unenroll_from_class_operation'
import unenroll_from_class_request from '../mixins/student/student_classes_home_page/unenroll_from_class/unenroll_from_class_request'
import unenroll_from_class_response from '../mixins/student/student_classes_home_page/unenroll_from_class/unenroll_from_class_response'
import fetch_class_list from '../mixins/student/fetch_class_list_operation/fetch_class_list'
import fetch_class_list_fetch_request from '../mixins/student/fetch_class_list_operation/fetch_class_list_fetch_request'
import fetch_class_list_response from '../mixins/student/fetch_class_list_operation/fetch_class_list_response'
import fetch_archived_classes from '../mixins/archived_classes_page/fetch_archived_classes/fetch_archived_classes'
import fetch_archived_classes_request from '../mixins/archived_classes_page/fetch_archived_classes/fetch_archived_classes_request'
import fetch_archived_classes_response from '../mixins/archived_classes_page/fetch_archived_classes/fetch_archived_classes_response'
//-----------------------

import { AbortController } from "node-abort-controller"; // AbortController polyfill
import fetch from "node-fetch"; // Fetch API polyfill

export default {
    name: 'UnenrollFromClassDialog', // Component name

    // Registered mixins
    mixins: [
        unenroll_from_class_operation,

        unenroll_from_class_request,

        unenroll_from_class_response,

        fetch_class_list,

        fetch_class_list_fetch_request,

        fetch_class_list_response,

        fetch_archived_classes,

        fetch_archived_classes_request,

        fetch_archived_classes_response
    ],
    //------------------------

    // Computed properties
    computed: {
        // Unenroll dialog from vuex
        unenroll_dialog: {
            get(){
                return this.$store.state.dialog.unenroll_dialog.unenroll_dialog.value;
            },

            set(value){
                this.$store.commit('dialog/unenroll_dialog/unenroll_dialog/update_value', { value: value });
            }
        },
        //---------------------------------

        // Class name from vuex
        class_name: {
            get(){
                return this.$store.state.dialog.unenroll_dialog.unenroll_dialog.class_name;
            },

            set(value){
                this.$store.commit('dialog/unenroll_dialog/unenroll_dialog/update_class_name', { value: value });
            }
        },
        //----------------------------------

        // Class code from vuex
        class_code: {
            get(){
                return this.$store.state.dialog.unenroll_dialog.unenroll_dialog.class_code;
            },

            set(value){
                this.$store.commit('dialog/unenroll_dialog/unenroll_dialog/update_class_code', { value: value });
            }
        },
        //----------------------------------

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
    //---------------------------

    // Data property
    data(){
        return {
            unenroll_loading: false, // Unenroll loading property

            loader: 'loading', // Loader property

            loading: true, // Loading property

            controller_x: new AbortController() // Abort controller
        }
    },
    //--------------------------

    // Watch property
    watch: {
      loader () {
        const l = this.loader
      },
    },
    //-------------------

    // Methods property
    methods: {
        // Close the unenroll user dialog
        close_dialog(){
            this.$store.commit('dialog/unenroll_dialog/unenroll_dialog/update_value', { value: false });
        },
        //-----------------------------------

        // Unenroll a user from a class
        unenroll_user(){
            let enable_unenroll_user = this.$store.state.classes_home_page.classes_home_route_config.enable_unenroll_user; // Enable unenroll user property from vuex

            // Check whether the user is permitted to unenroll themselves or not
            if (enable_unenroll_user === true){
                let is_logging_out = this.$store.state.logout_user.is_logging_out; // is logging out property from vuex

                if (is_logging_out === false){
                    this.unenroll_loading = true;
                    this.unenroll_from_class_operation();
                } else {
                    this.$store.commit('dialog/msg_dialog/update_dialog', { value: true, msg: 'Can\'t unenroll from a class at this time!' }); // Display the msg dialog
                }
            } else {
                this.$store.commit('dialog/msg_dialog/update_dialog', { value: true, msg: 'Can\'t unenroll from a class at this time!' }); // Display the msg dialog
            }
            //--------------------------------------------
        }
        //-----------------------------------
    },
    //-----------------------

    // The code here gets executed once the component is about to be removed from the DOM
    beforeDestroy(){
        this.controller.abort(); // Cancel pending fetch requests

        this.controller = new AbortController(); // Create new Abort Controller
    }
    //------------------------------------------------------------
}
</script>

<style scoped>
@import url('../assets/classes_home_page.css'); /* CSS stylesheet file for the student classes page */
</style>