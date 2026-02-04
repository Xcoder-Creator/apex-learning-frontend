<template>
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

                <div id="classwork_desc_vx" style="margin-top: 23px;">
                    <v-tooltip bottom>
                        <template v-slot:activator="{ on, attrs }">
                            <span id="skmm8" v-bind="attrs" v-on="on" >{{ (students_available === true) ? `${classwork_details.total_no_of_students_that_have_submitted_work}` : 'No' }} student{{ (students_available === true && classwork_details.total_no_of_students_that_have_submitted_work > 1) ? 's' : '' }} have submitted {{ (students_available === true) ? `out of ${classwork_details.total_no_of_students}` : '' }}</span>
                        </template>
                        <span id="hhs79x" style="color: #fff !important;">{{ (students_available === true) ? `${classwork_details.total_no_of_students_that_have_submitted_work}` : 'No' }} student{{ (students_available === true && classwork_details.total_no_of_students_that_have_submitted_work > 1) ? 's' : '' }} have submitted {{ (students_available === true) ? `out of ${classwork_details.total_no_of_students}` : '' }}</span>
                    </v-tooltip>
                </div>

                <div id="student_list_xv" v-if="students_available === true">
                    <div id="student_comp_xvn" v-for="item in classwork_details_array" :key="item.user_id">
                        <div id="uu78c">
                            <div id="js7data2">
                                <v-tooltip bottom>
                                    <template v-slot:activator="{ on, attrs }">
                                        <img v-bind="attrs" v-on="on"  id="profile_img_student" :src="`${$config.apiUrl}${item.profile_img}`" alt="profile_img">
                                    </template>
                                    <span id="hhs79x" style="color: #fff !important;">{{ item.student_name }}</span>
                                </v-tooltip>
                                
                                <v-tooltip bottom>
                                    <template v-slot:activator="{ on, attrs }">
                                        <div
                                        v-bind="attrs"
                                        v-on="on" 
                                        id="hhs79x">{{ item.student_name }}</div>
                                    </template>
                                    <span id="hhs79x" style="color: #fff !important;">{{ item.student_name }}</span>
                                </v-tooltip>
                            </div>

                            <v-tooltip v-if="item.has_responded === true" bottom>
                                <template v-slot:activator="{ on, attrs }">
                                    <div v-bind="attrs" v-on="on" id="score_point">{{ item.work_details.score_value }}/{{ (item.work_details.classwork_type === 'classwork' || item.work_details.classwork_type === 'assignment') ? `${item.work_details.total_overall}` : (item.work_details.classwork_type === 'attendance') ? `${item.work_details.score_value}` : '' }}</div>
                                </template>
                                <span id="hhs79x" style="color: #fff !important;">{{ item.work_details.score_value }}/{{ (item.work_details.classwork_type === 'classwork' || item.work_details.classwork_type === 'assignment') ? `${item.work_details.total_overall}` : (item.work_details.classwork_type === 'attendance') ? `${item.work_details.score_value}` : '' }}</span>
                            </v-tooltip>

                            <v-tooltip v-else bottom>
                                <template v-slot:activator="{ on, attrs }">
                                    <div v-bind="attrs" v-on="on" id="missing_score">Missing</div>
                                </template>
                                <span id="hhs79x" style="color: #fff !important;">Missing</span>
                            </v-tooltip>
                        </div>

                        <div id="options-btn" style="padding-right: 20px;">
                            <v-menu
                                left
                                bottom
                            >
                                <template v-slot:activator="{ on, attrs }">
                                    <v-btn
                                        icon
                                        v-bind="attrs"
                                        v-on="on"
                                    >
                                        <v-icon>mdi-dots-vertical</v-icon>
                                    </v-btn>
                                </template>

                                <v-list>
                                    <v-list-item @click="open_comment_dialog(item)" link>
                                        <v-list-item-title>Comments</v-list-item-title>
                                    </v-list-item>
                                </v-list>
                            </v-menu>
                        </div>
                    </div>
                </div>

                <div v-else id="no_classwork_svg_space">
                    <NoClassworkSvg />
                    <p id="xccx_txt">No students available!</p>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
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

    // Computed properties
    computed: {
        // Students available property from vuex
        students_available: function(){
            return this.$store.state.teacher_view_classwork_page.classwork_details_comp.students_available;
        },
        //-----------------------------------------------

        // Classwork details array property from vuex
        classwork_details_array: function(){
            return this.$store.state.teacher_view_classwork_page.classwork_details_comp.classwork_details_array;
        },
        //-----------------------------------------------

        // Classwork details property from vuex
        classwork_details: function(){
            return this.$store.state.teacher_view_classwork_page.classwork_details_comp.classwork_details;
        }
        //-----------------------------------------------
    },
    //------------------------------------

    // Methods property
    methods: {
        // Open the comment dialog
        open_comment_dialog(item){
            this.$store.commit('dialog/private_comment_dialog/update_comment_data', { student_data: item });
            this.$store.commit('dialog/private_comment_dialog/update_dialog', { value: true });
        },
        //-----------------------------------------------
    }
    //------------------------------------
}
</script>

<style scoped>
@import url('../../assets/class_classwork_page.css'); /* CSS stylesheet file for the view classwork page */
@import url('../../assets/view_classwork_page.css'); /* CSS stylesheet file for the view classwork page */
@import url('../../assets/class_stream_page.css'); /* CSS stylesheet file for the class stream page */
</style>