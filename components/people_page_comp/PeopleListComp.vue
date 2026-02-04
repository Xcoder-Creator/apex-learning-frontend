<template>
    <div id="sdasasdsd23s">
        <div>
            <div id="teacher_section">
                <div id="top_header">Teachers</div>
                <div id="profile_ui_comp">
                    <div id="img_placeholder">
                        <img id="img_sect" v-if="$route.name === 'student-people'" :src="(teacher_data_array.profile_image === '/images/profile_img.png') ? $config.apiUrl + '/images/profile_img.png' : $config.apiUrl + teacher_data_array.profile_image" alt="">
                        <img id="img_sect" v-else-if="$route.name === 'teacher-people'" :src="(teacher_data_array_two.profile_image === '/images/profile_img.png') ? $config.apiUrl + '/images/profile_img.png' : $config.apiUrl + teacher_data_array_two.profile_image" alt="">
                    </div>

                    <div id="id_name">
                        <span v-if="$route.name === 'student-people'">{{ teacher_data_array.name }}</span>
                        <span v-else-if="$route.name === 'teacher-people'">{{ teacher_data_array_two.name }}</span>
                    </div>
                </div>
            </div>

            <div id="student_section" v-if="people_data_array.length > 0 && $route.name === 'student-people'">
                <div id="top_header2">
                    <div id="sdxx8">Classmates</div>
                    <div id="sdxx9">{{ people_data_array.length + 1 }} students</div>
                </div>

                <div id="classmate_list">
                    <div id="profile_ui_comp" v-for="student in people_data_array" :key="student.id" style="border-bottom: 1px solid #e0e0e0;">
                        <div id="img_placeholder">
                            <img id="img_sect" :src="`${$config.apiUrl}${student.profile_image}`" alt="">
                        </div>

                        <div id="id_name">
                            {{ student.name }}
                        </div>
                    </div>
                </div>
            </div>

            <div id="student_section" v-if="teacher_people_data_array.length > 0 && $route.name === 'teacher-people'">
                <div id="top_header2">
                    <div id="sdxx8">Students</div>
                    <div id="sdxx9">{{ teacher_people_data_array.length }} student{{ teacher_people_data_array.length > 1 ? 's' : '' }}</div>
                </div>

                <div id="classmate_list">
                    <div id="profile_ui_comp" v-for="student in teacher_people_data_array" :key="student.id" style="border-bottom: 1px solid #e0e0e0;">
                        <div id="img_placeholder">
                            <img id="img_sect" :src="`${$config.apiUrl}${student.profile_image}`" alt="">
                        </div>

                        <div id="id_name">
                            {{ student.name }}
                        </div>
                    </div>
                </div>
            </div>
            
            <div id="student_section" v-else-if="!(teacher_people_data_array.length > 0) && $route.name === 'teacher-people'">
                <div id="top_header2">
                    <div id="sdxx8">Students</div>
                    <div id="sdxx9">0 students</div>
                </div>

                <div id="classmate_list" class="classmate_list_mgxx">
                    <NoStudentComp />
                    <p id="xx98sj">No students available!</p>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
// Imported single file components
import NoStudentComp from '../../components/people_page_comp/NoStudentComp'
//---------------------------------------------

export default {
    name: 'PeopleListComp', // Component name

    // Registered components
    components: {   
        NoStudentComp
    },
    //----------------------------

    // Computed properties
    computed: {
        // People data array property from vuex
        people_data_array: function(){
            return this.$store.state.student_people_page.people_comp.people_data_array;
        },
        //----------------------------------------------

        // People data array property from vuex
        teacher_people_data_array: function(){
            return this.$store.state.teacher_people_page.people_comp.people_data_array;
        },
        //----------------------------------------------

        // Teacher data array property from vuex
        teacher_data_array: function(){
            return this.$store.state.student_people_page.people_comp.teacher_data_array;
        },
        //----------------------------------------------

        // Teacher data array property from vuex
        teacher_data_array_two: function(){
            return this.$store.state.teacher_people_page.people_comp.teacher_data_array;
        },
        //----------------------------------------------
    }
    //----------------------------------------
}
</script>

<style scoped>
@import url('../../assets/class_people_page.css'); /* CSS stylesheet file for the people page */
</style>