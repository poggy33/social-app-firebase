import { useState, useEffect } from "react";
import { Box } from "@mui/material";
import { getDocs, collection } from "firebase/firestore";
import { db } from "../../config/firebase";
import { Post as MyPost } from "./Post";
import { auth } from "../../config/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import Typography from "@mui/material/Typography";

export interface Post {
  id: string;
  userId: string;
  title: string;
  description: string;
  username: string;
}

export const Main = () => {
  const [postsList, setPostsList] = useState<Post[] | null>(null);
  const [user] = useAuthState(auth);
  const postsRef = collection(db, "posts");

  const getPosts = async () => {
    const data = await getDocs(postsRef);
    setPostsList(
      data.docs.map((doc) => ({ ...doc.data(), id: doc.id })) as Post[]
    );
  };

  useEffect(() => {
    getPosts();
  }, []);

  return (
    <Box sx={{minHeight: "calc(100vh - 192px)"}}>
      {!user ? (
        <Box
          sx={{ minWidth: "100vw", display: "flex", justifyContent: "center" }}
        >
          <Typography variant="h5" sx={{marginTop:"50px", fontWeight:"bold", color:"red"}}>Please login to see all posts</Typography>
        </Box>
      ) : null}
      {postsList?.map((post) => (
        <MyPost key={post.id} post={post} />
      ))}
    </Box>
  );
};
