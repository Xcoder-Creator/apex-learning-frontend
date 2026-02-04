<template>
    <div>
        <div class="footer">
            <div id="footer_icons">
                <a id="footer_ico_lnk_first" target="_blank" href="https://instagram/apex_learning/">
                    <v-icon id="footer_ico_hover" aria-hidden="false">
                        mdi-instagram
                    </v-icon>
                </a>

                <a id="footer_ico_lnk" target="_blank" href="https://twitter/apex_learning/">
                    <v-icon id="footer_ico_hover" aria-hidden="false">
                        mdi-twitter
                    </v-icon>
                </a>

                <a id="footer_ico_lnk" target="_blank" href="https://facebook/apex_learning43/">
                    <v-icon id="footer_ico_hover" aria-hidden="false">
                        mdi-facebook
                    </v-icon>
                </a>
            </div>

            <v-footer id="footer_credit" padless>
                <v-col
                    class="text-center"
                    cols="12"
                >
                    {{ new Date().getFullYear() }} — <strong>Apex</strong>
                </v-col>
            </v-footer>
        </div>
    </div>
</template>

<script>
export default {
    name: 'FooterTemplate'
}
</script>

<style scoped>
@import url('../../assets/footer.css');
</style>