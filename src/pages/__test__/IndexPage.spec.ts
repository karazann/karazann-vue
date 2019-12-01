import { shallowMount, RouterLinkStub } from '@vue/test-utils'
import IndexPage from '../index.vue'

describe('IndexPage', () => {
    const build = () => {
        const options = {
            data() {
                return {}
            },
            stub: {
                RouterLinkStub
            }
        }

        const wrapper = shallowMount(IndexPage, options)

        return {
            wrapper
        }
    }

    it('renders the component', () => {
        // arrange
        const { wrapper } = build()

        // assert
        expect(wrapper.html()).toMatchSnapshot()
    })
})
