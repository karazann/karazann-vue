export default ({ store, redirect }: any) => {
    // If the user is not authenticated
    if (!store.state.user.loggedIn) {
        return redirect('/')
    }
}
