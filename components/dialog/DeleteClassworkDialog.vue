<template>
    <v-row justify="center">
        <v-dialog
            v-model="delete_classwork_dialog"
            persistent
            max-width="290"
        >
            <v-card>
                <v-card-title class="text-h5">
                    <v-icon>
                        mdi-trash-can-outline
                    </v-icon>

                    <span id="cmr_txt">Delete this classwork?</span>
                </v-card-title>

                <v-card-text>This classwork will be deleted permanently</v-card-text>

                <v-card-actions>
                    <v-spacer></v-spacer>

                    <v-btn
                        color="primary"
                        :loading="delete_classwork_loading"
                        class="ma-1"
                        text
                        @click="delete_classwork()"
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
import delete_classwork_operation from '../../mixins/teacher/teacher_classwork_page/delete_classwork/delete_classwork_operation'
import delete_classwork_request from '../../mixins/teacher/teacher_classwork_page/delete_classwork/delete_classwork_request'
import delete_classwork_response from '../../mixins/teacher/teacher_classwork_page/delete_classwork/delete_classwork_response'
//-------------------------------------

export default {
    name: 'DeleteClassworkDialog', // Component name

    // Registered mixins
    mixins: [
        delete_classwork_operation,

        delete_classwork_request,

        delete_classwork_response
    ],
    //---------------------------------

    // Computed property
    computed: {
        // Logout dialog vuex property
        delete_classwork_dialog: {
            get(){
                return this.$store.state.dialog.delete_classwork_dialog.value;
            },

            set(value){
                this.$store.commit('dialog/delete_classwork_dialog/update_dialog', { value: value });
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
            delete_classwork_loading: false, // Delete classwork loading property

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
          this.delete_classwork_dialog = false; // Close delete classwork dialog
          this.delete_classwork_loading = false; // Delete classwork loading property
          this.controller.abort(); // Cancel all pending requests
          this.controller = new AbortController(); // Generate a new abort controller object
      }
      //--------------------------------------
    },
    //----------------------------

    // Methods property
    methods: {
        // Delete a particular classwork from a class
        delete_classwork(){
            let classwork_id = this.$store.state.dialog.delete_classwork_dialog.classwork_id; // Classwork id
            let class_code = this.$store.state.dialog.delete_classwork_dialog.class_code; // Class code

            if (this.$route.name === 'teacher-classwork'){
                this.delete_classwork_operation(classwork_id, class_code); // Delete classwork operation mixin method
            }
        },
        //----------------------------------

        // Close delete classwork dialog
        close_dialog(){
            this.$store.commit('dialog/delete_classwork_dialog/reset_data');
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