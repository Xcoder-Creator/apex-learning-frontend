<template>
    <v-row>
        <v-col v-for="item in class_data_array" :key="item.id" md="4">
            <v-card
                class="mx-auto"
                max-width="344"
                id="card_background"
            >
                <v-card-text id="class_card_background" :style="(item.class_background_img === 'none') ? '' : 'background-image: url(' + item.class_background_img + '); background-origin: border-box; background-position: center; background-repeat: no-repeat; background-size: cover;'">
                    <v-list-item style="padding: 0px;" class="grow">
                        <v-list-item-content>
                            <v-list-item-title id="white_txt">{{ item.class_name }}</v-list-item-title>

                            <v-list-item-subtitle id="white_txt">{{ item.class_section }}</v-list-item-subtitle>

                            <v-list-item-subtitle style="color: #fff;" id="p_t_10">{{ item.teacher_name }}</v-list-item-subtitle>
                        </v-list-item-content>

                        <v-row
                            align="center"
                            justify="end"
                        >
                            <div id="class_menu_btn">
                                <v-menu
                                    left
                                    bottom
                                >
                                    <template v-slot:activator="{ on, attrs }">
                                        <v-btn
                                            icon
                                            color="#fff"
                                            v-bind="attrs"
                                            v-on="on"
                                        >
                                            <v-icon>mdi-dots-vertical</v-icon>
                                        </v-btn>
                                    </template>

                                    <v-list>
                                        <v-list-item link v-if="$route.name === 'student-classes'" @click="unenroll_from_class(item.class_code, item.class_name)">
                                            <v-list-item-title>Unenroll</v-list-item-title>
                                        </v-list-item>

                                        <v-list-item link v-if="$route.name === 'student-classes'" @click="open_report_dialog(item.class_code)">
                                            <v-list-item-title>Report class</v-list-item-title>
                                        </v-list-item>

                                        <v-list-item @click="copy_to_clipboard(item.class_code)" link v-if="$route.name === 'teacher-classes'">
                                            <v-list-item-title>Copy class code</v-list-item-title>
                                        </v-list-item>

                                        <v-list-item @click="open_edit_class_dialog(item.class_code, item.class_name, item.class_section, item.class_subject, item.class_room)" link v-if="$route.name === 'teacher-classes'">
                                            <v-list-item-title>Edit</v-list-item-title>
                                        </v-list-item>

                                        <v-list-item @click="archive_class(item.class_code, item.class_name)" link v-if="$route.name === 'teacher-classes'">
                                            <v-list-item-title>Archive</v-list-item-title>
                                        </v-list-item>
                                    </v-list>
                                </v-menu>
                            </div>
                        </v-row>
                    </v-list-item>
                </v-card-text>

                <v-card-actions style="display: contents;">
                    <v-list dense nav>
                            <v-list-item
                                link
                                @click="go_to_stream(item.class_code, item.id)"
                            >
                                <v-list-item-icon>
                                    <v-icon>mdi-school-outline</v-icon>
                                </v-list-item-icon>

                                <v-list-item-content>
                                    <v-list-item-title>View class</v-list-item-title>
                                </v-list-item-content>
                            </v-list-item>

                            <v-list-item
                                link
                                @click="open_class_folder()"
                            >
                                <v-list-item-icon>
                                    <v-icon>mdi-folder-outline</v-icon>
                                </v-list-item-icon>

                                <v-list-item-content>
                                    <v-list-item-title>Open class folder</v-list-item-title>
                                </v-list-item-content>
                            </v-list-item>
                    </v-list>
                </v-card-actions>
            </v-card>
        </v-col>
    </v-row>
</template>

<script>
export default {
    name: 'ClassListCard', // Component name

    // Computed properties
    computed: {
        // Fetched classes data from vuex
        class_data_array: function(){
            return this.$store.state.class_details.class_list;
        },
        //------------------------------------
    },
    //---------------------------

    // Methods property
    methods: {
        // Unenroll a user from a class
        unenroll_from_class(class_code, class_name){
            this.$store.commit('dialog/unenroll_dialog/unenroll_dialog/update_class_name', { class_name: class_name });
            this.$store.commit('dialog/unenroll_dialog/unenroll_dialog/update_class_code', { class_code: class_code });
            this.$store.commit('dialog/unenroll_dialog/unenroll_dialog/update_value', { value: true });
        },
        //---------------------------------
        
        // Archive a particular class
        archive_class(class_code, class_name){
            this.$store.commit('dialog/archive_dialog/archive_dialog/update_class_name', { class_name: class_name });
            this.$store.commit('dialog/archive_dialog/archive_dialog/update_class_code', { class_code: class_code });
            this.$store.commit('dialog/archive_dialog/archive_dialog/update_value', { value: true });
        },
        //---------------------------------

        // Open edit class dialog
        open_edit_class_dialog(class_code, class_name, class_section, class_subject, class_room){
            this.$store.commit('edit_class_dialog/update_dialog', { value: true });
            this.$store.commit('edit_class_dialog/update_class_code', { class_code: class_code });
            this.$store.commit('edit_class_dialog/update_class_name', { class_name: class_name });
            this.$store.commit('edit_class_dialog/update_class_section', { class_section: class_section });
            this.$store.commit('edit_class_dialog/update_class_subject', { class_subject: class_subject });
            this.$store.commit('edit_class_dialog/update_class_room', { class_room: class_room });
        },
        //---------------------------------

        // Open class folder
        open_class_folder(){   
            this.$store.commit('dialog/coming_soon_dialog/update_data', { value: true });
        },
        //------------------------------------------

        // Open report dialog
        open_report_dialog(class_code){
            this.$store.commit('dialog/report_dialog/update_class_code', { class_code: class_code });
            this.$store.commit('dialog/report_dialog/update_dialog', { value: true });
        },
        //------------------------------------------

        // Take the user to the stream page based on the class selected by the user
        go_to_stream(class_code, id){
            this.$store.commit('class_id/update_class_id', { value: id });

            // Check if the user is making use of a student or teachers account
            if (this.$store.state.user_details.user_details.details.user_role === 'Student'){
                this.$router.push({ path: '/student/stream', query: { class_code: class_code } });
            } else if (this.$store.state.user_details.user_details.details.user_role === 'Teacher'){
                this.$router.push({ path: '/teacher/stream', query: { class_code: class_code } });
            }
            //-------------------------------------------------------
        },
        //-------------------------------------------------------

        // Copy class code to clipboard
        copy_to_clipboard(class_code){
            navigator.clipboard
                .writeText(class_code)
                .then(() => {
                    // Update the err msg dialog through vuex
                    let obj = {
                        value: true,
                        msg: 'Class code copied!',
                        err: false
                    }

                    this.$store.commit(this.$config.VUEX_UPDATE_ERR_MSG_DIALOG, obj);
                    //---------------------------------------------  
                })
                .catch(() => {
                    // Update the err msg dialog through vuex
                    let obj = {
                        value: true,
                        msg: 'Error, Couldn\'t copy class code!',
                        err: true
                    }

                    this.$store.commit(this.$config.VUEX_UPDATE_ERR_MSG_DIALOG, obj);
                    //---------------------------------------------  
                });
        }
        //-------------------------------------------------------
    }
    //-----------------------
}
</script>

<style scoped>
@import url('../assets/classes_home_page.css'); /* CSS stylesheet file for the classes home page */
</style>