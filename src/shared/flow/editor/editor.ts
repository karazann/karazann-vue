import { Context } from '../core/context'
import { Node } from '../node'
import { Connection, Input, Output, IO } from '../io'
import { NodeBuilder, PinType } from '..'

export class EditorPin {
    constructor(private io: IO, private node: Node) {}

    /*getPosition({ position }: { position: number[] }): [number, number] {
        const el = this.el;

        return [
            position[0] + el.offsetLeft + el.offsetWidth / 2,
            position[1] + el.offsetTop + el.offsetHeight / 2
        ]
    }*/
}

export class EditorNode {
    editorPins = new Map<IO, EditorPin>()

    constructor(public node: Node, private builder: NodeBuilder) {
        this.buildPins([...node.inputs.values(), ...node.outputs.values()])
    }

    /*getPinPosition(io: IO) {
        const editorPin = this.editorPins.get(io)
        if (!editorPin) throw new Error(`Pin not found for ${io.key}`)

        return editorPin.getPosition(this.node)
    }*/

    destroy() {
        console.debug('destroy editor node')
    }

    private buildPins(ios: IO[]) {
        // this.clearSockets()
        ios.forEach(io => {
            this.editorPins.set(io, new EditorPin(io, this.node))
        })
    }
}

export class EditorConnection {
    constructor(public connection: Connection, private inputNode: EditorNode, private outputNode: EditorNode) {}

    /*getPoints() {
        const [x1, y1] = this.outputNode.getPinPosition(this.connection.output)
        const [x2, y2] = this.inputNode.getPinPosition(this.connection.input)

        return [x1, y1, x2, y2]
    }*/
}

export class Editor extends Context {
    nodes: Node[] = []

    // View Layer
    editorNodes = new Map<Node, EditorNode>()
    editorConnections = new Map<Connection, EditorConnection>()

    constructor(public root: SVGElement) {
        super()
    }

    addNode(node: Node) {
        this.nodes.push(node)

        // View Layer
        const builder = this.builders.get(node.builderName)
        if (!builder) throw new Error(`Builder ${node.builderName} not found`)

        this.editorNodes.set(node, new EditorNode(node, builder))
    }

    removeNode(node: Node) {
        node.getConnections().forEach((c: Connection) => this.removeConnection(c))

        this.nodes.splice(this.nodes.indexOf(node), 1)

        // View Layer
        const editorNode = this.editorNodes.get(node)

        this.editorNodes.delete(node)

        if (editorNode) {
            editorNode.destroy()
        }
    }

    connect(output: Output, input: Input) {
        const connection = output.connectTo(input)
        this.addConnectionEditor(connection)
    }

    removeConnection(connection: Connection) {
        connection.remove()
        this.removeConnectionEditor(connection)
    }

    getBuilder(name: string) {
        const builder = this.builders.get(name)

        if (!builder) throw new Error(`Builder ${name} not found`)

        return builder
    }

    clear() {
        [...this.nodes].forEach(node => this.removeNode(node))
    }

    private addConnectionEditor(connection: Connection) {
        if (!connection.input.node || !connection.output.node) throw new Error('Connection input or output not added to node')

        const editorInput = this.editorNodes.get(connection.input.node)
        const editorOutput = this.editorNodes.get(connection.output.node)

        if (!editorInput || !editorOutput) throw new Error('View node not fount for input or output')

        const connView = new EditorConnection(connection, editorInput, editorOutput)

        this.editorConnections.set(connection, connView)
    }

    private removeConnectionEditor(connection: Connection) {
        this.editorConnections.delete(connection)
    }
}
