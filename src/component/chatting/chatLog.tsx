import React, { useContext, useEffect, useState } from "react";
import styled from "@emotion/styled";
import SendIc from "@/img/ic_send.svg";
import DotIc from "@/img/ic_dot-horizontal.svg";
import MessageContent from "./messageContent";
import Image from "next/image";
import { useRecoilState } from "recoil";
import { nowSubscribeState, pubMessageState } from "@/states/stateSubscribe";

export const ChatLogForm = styled.div`
  position: relative;
  width: 898px;
  height: 750px;
  display: block;
  border-radius: 12px;
  border: 0 solid #bebebe;
  background: rgba(255, 255, 255, 0.37);
  box-shadow: 0 0 4px 0 rgba(0, 0, 0, 0.25);

  .chatLogHeader {
    width: 100%;
    height: 95px;
    position: relative;
    border-radius: 12px 12px 0 0;
    border-bottom: 1px solid #e0e0e0;
    background: #f4f3f1;
    box-sizing: border-box;
    display: flex;
    .mentorInfoDiv {
      height: 55px;
      position: relative;
      top: 20px;
      left: 25px;
      display: flex;
      align-items: center;
      .mentorProfileImage {
        width: 55px;
        height: 55px;
        position: relative;
        overflow: hidden;
        flex-shrink: 0;
        border-radius: 12px;
        background: #ffaa00;
      }
      .mentorProfileTextBox {
        height: 46px;
        flex-shrink: 0;
        margin-left: 15px;
        display: block;
        overflow: visible;
        .mentorProfileName {
          color: #000;
          font-size: 18px;
          font-style: normal;
          font-weight: 700;
          line-height: normal;
          display: block;
          margin-bottom: 8px;
        }
        .recommendedAnswerNumber {
          color: #525252;
          font-size: 14px;
          font-style: normal;
          font-weight: 400;
          line-height: normal;
          display: block;
        }
      }
    }
    .DotIc {
      position: absolute;
      top: 36px;
      right: 25px;
    }
  }

  .messageContainer {
    width: 100%;
    height: 112px;
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;
    bottom: 0;
    border-radius: 0 0 12px 12px;
    border-top: 1px solid #e0e0e0;
    background: #f4f3f1;
    box-sizing: border-box;
    .sendMessageBoxDiv {
      width: 848px;
      height: 72px;
      position: relative;
      align-items: center;
      border-radius: 12px;
      border: 1px solid #bebebe;
      background: #fff;
      display: flex;

      .messageInputDiv {
        width: 669px;
        height: 42px;
        border: none;
        position: absolute;
        top: 0;
        padding: 0;
        background-color: transparent;
        color: #000;
        font-size: 16px;
        font-style: normal;
        font-weight: 500;
        line-height: normal;
        margin-left: 20px;
        margin-top: 15px;
        white-space: pre-wrap;
        resize: none;
        :focus {
          outline: none;
        }
        ::placeholder {
          color: rgba(0, 0, 0, 0.37);
        }
      }
    }
    .sendBtn {
      position: absolute;
      display: flex;
      margin: 0 auto;
      right: 20px;
      width: 119px;
      height: 42px;
      flex-shrink: 0;
      border-radius: 12px;
      border: 1px solid #ff8a00;
      background: #ff8a00;
      color: #fff;
      text-shadow: 0 0 3px 0 rgba(216, 101, 37, 0.5);
      font-size: 16px;
      font-style: normal;
      font-weight: 600;
      line-height: normal;
      align-items: center;
      justify-content: center;
      :disabled {
        background-color: #353535;
        border: 1px solid #000000;
      }
    }
  }
`;

const ChatLog = () => {
  const [chattingMentor, setChattingMentor] = useRecoilState(nowSubscribeState);
  const [messageInput, setMessageInput] = useRecoilState(pubMessageState); //보내는 메세지
  const [message, setMessage] = useState<string>();

  return (
    <ChatLogForm>
      <div className="chatLogHeader">
        <div className="mentorInfoDiv">
          <div className="mentorProfileImage">
            <Image
              src={chattingMentor.imgUrl}
              alt="profile"
              fill
              sizes="50vw"
              style={{ objectFit: "cover" }}
            />
          </div>
          <div className="mentorProfileTextBox">
            <span className="mentorProfileName">{chattingMentor.nickname}</span>
            <span className="recommendedAnswerNumber">답변수, 팔로워수</span>
          </div>
        </div>
        <DotIc className="DotIc" />
      </div>
      <MessageContent />
      <div className="messageContainer">
        <div className="sendMessageBoxDiv">
          <textarea
            placeholder={"멘토에게 질문하고 싶은 점을 입력해주세요!"}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className="messageInputDiv"
          />
          <button
            className="sendBtn"
            disabled={message === "" ? true : false}
            onClick={() => {
              setMessageInput(message);
              setMessage("");
            }}
          >
            <SendIc style={{ marginRight: "5px" }} /> 전송하기
          </button>
        </div>
      </div>
    </ChatLogForm>
  );
};

export default ChatLog;
