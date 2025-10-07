"use client";

import { useEffect, useRef } from "react";
import { Renderer, Program, Mesh, Color, Triangle } from "ogl";

type Props = {
  colorStops?: string[];   // ej: ["#3A29FF", "#FF94B4", "#FF3232"]
  blend?: number;          // 0..1 suavizado del borde
  amplitude?: number;      // intensidad de la “ola”
  speed?: number;          // velocidad
  time?: number;           // offset inicial (opcional)
  className?: string;      // para posicionar con Tailwind o CSS
};

const VERT = `#version 300 es
in vec2 position;
void main() { gl_Position = vec4(position, 0.0, 1.0); }
`;

const FRAG = `#version 300 es
precision highp float;
uniform float uTime;
uniform float uAmplitude;
uniform vec3 uColorStops[3];
uniform vec2 uResolution;
uniform float uBlend;
out vec4 fragColor;

vec3 permute(vec3 x){ return mod(((x*34.0)+1.0)*x,289.0); }
float snoise(vec2 v){
  const vec4 C=vec4(0.211324865405187,0.366025403784439,-0.577350269189626,0.024390243902439);
  vec2 i=floor(v+dot(v,C.yy));
  vec2 x0=v-i+dot(i,C.xx);
  vec2 i1=(x0.x>x0.y)?vec2(1.0,0.0):vec2(0.0,1.0);
  vec4 x12=x0.xyxy+C.xxzz; x12.xy-=i1;
  i=mod(i,289.0);
  vec3 p=permute(permute(i.y+vec3(0.0,i1.y,1.0))+i.x+vec3(0.0,i1.x,1.0));
  vec3 m=max(0.5-vec3(dot(x0,x0),dot(x12.xy,x12.xy),dot(x12.zw,x12.zw)),0.0); m*=m; m*=m;
  vec3 x=2.0*fract(p*C.www)-1.0; vec3 h=abs(x)-0.5; vec3 ox=floor(x+0.5); vec3 a0=x-ox;
  m*=1.79284291400159-0.85373472095314*(a0*a0+h*h);
  vec3 g; g.x=a0.x*x0.x+h.x*x0.y; g.yz=a0.yz*x12.xz+h.yz*x12.yw;
  return 130.0*dot(m,g);
}

struct ColorStop { vec3 color; float position; };
#define COLOR_RAMP(colors,factor,finalColor){ int index=0; \
  for(int i=0;i<2;i++){ ColorStop c=colors[i]; bool ok=c.position<=factor; index=int(mix(float(index),float(i),float(ok))); } \
  ColorStop c=colors[index]; ColorStop n=colors[index+1]; float range=n.position-c.position; \
  float t=(factor-c.position)/range; finalColor=mix(c.color,n.color,t); }

void main(){
  vec2 uv=gl_FragCoord.xy/uResolution;
  ColorStop colors[3];
  colors[0]=ColorStop(uColorStops[0],0.0);
  colors[1]=ColorStop(uColorStops[1],0.5);
  colors[2]=ColorStop(uColorStops[2],1.0);
  vec3 rampColor; COLOR_RAMP(colors,uv.x,rampColor);
  float h=snoise(vec2(uv.x*2.0+uTime*0.1,uTime*0.25))*0.5*uAmplitude;
  h=exp(h); h=(uv.y*2.0-h+0.2);
  float intensity=0.6*h;
  float mid=0.20;
  float auroraAlpha=smoothstep(mid-uBlend*0.5,mid+uBlend*0.5,intensity);
  vec3 auroraColor=intensity*rampColor;
  fragColor=vec4(auroraColor*auroraAlpha,auroraAlpha);
}
`;

export default function Aurora({
  colorStops = ["#5227FF", "#7CFF67", "#5227FF"],
  amplitude = 1.0,
  blend = 0.5,
  speed = 0.5,
  time = 0,
  className = "",
}: Props) {
  const ctnDom = useRef<HTMLDivElement | null>(null);
  const propsRef = useRef<Props>({ colorStops, amplitude, blend, speed, time, className });

  useEffect(() => { propsRef.current = { colorStops, amplitude, blend, speed, time, className }; });

  useEffect(() => {
    const ctn = ctnDom.current;
    if (!ctn) return;

    const renderer = new Renderer({ alpha: true, premultipliedAlpha: true, antialias: true });
    const gl = renderer.gl;
    gl.clearColor(0, 0, 0, 0);
    gl.enable(gl.BLEND);
    gl.blendFunc(gl.ONE, gl.ONE_MINUS_SRC_ALPHA);
    gl.canvas.style.backgroundColor = "transparent";

    let program: Program | undefined;

    const geometry = new Triangle(gl);
    // quitamos UV para ahorrar atributos
    if ((geometry as any).attributes?.uv) delete (geometry as any).attributes.uv;

    const toRGB = (hex: string) => {
      const c = new Color(hex);
      return [c.r, c.g, c.b] as [number, number, number];
    };

    const makeProgram = () =>
      new Program(gl, {
        vertex: VERT,
        fragment: FRAG,
        uniforms: {
          uTime: { value: 0 },
          uAmplitude: { value: amplitude },
          uColorStops: { value: (propsRef.current.colorStops ?? colorStops).map(toRGB) },
          uResolution: { value: [ctn.offsetWidth, ctn.offsetHeight] },
          uBlend: { value: blend },
        },
      });

    program = makeProgram();
    const mesh = new Mesh(gl, { geometry, program });
    ctn.appendChild(gl.canvas);

    const resize = () => {
      const w = ctn.offsetWidth || 1;
      const h = ctn.offsetHeight || 1;
      renderer.setSize(w, h);
      if (program) program.uniforms.uResolution.value = [w, h];
    };
    window.addEventListener("resize", resize);
    resize();

    let raf = 0;
    const loop = (t: number) => {
      raf = requestAnimationFrame(loop);
      const p = propsRef.current;
      if (!program) return;
      program.uniforms.uTime.value = (p.time ?? t * 0.01) * (p.speed ?? 1.0) * 0.1;
      program.uniforms.uAmplitude.value = p.amplitude ?? 1.0;
      program.uniforms.uBlend.value = p.blend ?? 0.5;
      program.uniforms.uColorStops.value = (p.colorStops ?? colorStops).map(toRGB);
      renderer.render({ scene: mesh });
    };
    raf = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
      if (ctn && gl.canvas.parentNode === ctn) ctn.removeChild(gl.canvas);
      gl.getExtension("WEBGL_lose_context")?.loseContext();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // inicializa una sola vez

  return <div ref={ctnDom} className={`aurora-container ${className}`} />;
}
