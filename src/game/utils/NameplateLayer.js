import * as Phaser from 'https://cdn.jsdelivr.net/npm/phaser@3.90.0/dist/phaser.esm.js';
import { debugPlacementLogManager } from '../debug/DebugPlacementLogManager.js';

export class NameplateLayer {
    constructor(scene) {
        this.scene = scene;
        const width = scene.scale.gameSize.width * 2;
        const height = scene.scale.gameSize.height * 2;
        this.rt = scene.add.renderTexture(0, 0, width, height).setOrigin(0, 0);
        this.rt.setScrollFactor(0);
        this.rt.setDepth(1000);
        this.rt.setScale(0.5);

        this.nameplates = [];

        scene.events.on('update', this.update, this);
        scene.events.on('shutdown', this.destroy, this);
    }

    addNameplate(sprite, name, isAlly = true) {
        const style = {
            fontFamily: 'Arial',
            fontSize: '24px',
            padding: { x: 4, y: 2 },
            color: '#ffffff',
            backgroundColor: isAlly ? 'rgba(0,0,255,0.6)' : 'rgba(255,0,0,0.6)'
        };
        const text = this.scene.add.text(0, 0, name, style).setOrigin(0.5, 0);
        text.visible = false;
        this.nameplates.push({ sprite, text });
        const offsetY = sprite.displayHeight / 2;
        debugPlacementLogManager.logNameplateCreation(name, sprite.x, sprite.y + offsetY);
    }

    update() {
        if (!this.rt) return;
        this.rt.clear();
        this.nameplates.forEach(({ sprite, text }) => {
            if (!sprite.scene) return;
            const offsetY = sprite.displayHeight / 2;
            text.setPosition(sprite.x, sprite.y + offsetY);
            this.rt.draw(text, text.x * 2, text.y * 2);
        });
    }

    destroy() {
        if (this.rt) {
            this.rt.destroy();
            this.rt = null;
        }
        this.nameplates.forEach(({ text }) => text.destroy());
        this.nameplates = [];
        this.scene.events.off('update', this.update, this);
    }
}
