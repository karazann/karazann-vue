import { NodeBuilder, PinType, Pin, Output, Node, Input } from '@/shared/flow'

interface ColorMapping { 
    [key: string]: string
}

export const pinColorMapping: ColorMapping = {
    'flow': '#0396FF',
    'text': '#EB5757'
}

export const controlPin = new Pin('flow', PinType.Flow)
export const textPin = new Pin('text', PinType.Data)

export class OnStart extends NodeBuilder {
    constructor() {
        super('OnStart')
    }

    build(node: Node) {
        node.addOutput(new Output('controlOut', controlPin))
    }

    async worker(node: Node, inputs: any, outputs: any, control: any) {
        node.processed = true
        control['control']()
    }
}

export class Console extends NodeBuilder {
    constructor() {
        super('Console')
    }

    build(node: Node) {
        node.addInput(new Input('controlIn', controlPin))
        node.addInput(new Input('textIn', textPin))

        node.addOutput(new Output('controlOut', controlPin))
        node.addOutput(new Output('textOut', textPin))
    }

    async worker(node: Node, inputs: any, outputs: any, control: any) {
        node.processed = true
        control['control']()
    }
}
