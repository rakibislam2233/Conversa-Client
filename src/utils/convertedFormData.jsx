/* eslint-disable @typescript-eslint/no-explicit-any */
export const convertedFormData = (values, imageFile) => {
  const data = JSON.stringify(values);
  const fromData = new FormData();
  fromData.append("file", imageFile);
  fromData.append("data", data);
  return fromData;
};
