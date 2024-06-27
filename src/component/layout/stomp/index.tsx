import {
  aiQuestionState,
  chatMessagesState,
  nowSubscribeState,
  pubMessageState,
  subscribeState,
  ratingState,
} from "@/states/stateSubscribe";
import { userState } from "@/states/stateUser";
import StompJs from "@stomp/stompjs";
import axios from "axios";
import { useCallback, useEffect, useState } from "react";
import { useRecoilState, useRecoilValue } from "recoil";

const Stomp = () => {
  const [subscriptionList, setSubscription] = useState<any[]>([]);
  const [chattingRooms, setChattingRooms] = useRecoilState(subscribeState);
  const [messagesLog, setMessagesLog] = useRecoilState(chatMessagesState); //메세지들
  const [chattingMentor, setChattingMentor] = useRecoilState(nowSubscribeState);
  const [messageInput, setMessageInput] = useRecoilState(pubMessageState); //보내는 메세지
  const [aiQuestion, setAiQuestion] = useRecoilState(aiQuestionState);
  const [ratingSelect, setRatingSelect] = useRecoilState(ratingState);
  const user = useRecoilValue(userState);

  const bringAllChatRoom = useCallback(async () => {
    try {
      const res = await axios
        .get(
          `${process.env.NEXT_PUBLIC_API_URL}/api/chat/rooms?nickname=${
            user.name
          }&type=${"MENTEE"}`
        )
        .then((res) => {
          setChattingRooms(() => res.data.data);
        });
    } catch (e: any) {
      alert(e);
    }
  }, [setChattingRooms, user.name]);

  const client = new StompJs.Client({
    brokerURL: `${process.env.NEXT_PUBLIC_STOMP_API_URL}/ws/chat/websocket`,
    /*
    connectHeaders: {
      login: 'user',
      passcode: 'password',
    },
    onConnect: () => {
      console.log('success');
      subscribe();
      publishOnWait();
    },
    */
    debug: function (str) {
      console.log(str);
    },
    reconnectDelay: 5000,
    heartbeatIncoming: 4000,
    heartbeatOutgoing: 4000,
  });

  const connect = () => {
    client.activate();
  };

  const disConnect = () => {
    client.deactivate();
    console.log('채팅이 종료되었습니다.');
    //setIsMatch(false);
  };

  // 채팅방 구독하기
  const subscribe = (roomId: any) => {
    const subscription = client?.subscribe(
      `/queue/chat/room/${roomId}`,
      ({ body }) => {
        console.log(JSON.parse(body).data);
        if (typeof JSON.parse(body).data.length === "number") {
          //채팅이 여러 개일 경우
          JSON.parse(body).data.map((message: any) => {
            setMessagesLog((messagesLog) => [...messagesLog, message]);
          });
        } else {
          //하나씩 오는 대화 아래에 표시
          setMessagesLog((messagesLog) => [
            JSON.parse(body).data,
            ...messagesLog,
          ]);
        }
      }
    );
    setSubscription((subscriptionList) => [...subscriptionList, subscription]);
    return;
  };

  const publish = (message: any, messageType: string, senderType: string) => {
    if (!client?.connected) return;
    const today = new Date();
    const year = today.getFullYear();
    const month = ("0" + (today.getMonth() + 1)).slice(-2);
    const day = ("0" + today.getDate()).slice(-2);
    const hours = ("0" + today.getHours()).slice(-2);
    const minutes = ("0" + today.getMinutes()).slice(-2);
    const seconds = ("0" + today.getSeconds()).slice(-2);

    const dateString = year + "-" + month + "-" + day;
    const timeString = hours + ":" + minutes + ":" + seconds;
    const nowTime = dateString + " " + timeString;

    client?.publish({
      destination: `/pub/chat/room/${chattingMentor.roomId}`,
      body: JSON.stringify({
        roomId: chattingMentor.roomId,
        senderType: senderType,
        senderNickname: user.name,
        message: message,
        messageType: messageType,
        time: nowTime,
      }),
    });

    setMessageInput("");
  };

  const showQuestion = (
    index: any,
    AI_SUMMARY: string,
    AI_SUMMARY_ANSWER: string
  ) => {
    console.log(index + "번 대화");
    publish(index + "번 대화", "AI_SELECT", "MENTEE");
    setTimeout(() => {
      publish(AI_SUMMARY, "AI_SUMMARY", "MENTOR");
    }, 100);
    setTimeout(() => {
      publish(AI_SUMMARY_ANSWER, "AI_SUMMARY_ANSWER", "MENTOR");
    }, 200);
    setTimeout(() => {
      publish("도움이 되셨나요?", "AI_SUMMARY_RATING", "MENTOR");
    }, 300);
  };

  useEffect(() => {
    connect();
    return () => disConnect();
  }, []);

  useEffect(() => {
    bringAllChatRoom();
  }, [bringAllChatRoom]);

  useEffect(() => {
    subscriptionList.map((_subscriptionList) =>
      client?.unsubscribe(_subscriptionList.id)
    );
    setSubscription([]);
    if (client?.connected) {
      chattingRooms.map((_chattingRooms: any) => {
        subscribe(_chattingRooms.roomId);
      });
    }
  }, [chattingRooms]);

  //메세지 보내기 (질문하기)
  useEffect(() => {
    if (messageInput !== "") publish(messageInput, "C_QUESTION", "MENTEE");
    setMessageInput("");
  }, [messageInput]);

  //ai 질문 클릭
  useEffect(() => {
    if (aiQuestion.AI_SUMMARY !== "")
      showQuestion(
        aiQuestion.index,
        aiQuestion.AI_SUMMARY,
        aiQuestion.AI_SUMMARY_ANSWER
      );
  }, [aiQuestion]);

  //도움이 됐어요 클릭
  useEffect(() => {
    if (ratingSelect.questionId !== "") {
      const newItems = [...messagesLog.slice(1)];
      setMessagesLog(newItems);
      ratingSelect.likeStatus === true
        ? publish("도움이 됐어요", "AI_C_RATING", "MENTEE")
        : publish("아니요", "AI_C_RATING", "MENTEE");
    }
  }, [ratingSelect]);

  return <></>;
};

export default Stomp;
