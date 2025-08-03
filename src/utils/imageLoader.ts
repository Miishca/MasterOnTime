const images = import.meta.glob('/src/assets/*.png', { eager: true });

const imageMap: Record<string, string> = Object.keys(images).reduce((acc: Record<string, string>, path) => {
  const fileName = path.replace('/src/assets/', '').replace('.png', '');
  if ((images[path] as { default: string }).default) {
    acc[fileName] = (images[path] as { default: string }).default;
  }
  return acc;
}, {});

export default imageMap;