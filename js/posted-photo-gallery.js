let postedPhotos = [];

const savePostedPhotos = (loadPhotos) => {
  postedPhotos = loadPhotos;
};

const getPhotoById = (id) => postedPhotos.find((photo) => photo.id === id);

export { savePostedPhotos, getPhotoById };
