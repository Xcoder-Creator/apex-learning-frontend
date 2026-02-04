<template>
    <v-row justify="center">
        <v-dialog
            v-model="create_attendance_dialog"
            fullscreen
            hide-overlay
            transition="dialog-bottom-transition"
        >
            <v-card>
                <v-toolbar
                    dark
                    color="primary"
                    style="border-top-left-radius: unset; border-top-right-radius: unset;"
                >
                    <v-btn
                        icon
                        dark
                        @click="close_dialog()"
                    >
                        <v-icon>mdi-close</v-icon>
                    </v-btn>

                    <v-toolbar-title id="bby3">
                        <span id="gg6">
                            <svg focusable="false" width="24" height="24" fill="#ffffff" viewBox="0 0 24 24"><path d="M7 15h7v2H7zm0-4h10v2H7zm0-4h10v2H7z"></path><path d="M19 3h-4.18C14.4 1.84 13.3 1 12 1c-1.3 0-2.4.84-2.82 2H5c-.14 0-.27.01-.4.04a2.008 2.008 0 0 0-1.44 1.19c-.1.23-.16.49-.16.77v14c0 .27.06.54.16.78s.25.45.43.64c.27.27.62.47 1.01.55.13.02.26.03.4.03h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-7-.25c.41 0 .75.34.75.75s-.34.75-.75.75-.75-.34-.75-.75.34-.75.75-.75zM19 19H5V5h14v14z"></path></svg>
                        </span>
                        <span id="mmu">Attendance</span>
                    </v-toolbar-title>

                    <v-spacer></v-spacer>

                    <v-toolbar-items>
                        <v-btn
                            dark
                            text
                            @click="reset_dialog()"
                        >
                            Reset
                        </v-btn>
                    </v-toolbar-items>
                </v-toolbar>

                <div id="main-content-dialog-body">
                    <div class="kksuo8">
                        <div id="jjuzyx">
                            <div class="hhy_m8u">
                                <div id="dhh739omlk">
                                    <v-text-field
                                        label="Title"
                                        v-model="title"
                                        filled
                                    ></v-text-field>
                                </div>
                            </div>

                            <div id="df49km">
                                <v-btn v-if="assign_btn === true" @click="assign_classwork()" style="margin-top: 30px;" color="primary">
                                    <v-icon
                                        left
                                    >
                                        mdi-plus-box-outline
                                    </v-icon>
                                    Assign
                                </v-btn>

                                <v-btn
                                    v-else-if="assign_btn_load === true"
                                    :loading="loading"
                                    :disabled="loading"
                                    color="primary"
                                    style="margin-top: 30px;"
                                    loader = 'loading'
                                >
                                    <v-icon
                                        left
                                    >
                                        mdi-plus-box-outline
                                    </v-icon>
                                    Assign
                                </v-btn>
                            </div>
                        </div>

                        <div id="mmuya6">
                            <div class="jhg7yx">
                                <div id="jud7yhnnbx">
                                    <p id="g667az">Points</p>
                                    <div id="select_oopx">
                                        <v-select
                                            :items="items"
                                            label="Grade"
                                            v-model="points"
                                            outlined
                                        ></v-select>
                                    </div>
                                </div>

                                <div id="jud7yhnnbx">
                                    <p id="g667az">Due</p>
                                    <div id="select_oopx" style="cursor: pointer;">
                                        <v-text-field
                                            v-model="time"
                                            label="Time"
                                            @blur="leave_input()"
                                            outlined
                                            clearable
                                        ></v-text-field>

                                        <v-text-field
                                            v-model="date"
                                            label="Date"
                                            outlined
                                            clearable
                                            disabled
                                        ></v-text-field>

                                        <div><v-date-picker full-width v-if="calendar === true" v-model="picker"></v-date-picker></div>

                                        <v-btn @click="calendar_display()" style="margin-top: 30px;" color="primary">
                                            <v-icon
                                                left
                                            >
                                                mdi-calendar-outline
                                            </v-icon>
                                            Select date
                                        </v-btn>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </v-card>
        </v-dialog>
    </v-row>
</template>

<script>
import { AbortController } from "node-abort-controller"; // AbortController polyfill
import fetch from "node-fetch"; // Fetch API polyfill

