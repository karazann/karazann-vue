export * from './zoom'
export * from './drag'
export * from './validator'

export const createPath = (points: number[], curvature: number) => {
    const [x1, y1, x2, y2] = points
    const hx1 = x1 + Math.abs(x2 - x1) * curvature
    const hx2 = x2 - Math.abs(x2 - x1) * curvature

    return `M ${x1} ${y1} C ${hx1} ${y1} ${hx2} ${y2} ${x2} ${y2}`
}

export const roundPosTo = (points: number[], to: number = 10) => {
    let [x, y] = points

    x = Math.ceil(x / to) * to
    y = Math.ceil(y / to) * to

    return [x, y]
}

interface ColorMapping {
    [key: string]: string
}

export const pinColorMapping: ColorMapping = {
    flow: '#0396FF',
    boolean: '#EB5757',
    text: '#F2C94C',
    number: '#27AE60',
    job: '#F2994A'
}
