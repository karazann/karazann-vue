import { shallowMount } from '@vue/test-utils'
import TitleBar from '../TitleBar.vue'

describe('TitleBar', () => {
    const build = (props: Record<string, any>) => {
        const wrapper = shallowMount(TitleBar, {
            propsData: props
        })

        return {
            wrapper
        }
    }

    it('renders the component', () => {
        // arrange
        const { wrapper } = build({
            title: 'Title',
            subtitle: ''
        })

        // assert
        expect(wrapper.html()).toMatchSnapshot()
    })

    it('renders title props properly', () => {
        // arrange
        const { wrapper } = build({
            title: 'Title',
            subtitle: 'Subtitle'
        })

        // assert
        expect(wrapper.html()).toMatchSnapshot()
    })
})
