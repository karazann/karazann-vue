export default ({ store, redirect }: any) => {
    // If the user is not authenticated
    console.log('fdsf')
    if (!store.state.user.loggedIn) {
        return redirect('/')
    }
}
