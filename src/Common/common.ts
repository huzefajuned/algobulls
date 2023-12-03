// Function to convert image to base64
export const convertToBase64 = (file: any) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.onload = () => {
      resolve(reader.result);
    };

    reader.onerror = (error) => {
      reject(error);
    };

    reader.readAsDataURL(file);
  });
};
export const afterNavigate = () => {
  const host = window.location.origin;
  window.location.href = host;
};
