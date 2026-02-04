<template>
    <div id="upcoming-box" style="margin-top: 25px;">
        <h3 id="rr_txt">View class updates and connect with your class here</h3>

        <div id="comp_bbr">
            <div id="card_ico">
                <v-icon
                    color="#000"
                >
                    mdi-clipboard-list-outline
                </v-icon>
            </div>

            <div id="txt_rr_w">
                <span id="cc_txt">See when new assignments are posted</span>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'NoPosts' // Component name
}
</script>

<style scoped>
@import url('../../assets/class_stream_page.css'); /* CSS stylesheet file for the class stream page */
</style>