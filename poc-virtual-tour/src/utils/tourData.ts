export const tourData = {
  scenes: [
    {
      id: "scene1",
      name: "Sala",
      imageUrl:
        "https://t4.ftcdn.net/jpg/03/95/23/69/360_F_395236908_JNQZeph1ONTyXEPypyyjd0tXBlvgBMsK.jpg",
      pois: [{ position: "1 1 -3", text: "Ir a Cuarto", sceneId: "scene2" }],
    },
    {
      id: "scene2",
      name: "Cuarto",
      imageUrl:
        "https://as2.ftcdn.net/v2/jpg/04/74/58/17/1000_F_474581736_CKC2XvIQvZNH6hWE4hSdXDAoULpgMWWZ.jpg",
      pois: [{ position: "3 1 4", text: "Ir a Bano", sceneId: "scene3" }],
    },
    {
      id: "scene3",
      name: "Baño",
      imageUrl:
        "https://i2.wp.com/www.samrohn.com/wp-content/uploads/le-meridien-bedroom-panorama.jpg?resize=1200%2C600",
      pois: [
        { position: "1.6 1 4", text: "Regresar a Sala", sceneId: "scene1" },
      ],
    },
  ],
};
