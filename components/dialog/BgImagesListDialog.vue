<template>
    <v-row justify="center">
        <v-dialog
            v-model="dialog"
            scrollable
            v-resize="onResize"
            :fullscreen="(window_width <= 415) ? true : false"
            max-width="980px"
            :retain-focus="false"
        >
            <v-card>
                <v-card-title id="comment-head-comp">
                    Select class theme

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

                <v-card-text style="height: 393px;">
                    <v-progress-linear
                        :active="loading_linear"
                        :indeterminate="loading_linear"
                        absolute
                        top
                        color="primary"
                        height="10px"
                    >
                    </v-progress-linear>

                    <div id="qoo8bc_xz">
                        <BgImgList />
                    </div>
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

                    <v-btn
                        color="primary"
                        :disabled="disable_select_theme"
                        @click="change_bg_class_img()"
                    >
                        <span id="btn_txt">Select class theme</span>
                    </v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
    </v-row>
</template>

<script>
// Imported mixins
import change_class_bg_img_operation from '../../mixins/teacher/change_class_bg_img/change_class_bg_img_operation'
import change_class_bg_img_request from '../../mixins/teacher/change_class_bg_img/change_class_bg_img_request'
import change_class_bg_img_response from '../../mixins/teacher/change_class_bg_img/change_class_bg_img_response'
import teacher_fetch_class_posts from '../../mixins/teacher/fetch_class_posts/teacher_fetch_class_posts'
import teacher_fetch_class_posts_request from '../../mixins/teacher/fetch_class_posts/teacher_fetch_class_posts_request'
import teacher_fetch_class_posts_response from '../../mixins/teacher/fetch_class_posts/teacher_fetch_class_posts_response'
import teacher_fetch_class_list from '../../mixins/teacher/fetch_class_list_operation/teacher_fetch_class_list'
import teacher_fetch_class_list_fetch_request from '../../mixins/teacher/fetch_class_list_operation/teacher_fetch_class_list_fetch_request'
import teacher_fetch_class_list_response from '../../mixins/teacher/fetch_class_list_operation/teacher_fetch_class_list_response'
import check_if_text_editor_is_empty from '../../mixins/html_string_sanitize'
import stripAttributes from '../../mixins/html_string_sanitize'
import stripElem from '../../mixins/html_string_sanitize'
import usurp from '../../mixins/html_string_sanitize'
import sanitize from '../../mixins/html_string_sanitize'
import sanitizeString from '../../mixins/html_string_sanitize'
import student_streams_route_leave from '../../mixins/student/student_streams_page/clean_route_before_leaving/student_streams_route_leave'
import teacher_streams_route_leave from '../../mixins/teacher/teacher_streams_page/clean_route_before_leaving/teacher_streams_route_leave'
import student_class_stream_page_mounted from '../../mixins/mounted/student_class_stream_page_mounted'
import teacher_class_stream_page_mounted from '../../mixins/mounted/teacher_class_stream_page_mounted'
import general_route_leave from '../../mixins/general_route_leave'
//---------------------------

// SFC imports
import BgImgList from '../../components/stream_page_comp/BgImgList'
//---------------------------

