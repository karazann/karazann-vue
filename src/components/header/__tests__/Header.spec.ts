import { shallowMount, RouterLinkStub } from '@vue/test-utils'
import Header from '../Header.vue'
import ProfileMenu from '../ProfileMenu.vue'

describe('Header', () => {
    const build = () => {
        const options = {
            data() {
                return {}
            },
            stubs: {
                NuxtLink: RouterLinkStub
            }
        }

        const wrapper = shallowMount(Header, options)

        return {
            wrapper,
            profileMenu: () => wrapper.find(ProfileMenu)
        }
    }

    it.skip('renders the component', () => {
        // arrange
        const { wrapper } = build()

        // assert
        expect(wrapper.html()).toMatchSnapshot()
    })

    it.skip('renders links properly', () => {
        // arrange
        const { wrapper } = build()
        wrapper.setProps({ signedIn: true })

        // assert
        expect(wrapper.html()).toMatchSnapshot()
    })

    it.skip('renders hidden state properly', () => {
        // arrange
        const { wrapper } = build()
        wrapper.setProps({ hidden: true })

        // assert
        expect(wrapper.isEmpty()).toBe(true)
    })
})
