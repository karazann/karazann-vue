import { shallowMount, RouterLinkStub, createLocalVue } from '@vue/test-utils'
import Vuex, { Store } from 'vuex'
// import BlogCarousel from '@/components/blog/BlogCarousel.vue'
// import BlogPage from '../blog/index.vue'

const localVue = createLocalVue()
localVue.use(Vuex)

test('palecholder', () => { 
    expect(true).toBe(true)
})
/*
describe.skip('BlogPage', () => {
    let actions: {
        actionClick: jest.Mock,
        actionInput: jest.Mock
    }
    let store: Store<any>

    const build = () => {
        const wrapper = shallowMount(BlogPage, {
            store,
            localVue,
            stubs: {
                RouterLinkStub
            }
        })

        return {
            wrapper,
            blogCarousel: () => wrapper.find(BlogCarousel)
        }
    }

    beforeEach(() => {
        actions = {
            actionClick: jest.fn(),
            actionInput: jest.fn()
        }
        store = new Vuex.Store({
            modules: {
                blog: {
                    namespaced: true,
                    state: {
                        posts: []
                    },
                    actions
                }
            }
        })
    })

    it('renders the component', () => {
        // arrange
        const { wrapper } = build()

        // assert
        expect(wrapper.html()).toMatchSnapshot()
    })

    it('renders main child components', () => {
        // arrange
        const { wrapper, blogCarousel } = build()

        // assert
        expect(blogCarousel().exists()).toBe(true)
    })

    it('passes a binded posts prop to blog carousel component', () => {
        // arrange
        const { wrapper, blogCarousel } = build()
        // wrapper.({
        // posts: [{ title: 'Test1' }, { title: 'Test2' }]
        // })

        // assert
        expect(blogCarousel().vm.$props.posts).toBe((wrapper.vm as any).posts)
    })
})
*/