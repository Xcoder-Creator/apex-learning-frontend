<template>
    <v-row>
        <v-col md="12">
            <div id="no_network">
                <div id="no_network_img"></div>

                <div id="mob_no_network_img">
                    <img id="img_cover_no_network" src="/images/no-wifi.png" alt="">
                </div>

                <h3>Can't reach the internet!</h3>

                <h4 id="txt_color">Classes are not available offline, check your connection and try again.</h4>
            </div>
        </v-col>
    </v-row>
</template>

<script>
export default {
    name: 'NetworkError', // Component name
}
</script>

<style scoped>
@import url('../assets/classes_home_page.css'); /* CSS stylesheet file for the classes home page */
</style>