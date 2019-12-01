import { shallowMount } from '@vue/test-utils'
import BlogCarousel from '../BlogCarousel.vue'
import BlogCompactPost from '../BlogCompactPost.vue'

describe('BlogCarousel', () => {
    const build = (props: Record<string, any>) => {
        const wrapper = shallowMount(BlogCarousel, { propsData: props })

        return {
            wrapper
        }
    }

    it('renders the component', () => {
        // arrange
        const { wrapper } = build({
            posts: []
        })

        // assert
        expect(wrapper.html()).toMatchSnapshot()
    })

    it('renders main components', () => {
        // arrange
        const { wrapper } = build({
            posts: [
                {
                    slug: '',
                    title: '',
                    description: '',
                    tag: '',
                    image: '',
                    date: ''
                },
                {
                    slug: '',
                    title: '',
                    description: '',
                    tag: '',
                    image: '',
                    date: ''
                }
            ]
        })

        // assert
        expect(wrapper.findAll(BlogCompactPost).length).toEqual(2)
    })
})
