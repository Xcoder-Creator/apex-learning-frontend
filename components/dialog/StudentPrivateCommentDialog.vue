<template>
    <v-row justify="center">
        <v-dialog
            v-model="comment_dialog"
            scrollable
            :fullscreen="(window_width <= 415) ? true : false"
            max-width="500px"
        >
            <v-card>
                <v-card-title id="comment-head-comp">
                    Private comments

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
                            <v-list-item @click="send_feedback()" link>
                                <v-list-item-title>Send feedback</v-list-item-title>
                            </v-list-item>
                        </v-list>
                    </v-menu>
                </v-card-title>

                <v-divider></v-divider>

                <v-card-text style="height: 320px; padding-top: 25px;">
                    <v-progress-linear
                        :active="student_loading_linear"
                        :indeterminate="student_loading_linear"
                        absolute
                        top
                        color="primary"
                        height="10px"
                    >
                    </v-progress-linear>

                    <StudentPrivateCommentsContainer />
                </v-card-text>

                <v-divider></v-divider>

                <div id="comment_sect_xx">
                    <div id="ss30ppx">
                        <v-text-field
                            solo
                            id="comment_text_field"
                            v-model="comment_data"
                            label="Add private comment..."
                            append-icon="mdi-send"
                            @click:append="send_comment()"
                        ></v-text-field>
                    </div>
                </div>

                <v-divider></v-divider>

                <v-card-actions>
                    <v-btn
                        color="primary"
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
// Imported single file components
import StudentPrivateCommentsContainer from '../../components/StudentPrivateCommentsContainer'
//------------------------------------------

// Imported mixins
import send_comment_operation from '../../mixins/send_comment/student/send_comment_operation'
import send_comment_operation_request from '../../mixins/send_comment/student/send_comment_operation_request'
import send_comment_operation_response from '../../mixins/send_comment/student/send_comment_operation_response'
//------------------------------------------

export default {
    name: 'StudentPrivateCommentDialog', // Component name

    // Registered mixins
    mixins: [
        send_comment_operation,

        send_comment_operation_request,

        send_comment_operation_response
    ],
    //-------------------------------------

    // Registered components
    components: {
        StudentPrivateCommentsContainer
    },
    //---------------------------

    // Data property
    data(){
        return {
            window_width: '', // Window width property
            comment_data: '',
            can_comment: true,
            controller_x: new AbortController() // Abort Controller
        }
    },
    //------------------------------

    // Computed property
    computed: {
        // View post dialog property from vuex
        comment_dialog: {
            get(){
                if (this.$store.state.dialog.student_private_comment_dialog.value === true){
                    // Listen to changes in window screen width
                    window.onresize = () => {
                        this.window_width = window.innerWidth;
                    }
                    //------------------------------------

                    this.comment_data = '';
                    this.can_comment = true;
                } else if (this.$store.state.dialog.student_private_comment_dialog.value === false){
                    this.comment_data = '';
                    this.can_comment = true;
                    this.$store.commit('student_streams_page/comment_linear_loader/update_value', { value: false });
                    this.controller.abort(); // Abort all pending fetch api requests
                    this.controller = new AbortController(); // Generate a new abort controller object
                }

                return this.$store.state.dialog.student_private_comment_dialog.value;
            },

            set(value){
                this.$store.commit('dialog/student_private_comment_dialog/update_dialog', { value: value });
            }
        },
        //-------------------------------------------

        // classwork id property from vuex
        current_classwork_id: function(){
            return this.$store.state.dialog.student_private_comment_dialog.current_classwork_id;
        },
        //-------------------------------------------

        // teacher user id property from vuex
        teacher_user_id: function(){
            return this.$store.state.dialog.student_private_comment_dialog.teacher_user_id;
        },
        //-------------------------------------------

        student_loading_linear: function(){
            return this.$store.state.student_streams_page.comment_linear_loader.value;
        },

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
    //------------------------------

    // Watch property
    watch: {
      // Watch class code query parameter
      '$route.query.class_code'(){
          this.controller.abort(); // Cancel all pending requests
          this.controller = new AbortController(); // Generate a new abort controller object
      }
      //--------------------------------------
    },
    //----------------------------

    // Methods property
    methods: {
        // Close comment dialog
        close_dialog(){
            this.comment_dialog = false;
            this.comment_data = '';
            this.$store.commit('student_streams_page/comment_linear_loader/update_value', { value: false });
            this.controller.abort(); // Abort all pending fetch api requests
            this.controller = new AbortController(); // Generate a new abort controller object
        },
        //-------------------------------

        // Send comment
        send_comment(){
            let class_code = this.$route.query.class_code;
            this.send_comment_operation(this.comment_data, class_code, this.current_classwork_id, this.teacher_user_id); // Execute method
        },
        //-------------------------------

        // Send feedback
        send_feedback(){
            this.$store.commit('dialog/send_feedback_dialog/update_dialog', { value: true });
        }
        //-------------------------------
    },
    //------------------------------

    // Created lifecycle hook
    created(){
        this.window_width = window.innerWidth; // Current window screen width
    },
    //-----------------------------------

    // This life cycle hook is called when the user leaves the current route
    beforeDestroy(){
        this.controller.abort(); // Abort all pending fetch api requests
        this.controller = new AbortController(); // Generate a new abort controller object
    }
    //------------------------------------------------------
}
</script>

<style scoped>
@import url('../../assets/class_stream_page.css'); /* CSS stylesheet file for the class stream page */

::v-deep .v-label{
    font-size: 14px !important;
}

::v-deep #comment_text_field {
    font-size: 14px;
}
</style>