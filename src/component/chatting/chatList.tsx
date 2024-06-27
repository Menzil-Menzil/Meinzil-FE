import ChattingComponentContext from "@/context/chattingComponentContext";
import styled from "@emotion/styled";
import { useContext, useState } from "react";
import SettingsIc from "@/img/ic_settings.svg";
import Image from "next/image";
import { useRecoilState } from "recoil";
import { nowSubscribeState, subscribeState } from "@/states/stateSubscribe";

export const ChatListForm = styled.div`
  width: 400px;
  height: 750px;
  flex-shrink: 0;
  margin-right: 30px;
  display: block;
  position: relative;
  font-style: normal;
  border-radius: 12px;
  border: 0 solid #bebebe;
  background: rgba(244, 243, 241, 0.47);
  box-shadow: 0 0 4px 0 rgba(0, 0, 0, 0.25);
  .chatMenuHeader {
    position: relative;
    z-index: 1;
    width: 100%;
    height: 60px;
    flex-shrink: 0;
    border-radius: 12px 12px 0 0;
    background: #f4f3f1;
    box-shadow: 0 2px 4px -1px rgba(0, 0, 0, 0.2);
    .chatMenuHeaderText {
      position: absolute;
      color: #000;
      font-size: 18px;
      font-style: normal;
      font-weight: 700;
      line-height: normal;
      margin: 20px auto auto 25px;
    }
    .SettingsIc {
      position: absolute;
      margin-top: 16px;
      right: 20px;
    }
  }
  .chatListDiv {
    width: 400px;
    height: 680px;
    margin: 0 auto;
    overflow-x: hidden;
    overflow-y: auto;
    ::-webkit-scrollbar {
      display: none; /*Chrome, Safari, Opera*/
      width: 0;
    }
    .selectedChatListBox {
      position: relative;
      width: 400px;
      height: 94px;
      flex-shrink: 0;
      display: flex;
      border-bottom: 1px solid #e0e0e0;
      background: #fff;
      box-shadow: 0 5px 7px -4px rgba(0, 0, 0, 0.2);
      box-sizing: border-box;
      pointer-events: none;
      .selectedBoxLine {
        position: absolute; //제거할 지 물어보기
        width: 5px;
        height: 93px;
        flex-shrink: 0;
        background: #ff8a00;
      }
    }
    .chatListBox {
      position: relative;
      width: 400px;
      height: 95px;
      flex-shrink: 0;
      display: flex;
      border-bottom: 1px solid #e0e0e0;
      box-sizing: border-box;
    }
    .profileImg {
      width: 53px;
      height: 53px;
      position: relative;
      overflow: hidden;
      flex-shrink: 0;
      border-radius: 12px;
      background: url(<path-to-image>), lightgray 50% / cover no-repeat;
      margin: auto 15px auto 25px;
    }
    .messageContentDiv {
      width: 282px;
      height: 65px;
      margin-top: 15px;
      position: relative;
      display: block;
      .nameHeaderDiv {
        display: flex;
        align-items: center;
        justify-content: space-between;
        .mentorName {
          color: #000;
          font-size: 15px;
          font-style: normal;
          font-weight: 600;
          line-height: normal;
        }
        .messageTime {
          top: 12px;
          right: 9px;
          color: rgba(82, 82, 82, 0.92);
          text-align: right;
          font-size: 12px;
          font-style: normal;
          font-weight: 400;
          line-height: normal;
        }
      }
      .messageContent {
        width: 277px;
        height: 42px;
        display: block;
        margin-top: 5px;
        color: #525252;
        font-size: 14px;
        font-weight: 400;
        line-height: 150%; /* 21px */
        overflow: hidden;
        text-overflow: ellipsis;
      }
    }
  }
`;

interface timeData {
  diffDate: any;
  diffHour: any;
  diffMin: any;
}

const ChatList = () => {
  const { moveChattingRoom, selectIndex, setSelectIndex } = useContext<any>(
    ChattingComponentContext
  );
  const [chattingRooms, setChattingRooms] = useRecoilState(subscribeState);
  const [chattingMentor, setChattingMentor] = useRecoilState(nowSubscribeState);

  return (
    <ChatListForm>
      <div className="chatMenuHeader">
        <p className="chatMenuHeaderText">채팅목록</p>
        <SettingsIc className="SettingsIc" />
      </div>
      {chattingRooms && chattingRooms.length > 0 && (
        <div className="chatListDiv">
          {chattingRooms.map((_chattingRooms: any, index: any) => (
            <div
              className={
                selectIndex !== _chattingRooms.roomId
                  ? "chatListBox"
                  : "selectedChatListBox"
              }
              key={index}
              onClick={() => {
                setChattingMentor(() => _chattingRooms);
                setSelectIndex(_chattingRooms.roomId);
                moveChattingRoom(_chattingRooms);
              }}
            >
              {selectIndex === _chattingRooms.roomId && (
                <div className="selectedBoxLine"></div>
              )}
              <div className="profileImg">
                <Image
                  src={_chattingRooms.imgUrl}
                  alt="profile"
                  fill
                  sizes="50vw"
                  style={{ objectFit: "cover" }}
                />
              </div>
              <div className="messageContentDiv">
                <div className="nameHeaderDiv">
                  <span className="mentorName">{_chattingRooms.nickname}</span>
                  <span className="messageTime">
                    {_chattingRooms.lastMessageTime}
                  </span>
                </div>
                <span className="messageContent">
                  {_chattingRooms.lastMessage}
                </span>
              </div>
            </div>
          ))}
        </div>
      )}
    </ChatListForm>
  );
};

export default ChatList;
