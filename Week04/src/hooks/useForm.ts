import { type ChangeEvent, useEffect, useState } from "react";
//ChangeEvent여기 부분 왜 에러 뜨는 거냐?
//나는 앞에 type을 붙여야 해결이 됨 강사님은 안 붙여도 됨 뭐임?

interface UseFormProps<T> {
  initialValue: T; // 초기값
  validate: (values: T) => Record<keyof T, string>;
}

function useForm<T>({ initialValue, validate }: UseFormProps<T>) {
  const [values, setValues] = useState(initialValue);
  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const [errors, setErrors] = useState<Record<string, string>>({});

  // 사용자가 입력값을 바꿨을 때 실행
  const handleChange = (name: keyof T, text: string) => {
    setValues({
      ...values, //불변성 유지(기존 값 유지)
      [name]: text,
    });
  };

  // 사용자가 입력 필드 밖을 클릭했을 때 (blur 이벤트)
  const handleBlur = (name: keyof T) => {
    setTouched({
      ...touched,
      [name]: true,
    });
  };

  // input, textarea 등 속성을 묶어서 반환
  const getInputProps = (name: keyof T) => {
    const value = values[name];

    const onChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
      handleChange(name, e.target.value);

    const onBlur = () => handleBlur(name);
    
    return { value, onChange, onBlur};
    };
  
    // values가 변경될 때마다 에러 검증 로직이 실행됨.
    // { email: '' }
    useEffect(() => {
        const newErrors = validate(values);
        setErrors(newErrors); // 오류 메시지 업데이트
    }, [validate, values]);

    return { values, errors, touched, getInputProps };
};

export default useForm;
