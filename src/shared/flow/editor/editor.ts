import { Context } from '../core/context'
import { NodeBuilder, Node, Connection, Input, Output, IO } from '..'
import { IData } from '../interfaces'

export class EditorPin {
    position: [number, number] = [0, 0]
    constructor(public io: IO, public node: EditorNode) {}
}

export class EditorNode {
    editorOutPins: EditorPin[] = []
    editorInPins: EditorPin[] = []

    selected = false

    constructor(public node: Node, private builder: NodeBuilder, public editor: Editor) {
        this.buildPins()
        node.on('addinput', input => { 
            this.editorInPins.push(new EditorPin(input, this))
        })
        node.on('addoutput', output => { 
            this.editorOutPins.push(new EditorPin(output, this))
        })
        node.on('removeinput', input => { 
            this.editorInPins.splice(this.editorInPins.findIndex(pin => pin.io === input), 1)
        })
        node.on('removeoutput', output => { 
            this.editorOutPins.splice(this.editorInPins.findIndex(pin => pin.io === output), 1)
        })
    }

    findPin(io: IO) {
        const ios = [...this.editorInPins, ...this.editorOutPins]
        const editorPin = ios.find(pin => pin.io === io)
        return editorPin
    }

    getPinPosition(io: IO) {
        const pin = this.findPin(io)
        if (!pin) throw new Error(`Pin not found for ${io.key}`)
        return pin.position
    }

    destroy() {
        console.debug('destroy editor node')
    }

    buildPins() {
        Array.from(this.node.inputs.values()).forEach(io => {
            this.editorInPins.push(new EditorPin(io, this))
        })
        Array.from(this.node.outputs.values()).forEach(io => {
            this.editorOutPins.push(new EditorPin(io, this))
        })
    }
}

export class EditorConnection {
    
    
    constructor(public connection: Connection, private inputNode: EditorNode, private outputNode: EditorNode) {
        
    }

    /*getPoints() {
        const [x1, y1] = this.outputNode.getPinPosition(this.connection.output)
        const [x2, y2] = this.inputNode.getPinPosition(this.connection.input)

        return [x1, y1, x2, y2]
    }*/

    getPoints() {
        const [x1, y1] = this.outputNode.getPinPosition(this.connection.output)
        const [x2, y2] = this.inputNode.getPinPosition(this.connection.input)

        return [x1, y1, x2, y2]
    }
}

export class EditorSelect {
    list: EditorNode[] = []

    add(item: EditorNode, accumulate = false) {
        item.selected = true
        if (!accumulate) {
            this.each(e => e.selected = false)
            this.list = [item]
        }
        else if (!this.contains(item)) {
            this.list.push(item)
        }
    }

    clear() {
        this.each(e => e.selected = false)
        this.list = []
    }

    remove(item: EditorNode) {
        this.list.splice(this.list.indexOf(item), 1)
        item.selected = false
    }

    contains(item: EditorNode) {
        return this.list.indexOf(item) !== -1
    }

    each(callback: (n: EditorNode, index: number) => void) {
        this.list.forEach(callback)
    }
}

export class Editor extends Context {
    nodes: Node[] = []

    // View Layer
    editorNodes: EditorNode[] = []
    editorConnections: EditorConnection[] = []

    zoomLevel: number = 1
    area!: SVGElement

    select: EditorSelect = new EditorSelect()

    constructor(public root: SVGElement) {
        super()
    }

    toJSON() {
        const data: IData = { nodes: {} }
        this.nodes.forEach(node => (data.nodes[node.id] = node.toJSON()))
        return data
    }

    fromJSON(json: IData) {
        console.time('buildFlow')
        this.clear()

        // Build the node tree from json representation
        for (const value of Object.values(json.nodes)) {
            const b = this.builders.get(value.builderName)!
            const n = Node.fromJSON(value, b)
            this.addNode(n)
        }

        // Build connections
        for (const node of Object.values(json.nodes)) {
            for (const [key, value] of Object.entries(node.outputs)) {
                value.connections.forEach(c => {
                    const editorNode = this.editorNodes.find(n => n.node.id === node.id)!
                    const otherEditorNode = this.editorNodes.find(n => n.node.id === c.node)!
                    // REVIEW: 
                    const output = editorNode.editorOutPins.find(p => p.io.key === key)
                    const input = otherEditorNode.editorInPins.find(p => p.io.key === c.input)
                    this.connect(output!, input!)
                })
            }
        }

        console.timeEnd('buildFlow')
    }

    addNode(node: Node) {
        this.nodes.push(node)

        // View Layer
        const builder = this.builders.get(node.builderName)
        if (!builder) throw new Error(`Builder ${node.builderName} not found`)

        /*node.on('removeoutput', o => {
            this.editorConnections = this.editorConnections.filter(c => c.connection.input.key !== o.key)
        })*/

        this.editorNodes.push(new EditorNode(node, builder, this))
    }

    removeNode(node: Node) {
        node.getConnections().forEach((c: Connection) => this.removeConnection(c))

        this.editorNodes = this.editorNodes.filter(enode => enode.node !== node)

        this.nodes.splice(this.nodes.indexOf(node), 1)
    }

    connect(pin1: EditorPin, pin2: EditorPin) {
        let connection: Connection

        if (pin1.io instanceof Input && pin2.io instanceof Input) throw new Error('Cannot connect input to another input')
        if (pin2.io instanceof Output && pin1.io instanceof Output) throw new Error('Cannot connect output to another output')

        if (pin1.io instanceof Input) {
            connection = (pin2.io as Output).connectTo(pin1.io as Input)
        } else {
            connection = (pin1.io as Output).connectTo(pin2.io as Input)
        }

        connection.one('removeconnection', c => {
            console.log('remm')
            this.editorConnections = this.editorConnections.filter(editorConn => editorConn.connection.id !== c.id)
        })

        this.addConnectionEditor(connection)
    }

    removeConnection(connection: Connection) {
        connection.remove()
    }

    getConnections() {
        return Array.from(this.editorConnections.values())
    }

    getBuilder(name: string) {
        const builder = this.builders.get(name)

        if (!builder) throw new Error(`Builder ${name} not found`)

        return builder
    }

    clear() {
        const nodes = [...this.nodes]
        nodes.forEach(node => this.removeNode(node))
    }

    private addConnectionEditor(connection: Connection) {  
        if (!connection.input.node || !connection.output.node) throw new Error('Connection input or output not added to node')

        const editorInput = this.editorNodes.find(enode => enode.node === connection.input.node)
        const editorOutput = this.editorNodes.find(enode => enode.node === connection.output.node)


        if (!editorInput || !editorOutput) throw new Error('View node not fount for input or output')

        const connView = new EditorConnection(connection, editorInput, editorOutput)
        this.editorConnections.push(connView)
    }
}
