import { Form, Input, Button, Upload, message } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import { db } from "../firebase";
import { addDoc, collection } from "firebase/firestore";
import { afterNavigate, convertToBase64 } from "../Common/common";
import { useEffect, useState } from "react";
import { auth } from "../firebase";
import Loading from "./Loading";
import { toast } from "react-toastify";

const CreatePost = () => {
  const [currentUserId, setCurrentUserId] = useState(null);
  const [loading, setLoading] = useState(false);

  console.log("currentUserId isss", currentUserId);

  useEffect(() => {
    // Listen for changes in authentication state
    const unsubscribe = auth.onAuthStateChanged((user: any) => {
      setCurrentUserId(user.uid);
    });

    // Cleanup the subscription when the component is unmounted
    return () => unsubscribe();
  }, []);

  const onFinish = async (values: any) => {
    setLoading(true);
    try {
      const { title, description, image } = values;

      console.log("image", image);

      const thumbnail = image ? await convertToBase64(image.file) : null;

      console.log("thumbnail", thumbnail);
      // Check if a file is uploaded
      // const image = ;

      const payload: any = {
        title,
        description,
        thumbnail,
        createdBy: currentUserId ?? currentUserId, // Add the createdBy field with the user's UID
      };

      // Add data to Firestore
      const docRef = await addDoc(collection(db, "posts"), payload);

      console.log("Document written with ID: ", docRef.id);

      // Display success message
      toast.success("Post created successfully!");
      setTimeout(() => {
        afterNavigate();
      }, 2000);
    } catch (error) {
      console.error("Error adding data to Firestore: ", error);
      // Display error message
      message.error("Failed to create post");
    } finally {
      setLoading(false);
    }
  };

  // Custom Upload Button
  const uploadButton = (
    <div>
      <UploadOutlined />
      <div style={{ marginTop: 8 }}>Upload</div>
    </div>
  );

  return (
    <div className="w-full  h-full flex flex-col  justify-center items-center  ">
      <Form
        name="createPostForm"
        onFinish={onFinish}
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        className="p-10 shadow-2xl rounded-xl border-2 border-gray-300"
      >
        <Form.Item
          label="Title"
          name="title"
          rules={[{ required: true, message: "Please enter the title!" }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Description"
          name="description"
          rules={[{ required: true, message: "Please enter the description!" }]}
        >
          <Input.TextArea />
        </Form.Item>

        {/* Image Upload */}
        <Form.Item
          name="image"
          label="Upload Image"
          rules={[{ required: true, message: "Please upload an image!" }]}
        >
          <Upload
            accept="image/*"
            beforeUpload={() => false} // Prevent default upload behavior
          >
            {uploadButton}
          </Upload>
        </Form.Item>

        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
          <Button type="default" className="bg-yellow-400" htmlType="submit">
            Create Post
          </Button>
        </Form.Item>
      </Form>
      {loading && <Loading />}
    </div>
  );
};

export default CreatePost;
