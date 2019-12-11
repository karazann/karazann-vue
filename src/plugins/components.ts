import 'reflect-metadata'
import Vue from 'vue'
import VueCompositionApi from '@vue/composition-api'

import Header from '~/components/header/Header.vue'
import Input from '~/components/shared/Input.vue'
import Button from '~/components/shared/Button.vue'
import Brand from '~/components/shared/Brand.vue'
import TitleBar from '~/components/shared/TitleBar.vue'

Vue.use(VueCompositionApi)

Vue.directive('scroll', {
    inserted(el, binding) {
        const f = (e: any) => {
            if (binding.value(e, el)) {
                window.removeEventListener('scroll', f)
            }
        }
        window.addEventListener('scroll', f)
    }
})

Vue.component('v-header', Header)
Vue.component('v-brand', Brand)
Vue.component('v-input', Input)
Vue.component('v-button', Button)
Vue.component('v-title', TitleBar)