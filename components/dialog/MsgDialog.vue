<template>
    <v-row justify="center">
        <v-dialog
            v-model="dialog"
            persistent
            max-width="290"
        >
            <v-card>
                <v-card-title class="text-h6">
                    Message
                </v-card-title>

                <v-card-text id="card_txt_body">{{ msg }}</v-card-text>

                <v-card-actions>
                    <v-spacer></v-spacer>

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
export default {
    name: 'MsgDialog', // Component name

    // Computed properties
    computed: {
        // Vuex property to toggle the visibility of the msg dialog
        dialog: function(){
            return this.$store.state.dialog.msg_dialog.value;
        },
        //--------------------------------------------

        // Vuex property that holds the message passed from different routes or components
        msg: function(){
            return this.$store.state.dialog.msg_dialog.msg;
        },
        //-----------------------------------------------
    },
    //--------------------------

    // Methods or functions
    methods: {
        // Close msg dialog from vuex
        close_dialog(){
            this.$store.commit('dialog/msg_dialog/close_dialog');
        }
        //---------------------------------
    }
    //------------------------
}
</script>