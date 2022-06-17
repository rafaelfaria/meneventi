import { Storage } from "aws-amplify";
import { stripTrailingSlash } from ".";

type UploadedImage = {
  media: Blob | File | string,
  fileName: string,
  pathName: string,
  level: StorageLevel,
  onProgress?: (progress: number) => void
}

export enum StorageLevel {
  PROTECTED = "protected",
  PRIVATE = "private",
  PUBLIC = "public"
}

export const uploadMediaToS3 = async ({ media, pathName, fileName, level = StorageLevel.PUBLIC, onProgress }: UploadedImage) => {

  let file;

  // assumes it is a base64 string (data:image/jpeg;base64)
  if (typeof media === "string") {
      // strategy to get a "Blob" from a data image
      const f = await fetch(media);
      media = await f.blob();
  }

  if (media instanceof Blob) {
      // Create a new file using the Blob
      // The main reason for this extra step is that, in theory Blob should be ok to be saved
      // through the Storage.put but it was not saving the image, at least not during mocking. This solves the issue.
      file = new File([media], fileName,{ type: media.type, lastModified: new Date().getTime() });
  }

  if (!file) {
    throw new Error("There was an error converting the string/blob into a file and therefore cannot proceed with the upload");
  }

  // Calculate the percentage of the progress
  const progressCallback = (progress: any) => {
    const progressInPercentage = Math.round(
      (progress.loaded / progress.total) * 100
    );
    onProgress && onProgress(progressInPercentage);
    console.log(`Progress: ${progressInPercentage}%`);
  };

  const s3Path = `${stripTrailingSlash(pathName)}/${fileName}`;
  console.log('uploading to s3', { s3Path, level, contentType: file.type });

  // Save the file in the S3 bucket. Using "protected" makes sure everyone can read but only the owner can makes change
  const response:any = await Storage.put(s3Path, file, {
      level,
      contentType: file.type,
      progressCallback
  });

  // Get the signedURL from the just uploaded file
  const signedURL = await Storage.get(response.key, { level }) as string;

  // Remove all the signed parameters which is not necessary since the bucket folder is public
  const [ url ] = signedURL.split('?');

  return { url, signedURL, s3Path };
}

// async/promise function for retrieving image dimensions for a URL
export const imageSize = (url: string) => {
    const img = document.createElement("img");

    const promise: Promise<{ width: number, height: number }> = new Promise((resolve, reject) => {
      img.onload = () => {
        // Natural size is the actual image size regardless of rendering.
        // The 'normal' `width`/`height` are for the **rendered** size.
        const width  = img.naturalWidth;
        const height = img.naturalHeight;

        // Resolve promise with the width and height
        resolve({width, height});
      };

      // Reject promise on error
      img.onerror = reject;
    });

    // Setting the source makes it start downloading and eventually call `onload`
    img.src = url;

    return promise;
}
