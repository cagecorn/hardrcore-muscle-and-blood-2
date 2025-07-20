import { debugLogEngine } from '../utils/DebugLogEngine.js';

class DebugPlacementLogManager {
    constructor() {
        this.name = 'DebugPlacement';
        debugLogEngine.register(this);
    }

    /**
     * 유닛 스프라이트가 생성된 좌표를 기록합니다.
     * @param {string} unitName - 유닛 이름
     * @param {number} x - 스프라이트 X 좌표
     * @param {number} y - 스프라이트 Y 좌표
     */
    logSpriteCreation(unitName, x, y) {
        debugLogEngine.log(this.name, `Sprite '${unitName}' created at (${x}, ${y})`);
    }

    /**
     * 이름표 DOM 요소가 생성된 좌표를 기록합니다.
     * @param {string} unitName - 유닛 이름
     * @param {number} x - 이름표 기준 X 좌표
     * @param {number} y - 이름표 기준 Y 좌표
     */
    logNameplateCreation(unitName, x, y) {
        debugLogEngine.log(this.name, `Nameplate for '${unitName}' created at (${x}, ${y})`);
    }
}

export const debugPlacementLogManager = new DebugPlacementLogManager();
