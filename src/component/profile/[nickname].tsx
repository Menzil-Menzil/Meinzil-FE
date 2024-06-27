import { useRouter } from "next/router";
import styled from "@emotion/styled";
import {
  ProfileBox,
  ProfileContentBox,
} from "@/component/profile/[nickname].style";
import Image from "next/image";
import SendQuestionIc from "@/img/ic_send-question.svg";
import { useRecoilValue, useRecoilState } from "recoil";
import { userState } from "@/states/stateUser";
import { authedTokenAxios, refreshTokenAPI } from "@/lib/jwt";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import ProfileAnswers from "@/component/profile/profileAnswers";
import ProfileCareer from "@/component/profile/profileCareer";
import unfollowIc from "@/img/ic_unfollow.png";
import followIc from "@/img/ic_follow.png";
import { mentoringState } from "@/states/stateMain";
import {
  subscribeState,
  nowSubscribeState,
  ISubscribe,
} from "@/states/stateSubscribe";
import profileImg from "src/img/img_profile-image-1.png"

export const ProfileContainerDiv = styled.div`
  width: 1300px;
  min-height: 600px;
  margin: 68px auto;
  display: flex;
  flex-wrap: wrap;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  user-select: none;
`;

interface RadioElementType {
  children: any;
  value: string;
  defaultChecked: boolean;
  onChange: any;
}
const Radio = ({
  children,
  value,
  defaultChecked,
  onChange,
}: RadioElementType) => {
  return (
    <>
      <input
        id={value}
        type="radio"
        name="menu"
        value={value}
        defaultChecked={defaultChecked}
        onChange={onChange}
      />
      <label htmlFor={value}>{children}</label>
    </>
  );
};

