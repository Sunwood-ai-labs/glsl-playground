#version 300 es
precision highp float;

uniform vec2 resolution;
uniform float time;
out vec4 fragColor;

#define FC gl_FragCoord.xy
#define r resolution
#define t time

vec3 hsv(float h, float s, float v) {
    vec4 k = vec4(1.0, 2.0 / 3.0, 1.0 / 3.0, 3.0);
    vec3 p = abs(fract(vec3(h) + k.xyz) * 6.0 - vec3(k.w));
    return v * mix(vec3(k.x), clamp(p - vec3(k.x), 0.0, 1.0), s);
}

mat2 rotate2D(float angle) {
    float c = cos(angle);
    float s = sin(angle);
    return mat2(c, -s, s, c);
}

void main() {
    vec4 o = vec4(0);
    for(float i = 0.0, g = 0.0, e = 0.0, s = 0.0; ++i < 85.0; o.rgb += hsv(g*i*0.1-0.5, e, s/5e2)) {
        vec3 p = vec3((FC.xy-0.5*r)/r.y+vec2(0,1.1), g+0.1);
        p.zx *= rotate2D(t*0.5);
        s = 2.0;
        for(int i = 0; i++ < 12; p = vec3(2,5,2)-abs(abs(p)*e-vec3(5,4,4)))
            s *= e = max(1.02, 12.0/dot(p,p));
        g += mod(length(p.xz), p.y)/s;
        s = log2(s*0.2);
    }
    fragColor = vec4(o.rgb, 1.0);
}
