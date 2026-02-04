<template>
    <v-row justify="center">
        <v-dialog
            v-model="dialog"
            persistent
            max-width="290"
        >
            <v-card>
                <v-card-title v-if="error === true" class="text-h5">
                    <svg xmlns="http://www.w3.org/2000/svg" style="width: 30px; margin-right: 6px;" viewBox="0 0 24 24" role="img" aria-hidden="true"><path style="fill: #ff5252 !important;" d="M8.27,3L3,8.27V15.73L8.27,21H15.73C17.5,19.24 21,15.73 21,15.73V8.27L15.73,3M9.1,5H14.9L19,9.1V14.9L14.9,19H9.1L5,14.9V9.1M11,15H13V17H11V15M11,7H13V13H11V7"></path></svg>
                    Error
                </v-card-title>

                <v-card-title v-else-if="error === false" class="text-h5">
                    <svg xmlns="http://www.w3.org/2000/svg" style="width: 30px; margin-right: 6px;" viewBox="0 0 24 24" role="img" aria-hidden="true"><path style="fill: #4caf50 !important;" d="M12,2C17.52,2 22,6.48 22,12C22,17.52 17.52,22 12,22C6.48,22 2,17.52 2,12C2,6.48 6.48,2 12,2M11,16.5L18,9.5L16.59,8.09L11,13.67L7.91,10.59L6.5,12L11,16.5Z"></path></svg>
                    Message
                </v-card-title>

                <v-card-text id="card_txt_body">{{ msg }}</v-card-text>

                <v-card-actions>
                    <v-spacer></v-spacer>

                    <v-btn
                        color="#1976d2"
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
export default {
    name: 'ErrMsgDialog', // Component name

    // Reactive data properties
    data(){
        return {

        }
    },
    //--------------------------

    // Computed properties
    computed: {
        // Vuex property to toggle the visibility of the err msg dialog
        dialog: function(){
            return this.$store.state.dialog.err_msg_dialog.value;
        },
        //--------------------------------------------

        // Vuex property that holds the message passed from different routes or components
        msg: function(){
            return this.$store.state.dialog.err_msg_dialog.msg;
        },
        //-----------------------------------------------

        // Vuex property to toggle between an error or success message
        error: function(){
            return this.$store.state.dialog.err_msg_dialog.err;
        }
        //-------------------------------------------------
    },
    //--------------------------

    // Methods or functions
    methods: {
        // Close the err msg dialog from vuex
        close_dialog(){
            this.$store.commit(this.$config.VUEX_CLOSE_ERR_MSG_DIALOG);
        }
        //------------------------------------------
    }
    //------------------------
}
</script>