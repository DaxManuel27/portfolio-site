import { useRef, useEffect, useState, useMemo } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import * as topojson from 'topojson-client'
import type { Topology, Objects } from 'topojson-specification'
import type { FeatureCollection, Geometry } from 'geojson'

const R = 1.0
const HALIFAX = { lat: 44.65, lon: -63.57 }
const MANILA = { lat: 14.6, lon: 121.0 }
const ARC_R = R + 0.018

function latLon3(lat: number, lon: number, r = R): THREE.Vector3 {
  const phi = (90 - lat) * (Math.PI / 180)
  const theta = (lon + 180) * (Math.PI / 180)
  return new THREE.Vector3(
    -r * Math.sin(phi) * Math.cos(theta),
    r * Math.cos(phi),
    r * Math.sin(phi) * Math.sin(theta),
  )
}

function makeCountryLines(topo: Topology<Objects>): THREE.BufferGeometry {
  const pts: number[] = []
  const fc = topojson.feature(topo, topo.objects.countries) as FeatureCollection<Geometry>

  const addRing = (ring: number[][]) => {
    for (let i = 0; i < ring.length - 1; i++) {
      const a = latLon3(ring[i][1], ring[i][0], R + 0.002)
      const b = latLon3(ring[i + 1][1], ring[i + 1][0], R + 0.002)
      pts.push(a.x, a.y, a.z, b.x, b.y, b.z)
    }
  }

  for (const f of fc.features) {
    if (!f.geometry) continue
    if (f.geometry.type === 'Polygon') {
      for (const ring of f.geometry.coordinates) addRing(ring as number[][])
    } else if (f.geometry.type === 'MultiPolygon') {
      for (const poly of f.geometry.coordinates)
        for (const ring of poly) addRing(ring as number[][])
    }
  }

  const g = new THREE.BufferGeometry()
  g.setAttribute('position', new THREE.Float32BufferAttribute(pts, 3))
  return g
}

function makeGridLines(): THREE.BufferGeometry {
  const pts: number[] = []
  const step = 2

  for (let lat = -80; lat <= 80; lat += 20) {
    for (let lon = 0; lon < 360; lon += step) {
      const a = latLon3(lat, lon)
      const b = latLon3(lat, lon + step)
      pts.push(a.x, a.y, a.z, b.x, b.y, b.z)
    }
  }
  for (let lon = 0; lon < 360; lon += 20) {
    for (let lat = -88; lat < 88; lat += step) {
      const a = latLon3(lat, lon)
      const b = latLon3(lat + step, lon)
      pts.push(a.x, a.y, a.z, b.x, b.y, b.z)
    }
  }

  const g = new THREE.BufferGeometry()
  g.setAttribute('position', new THREE.Float32BufferAttribute(pts, 3))
  return g
}

function makeLabelTexture(text: string): THREE.CanvasTexture {
  const canvas = document.createElement('canvas')
  canvas.width = 180
  canvas.height = 40
  const ctx = canvas.getContext('2d')!
  ctx.clearRect(0, 0, 180, 40)
  ctx.font = '500 13px sans-serif'
  ctx.fillStyle = 'rgba(200, 210, 255, 0.92)'
  ctx.fillText(text, 4, 27)
  return new THREE.CanvasTexture(canvas)
}

function makeArcData() {
  const start = latLon3(HALIFAX.lat, HALIFAX.lon, 1)
  const end = latLon3(MANILA.lat, MANILA.lon, 1)
  const N = 120
  const DASH = 5, GAP = 3, CYCLE = DASH + GAP
  const pts: number[] = []
  const segEndTs: number[] = []

  for (let i = 0; i < N; i++) {
    if (i % CYCLE >= DASH) continue
    const p0 = new THREE.Vector3().lerpVectors(start, end, i / N).normalize().multiplyScalar(ARC_R)
    const p1 = new THREE.Vector3().lerpVectors(start, end, (i + 1) / N).normalize().multiplyScalar(ARC_R)
    pts.push(p0.x, p0.y, p0.z, p1.x, p1.y, p1.z)
    segEndTs.push((i + 1) / N)
  }

  const geo = new THREE.BufferGeometry()
  geo.setAttribute('position', new THREE.Float32BufferAttribute(pts, 3))
  geo.setDrawRange(0, 0)
  return { geo, segEndTs }
}

