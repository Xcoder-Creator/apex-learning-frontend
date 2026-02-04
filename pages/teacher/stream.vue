<template>
    <div class="app_component" v-if="page_view === true">
        <div class="app_data" v-if="isLoading === false">
            <div class="navbar">
                <AppBar />

                <NavDrawer />
            </div>

            <div class="main-body">
                <BannerCover />

                <ExpPanel />

                <v-container>
                    <v-row id="vertical_content">
                        <UpcomingBox />

                        <AnnouncementBox />
                    </v-row>
                </v-container>
            </div>

            <Snackbar />

            <ErrMsgDialog />

            <MsgDialog />

            <LogOutDialog />

            <AboutClassDialog />

            <BottomNav />

            <DeletePostDialog />

            <ViewPostDialog />

            <ViewFileDialog />

            <FileDetailsDialog />

            <CommentDialog />

            <ComingSoonDialog />

            <SendFeedbackDialog />

            <ReportDialog />

            <UpdateBackgroundImageDialog />

            <BgImagesListDialog />
        </div>

        <div class="app_data" v-else-if="isLoading === true">
            <PageLoader />

            <Snackbar />
        </div>
    </div>
</template>

<script>
// Single file component imports
import AppBar from '../../components/navigation/class_stream/AppBar'
import PageLoader from '../../components/page_loading_screen/PageLoader'
import Snackbar from '../../components/snackbar/Snackbar'
import ErrMsgDialog from '../../components/dialog/ErrMsgDialog'
import MsgDialog from '../../components/dialog/MsgDialog'
import NavDrawer from '../../components/navigation/NavDrawer'
import LogOutDialog from '../../components/dialog/LogOutDialog'
import BottomNav from '../../components/navigation/BottomNav'
import BannerCover from '../../components/stream_page_comp/BannerCover'
import AboutClassDialog from '../../components/stream_page_comp/AboutClassDialog'
import ExpPanel from '../../components/stream_page_comp/ExpPanel'
import UpcomingBox from '../../components/stream_page_comp/UpcomingBox'
import AnnouncementBox from '../../components/stream_page_comp/AnnouncementBox'
import DeletePostDialog from '../../components/dialog/DeletePostDialog'
import ViewPostDialog from '../../components/dialog/ViewPostDialog'
import ViewFileDialog from '../../components/stream_page_comp/ViewFileDialog'
import FileDetailsDialog from '../../components/dialog/FileDetailsDialog'
import CommentDialog from '../../components/dialog/CommentDialog'
import ComingSoonDialog from '../../components/dialog/ComingSoonDialog'
import SendFeedbackDialog from '../../components/dialog/SendFeedbackDialog'
import ReportDialog from '../../components/dialog/ReportDialog'
import UpdateBackgroundImageDialog from '../../components/dialog/UpdateBackgroundImageDialog'
import BgImagesListDialog from '../../components/dialog/BgImagesListDialog'
//-----------------------------------

import { AbortController } from "node-abort-controller"; // AbortController polyfill
import fetch from "node-fetch"; // Fetch API polyfill

// Imported mixins
import keep_user_logged_in from '../../mixins/login/keep_user_logged_in_operation/keep_user_logged_in'
import keep_user_logged_in_request from '../../mixins/login/keep_user_logged_in_operation/keep_user_logged_in_request'
import keep_user_logged_in_response from '../../mixins/login/keep_user_logged_in_operation/keep_user_logged_in_response'
import teacher_class_stream_page_mounted from '../../mixins/mounted/teacher_class_stream_page_mounted'
import teacher_fetch_class_list from '../../mixins/teacher/fetch_class_list_operation/teacher_fetch_class_list'
import teacher_fetch_class_list_fetch_request from '../../mixins/teacher/fetch_class_list_operation/teacher_fetch_class_list_fetch_request'
import teacher_fetch_class_list_response from '../../mixins/teacher/fetch_class_list_operation/teacher_fetch_class_list_response'
import general_route_leave from '../../mixins/general_route_leave'
import login_activity_operation from '../../mixins/login_activity/login_activity_operation'
import login_activity_operation_request from '../../mixins/login_activity/login_activity_operation_request'
import login_activity_operation_response from '../../mixins/login_activity/login_activity_operation_response'
import teacher_fetch_class_posts from '../../mixins/teacher/fetch_class_posts/teacher_fetch_class_posts'
import teacher_fetch_class_posts_request from '../../mixins/teacher/fetch_class_posts/teacher_fetch_class_posts_request'
import teacher_fetch_class_posts_response from '../../mixins/teacher/fetch_class_posts/teacher_fetch_class_posts_response'
import teacher_streams_route_leave from '../../mixins/teacher/teacher_streams_page/clean_route_before_leaving/teacher_streams_route_leave'
import check_if_text_editor_is_empty from '../../mixins/html_string_sanitize'
import stripAttributes from '../../mixins/html_string_sanitize'
import stripElem from '../../mixins/html_string_sanitize'
import usurp from '../../mixins/html_string_sanitize'
import sanitize from '../../mixins/html_string_sanitize'
import sanitizeString from '../../mixins/html_string_sanitize'
//-----------------------------------

