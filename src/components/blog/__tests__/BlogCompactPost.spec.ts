import { shallowMount, RouterLinkStub } from '@vue/test-utils'
import BlogCompactPost from '../BlogCompactPost.vue'

describe('BlogCompactPost', () => {
    const build = (props: Record<string, any>) => {
        const wrapper = shallowMount(BlogCompactPost, {
            propsData: props,
            stubs: {
                NuxtLink: RouterLinkStub
            }
        })

        return {
            wrapper
        }
    }

    it('renders the component', () => {
        // arrange
        const { wrapper } = build({
            post: {
                slug: 'test-slug',
                title: 'Post title',
                description: 'Post description',
                tag: 'Test',
                image: 'https://karazann.com/images/test.png',
                date: '2019 May 10'
            }
        })

        // assert
        expect(wrapper.html()).toMatchSnapshot()
    })
})
