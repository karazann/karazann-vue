import { Input, Output, Connection } from './io'
import { INode, IOutputs, IInputs } from './interfaces'
import { EventEmitter as EE } from 'ee-ts'
import { NodeBuilder } from '.'
import { NodeEvents } from './events'

interface IOData {
    data: any
}

export interface OutputsData {
    [key: string]: IOData
}

export interface InputsData {
    [key: string]: IOData
}

export interface FlowControls {
    [key: string]: () => void | Promise<void>
}

export interface NodeMetadata {
    position?: [number, number]
    type?: string
    [key: string]: unknown
}

export class Node extends EE<NodeEvents> {
    private static latestId = 0

    private static incrementId(): number {
        if (!this.latestId) this.latestId = 1
        else this.latestId++
        return this.latestId
    }

    id!: number
    builderName!: string
    processed: boolean = false
    
    metadata: NodeMetadata = {}

    inputs = new Map<string, Input>()
    outputs = new Map<string, Output>()

    outputDatas: OutputsData = {}

    constructor() {
        super()
        this.id = Node.incrementId()
    }

    addInput(input: Input): Node {
        this._add(this.inputs, input, 'node')
        this.emit('addinput', input)
        return this
    }
    
    removeInput(input: Input): void {
        input.removeConnections()
        input.node = null
        
        this.inputs.delete(input.key)
        this.emit('removeinput', input)
    }

    // tslint:disable-next-line: no-shadowed-variable
    replaceInput(oldIn: Input, newIn: Input, migrateConnections: boolean = true) { 
        console.log(oldIn)
        console.log(newIn)
        this.removeInput(oldIn)
        this.addInput(newIn)
        
        /*if (migrateConnections) { 
            const compatible = oldIn.connections.every(c => c.input.pin.compatibleWith(newIn.pin)) 
            if (!compatible) throw new Error('Failed to replace input!') 
            newIn.connections = oldIn.connections
        }*/
    }

    addOutput(output: Output): Node {
        this._add(this.outputs, output, 'node')
        this.emit('addoutput', output)
        return this
    }

    removeOutput(output: Output): void {
        output.removeConnections()
        output.node = null

        this.outputs.delete(output.key)
        this.emit('removeoutput', output)
    }

    getConnections() {
        const ios = [...this.inputs.values(), ...this.outputs.values()]
        const connections = ios.reduce((arr, io) => {
            return [...arr, ...io.connections]
        }, [] as Connection[])

        return connections
    }

    toJSON(): INode {
        const reduceIO = <T extends any>(list: Map<string, Input | Output>) => {
            return Array.from(list).reduce<T>((obj, [key, io]) => {
                obj[key] = io.toJSON()
                return obj
            }, {} as any)
        }

        return {
            id: this.id,
            // inputs: reduceIO<IInputs>(this.inputs),
            outputs: reduceIO<IOutputs>(this.outputs),
            metadata: this.metadata,
            builderName: this.builderName
        }
    }

    static fromJSON(json: INode, b: NodeBuilder) {
        const node = b.createNode()
        
        node.id = json.id
        node.metadata = json.metadata
        node.builderName = json.builderName
        Node.latestId = Math.max(node.id, Node.latestId)

        return node
    }

    private _add<T extends any>(list: Map<string, T>, item: T, prop: string): void {
        if (list.has(item.key)) throw new Error(`Item with key '${item.key}' already been added to the node`)
        // TODO: if (item[prop] !== null) throw new Error('Item has already been added to some node')

        item[prop] = this
        list.set(item.key, item)
    }
}