export default {
    name: 'stream', // Route name

    // Registered components
    components: {
        AppBar,

        PageLoader,

        Snackbar,

        ErrMsgDialog,

        MsgDialog,

        NavDrawer,

        LogOutDialog,

        BottomNav,

        BannerCover,

        ExpPanel,

        AboutClassDialog,

        UpcomingBox,

        AnnouncementBox,

        DeletePostDialog,

        ViewPostDialog,

        ViewFileDialog,

        FileDetailsDialog,

        CommentDialog,

        ComingSoonDialog,

        SendFeedbackDialog,

        ReportDialog,

        UpdateBackgroundImageDialog,

        BgImagesListDialog
    },
    //---------------------------

    // Registered mixins
    mixins: [
        keep_user_logged_in_request,

        keep_user_logged_in,

        keep_user_logged_in_response,

        teacher_class_stream_page_mounted,

        teacher_fetch_class_list_fetch_request,

        teacher_fetch_class_list_response,

        teacher_fetch_class_list,

        general_route_leave,

        login_activity_operation,

        login_activity_operation_request,

        login_activity_operation_response,

        teacher_fetch_class_posts,

        teacher_fetch_class_posts_request,

        teacher_fetch_class_posts_response,

        teacher_streams_route_leave,

        check_if_text_editor_is_empty,

        stripAttributes,

        stripElem,

        usurp,

        sanitize,

        sanitizeString
    ],
    //-----------------------

    // Meta data information for the route
    head(){
        return {
            titleTemplate: '',

            title: `${this.$store.state.class_info.class_info.class_name} ${this.$store.state.class_info.class_info.class_section}`,

            meta: [
                { charset: 'utf-8' },
                { name: 'viewport', content: 'width=device-width, initial-scale=1' },
                { name: 'viewport', content: 'width=device-width, initial-scale=1, shrink-to-fit=no' },
                { name: 'keywords', content: 'Streams page, Teacher section' },
                { hid: 3, name: 'description', content: 'View all of the posts of your class' },
                { name: 'format-detection', content: 'telephone=no' }
            ],

            link: [
                { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
            ]
        }
    },
    //-----------------------------------

    // Reactive data properties
    data(){
        return {
            page_view: true, // Property to either eject or inject the contents of the class streams page into the virtual DOM

            controller_x: new AbortController() // Abort Controller
        }
    },
    //---------------------------

    // Computed properties
    computed: {
        // Vuex property to enable or disable the page loading screen component
        isLoading: {
            get(){
                return this.$store.state.page_loading.page_loading.is_loading;
            },

            set(value){
                this.$store.commit(this.$config.VUEX_PAGE_LOADING_UPDATE_DATA, { value: value });
            }
        },
        //----------------------------------------------

        // Class info property from vuex
        class_info: function(){
            return this.$store.state.class_info.class_info;
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
    //----------------------------------

    // All code in the mounted life cycle hook are executed
    // Any time the page is visited.
    mounted(){
        this.$nextTick(() => {
            this.$store.commit('nav_drawer_lists/reset_data');
            this.teacher_class_stream_page_mounted(); // Teacher class stream page mounted mixin method
        });
    },
    //-------------------------------------------

    // Life cycle hook called the moment the user leaves the route
    beforeRouteLeave(to, from, next){
        this.controller.abort(); // Abort all pending fetch api requests
        this.controller = new AbortController(); // Generate a new abort controller object
        setTimeout(() => {
            this.student_streams_route_leave(); // Route leave method
        }, 30);

        next();
    }
    //----------------------------------------------
}
</script>

<style scoped>
@import url('../../assets/class_stream_page.css'); /* CSS stylesheet file for the class stream page */
</style>