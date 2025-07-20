import { Boot } from './scenes/Boot.js';
import { Game as MainGame } from './scenes/Game.js';
import { GameOver } from './scenes/GameOver.js';
import { MainMenu } from './scenes/MainMenu.js';
import { Preloader } from './scenes/Preloader.js';
// 영지 화면을 위한 TerritoryScene을 가져옵니다.
import { TerritoryScene } from './scenes/TerritoryScene.js';
// 게임 해상도와 그리드 규격을 관리하는 SurveyEngine을 불러옵니다.
import { surveyEngine } from './utils/SurveyEngine.js';
// phaser 모듈을 직접 불러오면 로컬 서버에서 해석되지 않으므로
// node_modules 경로를 상대 경로로 지정합니다.
// Phaser를 CDN에서 불러와 배포 시 404 오류를 방지합니다.
// ESM 빌드에는 기본 내보내기가 없으므로 전체 네임스페이스를 가져옵니다.
import * as Phaser from 'https://cdn.jsdelivr.net/npm/phaser@3.90.0/dist/phaser.esm.js';

// 논리적 게임 크기를 정의합니다.
const logicalWidth = surveyEngine.canvas.width;  // 1920
const logicalHeight = surveyEngine.canvas.height; // 1080
//  Find out more information about the Game Config at:
//  https://docs.phaser.io/api-documentation/typedef/types-core#gameconfig
const config = {
    type: Phaser.AUTO,
    // scale 객체는 그대로 유지합니다. FIT 모드는 화면 비율을 유지하는 데 중요합니다.
    scale: {
        width: logicalWidth,
        height: logicalHeight,
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH
    },
    parent: 'game-container',
    transparent: true,
    backgroundColor: 'transparent',
    render: {
        pixelArt: false,
        antialias: true,
        // 이 resolution 설정이 핵심입니다. 페이저에게 물리적 픽셀 비율을 알려줍니다.
        resolution: window.devicePixelRatio || 1,
        roundPixels: true,
    },
    scene: [Boot]
};

const StartGame = (parent) => {

    return new Phaser.Game({ ...config, parent });

}

export default StartGame;
