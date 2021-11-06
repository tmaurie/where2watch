import Vue from 'vue'
import Vuetify from 'vuetify'
import 'vuetify/dist/vuetify.min.css'
import '@mdi/font/css/materialdesignicons.css'
import colors from 'vuetify/lib/util/colors'

Vue.use(Vuetify)

const opts = {
    icons: {
        iconfont: 'mdiSvg',
    },
    theme : {
        themes : {
            light : {
                primary: colors.deepPurple.accent4,
                secondary: colors.grey.darken1,
                accent: colors.shades.black,
                error: colors.red.accent3,
                background: colors.indigo.lighten5, // Not automatically applied
            }
        }
    }
}

export default new Vuetify(opts)
