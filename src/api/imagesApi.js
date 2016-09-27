export const parseImage = (file) => {
  let parsedImage = { image: { file: file } };
  return parsedImage;
};

export const parseEventImage = (file, eventId) => {
  let parsedImage = {
    image: {
      file: file,
      event_id: eventId
    }
  };
  return parsedImage;
};
