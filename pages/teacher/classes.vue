<template>
    <div class="app_component" v-if="page_view === true">
        <div class="app_data" v-if="isLoading === false">
            <div class="navbar">
                <AppBar />

                <NavDrawer />
            </div>

            <div class="main-body" v-if="is_data_loaded === true">
                <v-container>
                    <v-row>
                        <v-col md="12">
                            <h3>All Classes ({{ no_of_classes }})</h3>
                        </v-col>
                    </v-row>
                </v-container>

                <v-container v-if="is_data_available === true">
                    <ClassListCard />
                </v-container>

                <v-container v-else-if="is_data_available === false">
                    <NoClassesError />
                </v-container>

                <v-container v-else>
                    <NetworkError />
                </v-container>
            </div>

            <div class="data-loading" v-else>
                <v-container>
                    <v-row>
                        <v-col v-for="i in 12" :key="i" id="content_pack" md="4">
                            <v-skeleton-loader
                                type="card"
                                id="skeleton-container"
                            >
                            </v-skeleton-loader>
                        </v-col>
                    </v-row>
                </v-container>
            </div>

            <Footer />

            <Snackbar />

            <ErrMsgDialog />

            <UnenrollFromClassDialog />

            <MsgDialog />

            <JoinClassFab />

            <JoinClassDialog />

            <LogOutDialog />

            <ComingSoonDialog />

            <SendFeedbackDialog />

            <ReportDialog />

            <CreateClassDialog />

            <ArchiveClassDialog />

            <EditClassDialog />
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
import ClassListCard from '../../components/ClassListCard'
import NoClassesError from '../../components/NoClassesError'
import NetworkError from '../../components/NetworkError'
import Footer from '../../components/page_footer/Footer'
import UnenrollFromClassDialog from '../../components/UnenrollFromClassDialog'
import MsgDialog from '../../components/dialog/MsgDialog'
import JoinClassFab from '../../components/JoinClassFab'
import JoinClassDialog from '../../components/JoinClassDialog'
import LogOutDialog from '../../components/dialog/LogOutDialog'
import ComingSoonDialog from '../../components/dialog/ComingSoonDialog'
import SendFeedbackDialog from '../../components/dialog/SendFeedbackDialog'
import ReportDialog from '../../components/dialog/ReportDialog'
import CreateClassDialog from '../../components/CreateClassDialog'
import ArchiveClassDialog from '../../components/ArchiveClassDialog'
import EditClassDialog from '../../components/EditClassDialog'
//---------------------------------

import { AbortController } from "node-abort-controller"; // AbortController polyfill
import fetch from "node-fetch"; // Fetch API polyfill

// Imported mixins
import keep_user_logged_in from '../../mixins/login/keep_user_logged_in_operation/keep_user_logged_in'
import keep_user_logged_in_request from '../../mixins/login/keep_user_logged_in_operation/keep_user_logged_in_request'
import keep_user_logged_in_response from '../../mixins/login/keep_user_logged_in_operation/keep_user_logged_in_response'
import teacher_fetch_class_list from '../../mixins/teacher/fetch_class_list_operation/teacher_fetch_class_list'
import teacher_fetch_class_list_fetch_request from '../../mixins/teacher/fetch_class_list_operation/teacher_fetch_class_list_fetch_request'
import teacher_fetch_class_list_response from '../../mixins/teacher/fetch_class_list_operation/teacher_fetch_class_list_response'
import teacher_classes_home_route_leave from '../../mixins/teacher/teacher_classes_home_page/clean_route_before_leaving/teacher_classes_home_route_leave'
import general_route_leave from '../../mixins/general_route_leave'
import teacher_classes_page_mounted from '../../mixins/mounted/teacher_classes_page_mounted'
import login_activity_operation from '../../mixins/login_activity/login_activity_operation'
import login_activity_operation_request from '../../mixins/login_activity/login_activity_operation_request'
import login_activity_operation_response from '../../mixins/login_activity/login_activity_operation_response'
import fetch_archived_classes from '../../mixins/archived_classes_page/fetch_archived_classes/fetch_archived_classes'
import fetch_archived_classes_request from '../../mixins/archived_classes_page/fetch_archived_classes/fetch_archived_classes_request'
import fetch_archived_classes_response from '../../mixins/archived_classes_page/fetch_archived_classes/fetch_archived_classes_response'
//-----------------------------

