import { WebGLApp } from '../../../js/lib/webgl.js';

// アプリケーションの初期化
async function initApp() {
    const canvas = document.querySelector('#glCanvas');
    const app = new WebGLApp(canvas);
    
    try {
        await app.loadShader('main', 'shaders/vertex.glsl', 'shaders/fragment.glsl');
        app.start();
    } catch (error) {
        console.error('アプリケーションの初期化に失敗しました:', error);
        document.body.innerHTML = `<div class="error">エラー: ${error.message}</div>`;
    }
}

// DOMの読み込み完了後に初期化
document.addEventListener('DOMContentLoaded', initApp);
