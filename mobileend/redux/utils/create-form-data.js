export const createImageAndDataFD = (imageType, image, body) => {
  let data = new FormData();

  if (image) {
    const { uri, name, filename } = image;
    data.append(imageType, {
      uri,
      name: name ? name : imageType + '.png',
      filename: filename ? filename : imageType + '.png',
      type: 'image/png'
    });
    data.append('Content-Type', 'image/png');
  }

  if (body) {
    Object.keys(body).forEach(key => {
      if (Array.isArray(body[key])) {
        data.append(key, JSON.stringify(body[key]));
      } else {
        data.append(key, body[key]);
      }
    });
  }

  return data;
};

export const createImageFD = (imageType, image) => {
  const { uri, name, filename } = image;

  let data = new FormData();
  data.append(imageType, {
    uri,
    name: name ? name : imageType + '.jpg',
    filename: filename ? filename : imageType + '.jpg',
    type: 'image/jpg'
  });
  data.append('Content-Type', 'image/png');

  return data;
};
