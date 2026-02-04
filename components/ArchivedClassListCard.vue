<template>
    <v-row>
        <v-col v-for="item in archived_classes" :key="item.id" md="4">
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
                            v-if="$route.name === 'teacher-archived_classes'"
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
                                        <v-list-item @click="restore_class_method(item.class_code)" link>
                                            <v-list-item-title>Restore</v-list-item-title>
                                        </v-list-item>

                                        <v-list-item @click="delete_class_method()" link>
                                            <v-list-item-title>Delete</v-list-item-title>
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
import fetch_archived_classes from '../mixins/archived_classes_page/fetch_archived_classes/fetch_archived_classes'
import fetch_archived_classes_request from '../mixins/archived_classes_page/fetch_archived_classes/fetch_archived_classes_request'
import fetch_archived_classes_response from '../mixins/archived_classes_page/fetch_archived_classes/fetch_archived_classes_response'

export default {
    name: 'ClassListCard', // Component name

    // Imported mixins
    mixins: [
        fetch_archived_classes,

        fetch_archived_classes_request,

        fetch_archived_classes_response
    ],
    //------------------------------------

    // Computed properties
    computed: {
        // Archived classes property from vuex
        archived_classes: function(){
            return this.$store.state.archived_classes_page.page_comp.archived_classes;
        }
        //----------------------------------------------
    },
    //---------------------------

    // Methods property
    methods: {
        // Open class folder
        open_class_folder(){   
            this.$store.commit('dialog/coming_soon_dialog/update_data', { value: true });
        },
        //------------------------------------------
    }
    //-----------------------
}
</script>

<style scoped>
@import url('../assets/classes_home_page.css'); /* CSS stylesheet file for the classes home page */
</style>