<template>
    <div id="asdaww2232zq">
        <HeaderContent />
        <div id="iijd7x"></div>

        <div id="no_classwork_svg_space">
            <NoClassworkSvg />
            <p id="xccx_txt" v-if="$route.name === 'student-classwork'">No assignments yet. Lucky you!</p>
            <div style="margin-top: 30px;" v-if="$route.name === 'teacher-classwork'">
                <p id="m8iikl">This is where you’ll assign work</p>
                <p id="cvbt">You can add assignments and other work for the class, then view them from the most recent</p>
            </div>
        </div>
    </div>
</template>

<script>
import NoClassworkSvg from '../../components/classwork_page_comp/NoClassworkSvg'
import HeaderContent from '../../components/classwork_page_comp/HeaderContent'

export default {
    name: 'NoClasswork', // Component name

    components: {
        NoClassworkSvg,

        HeaderContent
    }
}
</script>

<style scoped>
@import url('../../assets/class_classwork_page.css'); /* CSS stylesheet file for the class stream page */
</style>