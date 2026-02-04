<template>
    <div class="app_component" v-if="page_view === true">
        <div class="app_data" v-if="isLoading === false">
            <div class="navbar">
                <AppBar />

                <NavDrawer />
            </div>

            <div class="main-body">
                <div id="center_box">
                    <ClassworkList v-if="classwork_details_fetched === true" />

                    <div v-else id="yhs6axz">
                        <LoadingComp />
                    </div>
                </div>
            </div>

            <Snackbar />

            <ErrMsgDialog />

            <MsgDialog />

            <LogOutDialog />

            <BottomNav />

            <AboutClassDialog />

            <ComingSoonDialog />

            <SendFeedbackDialog />

            <PrivateCommentDialog />
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
import AboutClassDialog from '../../components/stream_page_comp/AboutClassDialog'
import ComingSoonDialog from '../../components/dialog/ComingSoonDialog'
import SendFeedbackDialog from '../../components/dialog/SendFeedbackDialog'
import NoClassworkSvg from '../../components/classwork_page_comp/NoClassworkSvg'
import LoadingComp from '../../components/classwork_page_comp/LoadingComp'
import ClassworkList from '../../components/teacher_view_classwork_page/ClassworkList'
import PrivateCommentDialog from '../../components/dialog/PrivateCommentDialog'
import BottomNav from '../../components/navigation/BottomNav'
//-----------------------------------

import { AbortController } from "node-abort-controller"; // AbortController polyfill
import fetch from "node-fetch"; // Fetch API polyfill

// Imported mixins
import keep_user_logged_in from '../../mixins/login/keep_user_logged_in_operation/keep_user_logged_in'
import keep_user_logged_in_request from '../../mixins/login/keep_user_logged_in_operation/keep_user_logged_in_request'
import keep_user_logged_in_response from '../../mixins/login/keep_user_logged_in_operation/keep_user_logged_in_response'
import teacher_fetch_class_list from '../../mixins/teacher/fetch_class_list_operation/teacher_fetch_class_list'
import teacher_fetch_class_list_fetch_request from '../../mixins/teacher/fetch_class_list_operation/teacher_fetch_class_list_fetch_request'
import teacher_fetch_class_list_response from '../../mixins/teacher/fetch_class_list_operation/teacher_fetch_class_list_response'
import general_route_leave from '../../mixins/general_route_leave'
import login_activity_operation from '../../mixins/login_activity/login_activity_operation'
import login_activity_operation_request from '../../mixins/login_activity/login_activity_operation_request'
import login_activity_operation_response from '../../mixins/login_activity/login_activity_operation_response'
import teacher_view_classwork_page_mounted from '../../mixins/mounted/teacher_view_classwork_page_mounted'
import teacher_fetch_classwork_details from '../../mixins/teacher/view_classwork_page/teacher_fetch_classwork_details'
import teacher_fetch_classwork_details_request from '../../mixins/teacher/view_classwork_page/teacher_fetch_classwork_details_request'
import teacher_fetch_classwork_details_response from '../../mixins/teacher/view_classwork_page/teacher_fetch_classwork_details_response'
import teacher_view_classwork_route_leave from '../../mixins/teacher/view_classwork_page/clean_route_before_leaving/teacher_view_classwork_route_leave'
//-----------------------------------

export default {
    name: 'view_classwork', // Route name

    // Registered components
    components: {
        AppBar,

        PageLoader,

        Snackbar,

        ErrMsgDialog,

        MsgDialog,

        NavDrawer,

        LogOutDialog,

        AboutClassDialog,

        ComingSoonDialog,

        SendFeedbackDialog,

        NoClassworkSvg,

        LoadingComp,

        ClassworkList,

        PrivateCommentDialog,

        BottomNav
    },
    //---------------------------

    // Registered mixins
    mixins: [
        keep_user_logged_in_request,

        keep_user_logged_in,

        keep_user_logged_in_response,

        teacher_fetch_class_list,

        teacher_fetch_class_list_fetch_request,

        teacher_fetch_class_list_response,

        general_route_leave,

        login_activity_operation,

        login_activity_operation_request,

        login_activity_operation_response,

        teacher_view_classwork_page_mounted,

        teacher_fetch_classwork_details,

        teacher_fetch_classwork_details_request,

        teacher_fetch_classwork_details_response,

        teacher_view_classwork_route_leave
    ],
    //-----------------------

    // Meta data information for the route
    head(){
        return {
            titleTemplate: '',

            title: `Classwork Title`,

            meta: [
                { charset: 'utf-8' },
                { name: 'viewport', content: 'width=device-width, initial-scale=1' },
                { name: 'viewport', content: 'width=device-width, initial-scale=1, shrink-to-fit=no' },
                { name: 'keywords', content: 'View classwork, Teacher section' },
                { name: 'description', content: 'View a particular classwork in your class' },
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

        // Classwork details fetched property from vuex
        classwork_details_fetched: function(){
            return this.$store.state.teacher_view_classwork_page.classwork_details_comp.classwork_details_fetched;
        },
        //-----------------------------------------------

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
            this.teacher_view_classwork_page_mounted(); // Teacher view classwork page mounted mixin method
        });
    },
    //-------------------------------------------

    // Life cycle hook called the moment the user leaves the route
    beforeRouteLeave(to, from, next){
        this.controller.abort(); // Abort all pending fetch api requests
        this.controller = new AbortController(); // Generate a new abort controller object

        setTimeout(() => {
            this.teacher_view_classwork_route_leave(); // Route leave method
        }, 30);

        next();
    }
    //----------------------------------------------
}
</script>

<style scoped>
@import url('../../assets/class_classwork_page.css'); /* CSS stylesheet file for the view classwork page */
@import url('../../assets/view_classwork_page.css'); /* CSS stylesheet file for the view classwork page */
@import url('../../assets/class_stream_page.css'); /* CSS stylesheet file for the class stream page */
</style>