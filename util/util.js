import fs from "fs";
import Jimp from "jimp";
import sharp from "sharp";


// filterImageFromURL
// helper function to download, filter, and save the filtered image locally
// returns the absolute path to the local image
// INPUTS
//    inputURL: string - a publicly accessible url to an image file
// RETURNS
//    an absolute path to a filtered image locally saved file
 export async function filterImageFromURL(inputURL) {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await fetch(inputURL);
      const buffer = Buffer.from(await response.arrayBuffer());
      const outpath =
        "/tmp/filtered." + Math.floor(Math.random() * 2000) + ".jpg";
      await sharp(buffer)
        .resize(256, 256)
        .grayscale()
        .composite([
          {
            input: 'mustache.png',
            top: 92, // Adjust position based on face
            left: 57, // Adjust position based on face
          },
      ])
        .jpeg({ quality: 60 })
        .toFile(outpath);

      resolve(outpath);
    } catch (error) {
      reject(error);
    }
  });
}

// deleteLocalFiles
// helper function to delete files on the local disk
// useful to cleanup after tasks
// INPUTS
//    files: Array<string> an array of absolute paths to files
 export async function deleteLocalFiles(files) {
  for (let file of files) {
    fs.unlinkSync(file);
  }
}