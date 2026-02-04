<template>
    <v-app-bar
        color="#fff"
        fixed
        v-resize="onResize"
    >
        <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>

        <v-toolbar-title>
            <span v-if="$route.name === 'student-classes' || $route.name === 'teacher-classes'" id="title"><span id="title_left">Apex-</span><span id="title_right">Learning</span></span>
            <span v-else-if="$route.name === 'student-settings' || $route.name === 'teacher-settings'" id="title_rr">Settings</span>
            <span v-else-if="$route.name === 'student-archived_classes' || $route.name === 'teacher-archived_classes'" id="title_rr">Archived classes</span>
        </v-toolbar-title>

        <v-progress-linear
            :active="loading_linear"
            :indeterminate="loading_linear"
            absolute
            bottom
            color="primary"
        >
        </v-progress-linear>

        <v-spacer></v-spacer>

        <div style="display: flex; align-items: center;">
            <v-tooltip bottom v-if="width > 415 && $route.name !== 'student-settings' && $route.name !== 'student-archived_classes' && $route.name !== 'teacher-settings' && $route.name !== 'teacher-archived_classes'">
                <template v-slot:activator="{ on, attrs }">
                    <v-btn
                        icon
                        v-bind="attrs"
                        v-on="on"
                        @click="($route.name === 'student-classes') ? open_join_class_dialog() : ($route.name === 'teacher-classes') ? open_create_class_dialog() : open_join_class_dialog()"
                    >
                        <v-icon>mdi-plus</v-icon>
                    </v-btn>
                </template>
                <span v-if="$route.name === 'student-classes'">Join class</span>
                <span v-if="$route.name === 'teacher-classes'">Create class</span>
            </v-tooltip>

            <v-menu
                left
                bottom
                v-if="width > 415"
            >
                <template v-slot:activator="{ on, attrs }">
                    <v-btn
                        icon
                        v-bind="attrs"
                        v-on="on"
                    >
                        <v-icon>mdi-dots-grid</v-icon>
                    </v-btn>
                </template>

                <v-list>
                    <v-list-item link v-if="$route.name === 'student-classes' || $route.name === 'teacher-classes'">
                        <v-list-item-title id="refresh_btn" @click="refresh_page_data">Refresh</v-list-item-title>
                    </v-list-item>

                    <v-list-item @click="open_send_feedback_dialog()" link>
                        <v-list-item-title>Send feedback</v-list-item-title>
                    </v-list-item>
                </v-list>
            </v-menu>

            <div id="profile_image">
                <v-badge
                    bordered
                    bottom
                    color="#42b72a"
                    dot
                    offset-x="10"
                    offset-y="10"
                >
                    <v-avatar size="30">
                        <v-img :src="`${$config.apiUrl}${profile_img}`"></v-img>
                    </v-avatar>
                </v-badge>
            </div>
        </div>

        <v-menu
            left
            bottom
            v-if="width <= 415"
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
                <v-list-item link v-if="$route.name === 'student-classes' || $route.name === 'teacher-classes'">
                    <v-list-item-title id="refresh_btn" @click="refresh_page_data">Refresh</v-list-item-title>
                </v-list-item>

                <v-list-item @click="open_send_feedback_dialog()" link>
                    <v-list-item-title>Send feedback</v-list-item-title>
                </v-list-item>
            </v-list>
        </v-menu>
    </v-app-bar>
</template>

<script>
// Imported mixins
import keep_user_logged_in from '../../mixins/login/keep_user_logged_in_operation/keep_user_logged_in'
import keep_user_logged_in_request from '../../mixins/login/keep_user_logged_in_operation/keep_user_logged_in_request'
import keep_user_logged_in_response from '../../mixins/login/keep_user_logged_in_operation/keep_user_logged_in_response'
import fetch_class_list from '../../mixins/student/fetch_class_list_operation/fetch_class_list'
import fetch_class_list_fetch_request from '../../mixins/student/fetch_class_list_operation/fetch_class_list_fetch_request'
import fetch_class_list_response from '../../mixins/student/fetch_class_list_operation/fetch_class_list_response'
import teacher_fetch_class_list from '../../mixins/teacher/fetch_class_list_operation/teacher_fetch_class_list'
import teacher_fetch_class_list_fetch_request from '../../mixins/teacher/fetch_class_list_operation/teacher_fetch_class_list_fetch_request'
import teacher_fetch_class_list_response from '../../mixins/teacher/fetch_class_list_operation/teacher_fetch_class_list_response'
import refresh_data from '../../mixins/student/student_classes_home_page/refresh_data'
import fetch_archived_classes from '../../mixins/archived_classes_page/fetch_archived_classes/fetch_archived_classes'
import fetch_archived_classes_request from '../../mixins/archived_classes_page/fetch_archived_classes/fetch_archived_classes_request'
import fetch_archived_classes_response from '../../mixins/archived_classes_page/fetch_archived_classes/fetch_archived_classes_response'
//-----------------------------

