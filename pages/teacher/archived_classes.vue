<template>
    <div class="app_component" v-if="page_view === true">
        <div class="app_data" v-if="isLoading === false">
            <div class="navbar">
                <AppBar />

                <NavDrawer />
            </div>

            <div class="main-body" v-if="is_data_loaded === true">
                <v-container style="padding-top: 20px;" v-if="is_data_available === true">
                    <v-row>
                        <v-col v-for="item in archived_classes" :key="item.id" md="4">
                            <v-card
                                class="mx-auto"
                                max-width="344"
                                id="card_background"
                            >
                                <v-card-text id="class_card_background" :style="(item.class_background_img === 'none') ? '' : 'background-image: url(' + item.class_background_img + '); background-origin: border-box; background-position: center; background-repeat: no-repeat; background-size: cover;'">
                                    <v-list-item style="padding: 0px;" class="grow">
                                        <v-list-item-content>
                                            <v-list-item-title id="white_txt">{{ item.class_name }}</v-list-item-title>

                                            <v-list-item-subtitle id="white_txt">{{ item.class_section }}</v-list-item-subtitle>

                                            <v-list-item-subtitle style="color: #fff;" id="p_t_10">{{ item.teacher_name }}</v-list-item-subtitle>
                                        </v-list-item-content>

                                        <v-row
                                            align="center"
                                            justify="end"
                                            v-if="$route.name === 'teacher-archived_classes'"
                                        >
                                            <div id="class_menu_btn">
                                                <v-menu
                                                    left
                                                    bottom
                                                >
                                                    <template v-slot:activator="{ on, attrs }">
                                                        <v-btn
                                                            icon
                                                            color="#fff"
                                                            v-bind="attrs"
                                                            v-on="on"
                                                        >
                                                            <v-icon>mdi-dots-vertical</v-icon>
                                                        </v-btn>
                                                    </template>

                                                    <v-list>
                                                        <v-list-item @click="restore_class_method(item.class_code)" link>
                                                            <v-list-item-title>Restore</v-list-item-title>
                                                        </v-list-item>

                                                        <v-list-item @click="delete_class_method(item.class_code)" link>
                                                            <v-list-item-title>Delete</v-list-item-title>
                                                        </v-list-item>
                                                    </v-list>
                                                </v-menu>
                                            </div>
                                        </v-row>
                                    </v-list-item>
                                </v-card-text>

                                <v-card-actions style="display: contents;">
                                    <v-list dense nav>
                                        <v-list-item
                                            link
                                            @click="open_class_folder()"
                                        >
                                            <v-list-item-icon>
                                                <v-icon>mdi-folder-outline</v-icon>
                                            </v-list-item-icon>

                                            <v-list-item-content>
                                                <v-list-item-title>Open class folder</v-list-item-title>
                                            </v-list-item-content>
                                        </v-list-item>
                                    </v-list>
                                </v-card-actions>
                            </v-card>
                        </v-col>
                    </v-row>
                </v-container>

                <v-container v-else-if="is_data_available === false">
                    <NoClassesError />
                </v-container>
            </div>

            <div class="data-loading" v-else>
                <v-container>
                    <v-row>
                        <v-col v-for="i in 10" :key="i" id="content_pack" md="4">
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

            <MsgDialog />

            <LogOutDialog />

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
import NoClassesError from '../../components/NoClassesError'
import ErrMsgDialog from '../../components/dialog/ErrMsgDialog'
import AppBar from '../../components/navigation/AppBar'
import NavDrawer from '../../components/navigation/NavDrawer'
import Footer from '../../components/page_footer/Footer'
import MsgDialog from '../../components/dialog/MsgDialog'
import LogOutDialog from '../../components/dialog/LogOutDialog'
import ComingSoonDialog from '../../components/dialog/ComingSoonDialog'
import SendFeedbackDialog from '../../components/dialog/SendFeedbackDialog'
//---------------------------------

import { AbortController } from "node-abort-controller"; // AbortController polyfill
import fetch from "node-fetch"; // Fetch API polyfill

