import { Node } from './node'
import { Output, Input, Connection } from './io'
import { NodeBuilder } from './builder'

export interface EventTypes {
    // nodecreate: (node: Node) => boolean
    nodecreated: (node: Node) => void

    // noderemove: (node: Node) => boolean
    noderemoved: (node: Node) => void

    // connectioncreate: (input: Input, output: Output) => boolean
    connectioncreated: (connection: Connection) => void

    // connectionremove: (connection: Connection) => boolean
    connectionremoved: (connection: Connection) => void

    clear: () => void

    builderregister: (node: NodeBuilder) => void
    destroy: () => void
}

export interface ConnectionEvents { 
    removeconnection: (connection: Connection) => void
}

export interface NodeEvents {
    incomingconnection: (connection: Connection) => void
    outcomingconnection: (connection: Connection) => void


    addinput: (input: Input) => void
    removeinput: (input: Input) => void
    
    addoutput: (output: Output) => void
    removeoutput: (output: Output) => void
}