const Profile = () => {
  const router = useRouter();
  const profileNickname = router.query.nickname!;
  const user = useRecoilValue(userState);
  const { data: sessionData, update: sessionUpdate } = useSession();
  const [profileDto, setProfileDto] = useState<any>();
  const [answerCount, setAnswerCount] = useState<number>();
  const [answerDataList, setAnswerDataList] = useState<any[]>([]);
  const [menuComponent, setMenuComponent] = useState<string>("answers");
  const [isFollow, setIsFollow] = useState<boolean>(true);
  const [src, setSrc] = useState(unfollowIc);
  const [mentoring, setMentoring] = useRecoilState(mentoringState);
  const [chattingMentor, setChattingMentor] = useRecoilState(nowSubscribeState);

  const handleMenuChange = (e: any) => {
    setMenuComponent(e.target.value);
  };
  const myMentorAxios = async (
    sessionData: any,
    userName: any,
    profileName: any
  ) => {
    try {
      const response = await authedTokenAxios(sessionData.accessToken).get(
        `${process.env.NEXT_PUBLIC_API_URL}/api/following/info?nickname=${userName}&followNickname=${profileName}`
      );
      return response.data;
    } catch (error: any) {
      console.log(
        `${error.response?.data?.code}: ${error.response?.data?.message}`
      );
      refreshTokenAPI(sessionData, sessionUpdate).then();
    }
  };
  const onClickUnfollowBtn = async (
    sessionData: any,
    userName: string,
    mentorName: any
  ) => {
    try {
      const result = await authedTokenAxios(sessionData.accessToken).post(
        `${process.env.NEXT_PUBLIC_API_URL}/api/follow/request`,
        {
          userNickname: userName,
          followNickname: mentorName,
        }
      );
      if (result.data.message === "팔로우가 정상적으로 생성되었습니다") {
        setIsFollow(true);
      } else {
        setIsFollow(false);
      }
    } catch (error: any) {
      console.log(
        `${error.response?.data?.code}: ${error.response?.data?.message}`
      );
      refreshTokenAPI(sessionData, sessionUpdate).then();
    }
  };

  const profileData = {
    "followingUserInfoDto": {
      "nickname": "mentor1",
      "company": "Amazon",
      "field": "백엔드",
      "school": "서울과학기술대학교",
      "major": "컴퓨터공학과",
      "subMajor": null,
      "minor": null,
      "techStack": "Java, Spring Boot, typescript, AWS",
      "imgUrl": profileImg,
      "career": "2015.07 ~ 2018.11 : LG CNS 개발자,\n        2019.04 ~ 2019.12: MyTutor Software Engineer,\n        2020.01 ~ 2022.08: Credit Karma Software Engineer,\n        2022.09 ~ 현재: Amazon Software Engineer",
      "certificate": "정보처리기사",
      "awards": null,
      "activity": null
    },
    "answersCount": 56,
    "answers": [
      {
        "questionOrigin": "안녕하세요 백엔드 개발자 취업을 앞둔 취준생인데요,\n제가 개인 플젝이 없어서 플젝을 하려고 하는데\n그 전에 야매로 조금 배운 스프링을 더 배울지, 더 배운다면 인프런의 어느 강의까지는 들어야할지or\n바로 프로젝트를 시작할지\n선배님들의 조언이 필요합니다!",
        "questionSummary": "백엔드 개발자 취업을 앞둔 취준생이 플젝을 하려하는데, 스프링을 더 배울지 아니면 프로젝트를 시작할지 어떻게 해야할지 선배님들의 조언이 필요합니다.",
        "answer": "간단한 프로젝트라도 만들어 나가다가, 막히는 부분이 있을때 그 부분을 해결하기 위해서 강의를 들어보시면 어떨까요? 저는 그래야 재미가 있어서 계속하게 되더라구요.",
        "answerTime": "2023-09-08 05:03:50",
        "views": 0,
        "likes": 0
      },
      {
        "questionOrigin": "지방권에서 컴퓨터 쪽 전공 다니고 있는데 웹개발쪽으로 취직하고 싶습니다..\n이번에 졸업해서 본격적으로 배우고 싶긴한데 비용이 부담스러워서 국비지원캠프 해보려고 하는데\n내일배움캠프랑 코드잇 둘 중에 고민이네요.. 해보신 분이나 아시는 분 계신가요?ㅠㅜ\n",
        "questionSummary": "지방권에서 컴퓨터 전공으로 웹개발에 취직하고 싶은데 비용이 부담스러워서 국비지원캠프를 고민하고 있다. 내일배움캠프와 코드잇 중 어떤 것이 좋은지 알고 싶다.",
        "answer": "저는 내일배움캠프와 코드잇 둘다 해봤습니다. 프론트엔드 국비로 배웠는데 html/css 마크업과 퍼블리싱 위주로 가르쳤고, 솔직히 그것만으로는 부족했어요. 취업해서 7개월 간 실무를 해봤는데.. 정말 국비학원에서 배운 것과는 천지 차이였어요! 저는 비전공자라서 국비학원 다니길 잘했다고 생각하긴 하지만, 실무에 부딪히고 나서 국비학원을 다니면서 인강도 들을걸.. 싶더라구요. 제 생각에는 국비학원은 포트폴리오를 빡세게 만들 수 있는 시간인 거 같아요.\n만약 국비학원을 다닌다고 하더라도 생활코딩, 코드잇 등의 사이트로 개인공부를 꼭 하시는 걸 추천드려요!\n그리고.. '비전공이지만 개발자로 먹고 삽니다.' 라는 책에서 지방보다 서울 수도권 국비학원의 퀄리티가 훨씬 좋다고 하더라구요.\n저도 부산에서 다녀서 얼마나 차이나는지는 잘 모르겠지만, 전문가가 그렇게 얘기 하니 참고하세요.",
        "answerTime": "2023-09-08 05:04:50",
        "views": 0,
        "likes": 0
      }
    ]
  };

  useEffect(() => {
    if(user.name !== "유저" && user.name == profileNickname) {
      myMentorAxios(sessionData, user.name, profileNickname).then((result) => {
        setProfileDto(result.data.followingUserInfoDto);
        setAnswerCount(result.data.answersCount);
        setAnswerDataList(result.data.answers);
      });
    }
    else if (user.name === "유저") {
      setProfileDto(profileData.followingUserInfoDto);
      setAnswerCount(profileData.answersCount);
      setAnswerDataList(profileData.answers);
    }
    else {
      // myMentorAxios(sessionData, user.name, profileNickname).then((result) => {
      //   setProfileDto(result.data.followingUserInfoDto);
      //   setAnswerCount(result.data.answersCount);
      //   setAnswerDataList(result.data.answers);
      // });
    }
  }, [profileNickname, sessionData, user]);

  useEffect(() => {
    if(user.name !== profileNickname) {
      if (isFollow) setSrc(unfollowIc);
      else setSrc(followIc);
    }
  }, [isFollow]);

  // const moveChattingMentor = async () => {
  //   if (!!user.name && !!profileNickname) {
  //     const moveRoom: ISubscribe = {
  //       roomId: chattingData.roomId,
  //       imgUrl: chattingData.imgUrl,
  //       nickname: profileNickname,
  //       lastMessage: "",
  //       lastMessageTime: "",
  //     };

  //     setMentoring({ mentor: profileNickname, mentee: user.name });
  //     setChattingMentor(moveRoom);

  //     try {
  //       const res = await authedTokenAxios(sessionData?.accessToken).post(
  //         `${process.env.NEXT_PUBLIC_API_URL}/api/chat/room/enter`,
  //         {
  //           menteeNickname: user.name,
  //           mentorNickname: profileNickname,
  //           roomId: chattingData.roomId,
  //         }
  //       );
  //       // .then((res) => {});
  //     } catch (error: any) {
  //       console.log(
  //         `${error.response?.data?.code}: ${error.response?.data?.message}`
  //       );
  //       refreshTokenAPI(sessionData, sessionUpdate).then();
  //     }

  //     router
  //       .push({
  //         pathname: "/chatting",
  //         //query: {mentor: mentorNickname}
  //       })
  //       .then();
  //   }
  // };

  return (
    <ProfileContainerDiv>
      <ProfileBox>
        {profileDto && (
          <ProfileContentBox>
            <div className="profileInfo">
              <Image
                src={profileDto.imgUrl}
                alt={"profile"}
                width={80}
                height={80}
                priority={true}
                style={{
                  borderRadius: "12px",
                  objectFit: "cover",
                }}
              />
              <div className="wrap">
                <div className="titleWrap">
                  <p className="nickname">{profileNickname}</p>
                  {user.name !== profileNickname ?
                    <>
                      <button className="button emphasisColor">
                        <SendQuestionIc />
                        채팅하기
                      </button>
                      <button
                        className="button"
                        onClick={() =>
                          onClickUnfollowBtn(
                            sessionData,
                            user.name!,
                            profileNickname
                          )
                        }
                      >
                        <Image src={src} alt="follow" width={21} height={21} />
                        관심멘토
                      </button>
                    </>
                    :
                    <></>
                  }
                </div>
                <div className="contentWrap">
                  <div className="answers wrap">
                    작성답변
                    <div className="count">{answerCount}</div>
                  </div>
                  <div className="likes wrap">
                    추천답변
                    <div className="count">0</div>
                  </div>
                  <div className="reviews wrap">
                    멘토링 후기
                    <div>답변이 상세하고 친절해요</div>
                    <div>현실적인 부분을 정확히 알려줘요</div>
                  </div>
                  <div className="skillInfo">
                    <div className="skillBox">
                      직장・직군
                      <div className="data emphasis">{profileDto.company}</div>
                      <div className="data">{profileDto.field}</div>
                    </div>
                    <div className="skillBox">
                      학력・전공
                      <div className="data emphasis">{profileDto.school}</div>
                      <div className="data">
                        <div className="majorTag">주</div>
                        {profileDto.major}
                      </div>
                      {profileDto.subMajor && (
                        <div className="data">
                          <div className="majorTag">복수</div>
                          {profileDto.subMajor}
                        </div>
                      )}
                      {profileDto.minor && (
                        <div className="data">
                          <div className="majorTag">부</div>
                          {profileDto.minor}
                        </div>
                      )}
                    </div>
                    <div className="skillBox">
                      기술스택
                      <div className="data techData">
                        {profileDto.techStack
                          .split(", ")
                          .map((data: string, index: number) => {
                            return (
                              <div key={index} className="techStack">
                                {data}
                              </div>
                            );
                          })}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="btnGroup">
              <Radio value="answers" defaultChecked onChange={handleMenuChange}>
                작성 답변
              </Radio>
              <Radio
                value="career"
                defaultChecked={false}
                onChange={handleMenuChange}
              >
                경력
              </Radio>
              <Radio
                value="certificate"
                defaultChecked={false}
                onChange={handleMenuChange}
              >
                자격증
              </Radio>
              <Radio
                value="awards"
                defaultChecked={false}
                onChange={handleMenuChange}
              >
                수상내역
              </Radio>
              <Radio
                value="activity"
                defaultChecked={false}
                onChange={handleMenuChange}
              >
                대외활동
              </Radio>
            </div>
          </ProfileContentBox>
        )}
        {menuComponent === "answers" && (
          <ProfileAnswers answerList={answerDataList} />
        )}
        {menuComponent === "career" && (
          <ProfileCareer
            careerData={
              profileDto.career
                ? profileDto.career
                : "Shopby 라인업 유지보수 및 레거시 환경 개선, Shopby Pro Modern Skin 신규 스킨 개발, Shopby Pro Skin 기본 스킨 개발(Another 스킨), Shopby Pro Admin 회원・운영 개발"
            }
            title={profileDto.company}
            subtitle={profileDto.field}
          />
        )}
        {menuComponent === "certificate" && <>{profileDto.certificate}</>}
        {menuComponent === "awards" && <>{profileDto.awards}</>}
        {menuComponent === "activity" && (
          <ProfileCareer
            careerData={
              profileDto.activity
                ? profileDto.activity
                : "디프만 10기 (디프만 - IT 연합동아리), 우아한 테크 캠프 4기 (우아한형제들), SW마에스트로 11기 (과학기술정보통신부 주관), NOA(Network Of All) (하드웨어 및 소프트웨어 융합 교내 동아리)"
            }
            title="디프만 10기"
            subtitle="IT 연합동아리"
          />
        )}
      </ProfileBox>
    </ProfileContainerDiv>
  );
};
export default Profile;
