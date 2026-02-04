<template>
    <v-row justify="center">
        <v-dialog
            v-model="dialog"
            scrollable
            max-width="430px"
        >
            <v-card>
                <v-progress-linear
                    :active="loading_linear"
                    :indeterminate="loading_linear"
                    absolute
                    top
                    color="primary"
                    height="10px"
                >
                </v-progress-linear>

                <v-card-title style="font-size: 1.13rem;">What would you like to report?</v-card-title>

                <v-divider></v-divider>
                
                <v-card-text id="card_txt_body" style="height: 300px;">
                    <div id="report_btn_block">
                        <v-btn @click="($route.name === 'student-classes' || $route.name === 'teacher-classes') ? send_report('class', 1) : send_report('post', 1)" style="background: #fff;" id="report_btn" block>
                            Spam
                        </v-btn>
                    </div>

                    <div id="report_btn_block">
                        <v-btn @click="($route.name === 'student-classes' || $route.name === 'teacher-classes') ? send_report('class', 2) : send_report('post', 2)" style="background: #fff;" id="report_btn" block>
                            Sexually explicit
                        </v-btn>
                    </div>

                    <div id="report_btn_block">
                        <v-btn @click="($route.name === 'student-classes' || $route.name === 'teacher-classes') ? send_report('class', 3) : send_report('post', 3)" style="background: #fff;" id="report_btn" block>
                            Violent / dangerous
                        </v-btn>
                    </div>

                    <div id="report_btn_block">
                        <v-btn @click="($route.name === 'student-classes' || $route.name === 'teacher-classes') ? send_report('class', 4) : send_report('post', 4)" style="background: #fff;" id="report_btn" block>
                            Hate speech
                        </v-btn>
                    </div>

                    <div id="report_btn_block">
                        <v-btn @click="($route.name === 'student-classes' || $route.name === 'teacher-classes') ? send_report('class', 5) : send_report('post', 5)" style="background: #fff;" id="report_btn" block>
                            Copyright
                        </v-btn>
                    </div>
                </v-card-text>
                
                <v-divider></v-divider>
                
                <v-card-actions>
                    <v-btn
                        color="blue darken-1"
                        text
                        @click="close_dialog()"
                    >
                        Close
                    </v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
  </v-row>
</template>

<script>
// Imported mixins
import submit_a_report from '../../mixins/send_report/submit_a_report'
import submit_a_report_request from '../../mixins/send_report/submit_a_report_request'
import submit_a_report_response from '../../mixins/send_report/submit_a_report_response'
//---------------------------

import { AbortController } from "node-abort-controller"; // AbortController polyfill
import fetch from "node-fetch"; // Fetch API polyfill

export default {
    name: 'ReportDialog', // Component name

    // Registered mixins
    mixins: [
        submit_a_report,

        submit_a_report_request,

        submit_a_report_response
    ],
    //-------------------------------

    // Data property
    data(){
        return {
            loading_linear: false,
            can_send_report: true,
            controller_x: new AbortController(), // Abort Controller
        }
    },
    //-----------------------------

    // Computed properties
    computed: {
        // Vuex property to toggle the visibility of the report dialog
        dialog: {
            get(){
                if (this.$store.state.dialog.report_dialog.value === false){
                    this.can_send_report = true;
                    this.loading_linear = false;
                }

                return this.$store.state.dialog.report_dialog.value;
            },

            set(value){
                this.$store.commit('dialog/report_dialog/update_dialog', { value: value });
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
    //--------------------------

    // Methods property
    methods: {
        // Close dialog
        close_dialog(){
            this.dialog = false;
            this.can_send_report = true;
            this.loading_linear = false;
            this.controller.abort(); // Abort all pending fetch api requests
            this.controller = new AbortController(); // Generate a new abort controller object
        },
        //--------------------

        // Send report
        send_report(report_type, report_option){
            this.submit_a_report(report_type, report_option);
        }
        //--------------------
    },
    //------------------------

    // This life cycle hook is called when the user leaves the current route
    beforeDestroy(){
        this.controller.abort(); // Abort all pending fetch api requests
        this.controller = new AbortController(); // Generate a new abort controller object
    }
    //------------------------------------------------------
}
</script>

<style scoped>
@import url('../../assets/report_dialog.css'); /* CSS stylesheet file for the report dialog */
</style>