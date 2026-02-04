// Imported mixins
import student_classes_home_route_leave from '../mixins/student/student_classes_home_page/clean_route_before_leaving/student_classes_home_route_leave'
import login_route_leave from '../mixins/login/clean_route_before_leaving/login_route_leave'
import signup_route_leave from '../mixins/signup/clean_route_before_leaving/signup_route_leave'
import student_streams_route_leave from '../mixins/student/student_streams_page/clean_route_before_leaving/student_streams_route_leave'
import student_people_route_leave from '../mixins/student/student_people_page/clean_route_before_leaving/student_people_route_leave'
import settings_route_leave from '../mixins/settings_page/clean_route_before_leaving/settings_route_leave'
import teacher_classes_home_route_leave from '../mixins/teacher/teacher_classes_home_page/clean_route_before_leaving/teacher_classes_home_route_leave'
import teacher_streams_route_leave from '../mixins/teacher/teacher_streams_page/clean_route_before_leaving/teacher_streams_route_leave'
import teacher_people_route_leave from '../mixins/teacher/teacher_people_page/clean_route_before_leaving/teacher_people_route_leave'
import archived_classes_route_leave from '../mixins/archived_classes_page/clean_route_before_leaving/archived_classes_route_leave'
import teacher_classwork_route_leave from '../mixins/teacher/teacher_classwork_page/clean_route_before_leaving/teacher_classwork_route_leave'
import student_classwork_route_leave from '../mixins/student/student_classwork_page/clean_route_before_leaving/student_classwork_route_leave'
import teacher_view_classwork_route_leave from '../mixins/teacher/view_classwork_page/clean_route_before_leaving/teacher_view_classwork_route_leave'
import student_view_classwork_route_leave from '../mixins/student/view_classwork_page/clean_route_before_leaving/student_view_classwork_route_leave'
import activity_forms_route_leave from '../mixins/student/activity_forms_page/clean_route_before_leaving/activity_forms_route_leave'
//-----------------------------

export default {
    // Registered mixins
    mixins: [
        student_classes_home_route_leave,

        login_route_leave,

        signup_route_leave,

        student_streams_route_leave,

        student_people_route_leave,

        settings_route_leave,

        teacher_classes_home_route_leave,

        teacher_streams_route_leave,

        teacher_people_route_leave,

        archived_classes_route_leave,

        teacher_classwork_route_leave,

        student_classwork_route_leave,

        teacher_view_classwork_route_leave,

        student_view_classwork_route_leave,

        activity_forms_route_leave
    ],
    //-------------------------

    // Methods property
    methods: {
        // Execute all route leave methods
        general_route_leave(){
            this.student_classes_home_route_leave(); // Student classes home page route leave
            this.login_route_leave(); // Login page route leave
            this.signup_route_leave(); // Sign up page route leave
            this.student_streams_route_leave(); // Student streams page route leave
            this.student_people_route_leave(); // Student people page route leave
            this.settings_route_leave(); // Settings page route leave
            this.teacher_classes_home_route_leave(); // Teacher classes home page route leave
            this.teacher_streams_route_leave(); // Teacher streams page route leave
            this.teacher_people_route_leave(); // Teacher people page route leave
            this.archived_classes_route_leave(); // Archived classes page route leave
            this.teacher_classwork_route_leave(); // Teacher classwork page route leave
            this.student_classwork_route_leave(); // Student classwork page route leave
            this.teacher_view_classwork_route_leave(); // Teacher view classwork page route leave
            this.student_view_classwork_route_leave(); // Student view classwork page route leave
            this.activity_forms_route_leave(); // Activity forms page route leave
            this.$store.commit('dialog/send_feedback_dialog/reset_data'); // Reset send feedback dialog
            this.$store.commit('dialog/report_dialog/reset_data'); // Reset report dialog
        }
        //-------------------------------------
    }
    //-------------------------
}