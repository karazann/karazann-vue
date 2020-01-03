import 'reflect-metadata'
import 'css-vars-ponyfill'

import Vue from 'vue'

import Header from '../../src/components/header/header.vue'
import Input from '../../src/components/shared/input.vue'
import Button from '../../src/components/shared/button.vue'
import Tag from '../../src/components/shared/tag.vue'
import Brand from '../../src/components/shared/brand.vue'
import TitleBar from '../../src/components/shared/title-bar.vue'

Vue.config.productionTip = true

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
Vue.component('v-tag', Tag)
Vue.component('v-title', TitleBar)
