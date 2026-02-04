<template>
    <div class="main_comp" v-if="page_view === true">
        <div id="app_comp" v-if="isLoading === false">
            <v-progress-linear
                v-if="is_loading === true || loading_linear === true"
                :active="loading_linear"
                :indeterminate="loading_linear"
                absolute
                bottom
                id="loading_linear_x"
                color="primary"
            >
            </v-progress-linear>

            <v-form
                v-if="is_loading === false"
                ref="form"
                v-model="valid"
                lazy-validation
                id="questions_box"
            >
                <div id="title_and_instruction_box">
                    <div id="title_xc">{{ classwork_title }}</div>
                    <div v-if="classwork_instruction !== null" id="instruction_xc">{{ classwork_instruction }}</div>
                </div>

                <div id="profile_desc">
                    <img id="profile_img_xc" :src="`${$config.apiUrl}${profile_img}`" alt="profile_img">

                    <v-tooltip bottom>
                        <template v-slot:activator="{ on, attrs }">
                            <div v-bind="attrs" v-on="on" id="email_xc">{{ email }} (your current account)</div>
                        </template>
                        <span id="hhs79x" style="color: #fff !important;">{{ email }} (your current account)</span>
                    </v-tooltip>
                </div>

                <div id="all_questions" v-if="classwork_type_value === 'classwork' || classwork_type_value === 'assignment'">
                    <div id="question_poll" v-for="(item, i) in questions" :key="i">
                        <div id="question_title">{{ item.question }}</div>

                        <div id="question_options">
                            <v-radio-group ref="radio_btn">
                                <v-radio
                                    :disabled="is_option_disabled"
                                    :value="option.opt"
                                    v-for="(option, k)  in item.options"
                                    @change="get_data_x(option.opt, i)"
                                    :key="k"
                                    id="option_tzx"
                                >
                                    <template v-slot:label>
                                        <div id="opt_ccv">{{ option.opt }}</div>
                                    </template>
                                </v-radio>
                            </v-radio-group>
                        </div>
                    </div>
                </div>

                <div id="all_questions" v-else-if="classwork_type_value === 'attendance'">
                    <div id="question_poll">
                        <div id="question_title">To capture your attendance, click the button below:</div>
                        <div id="question_options">
                            <v-btn id="attendance_btn" v-if="submit_work_attendance_btn" color="primary" @click="submit_work(classwork_type_value)">
                                Capture attendance
                            </v-btn>

                            <v-btn v-else-if="submit_work_attendance_loading_btn" :loading="loading" id="attendance_btn" :disabled="loading" loader='loading' color="primary">
                                Capture attendance
                            </v-btn>
                        </div>
                    </div>
                </div>

                <div v-if="classwork_type_value === 'classwork' || classwork_type_value === 'assignment'" id="submit_work_placeholder">
                    <v-btn color="primary" id="submit_work_btn" @click="open_submit_work_dialog()">
                        Submit
                    </v-btn>
                </div>
            </v-form>
            
            <div v-else-if="is_loading === true" id="questions_box">
                <LoadingComp />
            </div>

            <Footer id="footer_tab" />

            <ErrMsgDialog />

            <Snackbar />

            <v-row justify="center">
                <v-dialog
                    v-model="submit_work_dialog"
                    persistent
                    max-width="290"
                >
                    <v-card>
                        <v-card-title class="text-h5">
                            <span id="cmr_txt">Are you sure you want to submit?</span>
                        </v-card-title>

                        <v-card-text>This action cannot be reversed!</v-card-text>

                        <v-card-actions>
                            <v-spacer></v-spacer>

                            <v-btn class="ma-1" text v-if="submit_work_btn" color="primary" @click="submit_work(classwork_type_value)">
                                Yes
                            </v-btn>

                            <v-btn class="ma-1" text v-else-if="submit_work_loading_btn" :loading="loading" :disabled="loading" loader='loading' color="primary">
                                Yes
                            </v-btn>

                            <v-btn @click="close_dialog()" class="ma-1" text color="primary">
                                No
                            </v-btn>
                        </v-card-actions>
                    </v-card>
                </v-dialog>
            </v-row>

            <v-fab-transition>
                <v-btn
                    @click="go_to_view_classwork()"
                    color="primary" dark fixed bottom right fab
                >
                    <v-icon>mdi-arrow-left-bold</v-icon>
                </v-btn>
            </v-fab-transition>
        </div>

        <div class="app_data" v-else-if="isLoading === true">
            <PageLoader />

            <Snackbar />
        </div>
    </div>
</template>

<script>
// Imported mixins
import keep_user_logged_in from '../../mixins/login/keep_user_logged_in_operation/keep_user_logged_in'
import keep_user_logged_in_request from '../../mixins/login/keep_user_logged_in_operation/keep_user_logged_in_request'
import keep_user_logged_in_response from '../../mixins/login/keep_user_logged_in_operation/keep_user_logged_in_response'
import activity_forms_route_leave from '../../mixins/student/activity_forms_page/clean_route_before_leaving/activity_forms_route_leave'
import general_route_leave from '../../mixins/general_route_leave'
import activity_forms_page_mounted from '../../mixins/mounted/activity_forms_page_mounted'
import login_activity_operation from '../../mixins/login_activity/login_activity_operation'
import login_activity_operation_request from '../../mixins/login_activity/login_activity_operation_request'
import login_activity_operation_response from '../../mixins/login_activity/login_activity_operation_response'
import activity_forms_operation from '../../mixins/student/activity_forms_page/activity_forms_operation'
import activity_forms_operation_request from '../../mixins/student/activity_forms_page/activity_forms_request'
import activity_forms_operation_response from '../../mixins/student/activity_forms_page/activity_forms_response'
import submit_activity_work from '../../mixins/student/activity_forms_page/submit_activity_work'
import submit_activity_work_request from '../../mixins/student/activity_forms_page/submit_activity_work_request'
import submit_activity_work_response from '../../mixins/student/activity_forms_page/submit_activity_work_response'
//------------------------

