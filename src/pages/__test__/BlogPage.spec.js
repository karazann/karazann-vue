import { shallowMount, RouterLinkStub, createLocalVue } from '@vue/test-utils'
import Vuex from 'vuex'
import BlogCarousel from '@/components/blog/BlogCarousel.vue'
import BlogPage from '../blog/index.vue'

const localVue = createLocalVue()
localVue.use(Vuex)

describe('BlogPage', () => {
	let actions
	let store

	const build = () => {
		const wrapper = shallowMount(BlogPage, {
			store,
			localVue,
			stub: {
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
		//wrapper.({
		//	posts: [{ title: 'Test1' }, { title: 'Test2' }]
		//})

		// assert
		expect(blogCarousel().vm.$props.posts).toBe(wrapper.vm.posts)
	})
})
