// src/assets/ImageManager.js

// 1. Vite usa import.meta.glob para leer carpetas
// 'eager: true' hace que las imágenes se carguen de inmediato (como hacía require.context)
const images = import.meta.glob('./random/*.webp', { eager: true });

const imageObject = {};

// 2. Mapeamos los resultados al objeto
Object.entries(images).forEach(([path, module]) => {
  // Extraemos el nombre del archivo sin la ruta ni la extensión
  const imageName = path.split('/').pop().replace(/\.[^/]+$/, '');
  
  // En Vite, el contenido está en la propiedad .default del módulo
  imageObject[imageName] = module.default;
});

function getRandomImage() {
  const keys = Object.keys(imageObject);
  if (keys.length === 0) return null;
  
  const randomKey = keys[Math.floor(Math.random() * keys.length)];
  return imageObject[randomKey];
}

export { imageObject, getRandomImage };