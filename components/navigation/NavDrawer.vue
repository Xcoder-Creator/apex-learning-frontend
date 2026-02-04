<template>
    <div>
        <v-navigation-drawer
            v-model="drawer"
            temporary
            fixed
            style="width: 300px;"
        >
            <template v-slot:prepend>
                <v-list-item two-line style="padding-bottom: 9px; padding-top: 9px;">
                    <v-list-item-avatar size="34">
                        <img style="object-fit: cover;" :src="`${$config.apiUrl}${profile_img}`">
                    </v-list-item-avatar>

                    <v-list-item-content>
                        <v-list-item-title>{{ name }}</v-list-item-title>

                        <v-list-item-subtitle>{{ email }}</v-list-item-subtitle>
                    </v-list-item-content>
                </v-list-item>
            </template>

            <v-divider></v-divider>

            <ListOne />

            <v-divider></v-divider>

            <p v-if="$route.name === 'student-classes'" id="plain_txt">Enrolled</p>
            <p v-if="$route.name === 'teacher-classes'" id="plain_txt">Teaching</p>

            <ListTwo />

            <ClassList v-if="class_list.length > 0" />

            <div id="qujhdj7s_x" v-else>
                <p id="q9oqqkz">No classes available!</p>
            </div>

            <v-divider></v-divider>

            <ListThree />
        </v-navigation-drawer>

        <div id="menu_sect" v-if="this.$route.name === 'student-stream' || this.$route.name === 'student-classwork' || this.$route.name === 'student-people' || this.$route.name === 'student-view_classwork'">
            <v-tabs v-model="active_tab" centered id="tabs_code">
                <v-tab>Stream</v-tab>
                <v-tab>Classwork</v-tab>
                <v-tab>People</v-tab>
            </v-tabs>
        </div>

        <div id="menu_sect" v-else-if="this.$route.name === 'teacher-stream' || this.$route.name === 'teacher-classwork' || this.$route.name === 'teacher-people' || this.$route.name === 'teacher-view_classwork'">
            <v-tabs v-model="teacher_active_tab" centered id="tabs_code">
                <v-tab>Stream</v-tab>
                <v-tab>Classwork</v-tab>
                <v-tab>People</v-tab>
            </v-tabs>
        </div>

        <v-progress-linear
            :active="loading_linear"
            :indeterminate="loading_linear"
            absolute
            bottom
            v-if="this.$route.name === 'student-stream' || this.$route.name === 'student-classwork' || this.$route.name === 'student-people' || $route.name === 'student-view_classwork'"
            color="primary"
            style="position: fixed; top: 100px; background: #fff; z-index: 2;"
            id="loading_linear"
        >
        </v-progress-linear>

        <v-progress-linear
            v-else-if="this.$route.name === 'teacher-stream' || this.$route.name === 'teacher-classwork' || this.$route.name === 'teacher-people' || this.$route.name === 'teacher-view_classwork'"
            :active="teacher_loading_linear"
            :indeterminate="teacher_loading_linear"
            absolute
            bottom
            color="primary"
            style="position: fixed; top: 100px; background: #fff; z-index: 2;"
            id="loading_linear"
        >
        </v-progress-linear>
    </div>
</template>

<script>
// Imported mixins
import general_route_leave from '../../mixins/general_route_leave'
import fetch_class_posts from '../../mixins/student/fetch_class_posts/fetch_class_posts'
import fetch_class_posts_request from '../../mixins/student/fetch_class_posts/fetch_class_posts_request'
import fetch_class_posts_response from '../../mixins/student/fetch_class_posts/fetch_class_posts_response'
import fetch_class_list from '../../mixins/student/fetch_class_list_operation/fetch_class_list'
import fetch_class_list_fetch_request from '../../mixins/student/fetch_class_list_operation/fetch_class_list_fetch_request'
import fetch_class_list_response from '../../mixins/student/fetch_class_list_operation/fetch_class_list_response'
import check_if_text_editor_is_empty from '../../mixins/html_string_sanitize'
import stripAttributes from '../../mixins/html_string_sanitize'
import stripElem from '../../mixins/html_string_sanitize'
import usurp from '../../mixins/html_string_sanitize'
import sanitize from '../../mixins/html_string_sanitize'
import sanitizeString from '../../mixins/html_string_sanitize'
//----------------------------

// Imported single file components
import ListOne from '../../components/navigation/navdrawer_lists/ListOne'
import ListTwo from '../../components/navigation/navdrawer_lists/ListTwo'
import ListThree from '../../components/navigation/navdrawer_lists/ListThree'
import ClassList from '../../components/navigation/navdrawer_lists/ClassList'
//----------------------------

export default {
    name: 'NavDrawer', // Component name

    components: { ListOne, ListTwo, ListThree, ClassList }, // Registered components

    // Registered mixins
    mixins: [
        general_route_leave,

        fetch_class_list,

        fetch_class_list_fetch_request,

        fetch_class_list_response,

        fetch_class_posts,

        fetch_class_posts_request,

        fetch_class_posts_response,

        check_if_text_editor_is_empty,

        stripAttributes,

        stripElem,

        usurp,

        sanitize,

        sanitizeString
    ],
    //-----------------------

    // Reactive data properties
    data(){
        return {
            controller_x: new AbortController() // Abort Controller
        }
    },
    //---------------------------

    // Computed property
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

        // Abort controller for canceling pending fetch api requests
        controller: {
            get(){
                return this.controller_x;
            },

            set(value){
                this.controller_x = value;
            }
        },
        //--------------------------------------------------------

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

        // Users class list from vuex
        class_list: function(){
            return this.$store.state.class_details.class_list
        }
        //----------------------------------
    },
    //----------------------------------

    // Life cycle hook called the moment the user leaves the route
    beforeRouteLeave(to, from, next){
        this.controller.abort(); // Abort all pending fetch api requests
        this.controller = new AbortController(); // Generate a new abort controller object

        next();
    }
    //----------------------------------------------
}
</script>

<style scoped>
@import url('../../assets/classes_home_page.css'); /* CSS stylesheet file for the classes home page */
@import url('../../assets/class_stream_page.css'); /* CSS stylesheet file for the class stream page */

::v-deep .v-avatar {
    display: flex;
    align-items: center;
}
</style>