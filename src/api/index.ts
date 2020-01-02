import axios, {AxiosResponse} from 'axios'

const transform = async (res: Promise<AxiosResponse>) => (await res).data

export const unfollowUser = async (userId: string) => await transform(axios.delete(`/follows/${userId}`))