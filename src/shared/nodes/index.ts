import { NodeBuilder, PinType, Pin, Output, Node, Input, InputsData, OutputsData } from '../flow'
import { FlowControls } from '../flow/node'

export const controlPin = new Pin('flow', PinType.Flow)

export const numberPin = new Pin('number', PinType.Data)
export const stringPin = new Pin('string', PinType.Data)
export const booleanPin = new Pin('boolean', PinType.Data)
export const jobPin = new Pin('job', PinType.Data)

export const polymorphicPin = new Pin('polymorphic', PinType.Data, [numberPin, stringPin, booleanPin, jobPin])

export class OnStart extends NodeBuilder {
    constructor() {
        super('OnStart', 'trigger')
    }

    build(node: Node) {
        node.addOutput(new Output('controlOut', 'On Start', controlPin, false))
    }

    async worker(node: Node, inputs: any, outputs: any, control: any) {
        node.processed = true

        control['controlOut']()
    }
}

export class DebugString extends NodeBuilder {
    constructor() {
        super('DebugString', 'action')
    }

    build(node: Node) {
        // Flow io
        node.addInput(new Input('controlIn', 'In', controlPin))
        node.addOutput(new Output('controlOut', 'Out', controlPin))
        // Data io
        node.addInput(new Input('stringIn', 'String to Debug', stringPin))
    }

    async worker(node: Node, inputs: InputsData, outputs: OutputsData, control: FlowControls) {
        console.log(inputs['stringIn'].data)

        node.processed = true
        control['controlOut']()
    }
}

export class Branch extends NodeBuilder {
    constructor() {
        super('Branch', 'control')
    }

    build(node: Node) {
        node.addInput(new Input('controlIn', 'In', controlPin))
        node.addInput(new Input('conditionIn', 'Condition', booleanPin))

        node.addOutput(new Output('controlOutTrue', 'True', controlPin))
        node.addOutput(new Output('controlOutFalse', 'False', controlPin))
    }

    async worker(node: Node, inputs: InputsData, outputs: OutputsData, control: FlowControls) {
        node.processed = true

        if (inputs['conditionIn'].data === true) {
            control['controlOutTrue']()
        } else {
            control['controlOutFalse']()
        }
    }
}

export class ConvertTo extends NodeBuilder {
    constructor() {
        super('ConvertTo', 'data')
    }

    build(node: Node) {
        // Events
        node.on('outcomingconnection', o => {
            this.morphOutput(node)
            node.metadata['morphed'] = true
        })
        // Data types
        node.addInput(new Input('inAny', 'Any', polymorphicPin, false))
        node.addOutput(new Output('outAny', 'Any', polymorphicPin, false))

        if (node.metadata['morphed'] === true) {
            this.morphOutput(node)
        }
    }

    morphOutput(node: Node) {
        node.replaceInput('inAny', new Input('inNumber1', 'Number', numberPin))
    }

    async worker(node: Node, inputs: InputsData, outputs: OutputsData, control: FlowControls) {
        node.processed = true
    }
}

export class All extends NodeBuilder {
    constructor() {
        super('All', 'action')
    }

    build(node: Node) {
        node.addInput(new Input('controlIn', 'In', controlPin))
        node.addInput(new Input('inNumber', 'Number', numberPin))
        node.addInput(new Input('inBoolean', 'Boolean', booleanPin))
        node.addInput(new Input('inText', 'Text', stringPin))
        node.addInput(new Input('inJob', 'Job', jobPin))
        node.addOutput(new Output('controlOut', 'Out', controlPin))
        node.addOutput(new Output('outNumber', 'Number', numberPin))
        node.addOutput(new Output('outBoolean', 'Boolean', booleanPin))
        node.addOutput(new Output('outText', 'Text', stringPin))
        node.addOutput(new Output('outJob', 'Job', jobPin))
    }

    async worker(node: Node, inputs: InputsData, outputs: OutputsData, control: FlowControls) {
        node.processed = true

        control['controlOut']()
    }
}
