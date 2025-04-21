import { Checkbox, Button, Input, Form, Typography } from "antd";
import { Link } from "react-router-dom";
import { AllImages } from "../../../public/images/AllImages";
import { HiOutlineMailOpen } from "react-icons/hi";
import { MdOutlineLock } from "react-icons/md";
// import { useSignInMutation } from "../../Redux/api/authApi";
// import { toast } from "sonner";

const SignIn = () => {
  // const navigate = useNavigate();
  // const [login] = useSignInMutation();

  const onFinish = async (values) => {
    console.log(values);
    // const data = {
    //   email: values.email,
    //   password: values.password,
    // };

    // try {
    //   console.log(data);
    //   const res = await login(data).unwrap();
    //   localStorage.setItem("accessToken", res?.data?.accessToken);
    //   localStorage.setItem("refreshToken", res?.data?.refreshToken);

    //   if (res.success) {
    //     toast.success("Login Successfully!");
    //     navigate("/");
    //   } else {
    //     toast.error("Login Error.!");
    //   }
    // } catch (error) {
    //   console.error("Error user login:", error);
    //   if (error.data) {
    //     toast.error("Something went wrong while login users.");
    //   }
    // }
  };
  return (
    <div className="text-base-color bg-gray-500">
      <div className="max-w-[1350px] w-[90%] mx-auto grid grid-cols-1 lg:grid-cols-2 items-center justify-items-center gap-10 min-h-screen py-10">
        <div className="">
          <img src={AllImages.logo} alt="logo" className="mx-auto" />
        </div>
        <div className="w-full flex flex-col justify-center items-center min-h-[80vh] p-5 md:p-8 lg:p-10 xl:p-16 bg-[#eeeeee] lg:w-full mx-auto rounded-lg border border-[#707070]">
          <div className="w-full">
            <div className="">
              <div className=" mt-5 mb-8">
                <h1 className="text-2xl sm:text-3xl font-medium mb-4">
                  Sign in to continue!
                </h1>
              </div>
            </div>

            <Form
              layout="vertical"
              className="bg-transparent w-full"
              onFinish={onFinish}
            >
              <Typography.Title level={4} style={{ color: "#222222" }}>
                Email
              </Typography.Title>
              <Form.Item
                name="email"
                className="text-base-color"
                rules={[
                  {
                    required: true,
                    message: "Email is Required",
                  },
                ]}
              >
                <Input
                  prefix={<HiOutlineMailOpen />}
                  placeholder="Enter your email"
                  className="py-2 px-3 text-xl  !border-base-color 1text-base-color !bg-transparent"
                />
              </Form.Item>
              <Typography.Title level={4} style={{ color: "#222222" }}>
                Password
              </Typography.Title>
              <Form.Item
                rules={[
                  {
                    required: true,
                    message: "Password is Required",
                  },
                ]}
                name="password"
                className="text-base-color"
              >
                <Input.Password
                  prefix={<MdOutlineLock />}
                  placeholder="Enter your password"
                  className="py-2 px-3 text-xl  !border-base-color 1text-base-color !bg-transparent"
                />
              </Form.Item>

              <div className="flex justify-between items-center mt-10">
                <Checkbox className="">Remember me</Checkbox>
                <Link
                  to="/forgot-password"
                  className="font-semibold !text-[#4e67ac] !underline"
                >
                  Forgot Password?
                </Link>
              </div>

              <Form.Item>
                <Button
                  type="primary"
                  className="w-full py-6 border border-[#222021] hover:border-[#222021] text-xl text-primary-color bg-[#222021] hover:!bg-[#222021] font-semibold rounded-2xl mt-8"
                  htmlType="submit"
                >
                  Sign In
                </Button>
              </Form.Item>
            </Form>
          </div>
        </div>
      </div>
    </div>
  );
};
export default SignIn;
