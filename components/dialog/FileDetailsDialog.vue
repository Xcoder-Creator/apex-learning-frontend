<template>
    <v-row justify="center">
        <v-dialog
            v-model="view_file_details_dialog"
            scrollable
            :fullscreen="(window_width <= 415) ? true : false"
            max-width="500px"
        >
            <v-card>
                <v-card-title id="comment-head-comp">
                    Details
                </v-card-title>

                <v-divider></v-divider>

                <v-card-text style="height: 320px;">
                    <table style="width: 100%; border-collapse: separate; border-spacing: 0 15px; margin-top: 10px;">
                        <tr>
                            <td style="color: rgba(0, 0, 0, 0.87); width: 90px; font-weight: 600;">Name:</td>
                            <td style="padding-left: 15px;"><div id="cell_data">{{ file_details.file_name }}</div></td>
                        </tr>

                        <tr>
                            <td style="color: rgba(0, 0, 0, 0.87); width: 90px; font-weight: 600;">Type:</td>
                            <td style="padding-left: 15px;" v-if="file_details.file_type === 'image/jpeg' || file_details.file_type === 'image/gif' || file_details.file_type === 'image/png' || file_details.file_type === 'image/svg+xml'"><div id="cell_data">{{ file_details.file_type }}</div></td>
                            <td style="padding-left: 15px;" v-else-if="file_details.file_type === 'video/mp4' || file_details.file_type === 'video/webm'"><div id="cell_data">{{ file_details.file_type }}</div></td>
                            <td style="padding-left: 15px;" v-else-if="file_details.file_type === 'audio/mp4' || file_details.file_type === 'audio/mpeg' || file_details.file_type === 'audio/wave' || file_details.file_type === 'audio/wav'"><div id="cell_data">{{ file_details.file_type }}</div></td>
                            <td style="padding-left: 15px;" v-else-if="file_details.file_type === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'"><div id="cell_data">Word</div></td>
                            <td style="padding-left: 15px;" v-else-if="file_details.file_type === 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'"><div id="cell_data">Excel</div></td>
                            <td style="padding-left: 15px;" v-else-if="file_details.file_type === 'application/pdf'"><div id="cell_data">PDF</div></td>
                            <td style="padding-left: 15px;" v-else-if="file_details.file_type === 'application/x-zip-compressed' || file_details.file_type === 'application/zip'"><div id="cell_data">Zip</div></td>
                            <td style="padding-left: 15px;" v-else-if="file_details.file_type === 'text/html' || file_details.file_type === 'text/css' || file_details.file_type === 'text/javascript'"><div id="cell_data">{{ file_details.file_type }}</div></td>
                            <td style="padding-left: 15px;" v-else-if="file_details.file_type === 'application/vnd.ms-powerpoint' || file_details.file_type === 'application/vnd.openxmlformats-officedocument.presentationml.presentation'"><div id="cell_data">Powerpoint</div></td>
                            <td style="padding-left: 15px;" v-else><div id="cell_data">Unknown</div></td>
                        </tr>

                        <tr>
                            <td style="color: rgba(0, 0, 0, 0.87); width: 90px; font-weight: 600;">Size:</td>
                            <td style="padding-left: 15px;"><div id="cell_data">{{ file_details.file_size }}</div></td>
                        </tr>

                        <tr>
                            <td style="color: rgba(0, 0, 0, 0.87); width: 90px; font-weight: 600;">Created:</td>
                            <td style="padding-left: 15px;"><div id="cell_data">{{ file_details.post_creation_time + ' ' + file_details.post_creation_date }}</div></td>
                        </tr>

                        <tr>
                            <td style="color: rgba(0, 0, 0, 0.87); width: 90px; font-weight: 600;">Owner:</td>
                            <td style="padding-left: 15px;"><div id="cell_data">{{ (file_details.post_creators_id === user_id) ? user_name_from_store : user_name }}</div></td>
                        </tr>
                    </table>
                </v-card-text>

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
export default {
    name: 'FileDetailsDialog', // Component name

    // Data property
    data(){
        return {
            window_width: '' // Window width property
        }
    },
    //------------------------------

    // Computed property
    computed: {
        // View file details dialog property from vuex
        view_file_details_dialog: {
            get(){
                if (this.$store.state.dialog.view_file_details_dialog.value === true){
                    // Listen to changes in window screen width
                    window.onresize = () => {
                        this.window_width = window.innerWidth;
                    }
                    //------------------------------------
                }

                return this.$store.state.dialog.view_file_details_dialog.value;
            },

            set(value){
                this.$store.commit('dialog/view_file_details_dialog/update_value', { value: value });
            }
        },
        //-------------------------------------------

        // File details from vuex
        file_details: function(){
            return this.$store.state.dialog.view_file_details_dialog.file_data;
        },
        //-------------------------------------------

        // User name property from vuex
        user_name: function(){
            return this.$store.state.dialog.view_file_dialog.file_data.user_name;
        },
        //-------------------------------------------

        // User name property from vuex
        user_name_from_store: function(){
            return this.$store.state.user_details.user_details.details.user_name;
        },
        //----------------------------------

        // User id property from vuex
        user_id: function(){
            return this.$store.state.user_details.user_details.details.user_id;
        },
        //----------------------------------
    },
    //------------------------------

    // Methods property
    methods: {
        // Close view file details dialog
        close_dialog(){
            this.$store.commit('dialog/view_file_details_dialog/update_value', { value: false });
        }
        //-------------------------------
    },
    //------------------------------

    // Created lifecycle hook
    created(){
        this.window_width = window.innerWidth; // Current window screen width
    }
    //-----------------------------------
}
</script>

<style scoped>
@import url('../../assets/class_stream_page.css'); /* CSS stylesheet file for the class stream page */
</style>