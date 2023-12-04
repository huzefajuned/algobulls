import { FC, useEffect, useState } from "react";
import { Card, message } from "antd";
import {
  collection,
  getDocs,
  doc,
  getDoc,
  query,
  where,
} from "firebase/firestore";
import { db } from "../firebase";
import Loading from "./Loading";
import { HeartFilled } from "@ant-design/icons";
import useCurrentUser from "../hooks/useCurrentUser";

interface Post {
  id: string;
  title: string;
  description: string;
  thumbnail: string;
  createdBy: string;
}

const Posts: FC = () => {
  const currentUser = useCurrentUser();

  // console.log("currentUser inside postss", currentUser);

  const [loading, setLoading] = useState<Boolean>(false);
  const [posts, setPosts] = useState<Post[]>([]);
  const [userEmails, setUserEmails] = useState("");

  const onLikePost = (post: any) => {
    const { id } = post;
    alert(id);
  };
  const fetchPosts = async () => {
    setLoading(true);
    try {
      const querySnapshot = await getDocs(collection(db, "posts"));
      const fetchedPosts: Post[] = [];

      querySnapshot.forEach((doc) => {
        fetchedPosts.push({ id: doc.id, ...doc.data() } as Post);
      });

      setPosts(fetchedPosts);
    } catch (error) {
      console.error("Error fetching posts from Firestore:", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchUsersForPosts = async () => {
    // console.log("posts", posts.createdBy);

    for (let creator of posts) {
      const uid = creator.createdBy;

      // Query to fetch user  by the current uid
      const myPostsQuery = query(
        collection(db, "users"),
        where("uid", "==", uid)
      );
      const querySnapshot = await getDocs(myPostsQuery);

      const fetchedUser: any = [];

      querySnapshot.forEach((doc) => {
        fetchedUser?.push({ id: doc.id, ...doc.data() } as any);
      });

      setUserEmails(fetchedUser[0]);
    }
  };

  useEffect(() => {
    fetchPosts();
    fetchUsersForPosts();
  }, []);

  console.log("userEmails", userEmails);

  return (
    <div className="h-full overflow-y-auto p-4">
      {loading && <Loading />}
      <h1 className="text-3xl font-bold underline mb-4">Posts</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {posts.length == 0 ? (
          <div className=" bg-yellow-100 ">
            <p className="text-2xl text-red-600 p-5"> 0 post found!!</p>
          </div>
        ) : (
          posts.map((post: any) => (
            <Card key={post.id} title={post.title} className="mb-4">
              <img
                alt={post.title}
                src={post.thumbnail}
                className="h-40 w-full object-cover mb-4 rounded-md"
              />
              <p>{post.description}</p>
              <div className=" flex flex-row justify-between items-center text-2xl my-2">
                <p className=" text-sm text-gray-500">
                  Created by: {userEmails?.email}
                </p>
                {currentUser ? (
                  <HeartFilled
                    className="hover:text-red-400 cursor-pointer  "
                    onClick={() => onLikePost(post)}
                  />
                ) : (
                  <HeartFilled
                    className="hover:text-red-400 cursor-pointer  "
                    onClick={() => message.info("please login to like post")}
                  />
                )}
              </div>
            </Card>
          ))
        )}
      </div>
    </div>
  );
};

export default Posts;
