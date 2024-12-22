class WebGLApp {
    constructor(canvas) {
        this.canvas = canvas;
        this.gl = canvas.getContext('webgl2');
        if (!this.gl) {
            throw new Error('WebGL2 is not supported');
        }

        this.programs = new Map();
        this.startTime = performance.now();

        // 画面サイズの設定
        this.resize();
        window.addEventListener('resize', () => this.resize());

        // 頂点バッファの初期化
        this.initBuffers();
    }

    async loadShader(name, vertexPath, fragmentPath) {
        const [vertexSource, fragmentSource] = await Promise.all([
            fetch(vertexPath).then(r => r.text()),
            fetch(fragmentPath).then(r => r.text())
        ]);

        const program = this.createProgram(vertexSource, fragmentSource);
        this.programs.set(name, {
            program,
            uniforms: {
                resolution: this.gl.getUniformLocation(program, 'resolution'),
                time: this.gl.getUniformLocation(program, 'time')
            }
        });
    }

    createShader(type, source) {
        const shader = this.gl.createShader(type);
        this.gl.shaderSource(shader, source);
        this.gl.compileShader(shader);

        if (!this.gl.getShaderParameter(shader, this.gl.COMPILE_STATUS)) {
            const info = this.gl.getShaderInfoLog(shader);
            throw new Error('シェーダーのコンパイルに失敗しました。\n\n' + info);
        }
        return shader;
    }

    createProgram(vertexSource, fragmentSource) {
        const program = this.gl.createProgram();
        const vertexShader = this.createShader(this.gl.VERTEX_SHADER, vertexSource);
        const fragmentShader = this.createShader(this.gl.FRAGMENT_SHADER, fragmentSource);

        this.gl.attachShader(program, vertexShader);
        this.gl.attachShader(program, fragmentShader);
        this.gl.linkProgram(program);

        if (!this.gl.getProgramParameter(program, this.gl.LINK_STATUS)) {
            const info = this.gl.getProgramInfoLog(program);
            throw new Error('プログラムのリンクに失敗しました。\n\n' + info);
        }

        return program;
    }

    initBuffers() {
        // フルスクリーン四角形の頂点データ
        const positions = new Float32Array([
            -1, -1,
            1, -1,
            -1, 1,
            1, 1
        ]);

        const vao = this.gl.createVertexArray();
        this.gl.bindVertexArray(vao);

        const positionBuffer = this.gl.createBuffer();
        this.gl.bindBuffer(this.gl.ARRAY_BUFFER, positionBuffer);
        this.gl.bufferData(this.gl.ARRAY_BUFFER, positions, this.gl.STATIC_DRAW);

        this.gl.enableVertexAttribArray(0);
        this.gl.vertexAttribPointer(0, 2, this.gl.FLOAT, false, 0, 0);

        this.vao = vao;
    }

    resize() {
        const displayWidth = this.canvas.clientWidth;
        const displayHeight = this.canvas.clientHeight;

        if (this.canvas.width !== displayWidth || this.canvas.height !== displayHeight) {
            this.canvas.width = displayWidth;
            this.canvas.height = displayHeight;
            this.gl.viewport(0, 0, this.canvas.width, this.canvas.height);
        }
    }

    render() {
        const currentProgram = this.programs.get('main');
        if (!currentProgram) return;

        this.gl.useProgram(currentProgram.program);
        this.gl.bindVertexArray(this.vao);

        // ユニフォーム変数の更新
        this.gl.uniform2f(currentProgram.uniforms.resolution, this.canvas.width, this.canvas.height);
        this.gl.uniform1f(currentProgram.uniforms.time, (performance.now() - this.startTime) * 0.001);

        // 描画
        this.gl.drawArrays(this.gl.TRIANGLE_STRIP, 0, 4);

        // 次のフレームをリクエスト
        requestAnimationFrame(() => this.render());
    }

    start() {
        requestAnimationFrame(() => this.render());
    }
}

export { WebGLApp };
