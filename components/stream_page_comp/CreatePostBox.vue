<template>
    <div id="text-editor">
        <Editor v-model="html_data" />

        <div id="menu-area" v-if="add_file">
            <v-file-input
                v-model="files"
                color="primary"
                counter
                label="Attach files"
                multiple
                placeholder="Attach files"
                prepend-icon="mdi-paperclip"
                outlined
                :show-size="1000"
                style="font-size: 14px;"
            >
                <template v-slot:selection="{ index, text }" style="font-size: 3rem;">
                    <v-chip
                        v-if="index < 2"
                        color="primary"
                        dark
                        label
                        small
                    >
                        {{ text }}
                    </v-chip>

                    <span
                        v-else-if="index === 2"
                        class="text-overline grey--text text--darken-3 mx-2"
                    >
                        +{{ files.length - 2 }} File(s)
                    </span>
                </template>
            </v-file-input>
        </div>

        <div id="menu-area-two">
            <div id="add-media-btn">
                <v-btn
                    color="primary"
                    @click="add_file = true"
                    style="font-size: 0.78rem;"
                >
                    <v-icon
                        left
                        dark
                    >
                        mdi-paperclip
                    </v-icon>

                    Add
                </v-btn>
            </div>

            <div id="post-cancel-btn">
                <v-btn
                    class="ma-1"
                    color="primary"
                    plain
                    @click="resetTextArea()"
                    style="font-size: 0.78rem; font-weight: 600;"
                >
                    Cancel
                </v-btn>

                <v-btn
                    v-if="post_bool === true"
                    color="primary"
                    @click="createPost()"
                    style="font-size: 0.78rem;"
                >
                    Post
                </v-btn>

                <v-btn
                    v-else
                    :loading="post_loading"
                    :disabled="post_loading"
                    style="font-size: 0.78rem;"
                    color="primary"
                >
                    Post
                </v-btn>
            </div>
        </div>
    </div>
</template>

<script>
// Imported mixins
import create_new_post from '../../mixins/student/student_streams_page/create_new_post/create_new_post'
import create_new_post_request from '../../mixins/student/student_streams_page/create_new_post/create_new_post_request'
import create_new_post_response from '../../mixins/student/student_streams_page/create_new_post/create_new_post_response'
import teacher_create_new_post from '../../mixins/teacher/teacher_streams_page/create_new_post/teacher_create_new_post'
import teacher_create_new_post_request from '../../mixins/teacher/teacher_streams_page/create_new_post/teacher_create_new_post_request'
import teacher_create_new_post_response from '../../mixins/teacher/teacher_streams_page/create_new_post/teacher_create_new_post_response'
import check_if_text_editor_is_empty from '../../mixins/html_string_sanitize'
import stripAttributes from '../../mixins/html_string_sanitize'
import stripElem from '../../mixins/html_string_sanitize'
import usurp from '../../mixins/html_string_sanitize'
import sanitize from '../../mixins/html_string_sanitize'
import sanitizeString from '../../mixins/html_string_sanitize'
import send_request from '../../mixins/student/student_streams_page/create_new_post/send_request'
import teacher_send_request from '../../mixins/teacher/teacher_streams_page/create_new_post/teacher_send_request'
//--------------------------------------

// Single file component imports
import StreamPosts from '../../components/stream_page_comp/StreamPosts'
import Editor from "../../components/Editor"
//--------------------------------------

export default {
    name: 'AnnouncementBox', // Component name

    // Registered mixins
    mixins: [
        create_new_post,

        create_new_post_request,

        create_new_post_response,

        teacher_create_new_post,

        teacher_create_new_post_request,

        teacher_create_new_post_response,

        check_if_text_editor_is_empty,

        stripAttributes,

        stripElem,

        usurp,

        sanitize,

        sanitizeString,

        send_request,

        teacher_send_request
    ],
    //------------------------------

    // Registered components
    components: {
        StreamPosts,

        Editor
    },
    //------------------------------

    // Data property
    data(){
        return {
            files: [],
            add_file: false,
            post_bool: true,
            post_loading: true,
            loading: true,
            html_data: "<p>Share something with your class...</p>",
            controller_x: new AbortController() // Abort Controller
        }
    },
    //------------------------------

    // Computed property
    computed: {
        // Users profile image from vuex
        profile_img: function(){
            return this.$store.state.user_details.user_details.details.profile_image;
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
    //-------------------------------------------------

    // Methods property
    methods: {
        // Reset the text editor
        resetTextArea(){
            this.files = [];
            this.add_file = false;
            this.post_bool = true;
            this.post_loading = true;
            this.loading = true;
            this.html_data = "<p>Share something with your class...</p>";
            this.$store.commit('text_editor_control/reset_data');
            this.controller.abort(); // Abort all pending fetch api requests
            this.controller = new AbortController(); // Generate a new abort controller object
            setTimeout(() => {
                this.$store.commit(this.$config.VUEX_UPDATE_ERR_MSG_DIALOG, { value: false, msg: 'An error just occured!', err: true }); // Update the err msg dialog through vuex
            }, 30);
        },
        //--------------------------

        // Create a new post
        createPost(){
            if (this.$route.name === 'student-stream'){
                this.create_new_post(this.html_data, this.files);
            } else if (this.$route.name === 'teacher-stream'){
                this.teacher_create_new_post(this.html_data, this.files);
            }
        }
        //--------------------------
    },
    //-------------------------------------------------

    // Watch property
    watch: {
        // Watch class code query parameter
        '$route.query.class_code'(){
            this.files = [];
            this.add_file = false;
            this.post_bool = true;
            this.post_loading = true;
            this.loading = true;
            this.html_data = "<p>Share something with your class...</p>";
            this.$store.commit('text_editor_control/reset_data');
            this.controller.abort(); // Abort all pending fetch api requests
            this.controller = new AbortController(); // Generate a new abort controller object
            setTimeout(() => {
                this.$store.commit(this.$config.VUEX_UPDATE_ERR_MSG_DIALOG, { value: false, msg: '', err: false }); // Update the err msg dialog through vuex
            }, 30);
        },
        //--------------------------------------

        loader () {
            const l = this.loader
        },
    },
    //----------------------------------

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

::v-deep .v-label{
    font-size: 14px !important;
}
</style>