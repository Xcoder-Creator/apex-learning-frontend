<template>
    <v-row justify="center">
        <v-dialog
            v-model="about_class_dialog"
            fullscreen
            hide-overlay
            transition="dialog-bottom-transition"
        >
            <v-card>
                <v-toolbar
                    dark
                    color="primary"
                    style="border-top-left-radius: unset; border-top-right-radius: unset; border-bottom-left-radius: unset; border-bottom-right-radius: unset;"
                >
                    <v-btn
                        icon
                        dark
                        @click="close_about_class_dialog()"
                    >
                        <v-icon>mdi-close</v-icon>
                    </v-btn>

                    <v-toolbar-title>About class</v-toolbar-title>

                    <v-spacer></v-spacer>

                    <v-toolbar-items>
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
                                <v-list-item @click="open_send_feedback_dialog()" link>
                                    <v-list-item-title>Send feedback</v-list-item-title>
                                </v-list-item>
                            </v-list>
                        </v-menu>
                    </v-toolbar-items>
                </v-toolbar>

                <div id="main-content-dialog-body">
                    <h3 id="class_name_about">{{ class_info.class_name }}</h3>
                    <div id="sect_xz">
                        <span id="ollx">Section</span>
                        <p id="section_about">{{ class_info.class_section }}</p>
                    </div>
                    <div id="sect_xz">
                        <span id="ollx">Room</span>
                        <p id="section_about">{{ class_info.class_room }}</p>
                    </div>
                    <div id="sect_xz">
                        <span id="ollx">Subject</span>
                        <p id="section_about">{{ class_info.class_subject }}</p>
                    </div>
                </div>
            </v-card>
        </v-dialog>
    </v-row>
</template>

<script>
export default {
    name: 'AboutClassDialog', // Component name

    // Computed property
    computed: {
        // About class dialog property from vuex
        about_class_dialog: {
            get(){
                return this.$store.state.dialog.about_class_dialog.value;
            },

            set(value){
                this.$store.commit('dialog/about_class_dialog/update_data', { value: value });
            }
        },
        //--------------------------------------------------------

        // Class info property from vuex
        class_info: function(){
            return this.$store.state.class_info.class_info;
        }
        //--------------------------------------------------------
    },
    //-------------------------------------------------

    // Methods property
    methods: {
        // Close about class dialog
        close_about_class_dialog(){
            this.about_class_dialog = false;
        },
        //-------------------------------

        // Open the send feedback dialog
        open_send_feedback_dialog(){
            this.$store.commit('dialog/send_feedback_dialog/update_dialog', { value: true });
        },
        //--------------------------------
    }
    //-------------------------------------------------
}
</script>

<style scoped>
@import url('../../assets/class_stream_page.css'); /* CSS stylesheet file for the class stream page */
</style>