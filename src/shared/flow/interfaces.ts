/** Data interfaces */

export interface IConnection {
    node: number
}

export type IInputConnection = IConnection & {
    output: string
}

export type IOutputConnection = IConnection & {
    input: string
}

export interface IInput {
    connections: IInputConnection[]
}

export interface IOutput {
    connections: IOutputConnection[]
}

export interface IInputs {
    [key: string]: IInput
}

export interface IOutputs {
    [key: string]: IOutput
}

export interface INode {
    id: number
    builderName: string
    inputs: IInputs
    outputs: IOutputs
    position: [number, number]
}

export interface INodes {
    [id: string]: INode
}

export interface IData {
    nodes: INodes
}