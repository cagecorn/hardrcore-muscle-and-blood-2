export class ImageLoader {
    constructor() {
        this.cacheContainer = document.getElementById('image-cache');
        if (!this.cacheContainer) {
            this.cacheContainer = document.createElement('div');
            this.cacheContainer.id = 'image-cache';
            this.cacheContainer.style.display = 'none';
            document.body.appendChild(this.cacheContainer);
        }
        this.loadedImages = new Map();
    }

    load(assetPaths, onProgress) {
        return new Promise((resolve, reject) => {
            const assetKeys = Object.keys(assetPaths);
            const totalAssets = assetKeys.length;
            if (totalAssets === 0) {
                if (onProgress) onProgress(1);
                resolve(this.loadedImages);
                return;
            }
            let loadedCount = 0;
            assetKeys.forEach(key => {
                const path = assetPaths[key];
                const img = new Image();
                img.src = path;
                img.crossOrigin = 'anonymous';
                img.onload = () => {
                    this.loadedImages.set(key, img);
                    this.cacheContainer.appendChild(img);
                    loadedCount++;
                    if (onProgress) {
                        onProgress(loadedCount / totalAssets);
                    }
                    if (loadedCount === totalAssets) {
                        resolve(this.loadedImages);
                    }
                };
                img.onerror = () => {
                    console.error(`이미지 로드 실패: ${key} (${path})`);
                    reject(new Error(`Failed to load image: ${path}`));
                };
            });
        });
    }
}
