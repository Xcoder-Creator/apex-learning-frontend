<template>
    <div v-if="$route.name === 'student-stream'">
        <div id="class-posts" v-if="loaded_posts === true">
            <ClassPosts />

            <div style="margin-top: 35px; text-align: center;" v-if="load_more_button === true">
                <v-btn
                    color="primary"
                    class="ma-2 white--text"
                    @click="load_more_posts()"
                >
                    <span style="font-size: 0.8rem;">Load More</span>
                    <v-icon
                        right
                    >
                        mdi-cloud-download
                    </v-icon>
                </v-btn>
            </div>

            <div id="load_posts_spinner" v-if="spinner === true">
                <v-progress-circular
                    indeterminate
                    color="primary"
                ></v-progress-circular>
            </div>
        </div>

        <div v-else-if="loaded_posts === false" id="loader_posts_skeleton">
            <v-skeleton-loader
                type="table-heading, list-item-two-line"
                v-for="i in 5" :key="i"
                id="post_load"
            ></v-skeleton-loader>
        </div>

        <div v-else-if="loaded_posts === 'no_posts'">
            <NoPosts />
        </div>
    </div>

    <div v-else-if="$route.name === 'teacher-stream'">
        <div id="class-posts" v-if="teacher_loaded_posts === true">
            <ClassPosts />

            <div style="margin-top: 35px; text-align: center;" v-if="load_more_button === true">
                <v-btn
                    color="primary"
                    class="ma-2 white--text"
                    @click="load_more_posts()"
                >
                    <span style="font-size: 0.8rem;">Load More</span>
                    <v-icon
                        right
                    >
                        mdi-cloud-download
                    </v-icon>
                </v-btn>
            </div>

            <div id="load_posts_spinner" v-if="teacher_spinner === true">
                <v-progress-circular
                    indeterminate
                    color="primary"
                ></v-progress-circular>
            </div>
        </div>

        <div v-else-if="teacher_loaded_posts === false" id="loader_posts_skeleton">
            <v-skeleton-loader
                type="table-heading, list-item-two-line"
                v-for="i in 5" :key="i"
                id="post_load"
            ></v-skeleton-loader>
        </div>

        <div v-else-if="teacher_loaded_posts === 'no_posts'">
            <NoPosts />
        </div>
    </div>
</template>

<script>
// Imported mixins
import fetch_class_posts_request from '../../mixins/student/fetch_class_posts/fetch_class_posts_request'
import fetch_class_posts_response from '../../mixins/student/fetch_class_posts/fetch_class_posts_response'
import teacher_fetch_class_posts_request from '../../mixins/teacher/fetch_class_posts/teacher_fetch_class_posts_request'
import teacher_fetch_class_posts_response from '../../mixins/teacher/fetch_class_posts/teacher_fetch_class_posts_response'
import get_more_available_posts from '../../mixins/student/student_streams_page/get_more_available_posts'
import teacher_get_more_available_posts from '../../mixins/teacher/teacher_streams_page/teacher_get_more_available_posts'
import check_if_text_editor_is_empty from '../../mixins/html_string_sanitize'
import stripAttributes from '../../mixins/html_string_sanitize'
import stripElem from '../../mixins/html_string_sanitize'
import usurp from '../../mixins/html_string_sanitize'
import sanitize from '../../mixins/html_string_sanitize'
import sanitizeString from '../../mixins/html_string_sanitize'
//---------------------------------------

// Imported components
import NoPosts from '../../components/stream_page_comp/NoPosts'
import ClassPosts from '../../components/stream_page_comp/ClassPosts'
//---------------------------------------

