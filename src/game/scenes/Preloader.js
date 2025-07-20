import { Scene } from 'https://cdn.jsdelivr.net/npm/phaser@3.90.0/dist/phaser.esm.js';
import * as Phaser from 'https://cdn.jsdelivr.net/npm/phaser@3.90.0/dist/phaser.esm.js';
import { ImageLoader } from '../utils/ImageLoader.js';
import { imageAssets } from '../data/assetPaths.js';

export class Preloader extends Scene {
    constructor() {
        super('Preloader');
        this.imageLoader = new ImageLoader();
    }

    init() {
        this.add.image(this.cameras.main.width / 2, this.cameras.main.height / 2, 'background');
        this.add.rectangle(512, 384, 468, 32).setStrokeStyle(1, 0xffffff);
        this.add.text(512, 430, '로딩 중...', {
            fontFamily: 'Arial',
            fontSize: '24px',
            color: '#ffffff',
            stroke: '#000000',
            strokeThickness: 5,
        }).setOrigin(0.5);

        this.progressBar = this.add.rectangle(512 - 230, 384, 4, 28, 0xffffff);
    }

    preload() {
        this.imageLoader.load(imageAssets, (progress) => {
            this.progressBar.width = 4 + (460 * progress);
        }).then((loadedImages) => {
            loadedImages.forEach((img, key) => {
                this.textures.addImage(key, img);
            });
            this.onAssetsLoaded();
        }).catch(error => {
            console.error('애셋 로딩 중 심각한 오류 발생:', error);
        });
    }

    onAssetsLoaded() {
        const logo = this.add.image(512, 300, 'logo');
        if (this.textures.exists('logo')) {
            const scale = 400 / this.textures.get('logo').source[0].width;
            logo.setScale(scale);
        }

        const battleTextures = ['warrior', 'gunner', 'zombie'];
        battleTextures.forEach(key => {
            if (this.textures.exists(key)) {
                this.textures.get(key).setFilter(Phaser.Textures.FilterMode.NEAREST);
            }
        });

        this.time.delayedCall(500, () => {
            this.scene.start('TerritoryScene');
        });
    }

    create() {}
}