export default {
    name: 'classes', // Route name

    // Registered components
    components: {
        PageLoader,

        Snackbar,

        ErrMsgDialog,

        AppBar,

        NavDrawer,

        ClassListCard,

        NoClassesError,

        NetworkError,

        Footer,

        UnenrollFromClassDialog,

        MsgDialog,

        JoinClassFab,

        JoinClassDialog,

        LogOutDialog,

        ComingSoonDialog,

        SendFeedbackDialog,

        ReportDialog,

        CreateClassDialog,

        ArchiveClassDialog,

        EditClassDialog
    },
    //---------------------------

    // Registered mixins
    mixins: [
        keep_user_logged_in,

        keep_user_logged_in_request,

        keep_user_logged_in_response,

        teacher_fetch_class_list,

        teacher_fetch_class_list_fetch_request,

        teacher_fetch_class_list_response,

        teacher_classes_home_route_leave,

        general_route_leave,

        teacher_classes_page_mounted,

        login_activity_operation,

        login_activity_operation_request,

        login_activity_operation_response,

        fetch_archived_classes,

        fetch_archived_classes_request,

        fetch_archived_classes_response
    ],
    //-----------------------

    // Meta data information for the route
    head: {
        titleTemplate: '',

        title: 'Teacher Classes | Apex-Learning',

        meta: [
            { charset: 'utf-8' },
            { name: 'viewport', content: 'width=device-width, initial-scale=1' },
            { name: 'viewport', content: 'width=device-width, initial-scale=1, shrink-to-fit=no' },
            { name: 'keywords', content: 'Classes page, Teacher section , Teacher classes' },
            { hid: 'description', name: 'description', content: 'View all of the classes you teach and access them' },
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

        // Is data loaded property from vuex
        is_data_loaded: {
            get(){
                return this.$store.state.app_components.is_data_loaded;
            },

            set(value){
                this.$store.commit('app_components/update_is_data_loaded', { value: value });
            }
        },
        //----------------------------------------------

        // No of classes property from vuex
        no_of_classes: {
            get(){
                return this.$store.state.class_details.class_data.no_of_classes;
            },

            set(value){
                this.$store.commit('class_details/update_class_data', { value: value });
            }
        },
        //--------------------------------------

        // Is data available property from vuex
        is_data_available: {
            get(){
                return this.$store.state.app_components.is_data_available;
            },

            set(value){
                this.$store.commit('app_components/update_is_data_available', { value: value });
            }
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

    scrollToTop: true, // Move the view of the page to the top anytime the route is visited

    // All code in the mounted life cycle hook are executed
    // Any time the page is visited.
    mounted(){
        this.$nextTick(async () => {
            this.$store.commit('nav_drawer_lists/update_lists', { list_item: 1, value: true });
            this.teacher_classes_page_mounted(); // Student classes page mounted mixin method
        });
    },
    //-------------------------------------------

    // Life cycle hook called the moment the user leaves the route
    beforeRouteLeave(to, from, next){
        this.controller.abort(); // Abort all pending fetch api requests
        this.controller = new AbortController(); // Generate a new abort controller object

        setTimeout(() => {
            this.teacher_classes_home_route_leave(); // Route leave method
        }, 30);

        next();
    }
    //----------------------------------------------
}
</script>

<style scoped>
@import url('../../assets/classes_home_page.css'); /* CSS stylesheet file for the teacher classes page */
</style>