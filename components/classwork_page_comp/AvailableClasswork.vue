<template>
    <div id="asdaww2232zq">
        <HeaderContent />

        <div id="hhs6yd">
            <div v-if="$route.name === 'teacher-classwork'">
                <div id="activity" v-for="item in classworks" :key="item.id">
                    <div id="top-head-comp">
                        <div id="profile-head-data">
                            <v-list-item two-line style="padding-bottom: 5px; padding-top: 5px; text-align: left;">
                                <v-avatar size="34" id="mr" color="#4285f4">
                                    <v-icon id="mr_edit_ico" dark>
                                        mdi-file-document-outline
                                    </v-icon>
                                </v-avatar>

                                <v-list-item-content>
                                    <v-list-item-title id="plain-comp-title"><span style="font-weight: 700;">{{ (item.classwork_type === 'assignment') ? 'Assignment:' : (item.classwork_type === 'classwork') ? 'Classwork:' : (item.classwork_type === 'attendance') ? 'Attendance:' : '' }}</span>{{ (item.classwork_type === 'assignment') ? `${' ' + item.title}` : (item.classwork_type === 'classwork') ? `${' ' + item.title}` : (item.classwork_type === 'attendance') ? `${' ' + item.title}` : '' }}</v-list-item-title>
                                    <v-list-item-subtitle id="plain-comp-sub">Due {{ item.due_date }}</v-list-item-subtitle>
                                </v-list-item-content>
                            </v-list-item>

                            <div id="options-btn">
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
                                        <v-list-item @click="edit_classwork(item.classwork_type)" link>
                                            <v-list-item-title>Edit</v-list-item-title>
                                        </v-list-item>

                                        <v-list-item @click="delete_classwork(item.classwork_id, item.class_code)" link>
                                            <v-list-item-title>Delete</v-list-item-title>
                                        </v-list-item>

                                        <v-list-item @click="view_work(item.class_code, item.classwork_id, 'teacher')" link>
                                            <v-list-item-title>View work</v-list-item-title>
                                        </v-list-item>
                                    </v-list>
                                </v-menu>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div v-else-if="$route.name === 'student-classwork'">
                <div id="activity" class="student-dhhs" v-for="item in student_classworks" :key="item.id">
                    <div id="top-head-comp">
                        <div id="profile-head-data">
                            <v-list-item two-line style="padding-bottom: 5px; padding-top: 5px; text-align: left;">
                                <v-avatar size="34" id="mr" :color="(item.is_done === true && $route.name === 'student-classwork') ? 'rgba(0,0,0,.24)' : '#4285f4'">
                                    <v-icon id="mr_edit_ico" dark>
                                        mdi-file-document-outline
                                    </v-icon>
                                </v-avatar>

                                <v-list-item-content>
                                    <v-list-item-title id="plain-comp-title"><span style="font-weight: 700;">{{ (item.classwork_type === 'assignment') ? 'Assignment:' : (item.classwork_type === 'classwork') ? 'Classwork:' : (item.classwork_type === 'attendance') ? 'Attendance:' : '' }}</span>{{ (item.classwork_type === 'assignment') ? `${' ' + item.title}` : (item.classwork_type === 'classwork') ? `${' ' + item.title}` : (item.classwork_type === 'attendance') ? `${' ' + item.title}` : '' }}</v-list-item-title>
                                    <v-list-item-subtitle id="plain-comp-sub">Due {{ item.due_date }}</v-list-item-subtitle>
                                </v-list-item-content>
                            </v-list-item>

                            <div id="options-btn">
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
                                        <v-list-item @click="view_work(item.class_code, item.classwork_id, 'student')" link>
                                            <v-list-item-title>View work</v-list-item-title>
                                        </v-list-item>
                                    </v-list>
                                </v-menu>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import HeaderContent from '../../components/classwork_page_comp/HeaderContent'

export default {
    name: 'AvailableClasswork', // Component name

    components: {
        HeaderContent
    },

    computed: {
        classworks: function(){
            return this.$store.state.teacher_classwork_page.classwork_comp.classwork_array;
        },

        student_classworks: function(){
            return this.$store.state.student_classwork_page.classwork_comp.classwork_array;
        }
    },
    
    // Methods property
    methods: {
        // Delete classwork method
        delete_classwork(classwork_id, class_code){
            this.$store.commit('dialog/delete_classwork_dialog/update_classwork_id', { value: classwork_id });
            this.$store.commit('dialog/delete_classwork_dialog/update_classcode', { value: class_code });

            setTimeout(() => {
                this.$store.commit('dialog/delete_classwork_dialog/update_dialog', { value: true });
            }, 10);
        },
        //-----------------------------------

        // Edit classwork method
        edit_classwork(){
            this.$store.commit('dialog/coming_soon_dialog/update_data', { value: true });
        },
        //-----------------------------------

        // View classwork details
        view_work(class_code, classwork_id, role){
            if (role === 'teacher'){
                this.$router.push(`/teacher/view_classwork?class_code=${class_code}&id=${classwork_id}`); // Redirect user to the view classwork page
            } else if (role === 'student'){
                this.$router.push(`/student/view_classwork?class_code=${class_code}&id=${classwork_id}`); // Redirect user to the view classwork page
            }
        }
        //-----------------------------------
    }
    //---------------------------
}
</script>

<style scoped>
@import url('../../assets/class_classwork_page.css'); /* CSS stylesheet file for the class stream page */
@import url('../../assets/class_stream_page.css'); /* CSS stylesheet file for the class stream page */
</style>