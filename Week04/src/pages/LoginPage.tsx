import { useNavigate } from "react-router-dom"; // ✅ 추가
import useForm from "../hooks/useForm";
import { type UserSigninInformation, validateSignin } from "../utills/validate";

const LoginPage = () => {
      const navigate = useNavigate(); // ✅ 추가: 페이지 이동용 훅

  const {values, errors, touched, getInputProps} = useForm<UserSigninInformation>({
    initialValue: {
      email: "",
      password: "",
    },
    validate: validateSignin,
  });

    const handleSubmit = () => {
        console.log(values);
    };

    // ✅ 뒤로가기 버튼 클릭 시 홈페이지('/')로 이동
    const handleBack = () => {
        navigate("/"); // 또는 navigate(-1); → 진짜 ‘뒤로가기’로 만들고 싶을 때
    };
    
    // 오류가 하나라도 있거나, 입력값이 비어있으면 버튼을 비활성화
    const isDisabled =
    Object.values(errors || {}).some((error) => error.length > 0) || // 오류가 있으면 true
    Object.values(values).some((value) => value === ""); // 입력값이 비어있으면 true

  return (
    <div className="flex flex-col items-center justify-center h-full gap-4">
      {/* ✅ 상단에 뒤로가기 버튼 추가 */}
      <button
        onClick={handleBack}
        className="absolute top-5 left-5 text-2xl font-bold text-gray-600 hover:text-gray-900"
      >
        &lt;
      </button>
      
      <div className="flex flex-col gap-3">
        <input
        {...getInputProps("email")}
        name="email"
          className={`border border-[#ccc] w-[300px] p-[10px] focus:border-[#807bff] rounded-sm
          ${errors?.email && touched?.email ? "border-red-500 bg-red-200" : "border-gray-300"}`}
          type={"email"}
          placeholder={"이메일"}
        />
        {errors?.email && touched?.email && (
            <div className="text-red-500 text-sm">{errors.email}</div>
            )}

        <input
        {...getInputProps("password")}
          className={`border border-[#ccc] w-[300px] p-[10px] focus:border-[#807bff] rounded-sm
          ${errors?.password && touched?.password ? "border-red-500 bg-red-200" : "border-gray-300"}`}
          type={"password"}
          placeholder={"비밀번호"}
        />
        {errors?.password && touched?.password && (
            <div className="text-red-500 text-sm">{errors.password}</div>
            )} 

        <button
          type="button"
          onClick={handleSubmit}
          disabled={isDisabled}
          className="w-full bg-blue-600 text-white py-3 rounded-md text-lg font-medium hover:bg-blue-700 transition-colors cursor-pointer disabled:bg-gray-300"
        >
          로그인
        </button>
      </div>
    </div>
  );
};

export default LoginPage;
