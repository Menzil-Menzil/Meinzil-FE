import { useEffect, useState } from "react";
import RegisterModal from "./modal/registerModal";
import LoginModal from "./modal/loginModal";
import { signOut, useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useRecoilState, useResetRecoilState } from "recoil";
import {userState} from "@/states/stateUser";
import {HeaderSection, MemberMenu, StyledLink} from "@/component/layout/header/header.style";
import Image from "next/image";
import alarmIc from "@/img/ic_alarm.png"
import searchIc from "@/img/ic_header_search.png"

import profileImg from "src/img/img_default-profile.png"

const Header = () => {
  const router = useRouter();
  const { data: sessionData, status: sessionStatus } = useSession();
  const [user, setUser] = useRecoilState(userState);
  const resetUser = useResetRecoilState(userState);

  // useEffect(() => {
  //   console.log("status:", JSON.stringify(sessionStatus));
  //   if (sessionData?.error) {
  //     signOut({ redirect: false}).then(() => {
  //       console.log(sessionData.error)
  //       alert("다시 로그인 해주세요!")
  //       return resetUser
  //     })
  //   } else {
  //     if (sessionData?.user?.name && sessionStatus === "authenticated") {
  //       setUser({
  //         name: sessionData.user.name,
  //         email: sessionData.user.email,
  //         image: sessionData.user.image,
  //         school:sessionData.user.school,
  //         major: sessionData.user.major
  //       })
  //     }
  //   }
  // }, [sessionData?.error, sessionData?.user?.name, setUser]);
  useEffect(() => {
    setUser({
      name: "유저",
      email: "user@example.com",
      image: profileImg,
      school: "ㅇㅇ대학교",
      major: "ㅁㅁ전공"
    })
  },[]);

  // 모달 버튼 클릭 유무를 저장할 state
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showRegisterModal, setShowRegisterModal] = useState(false);

  // 버튼 클릭시 모달 버튼 클릭 유무를 설정하는 state 함수
  const closeLoginModal = () => setShowLoginModal(!showLoginModal);
  const closeRegisterModal = () => setShowRegisterModal(!showRegisterModal);

  //모달 변경 함수
  const changeModal = () => {
    setShowRegisterModal(!showRegisterModal);
    setShowLoginModal(!showLoginModal);
  };

  const logOutHandler = () => {
    if (sessionData) {
      signOut({ redirect: false, callbackUrl: "/" }).then(() => {
        router.push("/").then(resetUser)
      });
    }
    //로컬로그아웃함수;
  };
  const unAuthUserLogoutHandler = () => {
    if (sessionData && !user.name) {
      signOut({ redirect: false, callbackUrl: "/" }).then(() => {
        alert("아직 회원가입이 완료되지 않았습니다. 나가시겠습니까?")
      });
    }
  }

  // const getChatList = async () => {
  //   try {
  //     const res = await axios
  //       .post(
  //         `${
  //           process.env.NEXT_PUBLIC_API_URL
  //         }/api/chat/rooms?nickname=${"멘티닉네임"}?type=MENTEE`,
  //         {}
  //       )
  //       .then((res) => {});
  //   } catch (e: any) {
  //     alert(e);
  //   }
  // };

  return (
    <>
      <HeaderSection>
        <div className="category">
          <StyledLink className="logo" href="/" onClick={unAuthUserLogoutHandler}>
            menjil
          </StyledLink>
          <StyledLink className="chatting" href="/chatting" onClick={unAuthUserLogoutHandler}>
            멘토링
          </StyledLink>
          <StyledLink className="follows" href="/follows"  onClick={unAuthUserLogoutHandler}>
            관심 멘토
          </StyledLink>
          <StyledLink className="community" href="/community" onClick={unAuthUserLogoutHandler}>
            커뮤니티
          </StyledLink>
        </div>
        <div className="member">
          {sessionData?.user ? (
            <>
              {user.name ? (
                <MemberMenu>
                  <Image src={user.image} alt="profile" width={26} height={26} style={{borderRadius: 7, objectFit: "cover"}}/>
                  <p>{user.name} 님</p>
                  <div className="line"/>
                  <StyledLink href="" onClick={logOutHandler}><p>로그아웃</p></StyledLink>
                  <div className="iconWrap">
                    <Image src={alarmIc} alt="alarm" width={19} height={19}/>
                    <Image src={searchIc} alt="alarm" width={18} height={18}/>
                  </div>
                </MemberMenu>
              ) : <StyledLink href="" onClick={logOutHandler}>나가기</StyledLink>
              }
            </>
          ) : (
            <>
              <StyledLink href="" className="login" onClick={closeRegisterModal}>
                회원가입
              </StyledLink>
              <StyledLink href="" className="login" onClick={closeLoginModal}>
                로그인
              </StyledLink>
            </>
          )}
        </div>
      </HeaderSection>
      {/* state가 true면 만들어놓은 모달 컴포넌트를 화면에 띄운다. */}
      {/* FeedSearchModal로 state함수를 props로 전달한다. - 모달 내에서 모달을 나갈 수 있어야 하기 때문 */}
      {showRegisterModal && (
        <RegisterModal
          closeRegisterModal={closeRegisterModal}
          changeModal={changeModal}
        />
      )}
      {showLoginModal && (
        <LoginModal
          closeLoginModal={closeLoginModal}
          changeModal={changeModal}
        />
      )}
    </>
  );
};

export default Header;
