<template>
    <v-row justify="center">
        <v-dialog
            v-model="delete_post_dialog"
            persistent
            max-width="290"
        >
            <v-card>
                <v-card-title class="text-h5">
                    <v-icon>
                        mdi-trash-can-outline
                    </v-icon>

                    <span id="cmr_txt">Delete this post?</span>
                </v-card-title>

                <v-card-text>Comments will also be deleted</v-card-text>

                <v-card-actions>
                    <v-spacer></v-spacer>

                    <v-btn
                        color="primary"
                        :loading="delete_post_loading"
                        class="ma-1"
                        text
                        @click="delete_post()"
                    >
                        Yes
                    </v-btn>

                    <v-btn
                        color="primary"
                        text
                        @click="close_dialog()"
                    >
                        No
                    </v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
    </v-row>
</template>

<script>
// Imported mixins
import delete_class_post_operation from '../../mixins/student/student_streams_page/delete_class_post/delete_class_post_operation'
import delete_class_post_request from '../../mixins/student/student_streams_page/delete_class_post/delete_class_post_request'
import delete_class_post_response from '../../mixins/student/student_streams_page/delete_class_post/delete_class_post_response'
import teacher_delete_class_post_operation from '../../mixins/teacher/teacher_streams_page/delete_class_post/teacher_delete_class_post_operation'
import teacher_delete_class_post_request from '../../mixins/teacher/teacher_streams_page/delete_class_post/teacher_delete_class_post_request'
import teacher_delete_class_post_response from '../../mixins/teacher/teacher_streams_page/delete_class_post/teacher_delete_class_post_response'
//-------------------------------------

export default {
    name: 'DeletePostDialog', // Component name

    // Registered mixins
    mixins: [
        delete_class_post_operation,

        delete_class_post_request,

        delete_class_post_response,

        teacher_delete_class_post_operation,

        teacher_delete_class_post_request,

        teacher_delete_class_post_response
    ],
    //---------------------------------

    // Computed property
    computed: {
        // Logout dialog vuex property
        delete_post_dialog: {
            get(){
                return this.$store.state.dialog.delete_post_dialog.value;
            },

            set(value){
                this.$store.commit('dialog/delete_post_dialog/update_dialog', { value: value });
            }
        },
        //------------------------------------

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
            delete_post_loading: false, // Logout loading property

            loader: 'loading', // Loader property

            loading: true, // Loading property

            controller_x: new AbortController() // Abort Controller
        }
    },
    //---------------------------

    // Watch property
    watch: {
      loader () {
        const l = this.loader
      },

      // Watch class code query parameter
      '$route.query.class_code'(){
          this.delete_post_dialog = false; // Close delete post dialog
          this.delete_post_loading = false; // Delete post loading property
          this.controller.abort(); // Cancel all pending requests
          this.controller = new AbortController(); // Generate a new abort controller object
      }
      //--------------------------------------
    },
    //----------------------------

    // Methods property
    methods: {
        // Delete a particular post from a class
        delete_post(){
            let post_id = this.$store.state.dialog.delete_post_dialog.post_id; // Post id
            let class_code = this.$route.query.class_code; // Class code
            let user_id = this.$store.state.user_details.user_details.details.user_id; // User id

            if (this.$route.name === 'student-stream'){
                this.$store.commit('student_streams_page/stream_comp/update_can_create_post', { value: false });
                this.delete_class_post_operation(post_id, class_code, user_id); // Delete class post mixin method
            } else if (this.$route.name === 'teacher-stream'){
                this.$store.commit('teacher_streams_page/stream_comp/update_can_create_post', { value: false });
                this.teacher_delete_class_post_operation(post_id, class_code, user_id); // Delete class post mixin method
            }
        },
        //----------------------------------

        // Close delete post dialog
        close_dialog(){
            this.delete_post_dialog = false;
        }
        //----------------------------------
    },
    //---------------------------

    // This life cycle hook is called when the user leaves the current route
    beforeDestroy(){
        this.controller.abort(); // Abort all pending fetch api requests
        this.controller = new AbortController(); // Generate a new abort controller object
    }
    //------------------------------------------------------
}
</script>

<style scoped>
    #cmr_txt {
        margin-left: 6px;
        font-size: 1.2rem;
        margin-top: 3px;
    }
</style>