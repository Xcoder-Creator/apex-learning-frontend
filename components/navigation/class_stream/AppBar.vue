<template>
    <v-app-bar
        color="#fff"
        fixed
        id="toolbar_class_stream"
        v-resize="onResize"
    >
        <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>

        <v-toolbar-title id="toolbar-title">
            <v-list-item two-line style="padding-bottom: 9px; padding-top: 9px;">
                <v-list-item-content>
                    <v-list-item-title id="class-title">{{ class_info.class_name }}</v-list-item-title>
                    <v-list-item-subtitle>{{ class_info.class_section }}</v-list-item-subtitle>
                </v-list-item-content>
            </v-list-item>
        </v-toolbar-title>

        <v-progress-linear
            v-if="$route.name === 'student-stream' || $route.name === 'student-classwork' || $route.name === 'student-people' || $route.name === 'student-view_classwork'"
            :active="loading_linear"
            :indeterminate="loading_linear"
            absolute
            bottom
            color="primary"
            id="loading_linear2"
        >
        </v-progress-linear>

        <v-progress-linear
            v-else-if="$route.name === 'teacher-stream' || $route.name === 'teacher-classwork' || $route.name === 'teacher-people' || $route.name === 'teacher-view_classwork'"
            :active="teacher_loading_linear"
            :indeterminate="teacher_loading_linear"
            absolute
            bottom
            color="primary"
            id="loading_linear2"
        >
        </v-progress-linear>

        <v-spacer></v-spacer>

        <v-tabs v-if="$route.name === 'student-stream' || $route.name === 'student-classwork' || $route.name === 'student-people' || $route.name === 'student-view_classwork'" v-model="active_tab" id="tab-display">
            <v-tab>Stream</v-tab>
            <v-tab>Classwork</v-tab>
            <v-tab>People</v-tab>
        </v-tabs>

        <v-tabs v-else-if="$route.name === 'teacher-stream' || $route.name === 'teacher-classwork' || $route.name === 'teacher-people' || $route.name === 'teacher-view_classwork'" v-model="teacher_active_tab" id="tab-display">
            <v-tab>Stream</v-tab>
            <v-tab>Classwork</v-tab>
            <v-tab>People</v-tab>
        </v-tabs>

        <v-spacer></v-spacer>

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
                <v-list-item link>
                    <v-list-item-title @click="refresh_page_data()">Refresh</v-list-item-title>
                </v-list-item>
                <v-list-item @click="open_send_feedback_dialog()" link>
                    <v-list-item-title>Send feedback</v-list-item-title>
                </v-list-item>
            </v-list>
        </v-menu>

        <div id="profile_image" v-if="width > 415">
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

        <div>
            <v-tooltip bottom v-if="width <= 415">
                <template v-slot:activator="{ on, attrs }">
                    <v-btn
                        icon
                        v-bind="attrs"
                        v-on="on"
                        @click="open_about_dialog()"
                    >
                        <v-icon>mdi-information-outline</v-icon>
                    </v-btn>
                </template>
                <span>About</span>
            </v-tooltip>
        </div>

        <div>
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
                    <v-list-item link>
                        <v-list-item-title id="refresh_btn" @click="refresh_page_data()">Refresh</v-list-item-title>
                    </v-list-item>
                    <v-list-item @click="open_send_feedback_dialog()" link>
                        <v-list-item-title>Send feedback</v-list-item-title>
                    </v-list-item>
                </v-list>
            </v-menu>
        </div>
    </v-app-bar>
</template>

