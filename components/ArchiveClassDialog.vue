<template>
    <v-row justify="center">
        <v-dialog
            v-model="archive_dialog"
            persistent
            max-width="350"
        >
            <v-card>
                <v-card-title id="fs_xcv">
                    <span id="unenroll_dialog_title_txt">Archive {{ class_name }}?</span>
                </v-card-title>

                <v-card-text id="card_txt_body">
                    Archiving a class causes it to be archived for all participants.
                    <br>
                    <br>
                    Archived classes can't be modified by you or your students unless they are restored.
                    <br>
                    <br>
                    This class will move to your Archived classes. Class files will remain intact.
                </v-card-text>

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
                        :loading="archive_class_loading"
                        class="ma-1"
                        style="font-size: 0.88rem;"
                        text
                        @click="archive_class()"
                    >
                        Archive
                    </v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
    </v-row>
</template>

<script>
// Imported mixins
import archive_class_operation from '../mixins/teacher/teacher_classes_home_page/archive_class/archive_class_operation'
import archive_class_request from '../mixins/teacher/teacher_classes_home_page/archive_class/archive_class_request'
import archive_class_response from '../mixins/teacher/teacher_classes_home_page/archive_class/archive_class_response'
import teacher_fetch_class_list from '../mixins/teacher/fetch_class_list_operation/teacher_fetch_class_list'
import teacher_fetch_class_list_fetch_request from '../mixins/teacher/fetch_class_list_operation/teacher_fetch_class_list_fetch_request'
import teacher_fetch_class_list_response from '../mixins/teacher/fetch_class_list_operation/teacher_fetch_class_list_response'
import fetch_archived_classes from '../mixins/archived_classes_page/fetch_archived_classes/fetch_archived_classes'
import fetch_archived_classes_request from '../mixins/archived_classes_page/fetch_archived_classes/fetch_archived_classes_request'
import fetch_archived_classes_response from '../mixins/archived_classes_page/fetch_archived_classes/fetch_archived_classes_response'
//-----------------------

import { AbortController } from "node-abort-controller"; // AbortController polyfill
import fetch from "node-fetch"; // Fetch API polyfill

export default {
    name: 'ArchiveClassDialog', // Component name

    // Registered mixins
    mixins: [
        archive_class_operation,

        archive_class_request,

        archive_class_response,

        teacher_fetch_class_list,

        teacher_fetch_class_list_fetch_request,

        teacher_fetch_class_list_response,

        fetch_archived_classes,

        fetch_archived_classes_request,

        fetch_archived_classes_response
    ],
    //------------------------

    // Computed properties
    computed: {
        // Archive class dialog from vuex
        archive_dialog: {
            get(){
                return this.$store.state.dialog.archive_dialog.archive_dialog.value;
            },

            set(value){
                this.$store.commit('dialog/archive_dialog/archive_dialog/update_value', { value: value });
            }
        },
        //---------------------------------

        // Class name from vuex
        class_name: {
            get(){
                return this.$store.state.dialog.archive_dialog.archive_dialog.class_name;
            },

            set(value){
                this.$store.commit('dialog/archive_dialog/archive_dialog/update_class_name', { value: value });
            }
        },
        //----------------------------------

        // Class code from vuex
        class_code: {
            get(){
                return this.$store.state.dialog.archive_dialog.archive_dialog.class_code;
            },

            set(value){
                this.$store.commit('dialog/archive_dialog/archive_dialog/update_class_code', { value: value });
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
            archive_class_loading: false, // Archive class loading property

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
        // Close the archive class dialog
        close_dialog(){
            this.$store.commit('dialog/archive_dialog/archive_dialog/update_value', { value: false });
        },
        //-----------------------------------

        // Archive a particular class
        archive_class(){
            let enable_archive_class = this.$store.state.classes_home_page.classes_home_route_config.enable_archive_class; // Enable archive class property from vuex
            let can_refresh = this.$store.state.app_components.refresh_data; // Refresh data property from vuex

            // Check whether the user is permitted to archive a class or not
            if (enable_archive_class === true){
                // Check if the user can refresh or not
                if (can_refresh === false){
                    this.$store.commit('dialog/msg_dialog/update_dialog', { value: true, msg: 'Can\'t archive a class at this time!' }); // Display the msg dialog
                } else {
                    this.archive_class_loading = true;
                    this.archive_class_operation();
                }
            } else {
                this.$store.commit('dialog/msg_dialog/update_dialog', { value: true, msg: 'Can\'t archive a class at this time!' }); // Display the msg dialog
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
@import url('../assets/classes_home_page.css'); /* CSS stylesheet file for the classes home page */
</style>