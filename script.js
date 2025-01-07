const uploadInput = document.getElementById('upload');
const uploadedImage = document.getElementById('uploaded-image');
const canvas = document.getElementById('canvas');
const downloadButton = document.getElementById('download');

let offsetX = 0; // Tọa độ X của ảnh
let offsetY = 0; // Tọa độ Y của ảnh
let scale = 1;   // Tỷ lệ phóng to/thu nhỏ của ảnh

// Khi người dùng tải ảnh lên
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

// Cập nhật vị trí và tỷ lệ của ảnh
function updateImageTransform() {
  uploadedImage.style.transform = `translate(${offsetX}px, ${offsetY}px) scale(${scale})`;
}

// Di chuyển ảnh
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

// Phóng to và thu nhỏ ảnh
document.getElementById('zoom-in').addEventListener('click', () => {
  scale += 0.1;
  updateImageTransform();
});

document.getElementById('zoom-out').addEventListener('click', () => {
  scale -= 0.1;
  if (scale < 0.1) scale = 0.1; // Giới hạn thu nhỏ tối thiểu
  updateImageTransform();
});

// Khi người dùng nhấn tải ảnh về
downloadButton.addEventListener('click', () => {
  if (!uploadedImage.src) {
    alert('Hãy tải lên một ảnh trước!');
    return;
  }

  const context = canvas.getContext('2d');
  canvas.width = 1500;
  canvas.height = 1500;

  // Tính toán vị trí và tỷ lệ thực tế trên canvas
  const scaledWidth = 1500 * scale;
  const scaledHeight = 1500 * scale;
  const drawX = 750 - (scaledWidth / 2) + (offsetX * 3);
  const drawY = 750 - (scaledHeight / 2) + (offsetY * 3);

  // Vẽ ảnh và khung lên canvas
  context.drawImage(uploadedImage, drawX, drawY, scaledWidth, scaledHeight);
  const frame = document.querySelector('.frame');
  context.drawImage(frame, 0, 0, 1500, 1500);

  // Tải ảnh đã ghép
  const link = document.createElement('a');
  link.download = 'ghép-ảnh.png';
  link.href = canvas.toDataURL('image/png');
  link.click();
});
