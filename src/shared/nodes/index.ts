import { NodeBuilder, PinType, Pin, Output, Node, Input, InputsData, OutputsData, Connection } from '../flow'
import { FlowControls } from '../flow/node'

export const controlPin = new Pin('flow', PinType.Flow)

export const numberPin = new Pin('number', PinType.Data)
export const stringPin = new Pin('string', PinType.Data)
export const booleanPin = new Pin('boolean', PinType.Data)
export const jobPin = new Pin('job', PinType.Data)

export const polymorphicPin = new Pin('polymorphic', PinType.Data, [numberPin, stringPin, booleanPin, jobPin])

class OnStart extends NodeBuilder {
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

class DebugString extends NodeBuilder {
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

class Branch extends NodeBuilder {
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

class ConvertTo extends NodeBuilder {
    constructor() {
        super('ConvertTo', 'data')
    }

    build(node: Node) {
        // Events
        node.on('outcomingconnection', c => {
            node.updateInput('inAny', 'Number', numberPin)
            node.updateOutput('outAny', 'Morphed2', c.input.pin)
            node.metadata['morphed'] = c.input.pin.name
        })
        // Data types
        if (node.metadata['morphed']) {
            let pin: Pin
            switch (node.metadata['morphed']) {
                case 'number':
                    pin = numberPin
                    break
                case 'string':
                    pin = stringPin
                    break
                case 'job':
                    pin = jobPin
                    break
                case 'boolean':
                    pin = booleanPin
                    break
            }
            node.addInput(new Input('inAny', 'Any', numberPin))
            node.addOutput(new Output('outAny', 'Morphed1', pin!))
        } else {
            node.addInput(new Input('inAny', 'Any', polymorphicPin))
            node.addOutput(new Output('outAny', 'Any', polymorphicPin))
        }
    }

    async worker(node: Node, inputs: InputsData, outputs: OutputsData, control: FlowControls) {
        node.processed = true
    }
}

class Sequence extends NodeBuilder {
    constructor() {
        super('Sequence', 'control')
    }

    build(node: Node) {
        node.addInput(new Input('controlIn', 'In', controlPin))

        const count = (node.metadata['squenceCount'] = 4)
        for (let i = 0; i < count; i++) {
            node.addOutput(new Output(`controlOut-${i}`, `Out ${i}`, controlPin))
        }
    }

    async worker(node: Node, inputs: InputsData, outputs: OutputsData, control: FlowControls) {
        const count = (node.metadata['squenceCount'] = 4)

        node.processed = true
        for (let i = 0; i < count; i++) {
            control[`controlOut-${i}`]()
        }
    }
}

class All extends NodeBuilder {
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

export const builders = [new Branch(), new DebugString(), new All(), new ConvertTo(), new OnStart(), new Sequence()]
