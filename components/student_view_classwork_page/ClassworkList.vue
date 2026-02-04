<template>
    <div>
        <div id="jjs7hsx1">
            <div id="si8">
                <div id="s3kks9x">
                    <div id="sjs7x">
                        <svg focusable="false" width="24" height="24" fill="#ffffff" viewBox="0 0 24 24"><path d="M7 15h7v2H7zm0-4h10v2H7zm0-4h10v2H7z"></path><path d="M19 3h-4.18C14.4 1.84 13.3 1 12 1c-1.3 0-2.4.84-2.82 2H5c-.14 0-.27.01-.4.04a2.008 2.008 0 0 0-1.44 1.19c-.1.23-.16.49-.16.77v14c0 .27.06.54.16.78s.25.45.43.64c.27.27.62.47 1.01.55.13.02.26.03.4.03h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-7-.25c.41 0 .75.34.75.75s-.34.75-.75.75-.75-.34-.75-.75.34-.75.75-.75zM19 19H5V5h14v14z"></path></svg>
                    </div>
                </div>
            </div>

            <div id="oo9p7x">
                <div id="hhd_title">
                    {{ (typeof(classwork_details.classwork_title) !== null || typeof(classwork_details.classwork_title) !== undefined) ? `${classwork_details.classwork_title}` : '' }}
                </div>

                <div id="shy6ax">
                    <div id="sddx7">
                        <v-tooltip bottom>
                            <template v-slot:activator="{ on, attrs }">
                                <div id="teacher_name" v-bind="attrs" v-on="on">{{ (typeof(classwork_details.user_name) !== null || typeof(classwork_details.user_name) !== undefined) ? `${classwork_details.user_name}` : '' }}</div>
                            </template>
                            <span id="hhs79x" style="color: #fff !important;">{{ (typeof(classwork_details.user_name) !== null || typeof(classwork_details.user_name) !== undefined) ? `${classwork_details.user_name}` : '' }}</span>
                        </v-tooltip>
                        <div id="shhs6xza">•</div>
                        <v-tooltip bottom>
                            <template v-slot:activator="{ on, attrs }">
                                <div v-bind="attrs" v-on="on" id="classwork_date_created">{{ (typeof(classwork_details.date_created) !== null || typeof(classwork_details.date_created) !== undefined) ? `${classwork_details.date_created}` : '' }} <span style="font-weight: 600;">({{ (typeof(classwork_details.classwork_type) !== null || typeof(classwork_details.classwork_type) !== undefined) ? `${classwork_details.classwork_type.charAt(0).toUpperCase() + classwork_details.classwork_type.slice(1)}` : '' }})</span></div>
                            </template>
                            <span id="hhs79x" style="color: #fff !important;">{{ (typeof(classwork_details.date_created) !== null || typeof(classwork_details.date_created) !== undefined) ? `${classwork_details.date_created}` : '' }} ({{ (typeof(classwork_details.classwork_type) !== null || typeof(classwork_details.classwork_type) !== undefined) ? `${classwork_details.classwork_type.charAt(0).toUpperCase() + classwork_details.classwork_type.slice(1)}` : '' }})</span>
                        </v-tooltip>
                    </div>

                    <div id="classwork_desc_vx">
                        <div id="points_hhs6">
                            <v-tooltip bottom>
                                <template v-slot:activator="{ on, attrs }">
                                    <span v-bind="attrs" v-on="on" >{{ (typeof(classwork_details.classwork_points) !== null || typeof(classwork_details.classwork_points) !== undefined) ? `${classwork_details.classwork_points}` : '' }} points</span>
                                </template>
                                <span id="hhs79x" style="color: #fff !important;">{{ (typeof(classwork_details.classwork_points) !== null || typeof(classwork_details.classwork_points) !== undefined) ? `${classwork_details.classwork_points}` : '' }} points</span>
                            </v-tooltip>
                        </div>

                        <div id="due_date_time_hhs6">
                            <v-tooltip bottom>
                                <template v-slot:activator="{ on, attrs }">
                                    <span v-bind="attrs" v-on="on" >Due {{ (typeof(classwork_details.classwork_due_date_time) !== null || typeof(classwork_details.classwork_due_date_time) !== undefined) ? `${classwork_details.classwork_due_date_time}` : '' }}</span>
                                </template>
                                <span id="hhs79x" style="color: #fff !important;">Due {{ (typeof(classwork_details.classwork_due_date_time) !== null || typeof(classwork_details.classwork_due_date_time) !== undefined) ? `${classwork_details.classwork_due_date_time}` : '' }}</span>
                            </v-tooltip>
                        </div>
                    </div>

                    <div v-if="classwork_details.classwork_instruction !== null" id="classwork_desc_vx" style="margin-top: 20px;">
                        <div id="uus7x">
                            <v-tooltip bottom>
                                <template v-slot:activator="{ on, attrs }">
                                    <span v-bind="attrs" v-on="on" >{{ (typeof(classwork_details.classwork_instruction) !== null || typeof(classwork_details.classwork_instruction) !== undefined) ? `Instruction: ${classwork_details.classwork_instruction}` : '' }}</span>
                                </template>
                                <span id="hhs79x" style="color: #fff !important;">{{ (typeof(classwork_details.classwork_instruction) !== null || typeof(classwork_details.classwork_instruction) !== undefined) ? `Instruction: ${classwork_details.classwork_instruction}` : '' }}</span>
                            </v-tooltip>
                        </div>
                    </div>
                </div>

                <div id="jjmnzx43">
                    <div id="data_head_ppt">
                        <div id="jj_txt">
                            Your work
                        </div>

                        <div id="jjx_txt">
                            <v-tooltip v-if="classwork_details.your_response['classwork_response'] === true" bottom>
                                <template v-slot:activator="{ on, attrs }">          
                                    <span v-bind="attrs" v-on="on" id="result_padhn3">
                                        {{ (classwork_details.your_response['classwork_type'] === 'classwork' || classwork_details.your_response['classwork_type'] === 'assignment') ? `${classwork_details.your_response['score_value']}/${classwork_details.your_response['total_overall']}` : (classwork_details.your_response['classwork_type'] === 'attendance') ? `${classwork_details.your_response['score_value']}/${classwork_details.your_response['score_value']}` : '' }}
                                    </span>
                                </template>
                                <span id="hhs79x" style="color: #fff !important;">{{ (classwork_details.your_response['classwork_type'] === 'classwork' || classwork_details.your_response['classwork_type'] === 'assignment') ? `${classwork_details.your_response['score_value']}/${classwork_details.your_response['total_overall']}` : (classwork_details.your_response['classwork_type'] === 'attendance') ? `${classwork_details.your_response['score_value']}/${classwork_details.your_response['score_value']}` : '' }}</span>
                            </v-tooltip>
                            
                            <span id="missing_txt33" v-else-if="classwork_details.your_response['classwork_response'] === false">
                                Missing
                            </span>
                        </div>
                    </div>

                    <div id="jn0ppx">
                        <v-btn v-if="classwork_details.your_response['classwork_response'] === true" color="primary" :disabled="true" id="do_work_btn">
                            Work submitted
                        </v-btn>

                        <div v-else-if="classwork_details.your_response['classwork_response'] === false">
                            <v-btn v-if="do_activity_btn" @click="go_to_activity_forms(classwork_details.classwork_type)" color="primary" id="do_work_btn">
                                Do {{ classwork_details.classwork_type }}
                            </v-btn>

                            <v-btn v-else-if="do_activity_loading_btn" :loading="loading" :disabled="loading" loader='loading' color="secondary" id="do_work_btn">
                                Do {{ classwork_details.classwork_type }}
                            </v-btn>
                        </div>
                    </div>
                </div>

                <div id="jjmnzx43">
                    <div id="data_head_ppt2">
                        <div id="jj_txt2">
                            <svg focusable="false" width="24" height="24" viewBox="0 0 24 24" fill="rgba(0, 0, 0, 0.54)"><path d="M12 6c1.1 0 2 .9 2 2s-.9 2-2 2-2-.9-2-2 .9-2 2-2m0 9c2.7 0 5.8 1.29 6 2v1H6v-.99c.2-.72 3.3-2.01 6-2.01m0-11C9.79 4 8 5.79 8 8s1.79 4 4 4 4-1.79 4-4-1.79-4-4-4zm0 9c-2.67 0-8 1.34-8 4v3h16v-3c0-2.66-5.33-4-8-4z"></path></svg>
                        </div>

                        <div id="jjx_txt2">
                           Private comments
                        </div>
                    </div>

                    <div id="jn0ppx" style="text-align: left;">
                        <span v-ripple id="comment_lnk" @click="open_comment_dialog()">
                            Add comment to {{ classwork_details.user_name }}
                        </span>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
