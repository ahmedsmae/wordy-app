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
  const extFileName = uri.split('/')[uri.split('/').length - 1];
  const extension = extFileName.split('.')[1];

  let data = new FormData();
  data.append(imageType, {
    uri,
    name: name ? name : imageType + '.' + extension,
    filename: filename ? filename : extFileName,
    type: 'image/jpg'
  });
  data.append('Content-Type', 'image/' + extension);

  return data;
};