// Imported mixins
import validate_classwork from '../../../mixins/teacher/teacher_classwork_page/validate_classwork'
import date_picker_utility from '../../../mixins/teacher/create_class_activity_utility'
import leave_input_utility from '../../../mixins/teacher/create_class_activity_utility'
import reset_dialog_utility from '../../../mixins/teacher/create_class_activity_utility'
import get_full_date from '../../../mixins/teacher/create_class_activity_utility'
import assign_classwork_operation from '../../../mixins/teacher/teacher_classwork_page/assign_classwork/assign_classwork_operation'
import assign_classwork_request from '../../../mixins/teacher/teacher_classwork_page/assign_classwork/assign_classwork_request'
import assign_classwork_response from '../../../mixins/teacher/teacher_classwork_page/assign_classwork/assign_classwork_response'
//------------------------------------------

export default {
    name: 'CreateAttendanceDialog', // Component name

    mixins: [ validate_classwork, date_picker_utility, leave_input_utility, reset_dialog_utility, get_full_date, assign_classwork_operation, assign_classwork_request, assign_classwork_response ],

    // Computed property
    computed: {
        // Join class dialog property from vuex
        create_attendance_dialog: {
            get(){
                if (this.$store.state.create_attendance_dialog.value === false){
                    this.reset_dialog_utility();

                    setTimeout(() => {
                        this.$store.commit(this.$config.VUEX_UPDATE_SNACKBAR, { value: false });
                    }, 20);
                }

                return this.$store.state.create_attendance_dialog.value;
            },

            set(value){
                this.$store.commit('create_attendance_dialog/update_dialog', { value: value });
            }
        },
        //--------------------------------------------

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
    //---------------------------

    // Data property
    data(){
        return {
            assign_btn: true, // Assign button value

            assign_btn_load: false, // Assign button load value

            title: '',

            items: [5, 10, 15, 20, 30, 100],

            points: null,

            time: '11:59 pm',

            started: false,

            can_reset: true,

            year: '',

            month: '',

            day: '',

            can_assign_work: true,

            date: '',

            picker: '',

            calendar: false,

            loader: 'loading', // Loader value

            loading: true, // Loading value

            controller_x: new AbortController() // Abort Controller
        }
    },
    //------------------------

    // Watch property
    watch: {
        loader () {
            const l = this.loader
        },

        picker:function(date){
            this.date_picker_utility(date); // Control date picker component
        }
    },
    //------------------------

    // Methods property
    methods: {
        // Close the create attendance dialog
        close_dialog(){
            this.$store.commit('create_attendance_dialog/update_dialog', { value: false });
            this.controller.abort(); // Abort all pending fetch api requests
            this.controller = new AbortController(); // Generate a new abort controller object
            this.reset_dialog_utility();

            setTimeout(() => {
                this.$store.commit(this.$config.VUEX_UPDATE_SNACKBAR, { value: false });
            }, 20);
        },
        //----------------------------------

        leave_input(){
            this.leave_input_utility();
        },

        reset_dialog(){
            this.reset_dialog_utility();
        },

        calendar_display(){
            if (this.calendar === true){
                this.calendar = false;
            } else if (this.calendar === false){
                this.calendar = true;
            }
        },

        assign_classwork(){
            if (this.can_assign_work === true){
                let full_date = `${this.month} ${this.day}, ${this.year}`;
                this.validate_classwork(this.title, null, this.points, this.date, this.time, full_date, null, 'attendance', { month: this.month, day: this.day, year: this.year });
            } else if (this.can_assign_work === false){
                this.$store.commit('dialog/msg_dialog/update_dialog', { value: true, msg: 'Can\'t assign work at this time!' }); // Display the msg dialog
            }
        }
    },
    //-------------------------

    mounted(){
        this.get_full_date();
    },

    // This life cycle hook is called when the user leaves the current route
    beforeDestroy(){
        this.controller.abort(); // Abort all pending fetch api requests
        this.controller = new AbortController(); // Generate a new abort controller object
    }
    //------------------------------------------------------
}
</script>

<style scoped>
@import url('../../../assets/classes_home_page.css'); /* CSS stylesheet file for the classes home page */
@import url('../../../assets/class_classwork_page.css'); /* CSS stylesheet file for the classwork page */

::v-deep .v-card {
    background: #f8f9fa;
}

::v-deep .v-input--dense {
    height: 40px;
}

#main-content-dialog-body {
    margin-top: 38px;
}
</style>