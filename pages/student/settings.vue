<template>
    <div class="app_component" v-if="page_view === true">
        <div class="app_data" v-if="isLoading === false">
            <div class="navbar">
                <AppBar />

                <NavDrawer />
            </div>

            <div id="main_body">
                <SettingsContainer v-if="is_logged_in === true" />
            </div>

            <Footer />

            <Snackbar />

            <ErrMsgDialog />

            <MsgDialog />

            <LogOutDialog />

            <UploadProfileImageDialog />

            <ChangeNameAndEmailDialog />

            <ChangePasswordDialog />

            <ComingSoonDialog />

            <SendFeedbackDialog />
        </div>

        <div class="app_data" v-else-if="isLoading === true">
            <PageLoader />

            <Snackbar />
        </div>
    </div>
</template>

<script>
// Single file component imports
import PageLoader from '../../components/page_loading_screen/PageLoader'
import Snackbar from '../../components/snackbar/Snackbar'
import ErrMsgDialog from '../../components/dialog/ErrMsgDialog'
import AppBar from '../../components/navigation/AppBar'
import NavDrawer from '../../components/navigation/NavDrawer'
import Footer from '../../components/page_footer/Footer'
import MsgDialog from '../../components/dialog/MsgDialog'
import LogOutDialog from '../../components/dialog/LogOutDialog'
import SettingsContainer from '../../components/SettingsContainer'
import UploadProfileImageDialog from '../../components/dialog/UploadProfileImageDialog'
import ChangeNameAndEmailDialog from '../../components/dialog/ChangeNameAndEmailDialog'
import ChangePasswordDialog from '../../components/dialog/ChangePasswordDialog'
import ComingSoonDialog from '../../components/dialog/ComingSoonDialog'
import SendFeedbackDialog from '../../components/dialog/SendFeedbackDialog'
//---------------------------------

import { AbortController } from "node-abort-controller"; // AbortController polyfill
import fetch from "node-fetch"; // Fetch API polyfill

// Imported mixins 
import keep_user_logged_in from '../../mixins/login/keep_user_logged_in_operation/keep_user_logged_in'
import keep_user_logged_in_request from '../../mixins/login/keep_user_logged_in_operation/keep_user_logged_in_request'
import keep_user_logged_in_response from '../../mixins/login/keep_user_logged_in_operation/keep_user_logged_in_response'
import fetch_class_list from '../../mixins/student/fetch_class_list_operation/fetch_class_list'
import fetch_class_list_fetch_request from '../../mixins/student/fetch_class_list_operation/fetch_class_list_fetch_request'
import fetch_class_list_response from '../../mixins/student/fetch_class_list_operation/fetch_class_list_response'
import login_activity_operation from '../../mixins/login_activity/login_activity_operation'
import login_activity_operation_request from '../../mixins/login_activity/login_activity_operation_request'
import login_activity_operation_response from '../../mixins/login_activity/login_activity_operation_response'
import settings_page_mounted from '../../mixins/mounted/settings_page_mounted'
import settings_route_leave from '../../mixins/settings_page/clean_route_before_leaving/settings_route_leave'
import general_route_leave from '../../mixins/general_route_leave'
//---------------------------------

export default {
    name: 'settings', // Route name

    // Registered mixins
    mixins: [
        keep_user_logged_in,

        keep_user_logged_in_request,

        keep_user_logged_in_response,

        fetch_class_list,

        fetch_class_list_fetch_request,

        fetch_class_list_response,

        login_activity_operation,

        login_activity_operation_request,

        login_activity_operation_response,

        settings_page_mounted,

        settings_route_leave,

        general_route_leave
    ],
    //---------------------------

    // Registered components
    components: {
        PageLoader,

        Snackbar,

        ErrMsgDialog,

        AppBar,

        NavDrawer,

        Footer,

        MsgDialog,

        LogOutDialog,

        SettingsContainer,

        UploadProfileImageDialog,

        ChangeNameAndEmailDialog,

        ChangePasswordDialog,

        ComingSoonDialog,

        SendFeedbackDialog
    },
    //---------------------------

    // Meta data information for the route
    head: {
        titleTemplate: '',

        title: 'Settings | Apex-Learning',

        meta: [
            { charset: 'utf-8' },
            { name: 'viewport', content: 'width=device-width, initial-scale=1' },
            { name: 'viewport', content: 'width=device-width, initial-scale=1, shrink-to-fit=no' },
            { name: 'keywords', content: 'Settings, Configuration, Student section' },
            { hid: 'description', name: 'description', content: 'Configure the way apex learning works for you' },
            { name: 'format-detection', content: 'telephone=no' }
        ],

        link: [
            { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
        ]
    },
    //-----------------------------------

    // Reactive data properties
    data(){
        return {
            page_view: true, // Property to either eject or inject the contents of the classes page into the virtual DOM

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

        // Is logged in property from vuex
        is_logged_in: function(){
            return this.$store.state.user_details.user_details.is_logged_in;
        },
        //----------------------------------------------

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
    //----------------------

    // All code in the mounted life cycle hook are executed
    // Any time the page is visited.
    mounted(){
        this.$nextTick(() => {
            this.$store.commit('nav_drawer_lists/update_lists', { list_item: 3, value: true });
            this.settings_page_mounted(); // Settings page mounted mixin method
        });
    },
    //-------------------------------------------

    // Life cycle hook called the moment the user leaves the route
    beforeRouteLeave(to, from, next){
        this.controller.abort(); // Abort all pending fetch api requests
        this.controller = new AbortController(); // Generate a new abort controller object

        setTimeout(() => {
            this.settings_route_leave(); // Route leave method
        }, 30);

        next();
    }
    //----------------------------------------------
}
</script>

<style scoped>
@import url('../../assets/settings_page.css'); /* CSS stylesheet file for the settings page */
@import url('../../assets/classes_home_page.css'); /* CSS stylesheet file for the student classes page */
</style>