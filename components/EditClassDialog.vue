<template>
    <v-row justify="center">
        <v-dialog
            v-model="editClass_dialog"
            fullscreen
            hide-overlay
            transition="dialog-bottom-transition"
        >
            <v-card>
                <v-toolbar
                    dark
                    color="primary"
                    style="border-top-left-radius: unset; border-top-right-radius: unset;"
                >
                    <v-btn
                        icon
                        dark
                        @click="close_dialog()"
                    >
                        <v-icon>mdi-close</v-icon>
                    </v-btn>

                    <v-toolbar-title>Edit class</v-toolbar-title>
                </v-toolbar>

                <div id="main-content-dialog-body">
                    <v-container>
                        <v-row>
                            <v-col id="center_container" md="12">
                                <div id="block-content-one">
                                    <p id="title_text" style="font-size: 0.96em;">You're currently signed in as</p>

                                    <div>
                                        <v-list-item two-line style="padding-bottom: 0px; padding-top: 0px;">
                                            <v-list-item-avatar size="34">
                                                <img style="object-fit: cover;" :src="`${$config.apiUrl}${profile_img}`">
                                            </v-list-item-avatar>

                                            <v-list-item-content>
                                                <v-list-item-title>{{ name }}</v-list-item-title>

                                                <v-list-item-subtitle>{{ email }}</v-list-item-subtitle>
                                            </v-list-item-content>
                                        </v-list-item>
                                    </div>
                                </div>
                            </v-col>

                            <v-col id="center_container" md="12">
                                <div id="block-content-one">
                                    <p id="title_text" style="font-weight: 500; margin-bottom: 20px;">Edit the details of this class below:</p>

                                    <v-form v-model="edit_class" ref="form" id="class-code-form" style="padding-right: 16px;" lazy-validation>
                                        <div id="class_code_inp" style="width: 100%;">
                                            <v-text-field
                                                style="margin-bottom: 12px;"
                                                v-model="class_name"
                                                label="Class name..."
                                                outlined
                                                :rules="[
                                                    v => !!v || 'Class name is required',
                                                    v => (/^ *$/.test(v) === false) || 'Class name is required',
                                                    v => (v && v.length <= 500) || 'Class name is too long',
                                                ]"
                                                required
                                            >
                                            </v-text-field>

                                            <v-text-field
                                                style="margin-bottom: 12px;"
                                                v-model="class_section"
                                                label="Section..."
                                                outlined
                                                :rules="[
                                                    v => !!v || 'Section is required',
                                                    v => (/^ *$/.test(v) === false) || 'Section is required',
                                                    v => (v && v.length <= 500) || 'Section is too long',
                                                ]"
                                                required
                                            >
                                            </v-text-field>

                                            <v-text-field
                                                style="margin-bottom: 12px;"
                                                v-model="class_subject"
                                                label="Subject..."
                                                outlined
                                                :rules="[
                                                    v => !!v || 'Subject is required',
                                                    v => (/^ *$/.test(v) === false) || 'Subject is required',
                                                    v => (v && v.length <= 500) || 'Subject is too long',
                                                ]"
                                                required
                                            >
                                            </v-text-field>

                                            <v-text-field
                                                style="margin-bottom: 12px;"
                                                v-model="class_room"
                                                label="Room..."
                                                outlined
                                                :rules="[
                                                    v => !!v || 'Room is required',
                                                    v => (/^ *$/.test(v) === false) || 'Room is required',
                                                    v => (v && v.length <= 500) || 'Room is too long',
                                                ]"
                                                required
                                            >
                                            </v-text-field>
                                        </div>

                                        <v-btn
                                            color="primary"
                                            :disabled="!edit_class"
                                            v-if="editClass_btn"
                                            @click="edit_class_details()"
                                        >
                                            save
                                        </v-btn>

                                        <v-btn
                                            v-else-if="editClass_btn_load"
                                            :loading="loading"
                                            :disabled="loading"
                                            color="primary"
                                            loader = 'loading'
                                        >
                                            save
                                        </v-btn>
                                    </v-form>
                                </div>
                            </v-col>
                        </v-row>
                    </v-container>
                </div>
            </v-card>
        </v-dialog>
    </v-row>
</template>

<script>
// Imported mixins
import edit_class_operation from '../mixins/teacher/teacher_classes_home_page/edit_class/edit_class_operation'
import edit_class_request from '../mixins/teacher/teacher_classes_home_page/edit_class/edit_class_request'
import edit_class_response from '../mixins/teacher/teacher_classes_home_page/edit_class/edit_class_response'
import teacher_fetch_class_list from '../mixins/teacher/fetch_class_list_operation/teacher_fetch_class_list'
import teacher_fetch_class_list_fetch_request from '../mixins/teacher/fetch_class_list_operation/teacher_fetch_class_list_fetch_request'
import teacher_fetch_class_list_response from '../mixins/teacher/fetch_class_list_operation/teacher_fetch_class_list_response'
//-----------------------------