// Imported mixins
import keep_user_logged_in from '../../mixins/login/keep_user_logged_in_operation/keep_user_logged_in'
import keep_user_logged_in_request from '../../mixins/login/keep_user_logged_in_operation/keep_user_logged_in_request'
import keep_user_logged_in_response from '../../mixins/login/keep_user_logged_in_operation/keep_user_logged_in_response'
import teacher_restore_class from '../../mixins/teacher/teacher_restore_class/teacher_restore_class'
import teacher_restore_class_request from '../../mixins/teacher/teacher_restore_class/teacher_restore_class_request'
import teacher_restore_class_response from '../../mixins/teacher/teacher_restore_class/teacher_restore_class_response'
import teacher_delete_class from '../../mixins/teacher/teacher_delete_class/teacher_delete_class'
import teacher_delete_class_request from '../../mixins/teacher/teacher_delete_class/teacher_delete_class_request'
import teacher_delete_class_response from '../../mixins/teacher/teacher_delete_class/teacher_delete_class_response'
import teacher_fetch_class_list from '../../mixins/teacher/fetch_class_list_operation/teacher_fetch_class_list'
import teacher_fetch_class_list_fetch_request from '../../mixins/teacher/fetch_class_list_operation/teacher_fetch_class_list_fetch_request'
import teacher_fetch_class_list_response from '../../mixins/teacher/fetch_class_list_operation/teacher_fetch_class_list_response'
import general_route_leave from '../../mixins/general_route_leave'
import archived_classes_page_mounted from '../../mixins/mounted/archived_classes_page_mounted'
import login_activity_operation from '../../mixins/login_activity/login_activity_operation'
import login_activity_operation_request from '../../mixins/login_activity/login_activity_operation_request'
import login_activity_operation_response from '../../mixins/login_activity/login_activity_operation_response'
import archived_classes_route_leave from '../../mixins/archived_classes_page/clean_route_before_leaving/archived_classes_route_leave'
import fetch_archived_classes from '../../mixins/archived_classes_page/fetch_archived_classes/fetch_archived_classes'
import fetch_archived_classes_request from '../../mixins/archived_classes_page/fetch_archived_classes/fetch_archived_classes_request'
import fetch_archived_classes_response from '../../mixins/archived_classes_page/fetch_archived_classes/fetch_archived_classes_response'
//-----------------------------

export default {
    name: 'archived_classes', // Route name

    // Registered components
    components: {
        PageLoader,

        Snackbar,

        NoClassesError,

        ErrMsgDialog,

        AppBar,

        NavDrawer,

        Footer,

        MsgDialog,

        LogOutDialog,

        ComingSoonDialog,

        SendFeedbackDialog
    },
    //---------------------------

    // Registered mixins
    mixins: [
        keep_user_logged_in,

        keep_user_logged_in_request,

        keep_user_logged_in_response,

        teacher_restore_class,

        teacher_restore_class_request,

        teacher_restore_class_response,

        teacher_delete_class,

        teacher_delete_class_request,

        teacher_delete_class_response,

        teacher_fetch_class_list,

        teacher_fetch_class_list_fetch_request,

        teacher_fetch_class_list_response,

        general_route_leave,

        archived_classes_page_mounted,

        login_activity_operation,

        login_activity_operation_request,

        login_activity_operation_response,

        archived_classes_route_leave,

        fetch_archived_classes,

        fetch_archived_classes_request,

        fetch_archived_classes_response
    ],
    //-----------------------

    // Meta data information for the route
    head: {
        titleTemplate: '',

        title: 'Archived Classes | Apex-Learning',

        meta: [
            { charset: 'utf-8' },
            { name: 'viewport', content: 'width=device-width, initial-scale=1' },
            { name: 'viewport', content: 'width=device-width, initial-scale=1, shrink-to-fit=no' },
            { name: 'keywords', content: 'Archived classes, Archived' },
            { hid: 'description', name: 'description', content: 'View all archived classes' },
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

        // Is data loaded property from vuex
        is_data_loaded: function(){
            return this.$store.state.archived_classes_page.page_comp.is_data_loaded;
        },
        //----------------------------------------------

        // Is data available property from vuex
        is_data_available: function(){
            return this.$store.state.archived_classes_page.page_comp.is_data_available;
        },
        //----------------------------------------------

        // Archived classes property from vuex
        archived_classes: function(){
            return this.$store.state.archived_classes_page.page_comp.archived_classes;
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

    // Mathods property
    methods: {
        // Open class folder
        open_class_folder(){   
            this.$store.commit('dialog/coming_soon_dialog/update_data', { value: true });
        },
        //------------------------------------------

        // Delete class
        delete_class_method(class_code){
            this.teacher_delete_class(class_code);
        },
        //------------------------------------------

        // Restore archived class
        restore_class_method(class_code){
            this.teacher_restore_class(class_code);
        }
        //------------------------------------------
    },
    //--------------------------------------

    // All code in the mounted life cycle hook are executed
    // Any time the page is visited.
    mounted(){
        this.$nextTick(() => {
            this.$store.commit('nav_drawer_lists/update_lists', { list_item: 3, value: true });
            this.archived_classes_page_mounted(); // Archived classes page mounted mixin method
        });
    },
    //-------------------------------------------

    // Life cycle hook called the moment the user leaves the route
    beforeRouteLeave(to, from, next){
        this.controller.abort(); // Abort all pending fetch api requests
        this.controller = new AbortController(); // Generate a new abort controller object

        setTimeout(() => {
            this.archived_classes_route_leave(); // Route leave method
        }, 30);

        next();
    }
    //----------------------------------------------
}
</script>

<style scoped>
@import url('../../assets/archived_classes_page.css'); /* CSS stylesheet file for the archived classes page */
@import url('../../assets/classes_home_page.css'); /* CSS stylesheet file for the student classes page */
</style>