function GlobeInner({ countryGeo }: { countryGeo: THREE.BufferGeometry | null }) {
  const groupRef = useRef<THREE.Group>(null!)
  const markerRef = useRef<THREE.Group>(null!)
  const manilaRef = useRef<THREE.Group>(null!)
  const halifaxLabelRef = useRef<THREE.Sprite>(null!)
  const arcProgressRef = useRef(0)

  const gridGeo = useRef(makeGridLines()).current
  const halifaxPos = useRef(latLon3(HALIFAX.lat, HALIFAX.lon, R + 0.02)).current
  const manilaPos = useRef(latLon3(MANILA.lat, MANILA.lon, R + 0.02)).current
  const halifaxLabelPos = useRef(latLon3(HALIFAX.lat, HALIFAX.lon, R + 0.15)).current
  const manilaLabelPos = useRef(latLon3(MANILA.lat, MANILA.lon, R + 0.15)).current

  const { geo: arcGeo, segEndTs } = useMemo(makeArcData, [])
  const halifaxTex = useMemo(() => makeLabelTexture('Halifax'), [])
  const manilaTex = useMemo(() => makeLabelTexture('Manila'), [])
  const toCam = useMemo(() => new THREE.Vector3(0, 0, 1), [])

  useFrame((_, delta) => {
    groupRef.current.rotation.y += 0.0012

    const q = groupRef.current.quaternion

    const hWorld = halifaxPos.clone().applyQuaternion(q)
    const halifaxFront = hWorld.dot(toCam) > 0
    markerRef.current.visible = halifaxFront
    if (halifaxLabelRef.current) halifaxLabelRef.current.visible = halifaxFront

    const mWorld = manilaPos.clone().applyQuaternion(q)
    manilaRef.current.visible = mWorld.dot(toCam) > 0

    arcProgressRef.current = Math.min(1, arcProgressRef.current + delta * 0.28)
    const progress = arcProgressRef.current
    let visiblePairs = 0
    for (let i = 0; i < segEndTs.length; i++) {
      if (segEndTs[i] <= progress) visiblePairs = i + 1
      else break
    }
    arcGeo.setDrawRange(0, visiblePairs * 2)
  })

  return (
    <group ref={groupRef} position={[0, 0, 0]} rotation={[0, -0.4, 0]}>
      {/* Base sphere */}
      <mesh>
        <sphereGeometry args={[R, 64, 64]} />
        <meshBasicMaterial color="#0a0a0a" />
      </mesh>

      {/* Latitude/longitude grid */}
      <lineSegments geometry={gridGeo}>
        <lineBasicMaterial color="#ffffff" opacity={0.07} transparent />
      </lineSegments>

      {/* Country outlines */}
      {countryGeo && (
        <lineSegments geometry={countryGeo}>
          <lineBasicMaterial color="#cccccc" opacity={0.5} transparent />
        </lineSegments>
      )}

      {/* Flight arc Manila → Halifax */}
      <lineSegments geometry={arcGeo}>
        <lineBasicMaterial color="#a0b4ff" opacity={0.9} transparent />
      </lineSegments>

      {/* Halifax marker */}
      <group ref={markerRef} position={halifaxPos}>
        <mesh>
          <sphereGeometry args={[0.032, 12, 12]} />
          <meshBasicMaterial color="#ff2020" opacity={0.22} transparent />
        </mesh>
        <mesh>
          <sphereGeometry args={[0.014, 12, 12]} />
          <meshBasicMaterial color="#ff3838" />
        </mesh>
      </group>

      {/* Halifax label */}
      <sprite ref={halifaxLabelRef} position={halifaxLabelPos} scale={[0.3, 0.067, 1]}>
        <spriteMaterial map={halifaxTex} transparent depthTest={false} />
      </sprite>

      {/* Manila marker + label */}
      <group ref={manilaRef}>
        <mesh position={manilaPos}>
          <sphereGeometry args={[0.03, 12, 12]} />
          <meshBasicMaterial color="#ffffff" opacity={0.18} transparent />
        </mesh>
        <mesh position={manilaPos}>
          <sphereGeometry args={[0.013, 12, 12]} />
          <meshBasicMaterial color="#c8d4ff" />
        </mesh>
        <sprite position={manilaLabelPos} scale={[0.3, 0.067, 1]}>
          <spriteMaterial map={manilaTex} transparent depthTest={false} />
        </sprite>
      </group>
    </group>
  )
}

export default function GlobeScene() {
  const [countryGeo, setCountryGeo] = useState<THREE.BufferGeometry | null>(null)

  useEffect(() => {
    fetch('https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json')
      .then(r => r.json())
      .then(topo => setCountryGeo(makeCountryLines(topo)))
      .catch(console.error)
  }, [])

  return (
    <div style={{ width: '100%', height: '100%', pointerEvents: 'none' }}>
      <Canvas
        camera={{ position: [0, 5.5, 5.5], fov: 32 }}
        dpr={[1, 2]}
        gl={{ antialias: true, alpha: true }}
      >
        <GlobeInner countryGeo={countryGeo} />
      </Canvas>
    </div>
  )
}
