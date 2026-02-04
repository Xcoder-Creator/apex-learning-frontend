<template>
    <div id="qwesd23a">
        <div>
            <v-btn text color="primary" @click="open_coming_soon_dialog()" v-if="$route.name === 'student-classwork'" id="top_tabs">
                <v-icon
                    left
                    dark
                >
                    mdi-card-bulleted-outline
                </v-icon>

                View your work
            </v-btn>

            <v-menu
                bottom
                origin="center center"
                transition="scale-transition"
            >
                <template v-slot:activator="{ on, attrs }">
                    <v-btn rounded v-bind="attrs" v-on="on" color="primary" style="padding: 23px;" v-if="$route.name === 'teacher-classwork'" id="top_tabs">
                        <v-icon
                            left
                            dark
                        >
                            mdi-plus
                        </v-icon>

                        Create
                    </v-btn>
                </template>

                <v-list>
                    <v-list-item
                        v-for="(item, i) in items"
                        :key="i"
                        link
                        @click="open_dialog(item.value)"
                    >
                        <v-list-item-title id="by6"><v-icon color="#1976d2">mdi-file-document-outline</v-icon> <span id="hy77x">{{ item.title }}</span></v-list-item-title>
                    </v-list-item>
                </v-list>
            </v-menu>
        </div>

        <div id="first">
            <v-btn text @click="open_coming_soon_dialog()" color="primary">
                <v-icon
                    left
                    dark
                >
                    mdi-calendar-outline
                </v-icon>

                Calendar
            </v-btn>

            <v-btn @click="open_coming_soon_dialog()" text color="primary">
                <v-icon
                    left
                    dark
                >
                    mdi-folder-outline
                </v-icon>

                Class folder
            </v-btn>
        </div>

        <div id="second">
            <v-btn @click="open_coming_soon_dialog()" icon color="primary">
                <v-icon>mdi-calendar-outline</v-icon>
            </v-btn>

            <v-btn @click="open_coming_soon_dialog()" style="margin-left: 6px;" icon color="primary">
                <v-icon>mdi-folder-outline</v-icon>
            </v-btn>
        </div>
    </div>
</template>

<script>
export default {
    name: 'HeaderContent', // Component name

    // Data function
    data(){
        return {
            items: [
                { title: 'Assignment', value: 1 },
                { title: 'Attendance', value: 2 },
                { title: 'Classwork', value: 3 }
            ]
        }
    },
    //-------------------------------

    // Methods property
    methods: {
        // Open create class activity dialg
        open_dialog(value){
            if (value === 1){
                this.$store.commit('create_assignment_dialog/update_dialog', { value: true });
            } else if (value === 2){
                this.$store.commit('create_attendance_dialog/update_dialog', { value: true });
            } else if (value === 3){
                this.$store.commit('create_classwork_dialog/update_dialog', { value: true });
            }
        },
        //------------------------------------------------------

        // Open coming soon dialog
        open_coming_soon_dialog(){
            this.$store.commit('dialog/coming_soon_dialog/update_data', { value: true });
        }
        //----------------------------------------
    }
    //---------------------------------------
}
</script>

<style scoped>
@import url('../../assets/class_classwork_page.css'); /* CSS stylesheet file for the classwork page */
</style>