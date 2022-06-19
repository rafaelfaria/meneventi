import { useEffect, useRef, useState } from 'react';
import styled from '@emotion/styled';
import CloseIcon from '@mui/icons-material/Close';
import AvatarEditor from 'react-avatar-editor';
import useEscape from '../../../hooks/useEscape';
import { Box, Button, IconButton, Typography } from '@mui/material';
import ButtonWithSpinner from '../ButtonWithSpinner';


type Props = {
  image: any,
  onCrop: (imageBlob: string) => void
  onCancel: () => void
}

export default function AccountPhotoEditor({ image, onCrop, onCancel }: Props) {

  const [ scale, setScale ] = useState<number>(1);
  const [ isSaving, setIsSaving ] = useState<boolean>(false);
  const editorRef = useRef(null);

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
    document.body.style.overflow = '';
    }
  }, [])

  // This hook sets the Escape key to close the editor
  useEscape(() => onCancel());

  /**
   * Crops the image, gets the blob from the canva and send it back to the parent
   */
  const cropImage = async () => {
    if (!editorRef || !editorRef.current) {
      return;
    }
    try {
      setIsSaving(true);

      // @ts-ignore
      const canvasScaled = editorRef.current.getImageScaledToCanvas()
      const newImage = canvasScaled.toDataURL('image/jpeg');

      await onCrop(newImage);

      setIsSaving(false);

    } catch(err: any) {
      setIsSaving(false);
    }
  }

  /**
   * Handles the zoom control
   */
  const handleScale = (e: any) => {
    setScale(e.target.value);
  }

  return (
    <Box>
      <EditorBG onClick={onCancel}/>
      <PhotoEditorWrapper>
        <Title>
          <Typography color="#FFFFFF" variant="h6" sx={{ flexGrow: 1 }}>Editar a sua imagem de profile</Typography>
          <IconButton onClick={onCancel} sx={{cursor: "pointer" }}>
            <CloseIcon sx={{ color: '#FFF' }} />
          </IconButton>
        </Title>
        <AvatarEditor
          ref={editorRef}
          image={image}
          width={450}
          height={450}
          color={[0, 0, 0, 0.6]} // RGBA
          scale={scale}
          border={0}
          rotate={0}
          borderRadius={250}
          style={{ width: '100%', height: 'auto', maxWidth: '100vh', margin: 'auto'}}
        />
        <Actions>
          <Zoom>
            Zoom
            <input type="range" step="0.01" min="1" max="2" name="scale" value={scale} onChange={handleScale} />
          </Zoom>
          <ButtonWithSpinner variant="contained" onClick={cropImage} sx={{ m: 1, display: 'flex', justifyContent: 'end' }} color="primary" showSpinner={isSaving}>
            Salvar
          </ButtonWithSpinner>
        </Actions>
      </PhotoEditorWrapper>

    </Box>
  );
}


const PhotoEditorWrapper = styled.div`
  position: fixed;
  margin: 0 auto;
  width: 100%;
  max-width: 450px;
  max-height: 100vh;
  top: 50%;
  left: 50%;
  transform: translate3d(-50%, -50%, 0);
  z-index: 99999;
  display: flex;
  flex-direction: column;
  margin-right: auto;
  margin-left: auto;
  background-color: #0d1117;
  background-clip: padding-box;
  border-color: #30363d;
  box-shadow: 0 0 18px rgb(0 0 0 / 40%);
`
const Title = styled.div`
  position: relative;
  padding: 16px;
  background-color: #161b22;
  display: flex;
  align-items: center;
`

const Actions = styled.div`
  display: flex;
  width: 100%;
`

const Zoom = styled.div`
  display: flex;
  width: 100%;
  align-items: center;
  justify-content: center;
  color: #FFF;
  padding: 15px 20px 20px;

  > input {
    margin-left: 10px;
  }
`

const EditorBG = styled.div`
  :before {
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    z-index: 80;
    display: block;
    cursor: default;
    content: " ";
    background: rgba(0,0,0,.8);
    z-index: 99999;
  }

`