export default {
    name: 'StreamPosts', // Component name

    // Registered mixins
    mixins: [
        fetch_class_posts_request,

        fetch_class_posts_response,

        teacher_fetch_class_posts_request,

        teacher_fetch_class_posts_response,

        get_more_available_posts,

        teacher_get_more_available_posts,

        check_if_text_editor_is_empty,

        stripAttributes,

        stripElem,

        usurp,

        sanitize,

        sanitizeString
    ],
    //----------------------------

    // Registered components
    components: {
        NoPosts,

        ClassPosts
    },
    //------------------------------

    // Reactive data properties
    data(){
        return {
            load_more_button: true, // Load more button
            controller_x: new AbortController() // Abort Controller
        }
    },
    //---------------------------

    // Computed property
    computed: {
        // Loaded posts property from vuex
        loaded_posts: function(){
            if (this.$store.state.student_streams_page.stream_comp.loaded_posts === true){
                this.$store.commit('student_streams_page/student_stream_route_config/update_fetch_more_posts', { value: true });
                this.$store.commit('student_streams_page/stream_comp/update_spinner', { value: false });
                this.load_more_button = true;
            } else if (this.$store.state.student_streams_page.stream_comp.loaded_posts === false){
                this.load_more_button = false;
            }

            return this.$store.state.student_streams_page.stream_comp.loaded_posts;
        },
        //--------------------------------------------------------

        // Loaded posts property from vuex
        teacher_loaded_posts: function(){
            if (this.$store.state.teacher_streams_page.stream_comp.loaded_posts === true){
                this.$store.commit('teacher_streams_page/teacher_stream_route_config/update_fetch_more_posts', { value: true });
                this.$store.commit('teacher_streams_page/stream_comp/update_spinner', { value: false });
                this.load_more_button = true;
            } else if (this.$store.state.teacher_streams_page.stream_comp.loaded_posts === false){
                this.load_more_button = false;
            }

            return this.$store.state.teacher_streams_page.stream_comp.loaded_posts;
        },
        //--------------------------------------------------------

        // Fetch more posts
        fetch_more_posts: function(){
            return this.$store.state.student_streams_page.student_stream_route_config.fetch_more_posts;
        },
        //--------------------------------------------------------

        // Fetch more posts
        teacher_fetch_more_posts: function(){
            return this.$store.state.teacher_streams_page.teacher_stream_route_config.fetch_more_posts;
        },
        //--------------------------------------------------------

        // Spinner property
        spinner: function(){
            return this.$store.state.student_streams_page.stream_comp.spinner;
        },
        //--------------------------------------------------------

        // Spinner property
        teacher_spinner: function(){
            return this.$store.state.teacher_streams_page.stream_comp.spinner;
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
    //-----------------------------------------

    // Watch property
    watch: {
        // Watch class code query parameter
        '$route.query.class_code'(){
            this.load_more_button = true;
            this.controller.abort(); // Cancel all pending requests
            this.controller = new AbortController(); // Generate a new abort controller object
        }
        //--------------------------------------
    },
    //----------------------------------

    // Methods property
    methods: {
        // Load more posts
        load_more_posts (){
            if (this.$route.name === 'student-stream'){
                if (this.fetch_more_posts === true){
                    if (this.$route.query.class_code){
                        let class_code = this.$route.query.class_code;
                        let active_offsets = this.$store.state.student_streams_page.stream_comp.active_class_post_offset;

                        if (active_offsets){
                            if (active_offsets.hasOwnProperty(class_code)){
                                let offset = active_offsets[class_code];
                                this.get_more_available_posts(class_code, offset);
                            }
                        }
                    }
                } else {
                    this.$store.commit('dialog/msg_dialog/update_dialog', { value: true, msg: 'Can\'t load more posts at this point!' });
                }
            } else if (this.$route.name === 'teacher-stream'){
                if (this.teacher_fetch_more_posts === true){
                    if (this.$route.query.class_code){
                        let class_code = this.$route.query.class_code;
                        let active_offsets = this.$store.state.teacher_streams_page.stream_comp.active_class_post_offset;

                        if (active_offsets){
                            if (active_offsets.hasOwnProperty(class_code)){
                                let offset = active_offsets[class_code];
                                this.teacher_get_more_available_posts(class_code, offset);
                            }
                        }
                    }
                } else {
                    this.$store.commit('dialog/msg_dialog/update_dialog', { value: true, msg: 'Can\'t load more posts at this point!' });
                }
            }
        }
        //------------------------------------
    },
    //-----------------------------------------

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
</style>