import { AbortController } from "node-abort-controller"; // AbortController polyfill
import fetch from "node-fetch"; // Fetch API polyfill

export default {
    name: 'EditClassDialog', // Component name

    // Registered mixins
    mixins: [
        edit_class_operation,

        edit_class_request,

        edit_class_response,

        teacher_fetch_class_list,

        teacher_fetch_class_list_fetch_request,

        teacher_fetch_class_list_response
    ],
    //------------------------------

    // Computed property
    computed: {
        // Edit class dialog property from vuex
        editClass_dialog: {
            get(){
                if (this.$store.state.edit_class_dialog.value === false){
                    // Nothing
                } else if (this.$store.state.edit_class_dialog.value === true){
                    setTimeout(() => {
                        this.class_name = this.$store.state.edit_class_dialog.class_name;
                        this.class_section = this.$store.state.edit_class_dialog.class_section;
                        this.class_subject = this.$store.state.edit_class_dialog.class_subject;
                        this.class_room = this.$store.state.edit_class_dialog.class_room;
                    }, 10);
                }

                return this.$store.state.edit_class_dialog.value;
            },

            set(value){
                this.$store.commit('edit_class_dialog/update_dialog', { value: value });
            }
        },
        //--------------------------------------------

        // Users profile image from vuex
        profile_img: function(){
            return this.$store.state.user_details.user_details.details.profile_image;
        },
        //----------------------------------

        // Users profile name from vuex
        name: function(){
            return this.$store.state.user_details.user_details.details.user_name;
        },
        //----------------------------------

        // Users profile email from vuex
        email: function(){
            return this.$store.state.user_details.user_details.details.user_email;
        },
        //----------------------------------

        editClass_btn: {
            get(){
                return this.$store.state.edit_class_dialog.editClass_btn
            },

            set(value){
                this.$store.commit('edit_class_dialog/update_edit_class_btn', { value: value });
            }
        },

        editClass_btn_load: {
            get(){
                return this.$store.state.edit_class_dialog.editClass_btn_load
            },

            set(value){
                this.$store.commit('edit_class_dialog/update_edit_class_btn_load', { value: value });
            }
        },

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
            class_name: this.$store.state.edit_class_dialog.class_name, // Class name

            class_section: this.$store.state.edit_class_dialog.class_section, // Class section

            class_subject: this.$store.state.edit_class_dialog.class_subject, // Class subject
            
            class_room: this.$store.state.edit_class_dialog.class_room, // Class room

            edit_class: false, // edit class value

            loader: 'loading', // Loader value

            loading: true, // Loading value

            controller_x: new AbortController() // Abort Controller
        }
    },
    //------------------------

    // Watch property
    watch: {
      loader () {
        const l = this.loader
      }
    },
    //------------------------

    // Methods property
    methods: {
        // Close the edit class dialog
        close_dialog(){
            this.$store.commit('edit_class_dialog/update_dialog', { value: false });
        },
        //----------------------------------

        // Edit the details of a particular class
        edit_class_details(){
            let enable_edit_class = this.$store.state.classes_home_page.classes_home_route_config.enable_edit_class; // Enable edit class property from vuex
            let can_refresh = this.$store.state.app_components.refresh_data; // Refresh data property from vuex

            // Check whether the user is permitted to edit a class or not
            if (enable_edit_class === true){
                // Check if the user can refresh or not
                if (can_refresh === false){
                    this.$store.commit('dialog/msg_dialog/update_dialog', { value: true, msg: 'Can\'t edit a class at this time!' }); // Display the msg dialog
                } else {
                    // Validate the edit class form
                    this.$refs.form.validate()

                    if (this.$refs.form.validate() === true){
                        this.$store.commit('classes_home_page/classes_home_route_config/update_enable_edit_class', { value: false }); // Disable the user from editing any class

                        this.edit_class_operation(this.$store.state.edit_class_dialog.class_code, this.class_name, this.class_section, this.class_subject, this.class_room); // edit class operation mixin method
                    }
                    //---------------------------------------------
                }
                //-------------------------------
            } else {
                this.$store.commit('dialog/msg_dialog/update_dialog', { value: true, msg: 'Can\'t edit a class at this time!' }); // Display the msg dialog
            }
            //-----------------------------------------------------
        }
        //----------------------------------
    },
    //-------------------------

    // This life cycle hook is called when the user leaves the current route
    beforeDestroy(){
        this.controller.abort(); // Abort all pending fetch api requests
        this.controller = new AbortController(); // Generate a new abort controller object
    }
    //------------------------------------------------------
}
</script>

<style scoped>
@import url('../assets/classes_home_page.css'); /* CSS stylesheet file for the classes home page */
</style>