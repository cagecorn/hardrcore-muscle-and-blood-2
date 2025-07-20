import { DOMEngine } from '../utils/DOMEngine.js';
import { debugPlacementLogManager } from '../debug/DebugPlacementLogManager.js';

export class BattleDOMEngine {
    constructor(scene, domEngine) {
        this.scene = scene;
        this.domEngine = domEngine;
    }

    addUnitName(sprite, name, isAlly = true) {
        const style = {
            backgroundColor: isAlly ? 'rgba(0,0,255,0.6)' : 'rgba(255,0,0,0.6)',
            color: '#fff',
            padding: '2px 4px',
            borderRadius: '4px',
            fontSize: '12px',
            whiteSpace: 'nowrap',
            pointerEvents: 'none'
        };
        // 이름표가 유닛 위에 위치하도록 오프셋을 조정합니다.
        // 약간의 간격을 두어 시각적으로 분리합니다.
        const offset = { x: 0, y: -sprite.displayHeight / 2 - 10 };
        this.domEngine.createSyncedText(sprite, name, style, offset);
        debugPlacementLogManager.logNameplateCreation(name, sprite.x + offset.x, sprite.y + offset.y);
    }
}
