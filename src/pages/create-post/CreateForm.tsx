import Box from "@mui/material/Box";
import TextareaAutosize from "@mui/base/TextareaAutosize";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { addDoc, collection } from "firebase/firestore";
import { auth, db } from "../../config/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate } from "react-router-dom";

interface CreateFormData {
  title: string;
  description: string;
}

export const CreateForm = () => {
  const navigate = useNavigate();
  const [user] = useAuthState(auth);
  const schema = yup.object().shape({
    title: yup.string().required("You must add a title"),
    description: yup.string().required("You must add a desc"),
  });
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CreateFormData>({
    resolver: yupResolver(schema),
  });

  const postsRef = collection(db, "posts");
  const onCreatePost = async (data: CreateFormData) => {
    await addDoc(postsRef, {
      //   title: data.title,
      //   description: data.description,
      ...data,
      username: user?.displayName,
      userId: user?.uid,
    });
    navigate("/");
  };
  return (
    <Box sx={{ display: "flex", minWidth: "100vw", justifyContent: "center" }}>
      <Box sx={{marginTop:"50px"}}>
        <form onSubmit={handleSubmit(onCreatePost)}>
          <TextField placeholder="title..." {...register("title")} sx={{width:"100%"}}></TextField>
          <Typography variant="subtitle2" sx={{ color: "red", marginBottom:"20px" }}>
            {errors.title?.message}
          </Typography>
          <TextareaAutosize
            minRows={5}
            placeholder="description..."
            {...register("description")}
            style={{ width: 300, backgroundColor:"inherit", padding:"10px" }}
          ></TextareaAutosize>
          <Typography variant="subtitle2" sx={{ color: "red", marginBottom:"20px" }}>
            {errors.description?.message}
          </Typography>
          <Button type="submit" variant="contained" color="success" sx={{minWidth:"100%"}}>Submit</Button>
        </form>
      </Box>
    </Box>
  );
};