// Imported mixins
import check_if_classwork_is_valid from '../../mixins/student/view_classwork_page/check_if_classwork_valid/check_if_classwork_is_valid'
import check_if_classwork_is_valid_request from '../../mixins/student/view_classwork_page/check_if_classwork_valid/check_if_classwork_is_valid_request'
import check_if_classwork_is_valid_response from '../../mixins/student/view_classwork_page/check_if_classwork_valid/check_if_classwork_is_valid_response'
import student_view_classwork_route_leave from '../../mixins/student/view_classwork_page/clean_route_before_leaving/student_view_classwork_route_leave'
//-----------------------------

// Single file component imports
import NoClassworkSvg from '../../components/classwork_page_comp/NoClassworkSvg'
//------------------------------------------

export default {
    name: 'ClassworkList', // Component name

    // Registered components
    components: {
        NoClassworkSvg
    },
    //---------------------------

    // Registered mixins
    mixins: [
        check_if_classwork_is_valid,

        check_if_classwork_is_valid_request,

        check_if_classwork_is_valid_response,

        student_view_classwork_route_leave
    ],
    //---------------------------

    // Computed properties
    computed: {
        // Classwork details property from vuex
        classwork_details: function(){
            return this.$store.state.student_view_classwork_page.classwork_details_comp.classwork_details;
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
    //------------------------------------

    // Data function
    data(){
        return {
            do_activity_btn: true, // do_activity button visibility. Eg: True - Show do_activity button || False - Hide do_activity button

            do_activity_loading_btn: false, // Set the loading button to false to hide it and bring up the normal do_activity button instead

            loading: true, // Set the spiral loading animation to true to enable it

            controller_x: new AbortController()
        }
    },
    //------------------------------------

    // Watch property
    watch: {
        loader (){
            const l = this.loader
        }
    },
    //-----------------

    // Methods property
    methods: {
        // Open the comment dialog
        open_comment_dialog(){
            this.$store.commit('dialog/student_private_comment_dialog/update_dialog', { value: true });
        },
        //-----------------------------------------------

        // Take user to the activity forms page
        go_to_activity_forms(classwork_type){
            let class_code = this.$route.query.class_code;
            let classwork_id = this.$route.query.id;

            this.check_if_classwork_is_valid(classwork_type, class_code, classwork_id);
        }
        //-----------------------------------------------
    },
    //------------------------------------

    // The code here gets executed once the component is about to be removed from the DOM
    beforeDestroy(){
        this.controller.abort(); // Cancel pending fetch requests

        this.controller = new AbortController(); // Create new Abort Controller

        this.student_view_classwork_route_leave(); // Route leave method
    }
    //------------------------------------------------------------
}
</script>

<style scoped>
@import url('../../assets/class_classwork_page.css'); /* CSS stylesheet file for the view classwork page */
@import url('../../assets/view_classwork_page.css'); /* CSS stylesheet file for the view classwork page */
@import url('../../assets/class_stream_page.css'); /* CSS stylesheet file for the class stream page */
::v-deep .v-btn {
    text-transform: initial !important;
    font-size: 14px !important;
    opacity: unset;
}
</style>