export default {
    name: 'BgImagesListDialog', // Component name

    // Registered mixins
    mixins: [
        change_class_bg_img_operation,

        change_class_bg_img_request,

        change_class_bg_img_response,

        teacher_fetch_class_posts,

        teacher_fetch_class_posts_request,

        teacher_fetch_class_posts_response,

        teacher_fetch_class_list,

        teacher_fetch_class_list_fetch_request,

        teacher_fetch_class_list_response,

        check_if_text_editor_is_empty,

        stripAttributes,

        stripElem,

        usurp,

        sanitize,

        sanitizeString,

        student_streams_route_leave,

        teacher_streams_route_leave,

        student_class_stream_page_mounted,

        teacher_class_stream_page_mounted,

        general_route_leave
    ],
    //----------------------------

    // Registered components
    components: {
        BgImgList
    },
    //----------------------------

    // Data property
    data(){
        return {
            window_width: '', // Window width property
            loading_linear: false, // Loading linear property
            controller_x: new AbortController() // Abort Controller
        }
    },
    //------------------------------

    // Computed properties
    computed: {
        // Vuex property to toggle the visibility of the bg class image list dialog
        dialog: {
            get(){
                if (this.$store.state.dialog.bg_class_img_list_dialog.value === false){
                    let bg = document.querySelectorAll('[data-bg]');
                    let svg = document.querySelectorAll('[data-svg]');

                    bg.forEach(elem => {
                        elem.style.border = 'unset';
                    });

                    svg.forEach(elem => {
                        elem.style.display = 'none';
                        elem.removeAttribute("fill");
                    });

                    this.$store.commit('dialog/bg_class_img_list_dialog/update_bg_class_img', { value: null });
                    this.$store.commit('dialog/bg_class_img_list_dialog/update_disable_select_theme', { value: true });
                }

                return this.$store.state.dialog.bg_class_img_list_dialog.value;
            },

            set(value){
                this.$store.commit('dialog/bg_class_img_list_dialog/update_dialog', { value: value });
            }
        },
        //--------------------------------------------

        // Disable select theme property from vuex
        disable_select_theme: function(){
            return this.$store.state.dialog.bg_class_img_list_dialog.disable_select_theme;
        },
        //-----------------------------------------------------

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
        // Watch class code query parameter
        '$route.query.class_code'(){
            if (this.$route.name === 'student-stream'){
                this.student_streams_route_leave(); // Route leave
            } else if (this.$route.name === 'teacher-stream'){
                let bg = document.querySelectorAll('[data-bg]');
                let svg = document.querySelectorAll('[data-svg]');

                bg.forEach(elem => {
                    elem.style.border = 'unset';
                });

                svg.forEach(elem => {
                    elem.style.display = 'none';
                    elem.removeAttribute("fill");
                });

                this.$store.commit('dialog/bg_class_img_list_dialog/update_bg_class_img', { value: null });
                this.$store.commit('dialog/bg_class_img_list_dialog/update_disable_select_theme', { value: true });

                this.teacher_streams_route_leave(); // Route leave
            }

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

    // Methods or functions
    methods: {
        // Close msg dialog from vuex
        close_dialog(){
            this.$store.commit('dialog/bg_class_img_list_dialog/update_dialog', { value: false });
            this.controller.abort(); // Abort all pending fetch api requests
            this.controller = new AbortController(); // Generate a new abort controller object
        },
        //---------------------------------

        // Detect screen resize
        onResize(){
            this.window_width = window.innerWidth;
        },
        //---------------------------------

        // Send feedback
        send_feedback(){
            this.$store.commit('dialog/send_feedback_dialog/update_dialog', { value: true });
        },
        //-------------------------------

        change_bg_class_img(){
            if (this.disable_select_theme === false && this.$store.state.dialog.bg_class_img_list_dialog.bg_class_img != null){
                this.loading_linear = true;
                this.$store.commit('dialog/bg_class_img_list_dialog/update_disable_select_theme', { value: true });
                document.querySelector('#btn_txt').innerText = 'Loading...';
                this.change_class_bg_img_operation(this.$store.state.dialog.bg_class_img_list_dialog.bg_class_img, this.$route.query.class_code);
            }
        }
    },
    //------------------------

    // Created lifecycle hook
    created(){
        this.onResize();
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
@import url('../../assets/class_stream_page.css'); /* CSS stylesheet file for the class stream page */
@import url('../../assets/settings_page.css'); /* CSS stylesheet file for the settings page */
@import url('../../assets/classes_home_page.css'); /* CSS stylesheet file for the classes home page */

::v-deep .v-card {
    height: 560px;
}
</style>