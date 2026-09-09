export const ACCEPTED_IMAGE_TYPES = ['image/png', 'image/jpeg', 'image/webp'];
export const MAX_IMAGE_BYTES = 2 * 1024 * 1024; // 2 MB

/** Returns an error message, or null if the file is an acceptable profile image. */
export function validateImageFile(file: File): string | null {
  if (!ACCEPTED_IMAGE_TYPES.includes(file.type)) {
    return 'Please choose a PNG, JPEG or WebP image.';
  }
  if (file.size > MAX_IMAGE_BYTES) {
    return 'The image must be 2 MB or smaller.';
  }
  return null;
}

/**
 * Reads an image File and resolves its base64 payload **without** the
 * `data:<mime>;base64,` prefix — the shape the backend expects as `profileImageBase64`.
 */
export function readImageAsBase64(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
      const result = typeof reader.result === 'string' ? reader.result : '';
      const commaAt = result.indexOf(',');
      resolve(commaAt >= 0 ? result.slice(commaAt + 1) : result);
    };
    reader.onerror = () => reject(new Error('Could not read the selected file.'));
    reader.readAsDataURL(file);
  });
}
