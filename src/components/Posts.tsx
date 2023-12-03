import { FC, useEffect, useState } from "react";
import { Card } from "antd";
import { collection, getDocs, doc, getDoc } from "firebase/firestore";
import { db } from "../firebase";
import { getAuth, getUser } from "firebase/auth";
import Loading from "./Loading";

interface Post {
  id: string;
  title: string;
  description: string;
  thumbnail: string;
  createdBy: string;
}

const Posts: FC = () => {
  const [loading, setLoading] = useState<Boolean>(false);
  const [posts, setPosts] = useState<Post[]>([]);
  const [userEmails, setUserEmails] = useState<{ [key: string]: string }>({});
  const auth = getAuth();

  useEffect(() => {
    const fetchPosts = async () => {
      setLoading(true);
      try {
        const querySnapshot = await getDocs(collection(db, "posts"));
        const fetchedPosts: Post[] = [];

        querySnapshot.forEach((doc) => {
          fetchedPosts.push({ id: doc.id, ...doc.data() } as Post);
        });

        setPosts(fetchedPosts);

        // Fetch user emails
        const uniqueUserIds = Array.from(
          new Set(fetchedPosts.map((post) => post.createdBy))
        );
        const userEmailsMap: { [key: string]: string } = {};

        for (const userId of uniqueUserIds) {
          const userDoc = await getDoc(doc(db, "users", userId));
          if (userDoc.exists()) {
            const userEmail = userDoc.data()?.email;
            if (userEmail) {
              userEmailsMap[userId] = userEmail;
            }
          } else {
            console.log(`User document with ID ${userId} does not exist.`);
          }
        }

        console.log("User Emails Map:", userEmailsMap);

        setUserEmails(userEmailsMap);
      } catch (error) {
        console.error("Error fetching posts from Firestore:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  return (
    <div>
      {loading && <Loading />}
      <h1 className="text-3xl font-bold underline mb-4">Posts</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {posts.map((post) => (
          <Card
            key={post.id}
            title={post.title}
            cover={<img alt={post.title} src={post.thumbnail} />}
            className="mb-4"
          >
            <p>{post.description}</p>
            <p className="mt-4 text-sm text-gray-500">
              Created by: {userEmails[post.createdBy]}
            </p>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Posts;
