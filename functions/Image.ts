export const parsedImage = (src: string, width: number, height: number, maxWidth?: number, quality: number = 100) => {
  let parsedSrc: URL;
  if(src.indexOf("https") > -1 || src.indexOf("http") > -1) {
    parsedSrc = new URL(src);
  } else {
    parsedSrc = new URL("https:" + src);
  }

  if(maxWidth) {
    const { newWidth, newHeight } = resizeImage(width, height, maxWidth);
    return parsedSrc.origin + "/__image/w=" + newWidth + ",h=" + newHeight + ",q=" + quality + parsedSrc.pathname;
  }
  
  return parsedSrc.origin + "/__image/w=" + width + ",h=" + height + ",q=" + quality + parsedSrc.pathname;
}

const resizeImage = (width: number, height: number, maxWidth: number) => {
  const ratio = height / width;
  let newWidth = width;
  let newHeight = height;

  if(width > maxWidth) {
    newWidth = maxWidth;
    newHeight = Math.ceil(maxWidth * ratio);
  }

  return { newWidth, newHeight };
}