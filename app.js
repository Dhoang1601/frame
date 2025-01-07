const uploadInput = document.getElementById('upload');
const uploadedImage = document.getElementById('uploaded-image');
const canvas = document.getElementById('canvas');
const downloadButton = document.getElementById('download');

let offsetX = 0;
let offsetY = 0;
let scale = 1;   


uploadInput.addEventListener('change', (event) => {
  const file = event.target.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = (e) => {
      uploadedImage.src = e.target.result;
    };
    reader.readAsDataURL(file);
  }
});


function updateImageTransform() {
  uploadedImage.style.transform = `translate(${offsetX}px, ${offsetY}px) scale(${scale})`;
}


document.getElementById('move-up').addEventListener('click', () => {
  offsetY -= 10;
  updateImageTransform();
});

document.getElementById('move-down').addEventListener('click', () => {
  offsetY += 10;
  updateImageTransform();
});

document.getElementById('move-left').addEventListener('click', () => {
  offsetX -= 10;
  updateImageTransform();
});

document.getElementById('move-right').addEventListener('click', () => {
  offsetX += 10;
  updateImageTransform();
});


document.getElementById('zoom-in').addEventListener('click', () => {
  scale += 0.1;
  updateImageTransform();
});

document.getElementById('zoom-out').addEventListener('click', () => {
  scale -= 0.1;
  if (scale < 0.1) scale = 0.1; 
  updateImageTransform();
});


downloadButton.addEventListener('click', () => {
  if (!uploadedImage.src) {
    alert('Hãy tải lên một ảnh trước!');
    return;
  }

  const context = canvas.getContext('2d');
  canvas.width = 1500;
  canvas.height = 1500;


  const scaledWidth = 1500 * scale;
  const scaledHeight = 1500 * scale;
  const drawX = 750 - (scaledWidth / 2) + (offsetX * 3);
  const drawY = 750 - (scaledHeight / 2) + (offsetY * 3);


  context.drawImage(uploadedImage, drawX, drawY, scaledWidth, scaledHeight);
  const frame = document.querySelector('.frame');
  context.drawImage(frame, 0, 0, 1500, 1500);


  const link = document.createElement('a');
  link.download = 'ghép-ảnh.png';
  link.href = canvas.toDataURL('image/png');
  link.click();
});
