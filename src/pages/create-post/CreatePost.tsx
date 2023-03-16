import { Box } from '@mui/material';
import { CreateForm } from './CreateForm';

export const CreatePost = () => {
  return (
    <Box sx={{minHeight: "calc(100vh - 192px)"}}>
        <CreateForm/>
    </Box>
  )
}
