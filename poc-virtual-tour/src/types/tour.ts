export interface Tour {
  id: string;
  title: string;
  scenes: Scene[];
}

export interface Scene {
  id: string;
  name: string;
  imageUrl: string;
  nextScene: string;
}
