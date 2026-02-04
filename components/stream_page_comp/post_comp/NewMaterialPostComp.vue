<template>
    <div>
        <p id="new_material_title">{{ post_data.title }}</p>
            <v-divider style="border-color: rgb(0 0 0 / 51%);"></v-divider>

            <div v-html="post_data.post_data" id="post_data_content" style="margin-bottom: 5px;"></div>

            <div id="all-attachments">
                <v-list-item
                    v-for="item in post_data.new_material_files"
                    :key="item.id"
                    link
                >
                    <v-list-item-icon id="marg_fix" v-if="item.file_type === 'pdf'">
                        <v-icon color="orange darken-2" id="file_att_icon">
                            mdi-file-pdf-box
                        </v-icon>
                    </v-list-item-icon>

                    <v-list-item-icon id="marg_fix" v-else-if="item.file_type === 'docx'">
                        <v-icon color="orange darken-2" id="file_att_icon">
                            mdi-file-word-box
                        </v-icon>
                    </v-list-item-icon>

                    <v-list-item-content>
                        <v-list-item-title id="file_att_name" v-text="item.file_name"></v-list-item-title>
                    </v-list-item-content>
                </v-list-item>
            </div>
    </div>
</template>

<script>
export default {
    name: 'NewMaterialPostComp', // Component name

    // Computed property
    computed: {
        // Post data property from vuex
        post_data: function(){
            return this.$store.state.dialog.view_post_dialog.post_data;
        }
        //--------------------------------------
    },
    //------------------------------

    // Methods property
    methods: {

    }
    //-------------------------------
}
</script>

<style scoped>
@import url('../../../assets/class_stream_page.css'); /* CSS stylesheet file for the class stream page */
</style>