// import { createArrayOfPostedPhotos } from './create-array-of-posted-photos.js';

// let postedPhotos;

// const getPostedPhotos = () => {
//   if (!postedPhotos) {
//     postedPhotos = createArrayOfPostedPhotos();
//   }
//   return postedPhotos;
// };

// export { getPostedPhotos };

let postedPhotos = [];

const savePostedPhotos = (loadPhotos) => {
  postedPhotos = loadPhotos;
};

const getPhotoById = (id) => postedPhotos.find((photo) => photo.id === id);

export { savePostedPhotos, getPhotoById };
