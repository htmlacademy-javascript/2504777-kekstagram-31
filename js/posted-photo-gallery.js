import { createArrayOfPostedPhotos } from './create-array-of-posted-photos.js';

let postedPhotos;

const getPostedPhotos = () => {
  if (!postedPhotos) {
    postedPhotos = createArrayOfPostedPhotos();
  }
  return postedPhotos;
};

export { getPostedPhotos };
