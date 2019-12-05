import { NodeBuilder, PinType, Pin, Output, Node, Input } from '~/shared/flow'

interface ColorMapping { 
    [key: string]: string
}

export const pinColorMapping: ColorMapping = {
    'flow': '#0396FF',
    'boolean': '#EB5757',
    'text': '#F2C94C',
    'number': '#27AE60',
    'job': '#F2994A'
}

export const controlPin = new Pin('flow', PinType.Flow)

export const booleanPin = new Pin('boolean', PinType.Data)
export const textPin = new Pin('text', PinType.Data)
export const numberPin = new Pin('number', PinType.Data)
export const jobPin = new Pin('job', PinType.Data)

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

export class Branch extends NodeBuilder {
    constructor() {
        super('Branch')
    }

    build(node: Node) {
        node.addInput(new Input('controlIn', controlPin))
        node.addInput(new Input('valueIn', booleanPin))

        node.addOutput(new Output('controlIf', controlPin))
        node.addOutput(new Output('controlElse', controlPin))
    }

    async worker(node: Node, inputs: any, outputs: any, control: any) {
        node.processed = true
        control['control']()
    }
}

export class All extends NodeBuilder {
    constructor() {
        super('All')
    }

    build(node: Node) {
        node.addInput(new Input('controlIn', controlPin))

        node.addOutput(new Output('controlOut', controlPin))
        node.addOutput(new Output('outNumber', numberPin))
        node.addOutput(new Output('outBoolean', booleanPin))
        node.addOutput(new Output('outText', textPin))
        node.addOutput(new Output('outJob', jobPin))
    }

    async worker(node: Node, inputs: any, outputs: any, control: any) {
        node.processed = true
        control['control']()
    }
}
