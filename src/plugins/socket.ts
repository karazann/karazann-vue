
import { Context } from '@nuxt/types'
import io, { Socket } from 'socket.io-client'

export default ({ store, app }: Context, inject: any) => {
    
    const socket = io('http://localhost:8081', {
        query: 'token=' + 'your_jwt'
    })

    

    inject('socket', socket)
}