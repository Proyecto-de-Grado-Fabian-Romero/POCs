"use client";
import { useState, useEffect, useRef } from "react";
import { tourData } from "@/utils/tourData";
import { Entity, Scene } from "aframe-react";
import "aframe";
import "aframe-extras";
import "aframe-event-set-component";

const VirtualTour = () => {
  const [currentScene, setCurrentScene] = useState(tourData.scenes[2]);
  const skyRef = useRef<HTMLDivElement | null>(null);

  const handleSceneChange = (sceneId: string) => {
    console.log(sceneId);
    const nextScene = tourData.scenes.find((scene) => scene.id === sceneId);
    if (nextScene) setCurrentScene(nextScene);
  };

  useEffect(() => {
    if (skyRef.current) {
      try {
        const skyEl = skyRef.current as unknown as HTMLElement;
        skyEl.setAttribute("src", "");
        setTimeout(() => {
          skyEl.setAttribute("src", currentScene.imageUrl);
        }, 50); 
      } catch (error) {}
    }
  }, [currentScene]);

  return (
    <Scene vr-mode-ui="enabled: true" xr-mode-ui="enabled: true">
      <Entity
        id="camera"
        camera
        position="0 1.6 0"
        look-controls
        wasd-controls
        raycaster={{ objects: ".clickable" }}
      >
        <Entity
          cursor={{ rayOrigin: "mouse", fuse: true, fuseTimeout: 1000 }}
          position="0 0 -1"
        />
      </Entity>

      <Entity
        oculus-touch-controls={{ hand: "left" }}
        laser-controls
        raycaster={{ objects: ".clickable" }}
      />
      <Entity
        oculus-touch-controls={{ hand: "right" }}
        laser-controls
        raycaster={{ objects: ".clickable" }}
      />

      <Entity
        ref={skyRef}
        key={currentScene.id}
        primitive="a-sky"
        src={currentScene.imageUrl}
      />

      {currentScene.pois.map((poi, index) => (
        <>
          <Entity
            key={`poi-${index}-${poi.sceneId}`}
            primitive="a-image"
            radius="0.25"
            scale="1 1 1"
            src="https://i.ibb.co/Txj7YGJb/directions-arrows-3d-render-free-photo-removebg-preview.png"
            position={poi.position}
            event-set__mouseenter={{ "material.color": "blue" }}
            event-set__mouseleave={{ "material.color": "white" }}
            events={{
              click: () => handleSceneChange(poi.sceneId),
            }}
          />
          <Entity
            primitive="a-text"
            value={poi.text} // Nombre del POI
            position="0 0.5 0" // Ajusta la posición del texto sobre la esfera
            align="center"
            scale="1.5 1.5 1.5"
            color="white"
            visible={true} // Inicialmente oculto
            class="poi-text"
          />
        </>
      ))}
    </Scene>
  );
};

export default VirtualTour;
