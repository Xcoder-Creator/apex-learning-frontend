<template>
    <v-row justify="center">
        <v-dialog
            v-model="joinClass_dialog"
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

                    <v-toolbar-title>Join class</v-toolbar-title>
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
                                    <p id="title_text" style="font-weight: 500; margin-bottom: 8px;">Class code</p>

                                    <p id="desc_text">Ask your teacher for the class code, then enter it here:</p>

                                    <v-form v-model="submit_class_code" ref="form" id="class-code-form" lazy-validation>
                                        <div id="class_code_inp">
                                            <v-text-field
                                                v-model="class_code_value"
                                                label="Class code..."
                                                outlined
                                                :counter="12"
                                                :rules="classCode_rules"
                                                required
                                            >
                                            </v-text-field>
                                        </div>

                                        <v-btn
                                            color="primary"
                                            :disabled="!submit_class_code"
                                            v-if="classCode_btn"
                                            @click="submitClasscode()"
                                        >
                                            Join
                                        </v-btn>

                                        <v-btn
                                            v-else-if="classCode_btn_load"
                                            :loading="loading"
                                            :disabled="loading"
                                            color="primary"
                                            loader = 'loading'
                                        >
                                            Load
                                        </v-btn>
                                    </v-form>
                                </div>
                            </v-col>

                            <v-col id="center_container_mod" md="12">
                                <div id="inner_container">
                                    <p id="bold_txt_title">To sign in with a class code</p>

                                    <ul id="list_txt">
                                        <li style="padding-bottom: 10px;">Use an authorized account</li>

                                        <li>Use a class code with 8-12 letters or numbers, and no spaces or symbols</li>
                                    </ul>

                                    <p id="p_data">If you have trouble joining the class, go to the <a style="text-decoration: none;" href="javascript:void(0)">Help Center article</a></p>
                                </div>
                            </v-col>
                        </v-row>
                    </v-container>

                    <div id="view_data">
                        <p id="bold_txt_title">To sign in with a class code</p>

                        <ul id="list_txt">
                            <li style="padding-bottom: 10px;">Use an authorized account</li>

                            <li>Use a class code with 8-12 letters or numbers, and no spaces or symbols</li>
                        </ul>

                        <p id="p_data">If you have trouble joining the class, go to the <a style="text-decoration: none;" href="javascript:void(0)">Help Center article</a></p>
                    </div>
                </div>
            </v-card>
        </v-dialog>
    </v-row>
</template>

<script>
// Imported mixins
import join_class_operation from '../mixins/student/student_classes_home_page/join_class/join_class_operation'
import join_class_request from '../mixins/student/student_classes_home_page/join_class/join_class_request'
import join_class_response from '../mixins/student/student_classes_home_page/join_class/join_class_response'
//-----------------------------

import { AbortController } from "node-abort-controller"; // AbortController polyfill
import fetch from "node-fetch"; // Fetch API polyfill

export default {
    name: 'JoinClassDialog', // Component name

    mixins: [
        join_class_operation,

        join_class_request,

        join_class_response
    ],

    // Computed property
    computed: {
        // Join class dialog property from vuex
        joinClass_dialog: {
            get(){
                return this.$store.state.join_class_dialog.value;
            },

            set(value){
                this.$store.commit('join_class_dialog/update_dialog', { value: value });
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
            class_code_value: '', // Class code value

            // Class code rules for validation
            classCode_rules: [
                v => !!v || 'Class code is required',
                v => (v && v.length === 12 || v.length === 8) || 'Class code must be equals to 8 or 12 characters only',
            ],
            //---------------------------------------

            submit_class_code: false, // Submit class code value

            classCode_btn: true, // Class code button value

            classCode_btn_load: false, // Class code button load value

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
        // Close the join class dialog
        close_dialog(){
            this.$store.commit('join_class_dialog/update_dialog', { value: false });
        },
        //----------------------------------

        // Submit class code
        submitClasscode(){
            let enable_join_class = this.$store.state.classes_home_page.classes_home_route_config.enable_join_class; // Enable join class property from vuex

            // Check whether the user is permitted to join a class or not
            if (enable_join_class === true){

                let is_logging_out = this.$store.state.logout_user.is_logging_out; // is logging out property from vuex

                if (is_logging_out === false){
                    let can_refresh = this.$store.state.app_components.refresh_data; // Refresh data property from vuex

                    // Check if the user can refresh or not
                    if (can_refresh === false){
                        this.$store.commit('dialog/msg_dialog/update_dialog', { value: true, msg: 'Can\'t add you to a class at this time!' }); // Display the msg dialog
                    } else {
                        // Validate the join class form
                        this.$refs.form.validate()

                        if (this.$refs.form.validate() === true){
                            this.$store.commit('classes_home_page/classes_home_route_config/update_enable_join_class', { value: false }); // Disable the user from joining any class

                            this.join_class_operation(this.class_code_value); // Join class operation mixin method
                        }
                        //---------------------------------------------
                    }
                    //-------------------------------
                } else {
                    this.$store.commit('dialog/msg_dialog/update_dialog', { value: true, msg: 'Can\'t add you to a class at this time!' }); // Display the msg dialog
                }
            } else {
                let can_refresh = this.$store.state.app_components.refresh_data; // Refresh data property from vuex

                // Check if the user can refresh or not
                if (can_refresh === true){
                    let started_unenroll = this.$store.state.unenroll_from_class.started_unenroll; // Started unenroll property from vuex

                    // Check if the user is unenrolling from a class or not
                    if (started_unenroll === false){
                        this.$store.commit('dialog/msg_dialog/update_dialog', { value: true, msg: 'Can\'t add you to a class at this time!' }); // Display the msg dialog
                    } else {
                        this.$store.commit('dialog/msg_dialog/update_dialog', { value: true, msg: 'Can\'t add you to a class at this time!' }); // Display the msg dialog
                    }
                    //----------------------------------------
                } else if (can_refresh === false){
                    this.$store.commit('dialog/msg_dialog/update_dialog', { value: true, msg: 'Can\'t add you to a class at this time!' }); // Display the msg dialog
                }
                //------------------------------------------
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