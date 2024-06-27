import {
  AsideBtnGroup,
  AsideListDiv,
} from "@/component/main/userAside/userAside.style";
import ChattingCard from "@/component/main/userAside/asideMenu/chattingCard";
import { useSession } from "next-auth/react";
import { authedTokenAxios, refreshTokenAPI } from "@/lib/jwt";
import { useEffect, useState } from "react";
import { userState } from "@/states/stateUser";
import { useRecoilValue } from "recoil";
import styled from "@emotion/styled";
import FollowingCard from "@/component/main/userAside/asideMenu/followingCard";
import RightIc from "@/img/ic_right_arrow_20.svg";
import { followEventState } from "@/states/stateMain";
import Link from "next/link";
import { subscribeState } from "@/states/stateSubscribe";

import profileImg1 from "src/img/img_profile-image-1.png"
import profileImg2 from "src/img/img_profile-image-2.png"
import profileImg3 from "src/img/img_default-profile.png"

export const AsideMenuContainer = styled.div`
  height: 323px;
  display: flex;
  flex-direction: column;
  border-radius: 12px;
  background: var(--aside-menu-bg-color);
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

const AsideMenu = () => {
  const user = useRecoilValue(userState);
  const chattingRooms = useRecoilValue(subscribeState);
  const followEvent = useRecoilValue(followEventState);
  const { data: sessionData, update: sessionUpdate } = useSession();
  const [followingList, setFollowingList] = useState<any[]>();
  const [menuComponent, setMenuComponent] = useState<string>("mentors");
  const handleMenuChange = (e: any) => {
    setMenuComponent(e.target.value);
  };

  const followingData = [
    {
      "nickname": "mentor11",
      "company": "NAVER",
      "techStack": "Python, R, SQL, TensorFlow, Scikit-learn",
      "imgUrl": profileImg1
    },
    {
      "nickname": "mentor14",
      "company": "카카오",
      "techStack": "JavaScript, React, Vue, HTML, CSS",
      "imgUrl": profileImg2
    },
    {
      "nickname": "mentor7",
      "company": "마켓컬리",
      "techStack": "Spring Boot, Java, Spring, git",
      "imgUrl": profileImg3
    },
    {
      "nickname": "mentor1",
      "company": "Amazon",
      "techStack": "Java, Spring Boot, typescript, AWS",
      "imgUrl": profileImg1
    }
  ];

  const followingAxios = async (sessionData: any) => {
    try {
      const result = await authedTokenAxios(sessionData.accessToken).get(
        `${process.env.NEXT_PUBLIC_API_URL}/api/main/following?nickname=${user.name}`
      );
      setFollowingList(result.data.data);
    } catch (error: any) {
      console.log(
        `${error.response?.data?.code}: ${error.response?.data?.message}`
      );
      refreshTokenAPI(sessionData, sessionUpdate).then();
    }
  };

  useEffect(() => {
    if (!!user.name && sessionData?.user) {
      followingAxios(sessionData).then();
    }
    else if (user.name === "유저") {
      setFollowingList(followingData);
    }
  }, [followEvent, sessionData, user.name]);

  return (
    <AsideMenuContainer>
      <AsideBtnGroup>
        <div className="radioBtnGroup">
          <Radio value="mentors" defaultChecked onChange={handleMenuChange}>
            관심멘토
          </Radio>
          <Radio
            value="chat"
            defaultChecked={false}
            onChange={handleMenuChange}
          >
            채팅목록
          </Radio>
        </div>
        {menuComponent === "mentors" ? (
          <Link href="/follows">
            모든 멘토
            <RightIc />
          </Link>
        ) : (
          <Link href="/chatting">
            모든 채팅
            <RightIc />
          </Link>
        )}
      </AsideBtnGroup>
      {menuComponent === "mentors" && (
        <AsideListDiv>
          {followingList &&
            followingList.map((data: any, index: number) => {
              return (
                <FollowingCard key={index} data={data} userName={user.name!}/>
              );
            })}
        </AsideListDiv>
      )}
      {menuComponent === "chat" && (
        <AsideListDiv>
          {chattingRooms &&
            chattingRooms.map((data: any, index: number) => {
              if (index < 3) {
                return <ChattingCard key={index} data={data} />;
              }
            })}
        </AsideListDiv>
      )}
    </AsideMenuContainer>
  );
};
export default AsideMenu;