<script>
// Imported mixins
import refresh_data from '../../../mixins/student/student_streams_page/refresh_data'
import teacher_refresh_data from '../../../mixins/teacher/teacher_streams_page/teacher_refresh_data'
import keep_user_logged_in from '../../../mixins/login/keep_user_logged_in_operation/keep_user_logged_in'
import keep_user_logged_in_request from '../../../mixins/login/keep_user_logged_in_operation/keep_user_logged_in_request'
import keep_user_logged_in_response from '../../../mixins/login/keep_user_logged_in_operation/keep_user_logged_in_response'
import student_class_stream_page_mounted from '../../../mixins/mounted/student_class_stream_page_mounted'
import teacher_class_stream_page_mounted from '../../../mixins/mounted/teacher_class_stream_page_mounted'
import select_item from '../../../mixins/nav_drawer_items/select_item'
import general_route_leave from '../../../mixins/general_route_leave'
import fetch_class_posts from '../../../mixins/student/fetch_class_posts/fetch_class_posts'
import fetch_class_posts_request from '../../../mixins/student/fetch_class_posts/fetch_class_posts_request'
import fetch_class_posts_response from '../../../mixins/student/fetch_class_posts/fetch_class_posts_response'
import teacher_fetch_class_posts from '../../../mixins/teacher/fetch_class_posts/teacher_fetch_class_posts'
import teacher_fetch_class_posts_request from '../../../mixins/teacher/fetch_class_posts/teacher_fetch_class_posts_request'
import teacher_fetch_class_posts_response from '../../../mixins/teacher/fetch_class_posts/teacher_fetch_class_posts_response'
import fetch_class_list from '../../../mixins/student/fetch_class_list_operation/fetch_class_list'
import fetch_class_list_fetch_request from '../../../mixins/student/fetch_class_list_operation/fetch_class_list_fetch_request'
import fetch_class_list_response from '../../../mixins/student/fetch_class_list_operation/fetch_class_list_response'
import student_streams_route_leave from '../../../mixins/student/student_streams_page/clean_route_before_leaving/student_streams_route_leave'
import teacher_streams_route_leave from '../../../mixins/teacher/teacher_streams_page/clean_route_before_leaving/teacher_streams_route_leave'
import check_if_text_editor_is_empty from '../../../mixins/html_string_sanitize'
import stripAttributes from '../../../mixins/html_string_sanitize'
import stripElem from '../../../mixins/html_string_sanitize'
import usurp from '../../../mixins/html_string_sanitize'
import sanitize from '../../../mixins/html_string_sanitize'
import sanitizeString from '../../../mixins/html_string_sanitize'
import view_people from '../../../mixins/student/view_people/view_people'
import view_people_request from '../../../mixins/student/view_people/view_people_request'
import view_people_response from '../../../mixins/student/view_people/view_people_response'
import student_people_refresh_page from '../../../mixins/student/student_people_page/student_people_refresh_page'
import teacher_people_refresh_page from '../../../mixins/teacher/teacher_people_page/teacher_people_refresh_page'
import teacher_classwork_refresh_page from '../../../mixins/teacher/teacher_classwork_page/teacher_classwork_refresh_page'
import student_classwork_refresh_page from '../../../mixins/student/student_classwork_page/student_classwork_refresh_page'
import teacher_fetch_classwork_details from '../../../mixins/teacher/view_classwork_page/teacher_fetch_classwork_details'
import teacher_fetch_classwork_details_request from '../../../mixins/teacher/view_classwork_page/teacher_fetch_classwork_details_request'
import teacher_fetch_classwork_details_response from '../../../mixins/teacher/view_classwork_page/teacher_fetch_classwork_details_response'
import teacher_view_classwork_refresh_page from '../../../mixins/teacher/view_classwork_page/teacher_view_classwork_refresh_page'
import student_fetch_classwork_details from '../../../mixins/student/view_classwork_page/student_fetch_classwork_details'
import student_fetch_classwork_details_request from '../../../mixins/student/view_classwork_page/student_fetch_classwork_details_request'
import student_fetch_classwork_details_response from '../../../mixins/student/view_classwork_page/student_fetch_classwork_details_response'
import student_view_classwork_refresh_page from '../../../mixins/student/view_classwork_page/student_view_classwork_refresh_page'
import teacher_view_people from '../../../mixins/teacher/view_people/teacher_view_people'
import teacher_view_people_request from '../../../mixins/teacher/view_people/teacher_view_people_request'
import teacher_view_people_response from '../../../mixins/teacher/view_people/teacher_view_people_response'
import teacher_fetch_classworks from '../../../mixins/teacher/teacher_classwork_page/teacher_fetch_classworks'
import teacher_fetch_classworks_request from '../../../mixins/teacher/teacher_classwork_page/teacher_fetch_classworks_request'
import teacher_fetch_classworks_response from '../../../mixins/teacher/teacher_classwork_page/teacher_fetch_classworks_response'
import student_fetch_classworks from '../../../mixins/student/student_classwork_page/student_fetch_classworks'
import student_fetch_classworks_request from '../../../mixins/student/student_classwork_page/student_fetch_classworks_request'
import student_fetch_classworks_response from '../../../mixins/student/student_classwork_page/student_fetch_classworks_response'
//--------------------------------

