import styled from "@emotion/styled";
import UserProfile from "@/component/main/userAside/userProfile";
import AsideMenu from "@/component/main/userAside/asideMenu";
import UnauthMenu from "@/component/main/userAside/unauthMenu";
import { useRecoilValue } from "recoil";
import { userState } from "@/states/stateUser";
import TopBtn from "@/component/topBtn";

export const UserAsideContainer = styled.div`
  height: auto;
  .asideContainer {
    position: sticky;
    top: 90px;
    z-index: 2;
    width: 327px;
    max-height: 430px;
    border-radius: 12px;
    border: 0 solid rgba(0, 0, 0, 0.12);
    background: white;
    box-shadow: 0 0 4px 0 var(--box-shadow);
    display: flex;
    flex-direction: column;
  }
`;

const UserAside = () => {
  const user = useRecoilValue(userState);

  return (
    <>
      <UserAsideContainer>
        <div className="asideContainer">
          {(!user.name && user.name !== "유저") ? (
            <UnauthMenu />
          ) : (
            <>
              <UserProfile />
              <AsideMenu />
            </>
          )}
        </div>
      </UserAsideContainer>
      <TopBtn/>
    </>
  );
};
export default UserAside;