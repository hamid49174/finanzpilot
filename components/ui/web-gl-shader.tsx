"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";

export function WebGLShader({ className }: { className?: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (!canvasRef.current) return;
    const canvas = canvasRef.current;

    const vertexShader = `
      attribute vec3 position;
      void main() { gl_Position = vec4(position, 1.0); }
    `;

    const fragmentShader = `
      precision highp float;
      uniform vec2 resolution;
      uniform float time;
      uniform float xScale;
      uniform float yScale;
      uniform float distortion;

      void main() {
        vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
        float d = length(p) * distortion;
        float rx = p.x * (1.0 + d);
        float gx = p.x;
        float bx = p.x * (1.0 - d);

        float r = 0.05 / abs(p.y + sin((rx + time) * xScale) * yScale);
        float g = 0.05 / abs(p.y + sin((gx + time) * xScale) * yScale);
        float b = 0.05 / abs(p.y + sin((bx + time) * xScale) * yScale);

        gl_FragColor = vec4(r, g * 0.6, b, 1.0);
      }
    `;

    const scene = new THREE.Scene();
    const renderer = new THREE.WebGLRenderer({ canvas, antialias: true });
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setClearColor(new THREE.Color(0x05050a));

    const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, -1);

    const uniforms = {
      resolution: { value: [window.innerWidth, window.innerHeight] as [number, number] },
      time: { value: 0.0 },
      xScale: { value: 1.0 },
      yScale: { value: 0.5 },
      distortion: { value: 0.05 },
    };

    const positionData = [
      -1.0, -1.0, 0.0, 1.0, -1.0, 0.0, -1.0, 1.0, 0.0, 1.0, -1.0, 0.0, -1.0, 1.0, 0.0, 1.0, 1.0, 0.0,
    ];
    const positions = new THREE.BufferAttribute(new Float32Array(positionData), 3);
    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute("position", positions);

    const material = new THREE.RawShaderMaterial({
      vertexShader,
      fragmentShader,
      uniforms,
      side: THREE.DoubleSide,
    });

    const mesh = new THREE.Mesh(geometry, material);
    scene.add(mesh);

    const handleResize = () => {
      const parent = canvas.parentElement;
      const w = parent ? parent.clientWidth : window.innerWidth;
      const h = parent ? parent.clientHeight : window.innerHeight;
      renderer.setSize(w, h, false);
      uniforms.resolution.value = [w, h];
    };
    handleResize();

    let animationId = 0;
    const animate = () => {
      uniforms.time.value += 0.01;
      renderer.render(scene, camera);
      animationId = requestAnimationFrame(animate);
    };
    animate();

    window.addEventListener("resize", handleResize);

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener("resize", handleResize);
      scene.remove(mesh);
      mesh.geometry.dispose();
      if (mesh.material instanceof THREE.Material) mesh.material.dispose();
      renderer.dispose();
    };
  }, []);

  return <canvas ref={canvasRef} className={className ?? "absolute inset-0 w-full h-full block"} />;
}

export default WebGLShader;
