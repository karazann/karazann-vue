import { DirectiveOptions } from 'vue'

function listenWindow<K extends keyof WindowEventMap>(event: K, handler: (e: WindowEventMap[K]) => void) {
    window.addEventListener(event, handler)

    return () => {
        window.removeEventListener<K>(event, handler)
    }
}

export const dragDirective = (): DirectiveOptions => {
    const dragHandlers: Map<any, Drag> = new Map()
    return {
        bind(el, bind, vnode) {
            const cbs = bind.value
            if (!cbs.onStart && !cbs.onDrag && !cbs.onEnd) {
                return
            } else {
                // console.debug('register in bind drag:', el.className)
                dragHandlers.set(el, new Drag(el, cbs.onStart, cbs.onDrag, cbs.onEnd))
            }
        },
        componentUpdated(el, bind, vnode) {
            const cbs = bind.value
            const exist = dragHandlers.get(el) ? true : false
            if (exist) return

            if (!cbs.onStart && !cbs.onDrag && !cbs.onEnd) {
                return
            } else {
                // console.debug('register in update drag: ', el.id)
                dragHandlers.set(el, new Drag(el, cbs.onStart, cbs.onDrag, cbs.onEnd))
            }
        },
        unbind(el) {
            dragHandlers.delete(el)
        }
    }
}

export class Drag {
    pointerStart: [number, number] | null

    constructor(el: SVGElement | HTMLElement, public onStart?: (e: PointerEvent) => void, public onDrag?: (x: number, y: number, e: PointerEvent) => void, public onEnd?: (e: PointerEvent) => void) {
        this.pointerStart = null
        el.style.touchAction = 'none'
        el.addEventListener('pointerdown', this.down.bind(this) as EventListenerOrEventListenerObject)

        const destroyMove = listenWindow('pointermove', this.move.bind(this))
        const destroyUp = listenWindow('pointerup', this.up.bind(this))
    }

    down(e: PointerEvent) {
        if ((e.pointerType === 'mouse') && (e.button !== 0)) return
        e.stopPropagation()
        this.pointerStart = [e.pageX, e.pageY]

        if (this.onStart) this.onStart(e)
    }

    move(e: PointerEvent) {
        if (!this.pointerStart) return
        e.preventDefault()

        const [x, y] = [e.pageX, e.pageY]
        const delta = [x - this.pointerStart[0], y - this.pointerStart[1]]

        if (this.onDrag) this.onDrag(delta[0], delta[1], e)
    }

    up(e: PointerEvent) {
        if (!this.pointerStart) return

        this.pointerStart = null

        if (this.onEnd) this.onEnd(e)
    }
}