export default {
    name: 'AppBar', // Component name

    // Registered mixins
    mixins: [
        refresh_data,

        teacher_refresh_data,

        keep_user_logged_in,

        keep_user_logged_in_request,

        keep_user_logged_in_response,

        student_class_stream_page_mounted,

        teacher_class_stream_page_mounted,

        select_item,

        general_route_leave,

        fetch_class_list,

        fetch_class_list_fetch_request,

        fetch_class_list_response,

        fetch_class_posts,

        fetch_class_posts_request,

        fetch_class_posts_response,

        teacher_fetch_class_posts,

        teacher_fetch_class_posts_request,

        teacher_fetch_class_posts_response,

        student_streams_route_leave,

        teacher_streams_route_leave,

        check_if_text_editor_is_empty,

        stripAttributes,

        stripElem,

        usurp,

        sanitize,

        sanitizeString,

        view_people,

        view_people_request,

        view_people_response,

        student_people_refresh_page,

        teacher_people_refresh_page,

        student_classwork_refresh_page,

        teacher_fetch_classwork_details,

        teacher_fetch_classwork_details_request,

        teacher_fetch_classwork_details_response,

        teacher_view_classwork_refresh_page,

        student_fetch_classwork_details,

        student_fetch_classwork_details_request,

        student_fetch_classwork_details_response,

        student_view_classwork_refresh_page,

        teacher_classwork_refresh_page,

        teacher_view_people,

        teacher_view_people_request,

        teacher_view_people_response,

        teacher_fetch_classworks,

        teacher_fetch_classworks_request,

        teacher_fetch_classworks_response,

        student_fetch_classworks,

        student_fetch_classworks_request,

        student_fetch_classworks_response
    ],
    //--------------------------

    // Reactive data properties
    data(){
        return {
            width: 0, // Width of screen
            height: 0, // Height of screen
            update_opt: true, // Update opt property
            controller_x: new AbortController() // Abort Controller
        }
    },
    //---------------------------

    // Computed property
    computed: {
        // Class info property from vuex
        class_info: function(){
            return this.$store.state.class_info.class_info;
        },
        //--------------------------------------------------------

        // Users profile image from vuex
        profile_img: function(){
            return this.$store.state.user_details.user_details.details.profile_image;
        },
        //----------------------------------

        // Active tab property from vuex
        active_tab: {
            get(){
                return this.$store.state.student_streams_page.active_tab.active_tab;
            },

            set(value){
                this.$store.commit('student_streams_page/active_tab/update_active_tab', { tab: value }); // Update active tab from vuex
                this.$store.commit('bottom_nav/update_tab_value', { value: value }); // Update tab value property from vuex

                if (value === 0){
                    this.$router.push({ path: '/student/stream', query: { class_code: this.$route.query.class_code } });
                } else if (value === 1){
                    this.$router.push({ path: '/student/classwork', query: { class_code: this.$route.query.class_code } });
                } else if (value === 2){
                    this.$router.push({ path: '/student/people', query: { class_code: this.$route.query.class_code } });
                }
            }
        },
        //--------------------------------------------------------

        // Active tab property from vuex
        teacher_active_tab: {
            get(){
                return this.$store.state.teacher_streams_page.active_tab.active_tab;
            },

            set(value){
                this.$store.commit('teacher_streams_page/active_tab/update_active_tab', { tab: value }); // Update active tab from vuex
                this.$store.commit('bottom_nav/update_tab_value', { value: value }); // Update tab value property from vuex

                if (value === 0){
                    this.$router.push({ path: '/teacher/stream', query: { class_code: this.$route.query.class_code } });
                } else if (value === 1){
                    this.$router.push({ path: '/teacher/classwork', query: { class_code: this.$route.query.class_code } });
                } else if (value === 2){
                    this.$router.push({ path: '/teacher/people', query: { class_code: this.$route.query.class_code } });
                }
            }
        },
        //--------------------------------------------------------

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

        // Loading linear property from vuex
        loading_linear: {
            get(){
                return this.$store.state.student_streams_page.stream_comp.loading_linear;
            },

            set(value){
                this.$store.commit('student_streams_page/stream_comp/update_loading_linear', { value: value });
            }
        },
        //----------------------------------------

        // Loading linear property from vuex
        teacher_loading_linear: {
            get(){
                return this.$store.state.teacher_streams_page.stream_comp.loading_linear;
            },

            set(value){
                this.$store.commit('teacher_streams_page/stream_comp/update_loading_linear', { value: value });
            }
        },
        //----------------------------------------

        // About class dialog property from vuex
        about_class_dialog: {
            get(){
                return this.$store.state.dialog.about_class_dialog.value;
            },

            set(value){
                this.$store.commit('dialog/about_class_dialog/update_data', { value: value });
            }
        },
        //--------------------------------------------------------

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
    //-------------------------------------------------

    // Watch property
    watch: {
        // Watch class code query parameter
        '$route.query.class_code'(){
            if (this.$route.name === 'student-stream'){
                this.student_streams_route_leave(); // Route leave
            } else if (this.$route.name === 'teacher-stream'){
                this.teacher_streams_route_leave(); // Route leave
            }

            this.update_opt = false;
            this.controller.abort(); // Cancel all pending requests
            this.controller = new AbortController(); // Generate a new abort controller object

            if (this.$route.name === 'student-stream'){
                this.$store.commit('student_streams_page/stream_comp/update_loaded_posts', { value: false }) // Update loaded posts property from vuex
                this.$store.commit('student_streams_page/stream_comp/update_loading_linear', { value: true }) // Update loading linear property from vuex
                this.$store.commit('student_streams_page/stream_comp/update_refresh_data', { value: false }) // Update refresh data property from vuex
                this.$store.commit('student_streams_page/stream_comp/update_posts_array', { value: [] }); // Update posts array property from vuex

                this.student_class_stream_page_mounted();
            } else if (this.$route.name === 'teacher-stream'){
                this.$store.commit('teacher_streams_page/stream_comp/update_loaded_posts', { value: false }) // Update loaded posts property from vuex
                this.$store.commit('teacher_streams_page/stream_comp/update_loading_linear', { value: true }) // Update loading linear property from vuex
                this.$store.commit('teacher_streams_page/stream_comp/update_refresh_data', { value: false }) // Update refresh data property from vuex
                this.$store.commit('teacher_streams_page/stream_comp/update_posts_array', { value: [] }); // Update posts array property from vuex

                this.teacher_class_stream_page_mounted();
            }
        }
        //--------------------------------------
    },
    //----------------------------------

    // Methods property
    methods: {
        // Refresh page data and info
        refresh_page_data(){
            if (this.$route.name === 'student-stream' || this.$route.name === 'student-classwork' || this.$route.name === 'student-people' || this.$route.name === 'student-view_classwork'){
                this.refresh_data();
            } else if (this.$route.name === 'teacher-stream' || this.$route.name === 'teacher-classwork' || this.$route.name === 'teacher-people' || this.$route.name === 'teacher-view_classwork'){
                this.teacher_refresh_data();
            }
        },
        //------------------------------

        // Open the about class dialog
        open_about_dialog(){
            this.about_class_dialog = true;
        },
        //------------------------------

        // Open the send feedback dialog
        open_send_feedback_dialog(){
            this.$store.commit('dialog/send_feedback_dialog/update_dialog', { value: true });
        },
        //--------------------------------

        // Detect screen size changes in width and height
        onResize(){
            this.width = window.innerWidth; // Screen width
            this.height = window.innerHeight; // Screen height
        },
        //----------------------------------------------------
    },
    //-------------------------

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
@import url('../../../assets/class_stream_page.css'); /* CSS stylesheet file for the class stream page */
</style>