import LeftIc from "@/img/ic_arrow_left.svg";
import RightIc from "@/img/ic_arrow_right.svg";
import { useContext, useEffect, useState } from "react";
import {
  FormContainerDiv,
  GoPageBtn,
  InputContainer,
  TitleBoxDiv,
} from "@/component/register/register.style";
import RegisterComponentContext from "@/context/RegisterComponentContext";
import axios from "axios";
import { useSession } from "next-auth/react";

const RegisterBasic = () => {
  const {
    handleNextClick,
    register,
    errors,
    isValid,
    trigger,
    nicknameCheck,
    setNameCheck,
    setValue,
  } = useContext<any>(RegisterComponentContext);

  const [duplicateName, setDuplicateName] = useState<any>("");
  const {data: sessionData} = useSession();
  useEffect(() => {
    setValue("email", sessionData?.user?.email);
    setValue("provider", sessionData?.provider);
  });

  const duplicateColor = () => {
    //input 박스 색상 변경
    if (errors.nickname !== undefined || duplicateName === 409) return 1; //잘못된 닉네임
    if (duplicateName === 200) return 2; //중복확인 성공 시
    else return 3; //둘다 아닌 경우
  };
  const checkMessage = () => {
    switch (duplicateName) {
      case 200:
        return "사용할 수 있는 닉네임입니다";
      case 409:
        return "이미 사용중인 닉네임입니다";
      default:
        return errors?.nickname?.message;
    }
  };

  const nicknameChange = (e: any) => {
    trigger("nickname");
    setDuplicateName("");
    return setNameCheck(e.target.value);
  };

  const duplicateCheck = async () => {
    try {
      await axios
        .get(
          `${process.env.NEXT_PUBLIC_API_URL}/api/auth/check-nickname?nickname=${nicknameCheck}`
        )
        .then((res) => {
          setDuplicateName(res.data.code);
        });
    } catch (e: any) {
      console.log(e);
      setDuplicateName(e.response.data.code);
    }
  };

  return (
    <>
      <GoPageBtn disabled={true}>
        <LeftIc />
      </GoPageBtn>
      <FormContainerDiv>
        <TitleBoxDiv>
          <span>기본 정보를 입력해주세요</span>
        </TitleBoxDiv>
        <InputContainer>
          <div className="titleBox">닉네임</div>
          <input
            type="text"
            placeholder="특수문자 제외 10자 이하"
            className="inputBox"
            style={{ width: "367px", marginRight: "36px" }}
            aria-invalid={duplicateColor()}
            {...register("nickname", {
              required: true,
              minLength: {
                // value의 최대 길이
                value: 2,
                message: "최소 2글자로 입력해주세요.", // 에러 메세지
              },
              maxLength: {
                // value의 최대 길이
                value: 10,
                message: "10글자 이하로 입력해주세요.", // 에러 메세지
              },
              pattern: {
                // input의 정규식 패턴
                value: /^[A-za-z0-9가-힣]{2,10}$/,
                message: "올바르지 않은 형식입니다", // 에러 메세지
              },
              onChange: (e: any) => nicknameChange(e),
            })}
          />
        </InputContainer>
        <InputContainer>
          <div className="titleBox">생년월일</div>
          <input
            type="number"
            placeholder="년(4자리)"
            className="inputBox"
            min="1900"
            max="2900"
            style={{ width: "144px", marginRight: "20px" }}
            {...register("birthYear", {
              required: true,
            })}
          />
          <input
            type="number"
            placeholder="월"
            className="inputBox"
            min="1"
            max="12"
            style={{ width: "100px" }}
            {...register("birthMonth", {
              required: true,
            })}
          />
        </InputContainer>
        <InputContainer>
          <button
            type="button"
            className="nicknameCheckBtn"
            disabled={nicknameCheck === "" ? true : !!errors.nickname}
            onClick={duplicateCheck}
          >
            중복확인
          </button>
        </InputContainer>
        <InputContainer>
          <div
            className="nicknameCheckTextDiv"
            style={
              duplicateName !== 200
                ? { color: "#ef2626" }
                : { color: "#2c8f47" }
            }
          >
            {/* // validation fail 시 에러 메세지 표시 */}
            {checkMessage()}
          </div>
        </InputContainer>
        <InputContainer>
          <div className="titleBox">직장</div>
          <input
            type="text"
            placeholder="없으면 생략가능"
            className="inputBox"
            style={{ width: "363px", marginRight: "40px" }}
            {...register("company", {
              required: false,
              pattern: {
                // input의 정규식 패턴
                value: /^[가-힣]{1,20}$/,
                message: "올바르지 않은 형식입니다", // 에러 메세지
              },
            })}
          />
        </InputContainer>
        <InputContainer>
          <div className="titleBox">입사년도</div>
          <input
            type="number"
            placeholder="년(4자리)"
            className="inputBox"
            min="1900"
            max="2900"
            style={{ width: "144px", marginRight: "20px" }}
            {...register("companyYear", {
              required: false,
            })}
          />
        </InputContainer>
      </FormContainerDiv>
      <GoPageBtn
        // type="submit"
        disabled={!isValid || duplicateName !== 200}
        onClick={() => {
          handleNextClick("RegisterEducation");
        }}
      >
        <RightIc />
      </GoPageBtn>
    </>
  );
};

export default RegisterBasic;