import { AbortController } from "node-abort-controller"; // AbortController polyfill
import fetch from "node-fetch"; // Fetch API polyfill

export default {
    name: 'AppBar', // Component name

    // Registered mixins
    mixins: [
        keep_user_logged_in,

        keep_user_logged_in_request,

        keep_user_logged_in_response,

        fetch_class_list,

        fetch_class_list_fetch_request,

        fetch_class_list_response,

        teacher_fetch_class_list,

        teacher_fetch_class_list_fetch_request,

        teacher_fetch_class_list_response,

        refresh_data,

        fetch_archived_classes,

        fetch_archived_classes_request,

        fetch_archived_classes_response
    ],
    //-------------------------

    // Reactive data properties
    data(){
        return {
            width: 0, // Width of screen
            height: 0, // Height of screen
            controller_x: new AbortController() // Abort Controller
        }
    },
    //---------------------------

    // Computed properties
    computed: {
        // Vuex property to close or open the navigation drawer
        drawer: {
            get(){
                return this.$store.state.app_nav_bar.drawer;
            },

            set(value){
                this.$store.commit('app_nav_bar/update_data', { value: value });
            }
        },
        //--------------------------------------------------------

        // Users profile image from vuex
        profile_img: function(){
            return this.$store.state.user_details.user_details.details.profile_image;
        },
        //----------------------------------

        // Loading linear property from vuex
        loading_linear: {
            get(){
                return this.$store.state.app_components.loading_linear;
            },

            set(value){
                this.$store.commit('app_components/update_loading_linear', { value: value });
            }
        },
        //----------------------------------------

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

    // Methods property
    methods: {
        // Refresh the page contents
        refresh_page_data(){
            if (this.$route.name === 'student-classes'){
                let started_unenroll = this.$store.state.unenroll_from_class.started_unenroll; // Started unenroll property from vuex

                // Check if the user is unenrolling from a class or not
                if (started_unenroll === false){
                    let can_refresh = this.$store.state.app_components.refresh_data; // Refresh data property from vuex

                    // Check if the user can refresh or not
                    if (can_refresh === true){
                        let is_logging_out = this.$store.state.logout_user.is_logging_out; // Is logging in property from vuex

                        if (is_logging_out === false){
                            this.refresh_data(); // Refresh page data contents
                        } else {
                            this.$store.commit('dialog/msg_dialog/update_dialog', { value: true, msg: 'Cannot refresh at this point!' }); // Display the msg dialog
                        }
                    } else if (can_refresh === false){
                        this.$store.commit('dialog/msg_dialog/update_dialog', { value: true, msg: 'Cannot refresh at this point!' }); // Display the msg dialog
                    }
                    //------------------------------------------
                } else {
                    this.$store.commit('dialog/msg_dialog/update_dialog', { value: true, msg: 'Cannot refresh at this point!' }); // Display the msg dialog
                }
                //----------------------------------------------------
            } else if (this.$route.name === 'teacher-classes'){
                let can_refresh = this.$store.state.app_components.refresh_data; // Refresh data property from vuex

                // Check if the user can refresh or not
                if (can_refresh === true){
                    this.refresh_data(); // Refresh page data contents
                } else if (can_refresh === false){
                    this.$store.commit('dialog/msg_dialog/update_dialog', { value: true, msg: 'Cannot refresh at this point!' }); // Display the msg dialog
                }
                //------------------------------------------
            }
        },
        //-----------------------------

        // Open the join class dialog
        open_join_class_dialog(){
            this.$store.commit('join_class_dialog/update_dialog', { value: true });
        },
        //--------------------------------

        // Open the create class dialog
        open_create_class_dialog(){
            this.$store.commit('create_class_dialog/update_dialog', { value: true });
        },
        //--------------------------------

        // Open the send feedback dialog
        open_send_feedback_dialog(){
            this.$store.commit('dialog/send_feedback_dialog/update_dialog', { value: true });
        },
        //--------------------------------

        // Detect screen size changes in width and height
        onResize(){
            this.width = window.innerWidth; // Screen width
            this.height = window.innerHeight; // Screen height
        }
        //----------------------------------------------------
    },
    //-----------------------

    // Mounted life cycle hook
    mounted(){
        this.$nextTick(() => {
            this.onResize(); // Detect changes in screen width and height
        });
    },
    //----------------------------

    // This life cycle hook is called when the user leaves the current route
    beforeDestroy(){
        this.controller.abort(); // Abort all pending fetch api requests
        this.controller = new AbortController(); // Generate a new abort controller object
    }
    //------------------------------------------------------
}
</script>

<style scoped>
@import url('../../assets/classes_home_page.css'); /* CSS stylesheet file for the classes home page */
</style>