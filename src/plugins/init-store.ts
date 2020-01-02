import jwtDecode from 'jwt-decode'

export default ({ store }: any) => {
    if (localStorage.jwt_token) {
        const payload = {
            user: jwtDecode(localStorage.jwt_token),
            avatarImageUrl: '',
            coverImageUrl: ''
        }
        store.commit('user/SET_CURRENT_USER', payload)
    }
}
