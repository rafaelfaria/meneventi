import { useCallback, useState } from 'react';
import { Controller } from 'react-hook-form';
import { Box, FormControl, Typography } from '@mui/material';
import { StorageLevel, uploadMediaToS3 } from '../../../lib/helpers/media';
import { v4 as uuidv4 } from 'uuid';
import { useDropzone } from 'react-dropzone'
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import useToastNotification from '../../../hooks/useToastNotification';
import { getErrorMessage, slugify } from '../../../lib/helpers';
import LinearProgressWithLabel from '../LinearProgressWithLabel';
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';

type Preview = {
  type?: 'video' | 'image',
  content: string;
}

const FileUploaderInner =  ({
  name,
  level = StorageLevel.PUBLIC,
  keepFilename = true,
  pathName = 'site/',
  textDefault = 'Arraste ou clique para fazer upload',
  maxFilesize = 8000000,
  onUploadFinish,
  acceptedFilesType = [],
  showPreview = true,
  sx = {},
  onChange,
  fullURL,
  error
}: Partial<FileUploaderProps> & { onChange: any, error: any }) => {
  const [ isUploading, setIsUploading ] = useState<boolean>(false);
  const { showErrorNotification } = useToastNotification();
  const [ preview, setPreview ] = useState<Preview | null>();
  const [ progress, setProgress ] = useState<number>(0);

  /**
   * Perform the upload to S3
   */
  const uploadMedia = async (file: File) => {
    setIsUploading(true);

    let extension = file.name.split('.').pop()?.toLowerCase();

    // Path and name of the file where we are saving the image.
    let fileName = file.name.split('.')[0];
    if (keepFilename) {
      fileName = `${uuidv4()}-${slugify(fileName)}.${extension}`;
    } else {
      fileName = `${uuidv4()}-${uuidv4()}`;
    }

    try {
      console.log({ media: file, pathName, fileName, level })
      const { url, s3Path } = await uploadMediaToS3({ media: file, pathName, fileName, level, onProgress: setProgress });
      console.log({ url, s3Path })
      setIsUploading(false);
      return { url, s3Path };
    } catch(err: any) {
      setIsUploading(false);
      throw err;
    }
  }

  /**
   * The onDrop file is responsible to parse and validate the files being uploaded
   * then, call the upload function then setup the preview
   */
  const onDrop = useCallback(async (acceptedFiles: File[]) => {
    try {
      // Do something with the files
      console.log({ acceptedFiles });

      if (!acceptedFiles.length) return;


      // if (acceptedFiles[0].size > maxFilesize) {
      //   throw new Error('O arquivo é maior que o total máximo permitido');
      // }

      const [ file ] = acceptedFiles;
      const isVideo = file.type.match(/video/);
      const isImage = file.type.match(/image/);

      const { url, s3Path } = await uploadMedia(file);

      const content = URL.createObjectURL(acceptedFiles[0]);
      // set the preview content to be displayed in the screen
      setPreview({
        content,
        type: isImage ? 'image' : isVideo ? 'video' : undefined
      });

      if (fullURL) {
        onChange(url);
      } else {
        onChange(s3Path);
      }

      if (isVideo) {
        const duration = await getVideoDuration(file);
        console.log(onUploadFinish);
        onUploadFinish && onUploadFinish({ duration: duration as number, url, s3Path });
      } else {
        onUploadFinish && onUploadFinish({ url, s3Path });
      }

    } catch(err: any) {
      console.log(err);
      showErrorNotification(getErrorMessage(err));
    }
  }, []);


  /**
   * Initialise the Dropzone. At the moment, we only support one file
   */
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: acceptedFilesType.join(','),
    onDrop,
    maxFiles: 1
  })

  /**
   * Render the preview file based o the type of the file being uploaded
   */
  const renderPreview = (preview: Preview) => {
    switch(preview.type) {
      case 'video':
        return <video width="100%" height="100%" controls src={preview.content}></video>
      case 'image':
      default:
        return <img src={preview.content} alt="Preview" style={{ maxWidth: '100%', maxHeight: '100%' }} />
    }
  }

  const getVideoDuration = (file: File) => {
   return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => {
        const media = new Audio(reader?.result as any);
        media.onloadedmetadata = () => resolve(media.duration);
      };
      reader.readAsDataURL(file);
      reader.onerror = error => reject(error);
    });
  }

  const floatProperties = {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
  }

  return (
    <FormControl sx={{ minWidth: 120, paddingTop: '56.25%', ...sx, position: 'relative'}} fullWidth>
      {
        (preview && showPreview)
        ?
          <Box sx={floatProperties}>
            <Fab size="small" color="neutral" onClick={() => { setPreview(null); onChange('')}} sx={{ position: 'absolute', top: '-15px', right: '-20px', transform: 'rotate(45deg)' }}>
              <AddIcon />
            </Fab>
            {renderPreview(preview)}
          </Box>
        :
          <Box {...getRootProps()} sx={{ cursor: 'pointer', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', border: `1px dashed ${error ? '#f44336' : '#CCC'}`, p: 5, background: isDragActive ? 'rgb(0 0 0 / 7%)' : 'transparent', ...floatProperties }}>
            <input {...getInputProps()} name={name} />
            <Typography variant="body1" sx={{ textAlign: 'center', mb: 2 }}>{isDragActive ? 'Soltar o arquivo....' : textDefault}</Typography>
            <Box><CloudUploadIcon sx={{ fontSize: '50px', color: '#CCC'}} /></Box>

            {isUploading &&
              <LinearProgressWithLabel value={progress} />
            }
          </Box>
      }
    </FormControl>
  );
};

export type FileUploaderProps = {
  name: string,
  control: any,
  rules?: any,
  level: StorageLevel,
  keepFilename?: boolean,
  pathName?: string,
  textDefault: string,
  maxFilesize?: number,
  onUploadFinish?: ({ url, s3Path, duration }: FileUploadFinishedProps) => void,
  acceptedFilesType: string[],
  showPreview?: boolean,
  fullURL?: boolean,
  signedUrl?: boolean,
  sx?: any
}

export type FileUploadFinishedProps = {
  url: string;
  s3Path: string;
  duration?: number;
}



const FileUploader = (props: FileUploaderProps) => {
  return (
    <Controller
      name={props.name}
      control={props.control}
      rules={props.rules}
      render={({ field: { onChange, ...rest }, fieldState }) => {
        return (
          <FileUploaderInner
            {...props}
            onChange={onChange}
            error={fieldState.invalid}
          />
        );

      }}
    />
  );
}

export default FileUploader;
