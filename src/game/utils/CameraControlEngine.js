export class CameraControlEngine {
    constructor(scene) {
        this.scene = scene;
        this.camera = scene.cameras.main;
        this.isDragging = false;
        this.dragStartX = 0;
        this.dragStartY = 0;
        this.minZoom = 0.5;
        this.maxZoom = 2;

        this._registerEvents();
        scene.events.on('shutdown', this.destroy, this);
    }

    _registerEvents() {
        const input = this.scene.input;
        input.on('pointerdown', this._onPointerDown, this);
        input.on('pointerup', this._onPointerUp, this);
        input.on('pointermove', this._onPointerMove, this);
        input.on('wheel', this._onWheel, this);
    }

    _onPointerDown(pointer) {
        this.isDragging = true;
        this.dragStartX = pointer.x;
        this.dragStartY = pointer.y;
    }

    _onPointerUp() {
        this.isDragging = false;
    }

    _onPointerMove(pointer) {
        if (!this.isDragging) return;
        const cam = this.camera;
        const dx = pointer.x - this.dragStartX;
        const dy = pointer.y - this.dragStartY;
        cam.scrollX -= dx / cam.zoom;
        cam.scrollY -= dy / cam.zoom;
        this.dragStartX = pointer.x;
        this.dragStartY = pointer.y;
    }

    _onWheel(pointer, currentlyOver, dx, dy) {
        const cam = this.camera;
        const zoomFactor = 0.001;
        const newZoom = Math.max(this.minZoom, Math.min(this.maxZoom, cam.zoom - dy * zoomFactor));
        cam.setZoom(newZoom);
    }

    destroy() {
        const input = this.scene.input;
        input.off('pointerdown', this._onPointerDown, this);
        input.off('pointerup', this._onPointerUp, this);
        input.off('pointermove', this._onPointerMove, this);
        input.off('wheel', this._onWheel, this);
    }
}
