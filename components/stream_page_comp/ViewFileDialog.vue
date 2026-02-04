<template>
    <v-row justify="center">
        <v-dialog
            v-model="view_file_dialog"
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
                        @click="close_dialog()"
                    >
                        <v-icon>mdi-close</v-icon>
                    </v-btn>

                    <v-toolbar-title>{{ file_attachment_data.file_name }}</v-toolbar-title>

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
                                <v-list-item @click="view_details(file_attachment_data.post_creators_id, file_attachment_data.user_name, file_attachment_data.file_name, file_attachment_data.file_type, file_attachment_data.file_size, file_attachment_data.post_creation_date, file_attachment_data.post_creation_time)" link>
                                    <v-list-item-title id="items_menu">
                                        <v-icon>mdi-information-outline</v-icon>
                                        <span id="menu_txtx">Details</span>
                                    </v-list-item-title>
                                </v-list-item>

                                <v-list-item link @click="download_file(file_attachment_data.file_url, file_attachment_data.file_type, file_attachment_data.file_name)">
                                    <v-list-item-title id="items_menu">
                                        <v-icon>mdi-download-outline</v-icon>
                                        <span id="menu_txtx">Download</span>
                                    </v-list-item-title>
                                </v-list-item>
                            </v-list>
                        </v-menu>
                    </v-toolbar-items>
                </v-toolbar>

                <div id="main-content-dialog-body" style="margin-top: 40px; padding-bottom: 40px;">
                    <v-row justify="center" v-if="file_attachment_data.file_type === 'image/jpeg' || file_attachment_data.file_type === 'image/gif' || file_attachment_data.file_type === 'image/png' || file_attachment_data.file_type === 'image/svg+xml'">
                        <v-img id="att_img" max-width="900" style="height: 500px;" :src="file_attachment_data.file_url"></v-img>
                    </v-row>

                    <v-row justify="center" v-else-if="file_attachment_data.file_type === 'video/mp4' || file_attachment_data.file_type === 'video/webm'">
                        <video id="video" src="" :type="file_attachment_data.file_type" controls preload="auto"></video>
                    </v-row>

                    <v-row justify="center" v-else-if="file_attachment_data.file_type === 'audio/mp4' || file_attachment_data.file_type === 'audio/mpeg' || file_attachment_data.file_type === 'audio/wave' || file_attachment_data.file_type === 'audio/wav'">
                        <audio id="audio" src="" :type="file_attachment_data.file_type" controls preload="auto" style="width: 350px;"></audio>
                    </v-row>

                    <v-row justify="center" v-else>
                        <div id="cannot_view_txt">This file cannot be previewed by Apex Learning!</div>
                    </v-row>
                </div>
            </v-card>
        </v-dialog>
    </v-row>
</template>

<script>
import axios from 'axios';

