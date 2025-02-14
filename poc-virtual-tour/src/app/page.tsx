"use client";
import { useEffect, useState, useRef } from "react";
import { tourData } from "@/utils/tourData";
import "aframe";
import "aframe-extras";
import "aframe-event-set-component";

const VirtualTour = () => {
  const [currentScene, setCurrentScene] = useState(tourData.scenes[2]);
  const skyRef = useRef(null);

  const handleSceneChange = (sceneId: string) => {
    const nextScene = tourData.scenes.find((scene) => scene.id === sceneId);
    if (nextScene) {
      setCurrentScene(nextScene);
    }
  };

  useEffect(() => {
    if (skyRef.current) {
      (skyRef.current as any).setAttribute("src", currentScene.imageUrl);
    }
  }, [currentScene]);

  return (
    <a-scene vr-mode-ui="enabled: true" xr-mode-ui="enabled: true">
      <a-entity
        id="camera"
        camera
        position="0 1.6 0"
        look-controls
        wasd-controls
        raycaster="objects: .clickable"
      >
        <a-entity
          cursor="rayOrigin: mouse; fuse: true; fuseTimeout: 1000"
          position="0 0 -1"
        ></a-entity>
      </a-entity>

      <a-entity
        oculus-touch-controls="hand: left"
        vive-controls="hand: left"
        windows-motion-controls="hand: left"
        laser-controls
        raycaster="objects: .clickable"
      ></a-entity>

      <a-entity
        oculus-touch-controls="hand: right"
        vive-controls="hand: right"
        windows-motion-controls="hand: right"
        laser-controls
        raycaster="objects: .clickable"
      ></a-entity>

      <a-sky ref={skyRef} src={currentScene.imageUrl}></a-sky>

      {currentScene.pois.map((poi, index) => (
        <a-sphere
          key={`poi ${index}`}
          radius="0.25"
          radius-tubular="0.2"
          scale="1 1 1"
          color="blue"
          material="color: blue"
          position={poi.position}
          event-set__mouseenter="material.color: red"
          event-set__mouseleave="material.color: blue"
          event-set__click={() => handleSceneChange(poi.sceneId)}
        ></a-sphere>
      ))}
    </a-scene>
  );
};

export default VirtualTour;
