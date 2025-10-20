import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, type SubmitHandler } from "react-hook-form";
import { z } from "zod";
import { postSignup } from "../apis/auth";
import { motion, AnimatePresence } from "framer-motion"; //애니메이션 라이브러리 pnpm add framer-motion
import { useState } from "react";
import axios from "axios";
import NavigationButtons from "../components/NavigationButtons";

//강사님 스타일: 스키마 객체 레벨에서 비번 일치 검증
const schema = z
  .object({
    email: z.string().email({ message: "올바른 이메일 형식이 아닙니다." }),

    password: z
      .string()
      .min(8, { message: "비밀번호는 8자 이상이어야 합니다." })
      .max(20, { message: "비밀번호는 20자 이하여야 합니다." }),

    passwordCheck: z
      .string()
      .min(8, { message: "비밀번호는 8자 이상이어야 합니다." })
      .max(20, { message: "비밀번호는 20자 이하여야 합니다." }),

    name: z.string().min(1, { message: "이름을 입력해주세요." }),
  })
  .superRefine((data, ctx) => {
    //비밀번호 일치 검증
    if (data.password !== data.passwordCheck) {
      ctx.addIssue({ 
        code: "custom", // ✅ 이게 꼭 필요함, 조드 3.22 이후부터 code 속성 필수
        path: ["passwordCheck"],
        message: "비밀번호가 일치하지 않습니다.",
      });
    }
  });


type FormFields = z.infer<typeof schema>;

const SignupPage = () => {
  const [step, setStep] = useState(1); //단계 상태 (1: 이메일 / 2: 비번 / 3: 닉네임)
  const [showPassword, setShowPassword] = useState(false); //비번 보기 토글
  const [showPasswordCheck, setShowPasswordCheck] = useState(false); //비번확인 보기 토글 추가

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<FormFields>({
    defaultValues: {
      name: "",
      email: "",
      password: "",
      passwordCheck: "",
    },
    resolver: zodResolver(schema),
    mode: "onBlur",
  });

  //입력값 관찰용
  const email = watch("email");
  const password = watch("password");
  const passwordCheck = watch("passwordCheck");
  const name = watch("name");

  //유효성 조건
  const isEmailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email || "");
  const isPasswordValid =
    password?.length >= 8 && 
    password.length <= 20 && //길이 조건 추가
    password === passwordCheck;
  const isNameValid = name.trim().length > 0;

  //회원가입 처리
  const onSubmit: SubmitHandler<FormFields> = async (data) => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { passwordCheck, ...rest } = data; // passwordCheck 제외
    try {
      const response = await postSignup(rest);
      console.log(response);
      //성공 시 (여기선 홈 이동 로직 가능)
      alert("회원가입이 완료되었습니다!");
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const message =
        error.response?.data?.message || "회원가입 중 오류가 발생했습니다.";
        alert(message);
      } else {
        alert("예상치 못한 오류가 발생했습니다.");
      }
      setStep(1);
    }
  };

  //강사님처럼: form 없이, 버튼 onClick으로 handleSubmit 호출
  return (
    <div className="flex flex-col items-center justify-center h-full gap-4">
      {/* ✅ 상단에 뒤로가기 버튼 추가 */}
      <NavigationButtons backPath="/" /> {/* 홈으로 이동 */}
      <AnimatePresence mode="wait">
        {/* STEP 1 - 이메일 입력 */}
        {step === 1 && (
          <motion.div
            key="email-step"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.25 }}
            className="flex flex-col gap-3"
          >
            <input
              {...register("email")}
              className={`border w-[300px] p-[10px] rounded-sm focus:border-[#807bff] ${
                errors.email
                  ? "border-red-500 bg-red-200"
                  : "border-gray-300"
              }`}
              type="email"
              placeholder="이메일을 입력해주세요"
            />
            {errors.email && (
              <div className="text-red-500 text-sm">
                {errors.email.message}
              </div>
            )}
            <button
              type="button"
              onClick={() => isEmailValid && setStep(2)}
              disabled={!isEmailValid}
              className={`w-full py-3 rounded-md text-lg font-medium transition-colors ${
                isEmailValid
                  ? "bg-pink-500 text-white hover:bg-pink-600"
                  : "bg-gray-300 text-gray-600"
              }`}
            >
              다음
            </button>
          </motion.div>
        )}

        {/* STEP 2 - 비밀번호 입력 */}
        {step === 2 && (
          <motion.div
            key="password-step"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.25 }}
            className="flex flex-col gap-3"
          >
            <div className="text-gray-500 text-sm mb-1">{email}</div>

            {/* 비밀번호 입력 */}
            <div className="relative">
              <input
                {...register("password")}
                className={`border w-[300px] p-[10px] rounded-sm focus:border-[#807bff] ${
                  errors.password
                    ? "border-red-500 bg-red-200"
                    : "border-gray-300"
                }`}
                type={showPassword ? "text" : "password"}
                placeholder="비밀번호"
              />
              <button
                type="button"
                onClick={() => setShowPassword((prev) => !prev)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-sm text-gray-500"
              >
                {showPassword ? "숨김" : "보기"}
              </button>
            </div>

            {/* 비밀번호 확인 입력 */}
            <div className="relative">
              <input
                {...register("passwordCheck")}
                className={`border w-[300px] p-[10px] rounded-sm focus:border-[#807bff] ${
                  errors.passwordCheck
                    ? "border-red-500 bg-red-200"
                    : "border-gray-300"
                }`}
                type={showPasswordCheck ? "text" : "password"}
                placeholder="비밀번호 확인"
              />
              <button
                type="button"
                onClick={() => setShowPasswordCheck((prev) => !prev)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-sm text-gray-500"
              >
                {showPasswordCheck ? "숨김" : "보기"}
              </button>
            </div>

            {errors.passwordCheck && (
              <div className="text-red-500 text-sm">
                {errors.passwordCheck.message}
              </div>
            )}

            <button
              type="button"
              onClick={() => isPasswordValid && setStep(3)}
              disabled={!isPasswordValid}
              className={`w-full py-3 rounded-md text-lg font-medium transition-colors ${
                isPasswordValid
                  ? "bg-pink-500 text-white hover:bg-pink-600"
                  : "bg-gray-300 text-gray-600"
              }`}
            >
              다음
            </button>
          </motion.div>
        )}

        {/* STEP 3 - 닉네임 입력 + 회원가입 완료 */}
        {step === 3 && (
          <motion.div
            key="name-step"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.25 }}
            className="flex flex-col gap-3 items-center"
          >
            {/* 프로필 이미지 UI (선택) */}
            <div className="w-24 h-24 rounded-full bg-gray-200 mb-2" />

            <input
              {...register("name")}
              className={`border w-[300px] p-[10px] rounded-sm focus:border-[#807bff] ${
                errors.name
                  ? "border-red-500 bg-red-200"
                  : "border-gray-300"
              }`}
              type="text"
              placeholder="닉네임을 입력해주세요"
            />
            {errors.name && (
              <div className="text-red-500 text-sm">
                {errors.name.message}
              </div>
            )}

            <button
              type="button"
              onClick={handleSubmit(onSubmit)}
              disabled={!isNameValid || isSubmitting}
              className={`w-full bg-blue-600 text-white py-3 rounded-md text-lg font-medium hover:bg-blue-700 transition-colors disabled:bg-gray-300`}
            >
              회원가입 완료
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default SignupPage;
