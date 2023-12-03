import { FC, useEffect, useState } from "react";
import { Card } from "antd";
import {
  collection,
  getDocs,
  doc,
  getDoc,
  where,
  query,
} from "firebase/firestore";
import { db } from "../firebase";
import useCurrentUser from "../hooks/useCurrentUser";
import Loading from "./Loading";

interface Post {
  id: string;
  title: string;
  description: string;
  thumbnail: string;
  createdBy: string;
}

const MyPosts: FC = () => {
  const [loading, setLoading] = useState<Boolean>(false);
  const [posts, setPosts] = useState<Post[]>([]);
  const [userEmail, setUserEmail] = useState<string | null>(null);
  const currentUser = useCurrentUser();

  useEffect(() => {
    const fetchMyPosts = async () => {
      setLoading(true);
      try {
        const userId = (currentUser as any)?.uid;

        if (!currentUser || !userId) {
          // If currentUser is null or uid is null, do not proceed
          return;
        }

        const { uid }: any = currentUser;

        // Query to fetch posts created by the current user
        const myPostsQuery = query(
          collection(db, "posts"),
          where("createdBy", "==", uid)
        );
        const querySnapshot = await getDocs(myPostsQuery);

        const fetchedPosts: Post[] = [];

        querySnapshot.forEach((doc) => {
          fetchedPosts.push({ id: doc.id, ...doc.data() } as Post);
        });

        setPosts(fetchedPosts);

        console.log("fetchedPosts", fetchedPosts);
        // Fetch user email for the current user
        const userDoc = await getDoc(doc(db, "users", uid));

        if (userDoc.exists()) {
          const userEmail = userDoc.data()?.email;
          setUserEmail(userEmail);
        } else {
          console.log(`User document with ID ${uid} does not exist.`);
        }
      } catch (error) {
        console.error("Error fetching posts from Firestore:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchMyPosts();
  }, [currentUser]); // Include currentUser as a dependency to trigger the effect when it changes

  return (
    <div className="h-full overflow-y-auto p-4">
      {loading && <Loading />}
      <h1 className="text-3xl font-bold underline mb-4">My Posts</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {posts?.length === 0 ? (
          <div className=" bg-yellow-100 ">
            <p className="text-2xl text-red-600 p-5">
              No posts found for the current user!
            </p>
          </div>
        ) : (
          posts?.map((post) => (
            <Card key={post.id} title={post.title} className="mb-4">
              <img
                alt={post.title}
                src={post.thumbnail}
                className="h-40 w-full object-cover mb-4"
              />
              <p>{post.description}</p>
              <p className="mt-4 text-sm text-gray-500">
                Created by: {userEmail}
              </p>
            </Card>
          ))
        )}
      </div>
    </div>
  );
};

export default MyPosts;
