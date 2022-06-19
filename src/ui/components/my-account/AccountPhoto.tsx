import { useState } from "react";
import { v4 as uuidv4 } from 'uuid';
import styled from '@emotion/styled';
import { Avatar, Box } from '@mui/material';
import useAuth from "../../../hooks/useAuth";
import { getErrorMessage } from '../../../lib/helpers';
import useToastNotification from '../../../hooks/useToastNotification';
import PhotoCameraIcon from '@mui/icons-material/PhotoCamera';
import AccountPhotoEditor from "./AccountPhotoEditor";
import { StorageLevel, uploadMediaToS3 } from "../../../lib/helpers/media";

type Props = {
  initials?: string | null
}

export default function AccountPhoto({ initials }: Props) {
  const { authUser, saveUser } = useAuth();
  const [ uploadedImage, setUploadedImage ] = useState<string | null>();
  const { showSuccessNotification, showErrorNotification } = useToastNotification();

  /**
   * Handles the button (camera) to upload the picture. Basically it will look at the
   * File object and extract the one file (image) so we can open the editor based on the "upladedImage" variable
   */
  const handleUploadPicture = (event: any) => {
    try {
      const { target: { files } } = event;
      const [image] = files || [];

      setUploadedImage(image); // settig this will automatically open the modal with the editor
    } catch(err: any) {
      showErrorNotification(getErrorMessage(err));
      console.log('handleUploadPicture', err);
    }
  }

  /**
   * Handles the action of "saving" or "cropping" coming from the editor
   * Doing this way, all the logic belongs to this component and the editor is only responsible to get the data from the image
   */
  const handleOnCrop = async (imageBase64: string) => {
    try {

      // the name we will be saving in the S3 - use the uuidv4 so it uses a random name
      const pathName = `profile-photos/`;
      const fileName = `${authUser?.username}-${uuidv4()}-profile.jpg`;

      const { url } = await uploadMediaToS3({ media: imageBase64, pathName, fileName, level: StorageLevel.PUBLIC });

      // Update the new photo in the user settings database and the auth state
      if (authUser) {
        await saveUser(authUser.username, { photo: url });
        showSuccessNotification('Foto atualizada com sucesso!')
      }

      handleOnCropClose();

    } catch(err: any) {
      console.log('handleOnCrop', { err });
      showErrorNotification(getErrorMessage(err));
      handleOnCropClose();
    }
  }

  /**
   * This gets triggered if the cropping tool gets closed
   */
  const handleOnCropClose = async () => {
    setUploadedImage(null);
  }

  return (
    <>
      <Box position="relative" width={120} height={120}>
        <Avatar
          src={authUser?.photo as string}
          alt={authUser?.name}
          sx={{ width: 120, height: 120, fontSize: 40, border: '3px solid #4e5256' }}>
            {initials}
        </Avatar>
        <CameraIcon role="button">
          <FormFile type="file" onChange={handleUploadPicture} />
          <PhotoCameraIcon sx={{ cursor: 'pointer' }} />
        </CameraIcon>
      </Box>
      {uploadedImage && <AccountPhotoEditor image={uploadedImage} onCrop={handleOnCrop} onCancel={handleOnCropClose} />}
    </>
  );
}

const CameraIcon = styled.div`
  position: absolute;
  bottom: 25px;
  right: 15px;
  transform: translate(50%, 50%);
  background: #4e5256;
  border-radius: 50%;
  width: 36px;
  height: 36px;
  font-size: 21px;
  padding: 6px;
  color: #FFF;
  cursor: pointer;
`

const FormFile = styled.input`
  width: 66px;
  height: 80px;
  top: -20px;
  left: -20px;
  cursor: pointer;
  border-radius: 50%;
  position: absolute;
  filter: alpha(opacity=0);
  opacity: 0;
`;

