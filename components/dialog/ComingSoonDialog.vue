<template>
    <v-row justify="center">
        <v-dialog
            v-model="coming_soon_dialog"
            scrollable
            :fullscreen="false"
            max-width="500px"
        >
            <v-card>
                <v-card-title id="comment-head-comp">
                    Coming soon
                </v-card-title>

                <v-divider></v-divider>

                <v-card-text style="height: 320px; padding-top: 25px;">
                   <div id="ssj889dx">
                       <v-img id="eelp33xz" :src="`${$config.apiUrl}/images/coming-soon.png`"></v-img>
                   </div>
                   <p id="woopp22x">Coming Soon!</p>
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
    name: 'CommentDialog', // Component name

    // Computed property
    computed: {
        // Coming soon dialog property from vuex
        coming_soon_dialog: {
            get(){
                return this.$store.state.dialog.coming_soon_dialog.value;
            },

            set(value){
                this.$store.commit('dialog/coming_soon_dialog/update_data', { value: value });
            }
        },
        //-------------------------------------------

        // Vuex property that holds the users profile image
        profile_img: function(){
            return this.$store.state.user_details.user_details.details.profile_image;
        },
        //-----------------------------------------------
    },
    //------------------------------

    // Methods property
    methods: {
        // Close coming soon dialog
        close_dialog(){
            this.$store.commit('dialog/coming_soon_dialog/update_data', { value: false });
        }
        //-------------------------------
    }
    //------------------------------
}
</script>

<style scoped>
@import url('../../assets/class_stream_page.css'); /* CSS stylesheet file for the class stream page */
</style>