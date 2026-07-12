"use client";
import React, { useRef, useEffect, useState, useCallback } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import { motion, AnimatePresence } from 'framer-motion';
import {ChevronLeft, ChevronRight, } from 'lucide-react';

import * as THREE from 'three';

// =========================================================================
// SEO METADATA COMPONENT (inject into head externally via Next.js metadata)
// =========================================================================
// Add to your page.js or layout.js:
// export const metadata = {
//   title: "Aarvi Encon | Engineering Services - Oil & Gas, EPC, Power Infrastructure",
//   description: "39+ years of excellence in technical manpower and engineering services for Oil & Gas, EPC, Power and Infrastructure sectors across India and globally.",
//   keywords: ["engineering services", "oil gas staffing", "EPC manpower", "technical staffing India", "Aarvi Encon"],
// };

// =========================================================================
// SHARED WIREFRAME MATERIAL FACTORY
// =========================================================================
function WireMat({ color = "#00bfff", opacity = 0.7, key }) {
  return <meshBasicMaterial wireframe color={color} transparent opacity={opacity} />;
}

// =========================================================================
// MODEL 1: OIL REFINERY FRACTIONATION COMPLEX
// Mimics: tall distillation columns, pipe rack, horizontal vessels, flare
// =========================================================================
function RefineryModel({ progress, color }) {
  const op = (base) => base * progress;
  const wireMat = (alpha = 0.7) => (
    <meshBasicMaterial wireframe color={color} transparent opacity={op(alpha)} />
  );
  const solidMat = (alpha = 0.08) => (
    <meshBasicMaterial color={color} transparent opacity={op(alpha)} />
  );

  return (
    <group>
      {/* === MAIN FRACTIONATION COLUMN (tallest, left-center) === */}
      <group position={[-1.2, 0, 0]}>
        {/* Main column body */}
        <mesh position={[0, 1.8, 0]}>
          <cylinderGeometry args={[0.28, 0.30, 3.6, 20, 1]} />
          {solidMat(0.06)}
        </mesh>
        <mesh position={[0, 1.8, 0]}>
          <cylinderGeometry args={[0.28, 0.30, 3.6, 20, 1]} />
          {wireMat(0.8)}
        </mesh>
        {/* Column cap */}
        <mesh position={[0, 3.65, 0]}>
          <coneGeometry args={[0.28, 0.3, 20]} />
          {wireMat(0.6)}
        </mesh>
        {/* Tray rings - 8 trays */}
        {[0.4, 0.8, 1.2, 1.6, 2.0, 2.4, 2.8, 3.2].map((h, i) => (
          <mesh key={i} position={[0, h, 0]} rotation={[Math.PI / 2, 0, 0]}>
            <ringGeometry args={[0.20, 0.30, 20]} />
            {wireMat(0.4)}
          </mesh>
        ))}
        {/* Side nozzles (draw-off points) */}
        {[0.8, 1.6, 2.4, 3.0].map((h, i) => (
          <mesh key={i} position={[0.30, h, 0]} rotation={[0, 0, Math.PI / 2]}>
            <cylinderGeometry args={[0.03, 0.03, 0.25, 8]} />
            {wireMat(0.7)}
          </mesh>
        ))}
        {/* Base skirt */}
        <mesh position={[0, 0.1, 0]}>
          <cylinderGeometry args={[0.35, 0.45, 0.2, 20]} />
          {wireMat(0.5)}
        </mesh>
        {/* Access ladder */}
        <mesh position={[-0.32, 1.8, 0]} rotation={[0, 0, 0]}>
          <boxGeometry args={[0.02, 3.6, 0.08]} />
          {wireMat(0.5)}
        </mesh>
        {[0.3, 0.7, 1.1, 1.5, 1.9, 2.3, 2.7, 3.1].map((h, i) => (
          <mesh key={i} position={[-0.32, h, 0]} rotation={[0, 0, Math.PI / 2]}>
            <cylinderGeometry args={[0.01, 0.01, 0.12, 6]} />
            {wireMat(0.4)}
          </mesh>
        ))}
      </group>

      {/* === SECONDARY CRACKING/STRIPPER COLUMN === */}
      <group position={[-0.3, 0, 0.4]}>
        <mesh position={[0, 1.3, 0]}>
          <cylinderGeometry args={[0.18, 0.20, 2.6, 16]} />
          {solidMat()}
        </mesh>
        <mesh position={[0, 1.3, 0]}>
          <cylinderGeometry args={[0.18, 0.20, 2.6, 16]} />
          {wireMat(0.75)}
        </mesh>
        <mesh position={[0, 2.65, 0]}>
          <sphereGeometry args={[0.18, 16, 12]} />
          {wireMat(0.6)}
        </mesh>
        {[0.5, 1.0, 1.5, 2.0].map((h, i) => (
          <mesh key={i} position={[0, h, 0]} rotation={[Math.PI / 2, 0, 0]}>
            <ringGeometry args={[0.12, 0.20, 16]} />
            {wireMat(0.35)}
          </mesh>
        ))}
        {/* Pipe connection to main column */}
        <mesh position={[-0.45, 1.0, -0.2]} rotation={[0, 0.3, Math.PI / 2]}>
          <cylinderGeometry args={[0.025, 0.025, 1.0, 8]} />
          {wireMat(0.6)}
        </mesh>
      </group>

      {/* === VACUUM COLUMN (right side, wide) === */}
      <group position={[0.6, 0, -0.5]}>
        <mesh position={[0, 1.1, 0]}>
          <cylinderGeometry args={[0.34, 0.36, 2.2, 20]} />
          {solidMat()}
        </mesh>
        <mesh position={[0, 1.1, 0]}>
          <cylinderGeometry args={[0.34, 0.36, 2.2, 20]} />
          {wireMat(0.7)}
        </mesh>
        <mesh position={[0, 2.3, 0]}>
          <coneGeometry args={[0.34, 0.4, 20]} />
          {wireMat(0.5)}
        </mesh>
        {/* Wide tray rings */}
        {[0.4, 0.9, 1.4, 1.9].map((h, i) => (
          <mesh key={i} position={[0, h, 0]} rotation={[Math.PI / 2, 0, 0]}>
            <ringGeometry args={[0.26, 0.36, 20]} />
            {wireMat(0.4)}
          </mesh>
        ))}
      </group>

      {/* === HORIZONTAL PRESSURE VESSEL / FEED DRUM === */}
      <group position={[0.5, 0.35, 0.8]}>
        <mesh rotation={[0, 0, Math.PI / 2]}>
          <cylinderGeometry args={[0.22, 0.22, 1.2, 16]} />
          {solidMat()}
        </mesh>
        <mesh rotation={[0, 0, Math.PI / 2]}>
          <cylinderGeometry args={[0.22, 0.22, 1.2, 16]} />
          {wireMat(0.7)}
        </mesh>
        {/* End caps */}
        {[-0.62, 0.62].map((x, i) => (
          <mesh key={i} position={[x, 0, 0]} rotation={[0, 0, Math.PI / 2]}>
            <sphereGeometry args={[0.22, 16, 10, 0, Math.PI]} />
            {wireMat(0.5)}
          </mesh>
        ))}
        {/* Saddle supports */}
        {[-0.3, 0.3].map((x, i) => (
          <mesh key={i} position={[x, -0.3, 0]}>
            <boxGeometry args={[0.08, 0.3, 0.4]} />
            {wireMat(0.5)}
          </mesh>
        ))}
      </group>

      {/* === PIPE RACK / PIPE BRIDGE === */}
      <group position={[-0.2, 0, -0.1]}>
        {/* Rack structure columns */}
        {[-0.5, 0.5].map((x, i) => (
          <mesh key={i} position={[x, 0.6, 0]}>
            <boxGeometry args={[0.04, 1.2, 0.04]} />
            {wireMat(0.6)}
          </mesh>
        ))}
        {/* Cross beams */}
        {[0.6, 1.0].map((y, i) => (
          <mesh key={i} position={[0, y, 0]}>
            <boxGeometry args={[1.0, 0.03, 0.04]} />
            {wireMat(0.6)}
          </mesh>
        ))}
        {/* Pipes running on rack */}
        {[-0.3, -0.15, 0, 0.15, 0.30].map((z, i) => (
          <mesh key={i} position={[0, 1.05, z]} rotation={[0, 0, Math.PI / 2]}>
            <cylinderGeometry args={[0.018, 0.018, 1.0, 8]} />
            {wireMat(0.55)}
          </mesh>
        ))}
      </group>

      {/* === GAS STORAGE SPHERE === */}
      <group position={[1.4, 0.28, 0.2]}>
        <mesh>
          <sphereGeometry args={[0.38, 24, 16]} />
          {solidMat(0.05)}
        </mesh>
        <mesh>
          <sphereGeometry args={[0.38, 24, 16]} />
          {wireMat(0.65)}
        </mesh>
        {/* Sphere legs */}
        {[0, 72, 144, 216, 288].map((angle, i) => (
          <mesh
            key={i}
            position={[
              Math.sin((angle * Math.PI) / 180) * 0.28,
              -0.22,
              Math.cos((angle * Math.PI) / 180) * 0.28,
            ]}
          >
            <cylinderGeometry args={[0.015, 0.02, 0.5, 6]} />
            {wireMat(0.6)}
          </mesh>
        ))}
      </group>

      {/* === FLARE STACK === */}
      <group position={[1.5, 0, -0.8]}>
        <mesh position={[0, 1.5, 0]}>
          <cylinderGeometry args={[0.04, 0.06, 3.0, 10]} />
          {wireMat(0.8)}
        </mesh>
        {/* Guy wires */}
        {[0, 120, 240].map((angle, i) => (
          <mesh
            key={i}
            position={[
              Math.sin((angle * Math.PI) / 180) * 0.4,
              0.8,
              Math.cos((angle * Math.PI) / 180) * 0.4,
            ]}
            rotation={[
              Math.atan2(0.8, 0.4),
              (angle * Math.PI) / 180,
              0,
            ]}
          >
            <cylinderGeometry args={[0.005, 0.005, 0.9, 4]} />
            {wireMat(0.4)}
          </mesh>
        ))}
        {/* Flare tip */}
        <mesh position={[0, 3.0, 0]}>
          <coneGeometry args={[0.04, 0.15, 8]} />
          {wireMat(0.9)}
        </mesh>
      </group>

      {/* === HEAT EXCHANGERS (shell & tube banks) === */}
      <group position={[-0.9, 0.15, 0.9]}>
        {[0, 0.28, 0.56].map((z, i) => (
          <group key={i} position={[0, 0, z]}>
            <mesh rotation={[0, 0, Math.PI / 2]}>
              <cylinderGeometry args={[0.10, 0.10, 0.7, 12]} />
              {wireMat(0.6)}
            </mesh>
            {/* Tube bundle indicator */}
            {[-0.05, 0, 0.05].map((dy, j) => (
              <mesh key={j} position={[0, dy, 0]} rotation={[0, 0, Math.PI / 2]}>
                <cylinderGeometry args={[0.015, 0.015, 0.7, 6]} />
                {wireMat(0.3)}
              </mesh>
            ))}
          </group>
        ))}
      </group>

      {/* === GROUND PLANE / FOUNDATION GRID === */}
      <mesh position={[0, -0.02, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[4.0, 3.5, 10, 8]} />
        <meshBasicMaterial wireframe color={color} transparent opacity={op(0.12)} />
      </mesh>
    </group>
  );
}

// =========================================================================
// MODEL 2: OFFSHORE SEMI-SUBMERSIBLE RIG
// Mimics image 2: large pontoons, columns, main deck, derrick tower
// =========================================================================
function OffshoreRigModel({ progress, color }) {
  const op = (base) => base * progress;
  const wireMat = (alpha = 0.7) => (
    <meshBasicMaterial wireframe color={color} transparent opacity={op(alpha)} />
  );
  const solidMat = (alpha = 0.06) => (
    <meshBasicMaterial color={color} transparent opacity={op(alpha)} />
  );

  return (
    <group>
      {/* === TWIN PONTOONS (lower hull) === */}
      {[-0.85, 0.85].map((x, pi) => (
        <group key={pi} position={[x, -1.2, 0]}>
          {/* Main pontoon body */}
          <mesh rotation={[Math.PI / 2, 0, 0]}>
            <cylinderGeometry args={[0.28, 0.28, 2.8, 20]} />
            {solidMat()}
          </mesh>
          <mesh rotation={[Math.PI / 2, 0, 0]}>
            <cylinderGeometry args={[0.28, 0.28, 2.8, 20]} />
            {wireMat(0.75)}
          </mesh>
          {/* Pontoon end caps */}
          {[-1.42, 1.42].map((z, i) => (
            <mesh key={i} position={[0, 0, z]} rotation={[Math.PI / 2, 0, 0]}>
              <sphereGeometry args={[0.28, 16, 10, 0, Math.PI]} />
              {wireMat(0.5)}
            </mesh>
          ))}
          {/* Internal frame rings */}
          {[-1.0, -0.4, 0.4, 1.0].map((z, i) => (
            <mesh key={i} position={[0, 0, z]}>
              <torusGeometry args={[0.25, 0.015, 8, 20]} />
              {wireMat(0.35)}
            </mesh>
          ))}
          {/* Bilge keels */}
          <mesh position={[0, -0.3, 0]} rotation={[Math.PI / 2, 0, 0]}>
            <boxGeometry args={[0.04, 2.8, 0.12]} />
            {wireMat(0.4)}
          </mesh>
        </group>
      ))}

      {/* === BRACING PONTOON (fore/aft cross-brace) === */}
      {[-1.1, 1.1].map((z, i) => (
        <mesh key={i} position={[0, -1.2, z]} rotation={[0, 0, Math.PI / 2]}>
          <cylinderGeometry args={[0.14, 0.14, 1.7, 14]} />
          {wireMat(0.6)}
        </mesh>
      ))}

      {/* === 4 MAIN COLUMNS (connect pontoons to deck) === */}
      {[
        [-0.85, -1.0],
        [0.85, -1.0],
        [-0.85, 1.0],
        [0.85, 1.0],
      ].map(([x, z], i) => (
        <group key={i} position={[x, -0.2, z]}>
          <mesh>
            <cylinderGeometry args={[0.22, 0.28, 2.0, 18]} />
            {solidMat()}
          </mesh>
          <mesh>
            <cylinderGeometry args={[0.22, 0.28, 2.0, 18]} />
            {wireMat(0.75)}
          </mesh>
          {/* Column ring stiffeners */}
          {[-0.6, 0, 0.6].map((dy, j) => (
            <mesh key={j} position={[0, dy, 0]}>
              <torusGeometry args={[0.24, 0.012, 8, 18]} />
              {wireMat(0.4)}
            </mesh>
          ))}
        </group>
      ))}

      {/* === LOWER PONTOON CROSS BRACINGS (X-braces) === */}
      {[
        [[-0.85, -1.2, -1.0], [0.85, -1.2, 1.0]],
        [[0.85, -1.2, -1.0], [-0.85, -1.2, 1.0]],
      ].map(([[x1, y1, z1], [x2, y2, z2]], i) => {
        const dx = x2 - x1, dy = y2 - y1, dz = z2 - z1;
        const len = Math.sqrt(dx * dx + dy * dy + dz * dz);
        const mx = (x1 + x2) / 2, my = (y1 + y2) / 2, mz = (z1 + z2) / 2;
        return (
          <mesh
            key={i}
            position={[mx, my, mz]}
            rotation={[Math.atan2(dz, Math.sqrt(dx * dx + dy * dy)), 0, Math.atan2(dy, dx) + Math.PI / 2]}
          >
            <cylinderGeometry args={[0.045, 0.045, len, 8]} />
            {wireMat(0.45)}
          </mesh>
        );
      })}

      {/* === MAIN DECK PLATFORM === */}
      <group position={[0, 0.85, 0]}>
        {/* Main deck box */}
        <mesh>
          <boxGeometry args={[2.4, 0.12, 2.6, 8, 2, 8]} />
          {solidMat(0.08)}
        </mesh>
        <mesh>
          <boxGeometry args={[2.4, 0.12, 2.6, 8, 2, 8]} />
          {wireMat(0.7)}
        </mesh>
        {/* Helideck (elevated at rear) */}
        <group position={[-0.7, 0.3, 0.9]}>
          <mesh>
            <cylinderGeometry args={[0.42, 0.42, 0.06, 20]} />
            {wireMat(0.65)}
          </mesh>
          {/* H marking */}
          <mesh position={[0, 0.04, 0]}>
            <cylinderGeometry args={[0.38, 0.38, 0.01, 20]} />
            <meshBasicMaterial wireframe color={color} transparent opacity={op(0.2)} />
          </mesh>
          {/* Helideck supports */}
          {[0, 90, 180, 270].map((angle, i) => (
            <mesh
              key={i}
              position={[
                Math.sin((angle * Math.PI) / 180) * 0.32,
                -0.18,
                Math.cos((angle * Math.PI) / 180) * 0.32,
              ]}
            >
              <cylinderGeometry args={[0.018, 0.018, 0.3, 6]} />
              {wireMat(0.5)}
            </mesh>
          ))}
        </group>

        {/* Module buildings on deck */}
        {[
          [0.5, 0.2, -0.6, 0.6, 0.35, 0.5],
          [0.5, 0.12, 0.2, 0.5, 0.2, 0.5],
          [-0.5, 0.1, -0.5, 0.4, 0.18, 0.4],
        ].map(([x, y, z, w, h, d], i) => (
          <group key={i} position={[x, y, z]}>
            <mesh>
              <boxGeometry args={[w, h, d]} />
              {solidMat(0.06)}
            </mesh>
            <mesh>
              <boxGeometry args={[w, h, d]} />
              {wireMat(0.6)}
            </mesh>
          </group>
        ))}

        {/* === DERRICK / DRILLING TOWER === */}
        <group position={[0.2, 0, 0]}>
          {/* 4-leg derrick structure */}
          {[
            [-0.18, -0.18],
            [0.18, -0.18],
            [-0.18, 0.18],
            [0.18, 0.18],
          ].map(([x, z], i) => (
            <mesh key={i} position={[x, 1.0, z]} rotation={[
              Math.atan2(x * 0.5, 1.0) * (z < 0 ? 1 : -1),
              0,
              Math.atan2(x * 0.5, 1.0) * (x < 0 ? 1 : -1),
            ]}>
              <cylinderGeometry args={[0.018, 0.028, 2.2, 8]} />
              {wireMat(0.8)}
            </mesh>
          ))}
          {/* Derrick cross-bracing at intervals */}
          {[0.5, 1.0, 1.5].map((y, i) => (
            <mesh key={i} position={[0, y, 0]}>
              <boxGeometry args={[0.38, 0.015, 0.38]} />
              {wireMat(0.45)}
            </mesh>
          ))}
          {/* Crown block at top */}
          <mesh position={[0, 2.1, 0]}>
            <boxGeometry args={[0.22, 0.18, 0.22]} />
            {wireMat(0.7)}
          </mesh>
          {/* Travelling block / hook */}
          <mesh position={[0, 1.6, 0]}>
            <boxGeometry args={[0.10, 0.12, 0.10]} />
            {wireMat(0.6)}
          </mesh>
          {/* Draw works housing */}
          <mesh position={[0, 0.15, 0]}>
            <boxGeometry args={[0.45, 0.28, 0.55]} />
            {wireMat(0.65)}
          </mesh>
        </group>

        {/* Cranes on deck */}
        <group position={[0.9, 0.2, 0.6]}>
          <mesh>
            <cylinderGeometry args={[0.06, 0.08, 0.4, 8]} />
            {wireMat(0.7)}
          </mesh>
          <mesh position={[0.3, 0.35, 0]} rotation={[0, 0, -Math.PI / 6]}>
            <boxGeometry args={[0.65, 0.04, 0.04]} />
            {wireMat(0.6)}
          </mesh>
        </group>

        {/* Riser portico */}
        <mesh position={[0, -0.3, 0]}>
          <cylinderGeometry args={[0.06, 0.06, 0.5, 8]} />
          {wireMat(0.6)}
        </mesh>
      </group>

      {/* === RISER / MOORING LINES === */}
      {[45, 135, 225, 315].map((angle, i) => {
        const rad = (angle * Math.PI) / 180;
        return (
          <mesh
            key={i}
            position={[Math.sin(rad) * 0.8, -1.6, Math.cos(rad) * 0.8]}
            rotation={[
              Math.atan2(1.2, 0.8),
              -rad,
              0,
            ]}
          >
            <cylinderGeometry args={[0.012, 0.012, 1.5, 6]} />
            <meshBasicMaterial color={color} transparent opacity={op(0.3)} />
          </mesh>
        );
      })}
    </group>
  );
}

// =========================================================================
// MODEL 3: CHEMICAL PROCESS PLANT
// Mimics image 3: reactor towers, storage tanks, pipe connections
// =========================================================================
function ChemicalPlantModel({ progress, color }) {
  const op = (base) => base * progress;
  const wireMat = (alpha = 0.7) => (
    <meshBasicMaterial wireframe color={color} transparent opacity={op(alpha)} />
  );
  const solidMat = (alpha = 0.06) => (
    <meshBasicMaterial color={color} transparent opacity={op(alpha)} />
  );

  return (
    <group>
      {/* === REACTOR COLUMN CLUSTER (4 tall towers) === */}
      {[
        [-1.1, 0, -0.3, 0.16, 2.8],
        [-0.6, 0, -0.6, 0.14, 2.4],
        [0.5, 0, -0.5, 0.18, 3.2],
        [0.9, 0, -0.2, 0.13, 2.0],
      ].map(([x, y, z, r, h], i) => (
        <group key={i} position={[x, 0, z]}>
          <mesh position={[0, h / 2, 0]}>
            <cylinderGeometry args={[r, r * 1.05, h, 16]} />
            {solidMat()}
          </mesh>
          <mesh position={[0, h / 2, 0]}>
            <cylinderGeometry args={[r, r * 1.05, h, 16]} />
            {wireMat(0.75)}
          </mesh>
          {/* Platform rings */}
          {[h * 0.33, h * 0.66].map((ph, pi) => (
            <group key={pi} position={[0, ph, 0]}>
              <mesh rotation={[Math.PI / 2, 0, 0]}>
                <ringGeometry args={[r, r + 0.14, 16]} />
                {wireMat(0.4)}
              </mesh>
              {/* Platform railing posts */}
              {[0, 45, 90, 135, 180, 225, 270, 315].map((angle, ai) => (
                <mesh
                  key={ai}
                  position={[
                    Math.sin((angle * Math.PI) / 180) * (r + 0.14),
                    0.08,
                    Math.cos((angle * Math.PI) / 180) * (r + 0.14),
                  ]}
                >
                  <cylinderGeometry args={[0.008, 0.008, 0.16, 4]} />
                  {wireMat(0.35)}
                </mesh>
              ))}
            </group>
          ))}
          {/* Column top cap */}
          <mesh position={[0, h, 0]}>
            <coneGeometry args={[r, 0.25, 16]} />
            {wireMat(0.55)}
          </mesh>
          {/* Skirt base */}
          <mesh position={[0, 0.08, 0]}>
            <cylinderGeometry args={[r + 0.05, r + 0.12, 0.16, 16]} />
            {wireMat(0.5)}
          </mesh>
          {/* Side nozzles */}
          {[h * 0.25, h * 0.5, h * 0.75].map((nz, ni) => (
            <mesh key={ni} position={[r + 0.12, nz, 0]} rotation={[0, 0, Math.PI / 2]}>
              <cylinderGeometry args={[0.025, 0.025, 0.22, 8]} />
              {wireMat(0.55)}
            </mesh>
          ))}
        </group>
      ))}

      {/* === LARGE FLAT-BOTTOM STORAGE TANKS === */}
      {[
        [0.1, 0, 0.8, 0.52, 0.55],
        [0.85, 0, 0.85, 0.38, 0.48],
        [-0.5, 0, 0.95, 0.42, 0.52],
      ].map(([x, y, z, r, h], i) => (
        <group key={i} position={[x, 0, z]}>
          {/* Tank shell */}
          <mesh position={[0, h / 2, 0]}>
            <cylinderGeometry args={[r, r, h, 24]} />
            {solidMat(0.05)}
          </mesh>
          <mesh position={[0, h / 2, 0]}>
            <cylinderGeometry args={[r, r, h, 24]} />
            {wireMat(0.65)}
          </mesh>
          {/* Cone roof */}
          <mesh position={[0, h, 0]}>
            <coneGeometry args={[r, r * 0.2, 24]} />
            {wireMat(0.55)}
          </mesh>
          {/* Stiffening rings */}
          {[h * 0.3, h * 0.6, h * 0.85].map((rh, ri) => (
            <mesh key={ri} position={[0, rh, 0]}>
              <torusGeometry args={[r, 0.012, 6, 24]} />
              {wireMat(0.35)}
            </mesh>
          ))}
          {/* Foundation */}
          <mesh position={[0, -0.04, 0]}>
            <cylinderGeometry args={[r + 0.06, r + 0.1, 0.08, 24]} />
            {wireMat(0.4)}
          </mesh>
          {/* Tank nozzles */}
          <mesh position={[r, h * 0.15, 0]} rotation={[0, 0, Math.PI / 2]}>
            <cylinderGeometry args={[0.035, 0.035, 0.2, 8]} />
            {wireMat(0.6)}
          </mesh>
          <mesh position={[0, h + 0.1, 0]}>
            <cylinderGeometry args={[0.03, 0.03, 0.2, 8]} />
            {wireMat(0.55)}
          </mesh>
        </group>
      ))}

      {/* === PIPE NETWORK / MANIFOLD === */}
      <group position={[0, 0.4, 0]}>
        {/* Main header pipe (longitudinal) */}
        <mesh position={[0, 0, 0]} rotation={[0, 0, Math.PI / 2]}>
          <cylinderGeometry args={[0.04, 0.04, 2.8, 12]} />
          {wireMat(0.7)}
        </mesh>
        {/* Branch pipes (lateral connections) */}
        {[-0.9, -0.45, 0, 0.45, 0.9].map((x, i) => (
          <group key={i} position={[x, 0, 0]}>
            <mesh rotation={[Math.PI / 2, 0, 0]}>
              <cylinderGeometry args={[0.022, 0.022, 0.8, 8]} />
              {wireMat(0.55)}
            </mesh>
            {/* Elbow indicator */}
            <mesh position={[0, 0, -0.42]}>
              <torusGeometry args={[0.022, 0.012, 6, 10, Math.PI / 2]} />
              {wireMat(0.5)}
            </mesh>
          </group>
        ))}
        {/* Pipe supports */}
        {[-0.7, 0, 0.7].map((x, i) => (
          <mesh key={i} position={[x, -0.25, 0]}>
            <boxGeometry args={[0.04, 0.5, 0.08]} />
            {wireMat(0.45)}
          </mesh>
        ))}
      </group>

      {/* === HEAT EXCHANGER BATTERY === */}
      <group position={[-1.1, 0.18, 0.7]}>
        {[0, 0.32, 0.64].map((z, i) => (
          <group key={i} position={[0, 0, z]}>
            <mesh rotation={[Math.PI / 2, 0, 0]}>
              <cylinderGeometry args={[0.12, 0.12, 0.8, 14]} />
              {solidMat()}
            </mesh>
            <mesh rotation={[Math.PI / 2, 0, 0]}>
              <cylinderGeometry args={[0.12, 0.12, 0.8, 14]} />
              {wireMat(0.65)}
            </mesh>
            {/* Channel heads */}
            {[-0.42, 0.42].map((zz, j) => (
              <mesh key={j} position={[0, 0, zz]}>
                <cylinderGeometry args={[0.14, 0.14, 0.06, 14]} />
                {wireMat(0.5)}
              </mesh>
            ))}
          </group>
        ))}
        {/* Support structure */}
        <mesh position={[0, -0.22, 0.32]}>
          <boxGeometry args={[0.28, 0.04, 1.0]} />
          {wireMat(0.5)}
        </mesh>
      </group>

      {/* === COOLING TOWER === */}
      <group position={[1.5, 0, 0.2]}>
        <mesh position={[0, 0.55, 0]}>
          <cylinderGeometry args={[0.3, 0.42, 1.1, 20]} />
          {solidMat(0.05)}
        </mesh>
        <mesh position={[0, 0.55, 0]}>
          <cylinderGeometry args={[0.3, 0.42, 1.1, 20]} />
          {wireMat(0.65)}
        </mesh>
        {/* Hyperbolic waist profile (simplified with torus) */}
        <mesh position={[0, 0.6, 0]}>
          <torusGeometry args={[0.30, 0.015, 8, 20]} />
          {wireMat(0.5)}
        </mesh>
        {/* Top rim */}
        <mesh position={[0, 1.1, 0]}>
          <torusGeometry args={[0.3, 0.018, 8, 20]} />
          {wireMat(0.55)}
        </mesh>
        {/* Internal fill media (grid suggestion) */}
        {[0.2, 0.5, 0.8].map((h, i) => (
          <mesh key={i} position={[0, h, 0]} rotation={[Math.PI / 2, 0, 0]}>
            <ringGeometry args={[0.1, 0.38, 16]} />
            {wireMat(0.2)}
          </mesh>
        ))}
      </group>

      {/* === CONTROL ROOM / SUBSTATION BUILDING === */}
      <group position={[1.2, 0, -0.8]}>
        <mesh position={[0, 0.28, 0]}>
          <boxGeometry args={[0.7, 0.55, 0.55]} />
          {solidMat(0.06)}
        </mesh>
        <mesh position={[0, 0.28, 0]}>
          <boxGeometry args={[0.7, 0.55, 0.55]} />
          {wireMat(0.6)}
        </mesh>
        {/* Roof detail */}
        <mesh position={[0, 0.58, 0]}>
          <boxGeometry args={[0.72, 0.06, 0.57]} />
          {wireMat(0.45)}
        </mesh>
        {/* HVAC units on roof */}
        {[-0.2, 0.2].map((x, i) => (
          <mesh key={i} position={[x, 0.68, 0]}>
            <boxGeometry args={[0.18, 0.12, 0.22]} />
            {wireMat(0.5)}
          </mesh>
        ))}
      </group>

      {/* === GROUND FOUNDATION SLAB === */}
      <mesh position={[0.2, -0.03, 0.2]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[4.2, 3.8, 12, 10]} />
        <meshBasicMaterial wireframe color={color} transparent opacity={op(0.10)} />
      </mesh>
    </group>
  );
}

// =========================================================================
// ANIMATED HOLOGRAM WRAPPER
// Handles: auto-build animation, slow auto-rotation, mouse tilt
// =========================================================================
function HologramScene({ modelIndex }) {
  const groupRef = useRef();
  const [buildProgress, setBuildProgress] = useState(0);
  const [prevIndex, setPrevIndex] = useState(modelIndex);
  const [transitionOut, setTransitionOut] = useState(false);

  // Colors per model
  const colors = ["#00cfff", "#00e8b8", "#a78bfa"];
  const color = colors[modelIndex];

  // Detect model change → trigger transition
  useEffect(() => {
  if (modelIndex !== prevIndex) {

    const start = setTimeout(() => {
      setTransitionOut(true);
      setBuildProgress(0);
    }, 0);

    const timer = setTimeout(() => {
      setPrevIndex(modelIndex);
      setTransitionOut(false);
    }, 400);

    return () => {
      clearTimeout(start);
      clearTimeout(timer);
    };
  }
}, [modelIndex, prevIndex]);

  useFrame((state, delta) => {
    if (!groupRef.current) return;
    // Build animation
    if (!transitionOut && buildProgress < 1) {
      setBuildProgress((p) => Math.min(p + delta * 1.2, 1));
    }
    if (transitionOut && buildProgress > 0) {
      setBuildProgress((p) => Math.max(p - delta * 2.5, 0));
    }
    // Slow auto-rotation on Y axis
    groupRef.current.rotation.y += delta * 0.18;
    // Mouse tracking tilt
    const mx = state.pointer.x * 0.06;
    const my = state.pointer.y * 0.04;
    groupRef.current.rotation.x += (my - groupRef.current.rotation.x) * 0.04;
    groupRef.current.rotation.z += (-mx - groupRef.current.rotation.z) * 0.04;
  });

  const modelProps = { progress: buildProgress, color };

  return (
    <group ref={groupRef} position={[0, -0.5, 0]} scale={[0.9, 0.9, 0.9]}>
      {prevIndex === 0 && <RefineryModel {...modelProps} />}
      {prevIndex === 1 && <OffshoreRigModel {...modelProps} />}
      {prevIndex === 2 && <ChemicalPlantModel {...modelProps} />}
    </group>
  );
}

// =========================================================================
// STORY SCENES DATA
// =========================================================================
const SCENES = [
  {
    eyebrow: "ENGINEERING CAPABILITY",
    headline: "300K+",
    headlineSub: "Engineering Hours / Year",
    accentLine:
      "Engineering capability trusted to deliver complex industrial projects with confidence.",
    badge: "QUALITY • CERTAINTY • EXECUTION",
    model: 0,
    stat: {
      value: "300K+",
      label: "Engineering Hours / Year",
    },
  },
  {
    eyebrow: "SINCE 1987",
    headline: "39+",
    headlineSub: "Years of Excellence",
    accentLine:
      "Delivering multidisciplinary engineering solutions across Energy, Process Industries and Industrial Infrastructure.",
    badge: "ENGINEERING • EXPERTISE • PERFORMANCE",
    model: 1,
    stat: {
      value: "39+",
      label: "Years of Excellence",
    },
  },
  {
    eyebrow: "MULTI-DISCIPLINARY ENGINEERING",
    headline: "7+",
    headlineSub: "Industries Served",
    accentLine:
      "Every industry has unique challenges. Our engineering is built around them, combining technical expertise with industry insight to deliver solutions that perform in the real world.",
    badge: "ENERGY • PROCESS • INFRASTRUCTURE",
    model: 2,
    stat: {
      value: "7+",
      label: "Industries Served",
    },
  },
];

// =========================================================================
// BACKGROUND FADE: Hero → Black
// =========================================================================
function useSectionReveal(ref) {
    const [revealed, setRevealed] = useState(false);
    const [entered, setEntered] = useState(false);
    const [opacity, setOpacity] = useState(0);

    useEffect(() => {
        const el = ref.current;
        if (!el) return;

        const observer = new IntersectionObserver(
            ([entry]) => {
                setOpacity(entry.intersectionRatio);

                if (entry.intersectionRatio > 0.05)
                    setRevealed(true);

                if (entry.intersectionRatio > 0.4)
                    setEntered(true);
            },
            {
                threshold: Array.from({ length: 101 }, (_, i) => i / 100)
            }
        );

        observer.observe(el);

        return () => observer.disconnect();
    }, [ref]);

    return {
        revealed,
        entered,
        opacity,
    };
}

// =========================================================================
// GRID LINES SVG BACKGROUND (decorative tech grid)
// =========================================================================
function TechGridBg() {
  return (
    <svg
      aria-hidden="true"
      className="absolute inset-0 w-full h-full pointer-events-none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <pattern id="techgrid" x="0" y="0" width="48" height="48" patternUnits="userSpaceOnUse">
          <path d="M 48 0 L 0 0 0 48" fill="none" stroke="#00cfff" strokeWidth="0.3" opacity="0.15" />
        </pattern>
      
      </defs>
      <rect width="100%" height="100%" fill="url(#techgrid)" />
      
    </svg>
  );
}

// =========================================================================
// SCAN LINE ANIMATION (hologram atmosphere)
// =========================================================================
function ScanLine() {
  return (
    <div
      aria-hidden="true"
      className="absolute inset-0 pointer-events-none overflow-hidden"
    >
      <div
        className="absolute left-0 right-0 h-0.5 opacity-[0.06]"
        style={{
          background: "linear-gradient(90deg, transparent, #00cfff, transparent)",
          animation: "scanline 3s linear infinite",
        }}
      />
      <style>{`@keyframes scanline { 0% { top: 0%; } 100% { top: 100%; } }`}</style>
    </div>
  );
}

// =========================================================================
// CORNER DECORATION (blueprint corner markers)
// =========================================================================
function CornerMarkers({ color = "#00cfff" }) {
  const style = { borderColor: color };
  return (
    <div aria-hidden="true" className="absolute inset-4 pointer-events-none" style={{ opacity: 0.3 }}>
      <div className="absolute top-0 left-0 w-6 h-6 border-t-2 border-l-2" style={style} />
      <div className="absolute top-0 right-0 w-6 h-6 border-t-2 border-r-2" style={style} />
      <div className="absolute bottom-0 left-0 w-6 h-6 border-b-2 border-l-2" style={style} />
      <div className="absolute bottom-0 right-0 w-6 h-6 border-b-2 border-r-2" style={style} />
    </div>
  );
}

// =========================================================================
// SCROLL PROGRESS DOTS
// =========================================================================
function SceneDots({ active, total, color , onSelect}) {
  return (
    <div className="flex gap-2" role="tablist" aria-label="Story sections">
      {Array.from({ length: total }).map((_, i) => (
       <button
  key={i}
  role="tab"
  aria-selected={i === active}
  aria-label={`Scene ${i + 1}`}
  onClick={() => onSelect(i)}
  className="w-2 h-2 rounded-full transition-all duration-500 cursor-pointer hover:scale-150"
  style={{
    background: i === active ? color : "rgba(255,255,255,0.25)",
    transform: i === active ? "scale(1.4)" : "scale(1)",
  }}
/>
      ))}
    </div>
  );
}

// =========================================================================
// MAIN EXPORTED COMPONENT
// =========================================================================
export default function InteractiveStory() {
  const sectionRef = useRef(null);
  
 const {
    revealed,
    entered,
    opacity,
} = useSectionReveal(sectionRef);

const overlayOpacity = Math.min(opacity * 1.4, 1);
  // Which scene index (0, 1, 2) based on scroll 0→1
  const [sceneIndex, setSceneIndex] = useState(0);
  const nextScene = () => {
  setSceneIndex((prev) => (prev + 1) % SCENES.length);
};

const prevScene = () => {
  setSceneIndex((prev) =>
    prev === 0 ? SCENES.length - 1 : prev - 1
  );
};
  

  const scene = SCENES[sceneIndex];
  const accentColors = ["#00cfff", "#00e8b8", "#a78bfa"];
  const accentColor = accentColors[sceneIndex];

  
  // BG fade: starts transparent, becomes black once section enters viewport
  

  return (
    <section
      ref={sectionRef}
      aria-label="Aarvi Encon Engineering Excellence — Interactive Story"
      className="relative min-h-screen text-white"
      itemScope
      itemType="https://schema.org/Organization"
    >
      {/* SEO hidden metadata */}
      <meta itemProp="name" content="Aarvi Encon Engineering Services & Consultants" />
      <meta itemProp="description" content="39+ years of technical manpower and engineering services for Oil & Gas, EPC, Power and Infrastructure sectors" />
      <meta itemProp="foundingDate" content="1987" />
    
      <motion.div
    className="fixed inset-0 pointer-events-none z-0"
    animate={{
        opacity: overlayOpacity
    }}
    transition={{
        duration: 0.2
    }}
    style={{
        background: "#04050A"
    }}
/>
     

      {/* ── STICKY VIEWPORT ── */}
      <div
className="relative min-h-screen w-full overflow-hidden z-10"
style={{
background:"#04050A"
}}
>

        {/* Tech grid background */}
        <TechGridBg />
        <ScanLine />

        {/* ── TWO-COLUMN LAYOUT ── */}
        <div className="relative h-full flex flex-col lg:flex-row">

          {/* ══════════════════════════════════════
              LEFT PANEL: 3D Blueprint Hologram
          ══════════════════════════════════════ */}
          <div
            className="w-full lg:w-[55%] h-[45vh] lg:h-screen relative flex items-center justify-center"
            aria-label={`3D holographic model: ${["Oil Refinery", "Offshore Rig", "Chemical Plant"][sceneIndex]}`}
          >
            <CornerMarkers color={accentColor} />

            {/* ── Model label ── */}
            <motion.div
              className="absolute top-6 left-8 z-20 font-mono text-[10px] tracking-[0.25em] uppercase"
              style={{ color: accentColor, opacity: entered ? 1 : 0, transition: "opacity 0.6s" }}
              aria-live="polite"
            >
              <AnimatePresence mode="wait">
                <motion.span
                  key={sceneIndex}
                  initial={{ opacity: 0, y: -4 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 4 }}
                  transition={{ duration: 0.3 }}
                >
                  ┼ {["REFINERY COMPLEX", "OFFSHORE RIG", "CHEMICAL PLANT"][sceneIndex]}
                </motion.span>
              </AnimatePresence>
            </motion.div>

            {/* ── Hologram accent ring ── */}
            

            {/* ── Three.js Canvas ── */}
            <div className="w-full h-full absolute inset-0 cursor-grab active:cursor-grabbing">
              <Canvas
                camera={{ position: [0, 1.5, 5.2], fov: 40 }}
                gl={{ antialias: true, alpha: true }}
                style={{ background: "transparent" }}
              >
                <ambientLight intensity={0.8} />
                <pointLight position={[5, 8, 5]} intensity={1.2} color={accentColor} />
                <pointLight position={[-5, 2, -5]} intensity={0.4} color="#ffffff" />

                {revealed && (
                  <HologramScene
                    modelIndex={sceneIndex}
                  />
                )}

                {/* Blueprint ground grid */}
                <gridHelper
                  args={[14, 28, accentColor, accentColor]}
                  position={[0, -1.4, 0]}
                  material-transparent={true}
                  material-opacity={0.1}
                />

                <OrbitControls
                  enableZoom={false}
                  enablePan={false}
                  maxPolarAngle={Math.PI * 0.55}
                  minPolarAngle={Math.PI * 0.2}
                  autoRotate={false}
                />
              </Canvas>
            

            {/* ── Interaction hint ── */}
          

</div>
</div>

           

          {/* ══════════════════════════════════════
              RIGHT PANEL: Story Text Scenes
          ══════════════════════════════════════ */}
          <div
            className="w-full lg:w-[45%] h-[55vh] lg:h-screen relative flex items-center"
            style={{ borderLeft: `1px solid ${accentColor}18` }}
          >
            {SCENES.map((s, i) => (
              <motion.article
                key={i}
                animate={{
            opacity: sceneIndex === i ? 1 : 0,
        }}
        transition={{ duration: 0.5 }}
                className={`absolute inset-0 flex flex-col justify-center px-8 sm:px-12 lg:px-14 transition-all duration-500 ${
    sceneIndex === i
        ? "pointer-events-auto"
        : "pointer-events-none"
}`}
                aria-hidden={i !== sceneIndex}
                role="article"
              >
               

                {/* Headline number */}
                <h2
                  className="font-sans font-black tracking-tight leading-none mb-2 text-white"
                  style={{ fontSize: "clamp(3.5rem, 8vw, 6.5rem)" }}
                  itemProp="award"
                >
                  {s.headline}
                </h2>

                {/* Headline subtitle */}
                <p
                  className="font-sans font-bold uppercase tracking-wider mb-6"
                  style={{
                    fontSize: "clamp(1rem, 2vw, 1.5rem)",
                    color: accentColors[i],
                  }}
                >
                  {s.headlineSub}
                </p>

                {/* Description */}
                <p
                  className="text-slate-400 leading-relaxed mb-8 max-w-sm"
                  style={{ fontSize: "clamp(0.875rem, 1.4vw, 1.05rem)" }}
                >
                  {s.accentLine}
                </p>

                {/* Badge */}
                <div
                  className="inline-flex items-center gap-2 text-[11px] font-mono font-bold tracking-wider uppercase px-4 py-2 rounded-sm w-max"
                  style={{
                    border: `1px solid ${accentColors[i]}40`,
                    color: accentColors[i],
                    background: `${accentColors[i]}10`,
                  }}
                >
                  <svg width="10" height="10" viewBox="0 0 10 10" aria-hidden="true">
                    <circle cx="5" cy="5" r="3" fill={accentColors[i]} />
                    <circle cx="5" cy="5" r="5" fill="none" stroke={accentColors[i]} strokeWidth="0.8" opacity="0.5" />
                  </svg>
                  {s.badge}
                </div>

                {/* Scene number marker */}
                <div
                  className="absolute top-8 right-8 font-mono text-[10px] opacity-20 font-bold tracking-widest"
                  style={{ color: accentColors[i] }}
                  aria-hidden="true"
                >
                  0{i + 1} / 03
                </div>
              </motion.article>
            ))}
             {/* ── Progress dots (mobile: top of canvas, desktop: bottom) ── */}
            <div className="absolute bottom-20 left-1/2 -translate-x-1/2 lg:left-auto lg:translate-x-0 lg:bottom-14 lg:right-12 flex items-center gap-5 z-40 ">

    <button
        onClick={prevScene}
        className="h-10 w-10 flex items-center justify-center arrowPrev rounded-full border transition-all duration-300 hover:scale-110 hover:-translate-y-0.5 active:scale-95"
        style={{
            borderColor: accentColor,
            color: accentColor,
            boxShadow: `0 0 15px ${accentColor}55`
        }}
    >
        <ChevronLeft size={22}/>
    </button>

    <SceneDots
        active={sceneIndex}
        total={3}
        color={accentColor}
        onSelect={setSceneIndex}
    />

    <button
        onClick={nextScene}
        className="h-10 w-10 flex items-center justify-center arrowNext rounded-full border transition-all duration-300 hover:scale-110 hover:-translate-y-0.5 active:scale-95"
        style={{
            borderColor: accentColor,
            color: accentColor,
            boxShadow: `0 0 15px ${accentColor}55`
        }}
    >
        <ChevronRight size={22}/>
    </button>

</div> 

             
          </div>

            {/* Static Aarvi Encon branding (always visible) */}
            <div
              className="absolute bottom-8 left-8 lg:left-14 font-mono text-[9px] tracking-widest uppercase"
              style={{ color: `${accentColor}50` }}
              aria-label="Aarvi Encon Engineering Services"
            >
              AARVI ENGINEERING & CONSULTANTS
            </div>
          </div>
      </div>
    </section>
  );
}