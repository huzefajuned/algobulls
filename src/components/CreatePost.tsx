import { Form, Input, Button, Upload, message } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import { db } from "../firebase";
import { addDoc, collection } from "firebase/firestore";

const CreatePost = () => {
  const onFinish = async (
    values = { title: "sasas", description: "sasasas", image: "sasasasa" }
  ) => {
    console.log("Received values:", values);

    try {
      // Extract values from the form submission
      //   const { title, description, image } = values;

      const title = "sasa";
      const description = "asasasa";
      const thumbnail = "asas";

      // Add data to Firestore
      const docRef = await addDoc(collection(db, "post"), {
        title,
        description,
        thumbnail,
      });

      console.log("Document written with ID: ", docRef.id);

      // Display success message
      message.success("Post created successfully!");
    } catch (error) {
      console.error("Error adding data to Firestore: ", error);
      // Display error message
      message.error("Failed to create post");
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
          valuePropName="fileList"
          getValueFromEvent={(e) => e.fileList}
          rules={[{ required: true, message: "Please upload an image!" }]}
        >
          <Upload>{uploadButton}</Upload>
        </Form.Item>

        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
          <Button type="default" className="bg-yellow-400" htmlType="submit">
            Create Post
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default CreatePost;
