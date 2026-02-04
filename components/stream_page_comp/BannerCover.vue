<template>
   <v-container>
        <v-row>
            <v-col md="12">
                <div v-if="$route.name === 'student-stream'" id="banner-cover" :style="(class_info.class_background_img === 'none') ? '' : 'background-image: url(' + `${$config.apiUrl}` + class_info.class_background_img + ');'">
                    <v-list-item two-line style="padding-bottom: 9px; padding-top: 9px; padding-left: 6px; padding-left: 23px;">
                        <v-list-item-content>
                            <v-list-item-title id="banner-title">{{ class_info.class_name }}</v-list-item-title>
                            <v-list-item-subtitle id="banner-desc">{{ class_info.class_section }}</v-list-item-subtitle>
                        </v-list-item-content>
                    </v-list-item>
                </div>

                <div v-else-if="$route.name === 'teacher-stream'" class="teacher_banner-cover" :style="(class_info.class_background_img === 'none') ? '' : 'background-image: url(' + `${$config.apiUrl}` + class_info.class_background_img + ');'">
                    <div style="padding-top: 9px; padding-right: 23px;">
                        <div style="padding-top: 12px; text-align: right;">
                            <v-btn
                                color="#ffffff"
                                @click="open_change_class_bg_dialog(class_info.class_background_img)"
                            >
                                <v-icon color="rgb(25, 118, 210)" left>
                                    mdi-pencil
                                </v-icon>
                                <span style="color: rgb(25, 118, 210);">Customize</span>
                            </v-btn>
                        </div>
                    </div>

                    <v-list-item id="class_data_details" two-line style="padding-bottom: 9px; padding-top: 9px; padding-left: 6px; padding-left: 23px;">
                        <v-list-item-content>
                            <v-list-item-title id="banner-title">{{ class_info.class_name }}</v-list-item-title>
                            <v-list-item-subtitle id="banner-desc">{{ class_info.class_section }}</v-list-item-subtitle>
                        </v-list-item-content>
                    </v-list-item>
                </div>
            </v-col>

            <v-col md="12" id="exp_panels1">
                <v-expansion-panels style="border-radius: 0.5rem;">
                    <v-expansion-panel>
                        <v-expansion-panel-header v-ripple>
                            View class details
                        </v-expansion-panel-header>
                        <v-expansion-panel-content>
                            <p style="font-size: 0.92rem;"><b>Section</b><span id="class_info">{{ class_info.class_section }}</span></p>
                            <p style="font-size: 0.92rem;"><b>Room</b><span id="class_info">{{ class_info.class_room }}</span></p>
                            <p style="font-size: 0.92rem;"><b>Subject</b><span id="class_info">{{ class_info.class_subject }}</span></p>
                        </v-expansion-panel-content>
                    </v-expansion-panel>
                </v-expansion-panels>
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
export default {
    name: 'BannerCover', // Component name

    // Computed property
    computed: {
        // Class info property from vuex
        class_info: function(){
            return this.$store.state.class_info.class_info;
        }
        //--------------------------------------------------------
    },
    //-------------------------------------------------

    // Methods property
    methods: {
        // Open change class bg dialog
        open_change_class_bg_dialog(bg_image){
            this.$store.commit('dialog/class_bg_image_dialog/update_bg_image', { value: bg_image });

            setTimeout(() => {
                this.$store.commit('dialog/class_bg_image_dialog/update_dialog', { value: true });
            }, 10);
        }
        //------------------------------------------
    }
    //-------------------------------------------------
}
</script>

<style scoped>
@import url('../../assets/class_stream_page.css'); /* CSS stylesheet file for the class stream page */
</style>