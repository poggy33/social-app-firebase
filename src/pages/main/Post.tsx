import { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { styled } from "@mui/material/styles";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { Post as IPost } from "./Main";
import { auth, db } from "../../config/firebase";
import {
  addDoc,
  collection,
  getDocs,
  query,
  where,
  deleteDoc,
  doc,
} from "firebase/firestore";
import { useAuthState } from "react-firebase-hooks/auth";

const PostTypography = styled(Typography)(() => ({
  padding: "10px",
}));

const MyFavoriteIcon = styled(FavoriteIcon)(() => ({
  color: "rgb(170,50,140)",
  "&:hover": {
    color: "rgba(170,50,140,0.7)",
    cursor: "pointer",
  },
}));

interface Props {
  post: IPost;
}

interface Like {
  likeId: string;
  userId: string;
}

export const Post = (props: Props) => {
  const { post } = props;
  const [user] = useAuthState(auth);

  const [likes, setLikes] = useState<Like[] | null>(null);

  const likesRef = collection(db, "likes");
  const likesDoc = query(likesRef, where("postId", "==", post.id));

  const getLikes = async () => {
    const data = await getDocs(likesDoc);
    setLikes(
      data.docs.map((doc) => ({ userId: doc.data().userId, likeId: doc.id }))
    );
  };

  const hasUserLiked = likes?.find((like) => like.userId === user?.uid);

  useEffect(() => {
    getLikes();
  }, []);

  const addLike = async () => {
    try {
      const newDoc = await addDoc(likesRef, {
        userId: user?.uid,
        postId: post.id,
      });
      if (user) {
        setLikes((prev) =>
          prev
            ? [...prev, { userId: user.uid, likeId: newDoc.id }]
            : [{ userId: user.uid, likeId: newDoc.id }]
        );
      }
    } catch (err) {
      console.log(err);
    }
  };

  const removeLike = async () => {
    try {
      const likeToDeleteQuery = query(
        likesRef,
        where("postId", "==", post.id),
        where("userId", "==", user?.uid)
      );
      const likeToDeleteData = await getDocs(likeToDeleteQuery);
      const likeId = likeToDeleteData.docs[0].id;
      const likeToDelete = doc(db, "likes", likeToDeleteData.docs[0].id);
      await deleteDoc(likeToDelete);
      if (user) {
        setLikes(
          (prev) => prev && prev.filter((like) => like.likeId !== likeId)
        );
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Box sx={{ display: "flex", justifyContent: "center"}}>
      <Box sx={{ width: "80vw", marginTop: "30px" }}>
        <PostTypography
          variant="h5"
          sx={{
            background: "hsl(15 70% 75%)",
            borderTopLeftRadius: "5px",
            borderTopRightRadius: "5px",
            color: "rgb(30,30,50)",
            fontWeight: "bold",
          }}
        >
          {post.title}
        </PostTypography>
        <PostTypography sx={{ background: "hsl(15 70% 85%)" }}>
          {post.description}
        </PostTypography>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            backgroundColor: "rgb(240,230,230)",
            borderBottomLeftRadius: "5px",
            borderBottomRightRadius: "5px",
          }}
        >
          <PostTypography variant="subtitle2" sx={{ color: "rgb(170,50,140)",  textDecoration:"underline" }}>
            author: {post.username}
          </PostTypography>
          <Box sx={{ display: "flex", padding: "10px" }}>
            <MyFavoriteIcon onClick={hasUserLiked ? removeLike : addLike} />
            {likes && likes.length !== 0 ? (
              <Typography sx={{ marginLeft: "5px", color: "rgb(170,50,140)" }}>
                {likes.length}
              </Typography>
            ) : (
              <Box sx={{ marginLeft: "5px", minWidth: "9px" }}></Box>
            )}
          </Box>
        </Box>
      </Box>
    </Box>
  );
};