import { AbortController } from "node-abort-controller"; // AbortController polyfill
import fetch from "node-fetch"; // Fetch API polyfill

// Imported single file components
import PageLoader from '../../components/page_loading_screen/PageLoader'
import ErrMsgDialog from '../../components/dialog/ErrMsgDialog'
import Snackbar from '../../components/snackbar/Snackbar'
import Footer from '../../components/page_footer/Footer'
import LoadingComp from '../../components/classwork_page_comp/LoadingComp'
//--------------------------------

export default {
    name: 'activity_forms', // Route name

    // Registered mixins
    mixins: [
        keep_user_logged_in,
        
        keep_user_logged_in_request,

        keep_user_logged_in_response,

        activity_forms_route_leave,

        general_route_leave,

        activity_forms_page_mounted,

        login_activity_operation,

        login_activity_operation_request,

        login_activity_operation_response,

        activity_forms_operation,

        activity_forms_operation_request,

        activity_forms_operation_response,

        submit_activity_work,

        submit_activity_work_request,

        submit_activity_work_response
    ],
    //----------------------------------------

    // Registered components
    components: {
        PageLoader,

        ErrMsgDialog,

        Snackbar,

        Footer,

        LoadingComp
    },
    //-----------------------------

    // Meta data information for the route
    head: {
        titleTemplate: '',

        title: 'Activity Forms | Apex-Learning',

        meta: [
            { charset: 'utf-8' },
            { name: 'viewport', content: 'width=device-width, initial-scale=1' },
            { name: 'viewport', content: 'width=device-width, initial-scale=1, shrink-to-fit=no' },
            { name: 'keywords', content: 'Activity Forms' },
            { name: 'description', content: 'Answer the following questions' },
            { name: 'format-detection', content: 'telephone=no' }
        ],

        link: [
            { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
        ]
    },
    //--------------------------------------

    // Watch property
    watch: {
      loader () {
        const l = this.loader
      },
    },
    //------------------------------------

    // Reactive data properties
    data(){
        return {
            valid: true,
            radioGroup: null,
            page_view: true, 
            controller_x: new AbortController(),
            is_option_disabled: false,
            loading_linear: true,
            is_loading: true,
            classwork_type: '',
            class_code: '',
            classwork_id: '',
            questions: [],
            email: '',
            profile_img: '',
            classwork_title: '',
            classwork_instruction: '',
            can_select_option: true,
            can_submit: true,
            submit_work_dialog: false,
            submit_work_btn: true, // submit_work button visibility. Eg: True - Show submit_work button || False - Hide submit_work button
            submit_work_loading_btn: false, // Set the loading button to false to hide it and bring up the normal submit_work button instead
            submit_work_attendance_btn: true, // submit_work_attendance button visibility. Eg: True - Show submit_work_attendance button || False - Hide submit_work_attendance button
            submit_work_attendance_loading_btn: false, // Set the loading button to false to hide it and bring up the normal submit_work_attendance button instead
            loading: true // Set the spiral loading animation to true to enable it
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

        // Classwork type value
        classwork_type_value: {
            get(){
                return this.classwork_type;
            },

            set(value){
                this.classwork_type = value;
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
    //--------------------------------

    // Methods or functions
    methods: {
        // Go to view classwork page
        go_to_view_classwork(){
            if (this.$route.query.class_code && this.$route.query.id){
                window.location.href = `/student/view_classwork?class_code=${this.class_code}&id=${this.classwork_id}`; // Redirect user to view classwork page
            } else {
                window.location.href = `${this.$config.student_classesUrl}`; // Redirect user to student classes home page
            }
        },
        //-------------------------------

        // Receive option from user 
        get_data_x(option, index){
            if (this.is_option_disabled === false && this.can_select_option === true){
                this.questions[index].answer = option;
            }
        },
        //-------------------------------

        // Open submit work dialog
        open_submit_work_dialog(){
            this.submit_work_dialog = true;
        },
        //-------------------------------

        // Close dialaog
        close_dialog(){
            this.submit_work_dialog = false;
        },
        //-------------------------------

        // Submit classwork
        submit_work(classwork_type_value){
            this.submit_activity_work(this.class_code, this.classwork_id, this.questions, classwork_type_value);
        }
        //-------------------------------
    },

    scrollToTop: true, // Move the view of the page to the top anytime the route is visited

    // All code in the mounted life cycle hook are executed
    // Any time the page is visited.
    mounted(){
        this.$nextTick(async () => {
            this.controller.abort(); // Abort all pending fetch api requests
            this.controller = new AbortController(); // Generate a new abort controller object
            this.activity_forms_page_mounted(); // Activity forms page mounted mixin method
        });
    },
    //----------------------------------------------

    // Code to be executed the moment the user tries to leave the route
    beforeRouteLeave(to, from, next){
        setTimeout(() => {
            this.activity_forms_route_leave(); // Route leave method
        }, 30);

        next();
    }
    //-----------------------------------------------
}
</script>

<style scoped>
@import url('../../assets/activity_forms_page.css'); /* CSS stylesheet file for the activity forms page */
</style>