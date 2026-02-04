<template>
    <v-card-text id="fab_area">
        <v-fab-transition>
            <v-btn
                color="#fff"
                dark
                absolute
                top
                right
                fab
                @click="open_dialog()"
            >
                <v-icon color="primary">mdi-plus</v-icon>
            </v-btn>
        </v-fab-transition>
    </v-card-text>
</template>

<script>
export default {
    name: 'JoinClassFab', // Component name

    // Data property
    data(){
        return {
            joinClass_dialog: false
        }
    },
    //--------------------

    // Methods property
    methods: {
        // Open join class dialog
        open_dialog(){
            if (this.$route.name === 'student-classes'){
                this.$store.commit('join_class_dialog/update_dialog', { value: true });
            } else if (this.$route.name === 'teacher-classes'){
                this.$store.commit('create_class_dialog/update_dialog', { value: true });
            }
        }
        //----------------------------
    }
    //--------------------
}
</script>

<style scoped>
@import url('../assets/classes_home_page.css'); /* CSS stylesheet file for the classes home page */
</style>