export default {
    name: 'ViewFileDialog', // Component name

    // Data property
    data(){
        return {
            can_download: true,
            cancelTokenSource: axios.CancelToken.source()
        }
    },
    //-----------------------------

    // Computed property
    computed: {
        // View file dialog property from vuex
        view_file_dialog: {
            get(){
                if (this.$store.state.dialog.view_file_dialog.value === true){
                    if (this.file_attachment_data.file_type === 'video/mp4' || this.file_attachment_data.file_type === 'video/webm'){
                        setTimeout(() => {
                            document.querySelector('video').setAttribute('src', this.file_attachment_data.file_url);
                        }, 30);
                    } else if (this.file_attachment_data.file_type === 'audio/mp4' || this.file_attachment_data.file_type === 'audio/mpeg' || this.file_attachment_data.file_type === 'audio/wave' || this.file_attachment_data.file_type === 'audio/wav'){
                        setTimeout(() => {
                            document.querySelector('audio').setAttribute('src', this.file_attachment_data.file_url);
                        }, 30);
                    }
                }
                return this.$store.state.dialog.view_file_dialog.value;
            },

            set(value){
                this.$store.commit('dialog/view_file_dialog/update_value', { value: value });
            }
        },
        //-----------------------------------------

        // File attachment data property from vuex
        file_attachment_data: function(){
            return this.$store.state.dialog.view_file_dialog.file_data;
        }
        //---------------------------------
    },
    //-------------------------------

    // Methods property
    methods: {
        // Close view file dialog
        close_dialog(){
            this.view_file_dialog = false;

            if (!!document.querySelector('audio') === true){
                document.querySelector('audio').pause();
                document.querySelector('audio').removeAttribute('src');
            }

            if (!!document.querySelector('video') === true){
                document.querySelector('video').pause();
                document.querySelector('video').removeAttribute('src');
            }

            this.cancelTokenSource.cancel();
            this.cancelTokenSource = axios.CancelToken.source();
        },
        //----------------------------------------

        // View details of the attached file
        view_details(post_creators_id, user_name, file_name, file_type, file_size, creation_date, creation_time){
            this.$store.commit('dialog/view_file_details_dialog/update_data', { post_creators_id: post_creators_id, user_name: user_name, file_name: file_name, file_type: file_type, file_size: file_size, post_creation_date: creation_date, post_creation_time: creation_time });
            setTimeout(() => {
                this.$store.commit('dialog/view_file_details_dialog/update_value', { value: true });
            }, 50);
        },
        //----------------------------------------

        // Download the attached file
        download_file(file_url, file_type, file_name){
            if (this.can_download === true){
                this.can_download = false;
                this.$store.commit('dialog/msg_dialog/update_dialog', { value: true, msg: 'Preparing file....' });

                axios.get(file_url, {
                    method: 'GET',
                    responseType: 'blob',
                    cancelToken: this.cancelTokenSource.token
                })
                    .then((response) => {
                        this.can_download = true;
                        const url = window.URL.createObjectURL(new Blob([response.data]));
                        const link = document.createElement('a');
                        link.href = url;
                        link.setAttribute('download', file_name);
                        document.body.appendChild(link);
                        link.click();
                        document.body.removeChild(link);
                        this.can_download = true;

                        this.$store.commit('dialog/msg_dialog/update_dialog', { value: false, msg: 'Preparing file....' });

                        // Update the err msg dialog through vuex
                        let obj1 = {
                            value: true,
                            msg: 'File is ready to download!',
                            err: false
                        }

                        this.$store.commit(this.$config.VUEX_UPDATE_ERR_MSG_DIALOG, obj1);
                        //---------------------------------------------
                    })
                    .catch((err) => {
                        if (this.can_download === false){
                            this.can_download = true;

                            // Update the err msg dialog through vuex
                            let obj1 = {
                                value: true,
                                msg: 'An error occured while downloading file!',
                                err: true
                            }

                            this.$store.commit(this.$config.VUEX_UPDATE_ERR_MSG_DIALOG, obj1);
                            //---------------------------------------------

                            setTimeout(() => {
                                this.$store.commit('dialog/msg_dialog/update_dialog', { value: false, msg: 'File download has started....' });
                            }, 10);
                        }
                    })
            } else if (this.can_download === false){
                this.$store.commit('dialog/msg_dialog/update_dialog', { value: true, msg: 'Please wait, The file is being prepared....' });
            }
        }
        //--------------------------------------------------------
    },
    //---------------------------------

    // Watch property
    watch: {
        // Watch class code query parameter
        '$route.query.class_code'(){
            this.cancelTokenSource.cancel(); // Cancel all pending axios xhr requests
            this.cancelTokenSource = axios.CancelToken.source();
            this.can_download = true;
            setTimeout(() => {
                this.$store.commit('dialog/msg_dialog/update_dialog', { value: false, msg: 'File download has started....' });
                this.$store.commit(this.$config.VUEX_UPDATE_ERR_MSG_DIALOG, { value: false, msg: '', err: false });
            }, 10);
        },
        //--------------------------------------
    },
    //----------------------------------

    // This life cycle hook is called when the user leaves the current route
    beforeDestroy(){
        this.cancelTokenSource.cancel(); // Cancel all pending axios xhr requests
        this.cancelTokenSource = axios.CancelToken.source();
        setTimeout(() => {
            this.$store.commit('dialog/msg_dialog/update_dialog', { value: false, msg: 'File download has started....' });
            this.$store.commit(this.$config.VUEX_UPDATE_ERR_MSG_DIALOG, { value: false, msg: '', err: false });
        }, 10);
    }
    //------------------------------------------------------
}
</script>

<style scoped>
@import url('../../assets/class_stream_page.css'); /* CSS stylesheet file for the class stream page */
</style>