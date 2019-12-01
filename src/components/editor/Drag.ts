function listenWindow<K extends keyof WindowEventMap>(event: K, handler: (e: WindowEventMap[K]) => void) {
    window.addEventListener(event, handler)

    return () => {
        window.removeEventListener<K>(event, handler)
    }
}

export class Drag {
    pointerStart: [number, number] | null

    constructor(
        private el: SVGGraphicsElement,
        private onTranslate?: (x: number, y: number, e: PointerEvent) => void,
        private onStart?: (e: PointerEvent) => void,
        private onDrag?: (e: PointerEvent) => void
    ) {
        this.pointerStart = null
        this.el.style.touchAction = 'none'
        this.el.addEventListener('pointerdown', this.down.bind(this))

        const destroyMove = listenWindow('pointermove', this.move.bind(this))
        const destroyUp = listenWindow('pointerup', this.up.bind(this))
    }

    down(e: PointerEvent) {
        e.stopPropagation()
        this.pointerStart = [e.pageX, e.pageY]

        if (this.onStart) this.onStart(e)
    }

    move(e: PointerEvent) {
        if (!this.pointerStart) return
        e.preventDefault()

        const [x, y] = [e.pageX, e.pageY]
        const delta = [x - this.pointerStart[0], y - this.pointerStart[1]]

        if (this.onTranslate) this.onTranslate(delta[0], delta[1], e)
    }

    up(e: PointerEvent) {
        if (!this.pointerStart) return

        this.pointerStart = null

        if (this.onDrag) this.onDrag(e)
    }
}