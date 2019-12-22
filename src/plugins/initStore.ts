import jwtDecode from 'jwt-decode'

export default ({ store }: any) => {
    if (localStorage.jwt_token) {
        console.log(jwtDecode(localStorage.jwt_token))
        store.commit('user/SET_CURRENT_USER', jwtDecode(localStorage.jwt_token))
    }
}
