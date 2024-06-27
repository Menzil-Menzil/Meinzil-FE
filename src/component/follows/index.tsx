import styled from "@emotion/styled";
import FollowCard from "@/component/follows/followCard";
import {authedTokenAxios, refreshTokenAPI} from "@/lib/jwt";
import {useCallback, useEffect, useState} from "react";
import {useSession} from "next-auth/react";
import {useRecoilValue} from "recoil";
import {userState} from "@/states/stateUser";
import useIntersect from "@/hooks/useIntersect";

import profileImg1 from "src/img/img_profile-image-1.png"
import profileImg2 from "src/img/img_profile-image-2.png"
import profileImg3 from "src/img/img_default-profile.png"
export const FollowsContainerDiv = styled.div`
  width: 1300px;
  min-height: 600px;
  margin: 91px auto;
  display: flex;
  flex-wrap: wrap;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  user-select: none;
  .cardList {
    width: 1215px;
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    gap: 30px;
  }
`;

const Follows = () => {
  const user = useRecoilValue(userState);
  const [followingList, setFollowingList] = useState<any[]>([]);
  const {data: sessionData, update: sessionUpdate} =useSession();
  const [page, setPage] = useState<number>(0);
  const [isFetching, setFetching] = useState(false);
  const [hasNextPage, setNextPage] = useState(true);

  const followingData = {
    "content": [
      {
        "followingUserDto": {
          "nickname": "mentor10",
          "company": "삼성전자",
          "field": "프론트엔드",
          "techStack": "React, Vue, JavaScript, HTML, CSS",
          "school": "서울대학교",
          "major": "정보통신공학",
          "imgUrl": profileImg1
        },
        "lastAnsweredMessages": [],
        "followersCount": 1,
        "answersCount": 0
      },
      {
        "followingUserDto": {
          "nickname": "mentor4",
          "company": "우아한형제들",
          "field": "프론트엔드",
          "techStack": "javascript, React, typescript, Docker, Github, AWS, Kubernetes, html, css",
          "school": "방송통신대학교",
          "major": "컴퓨터과학과",
          "imgUrl": profileImg2
        },
        "lastAnsweredMessages": [],
        "followersCount": 1,
        "answersCount": 0
      },
      {
        "followingUserDto": {
          "nickname": "mentor2",
          "company": "네이버 클라우드",
          "field": "백엔드",
          "techStack": "Java, Spring Boot, apache kafka, Netty, Redis, Linux, Docker, Kubernetes, Elasticsearch",
          "school": "건국대학교",
          "major": "전자공학부",
          "imgUrl": profileImg2
        },
        "lastAnsweredMessages": [],
        "followersCount": 2,
        "answersCount": 0
      },
      {
        "followingUserDto": {
          "nickname": "mentor1",
          "company": "Amazon",
          "field": "백엔드",
          "techStack": "Java, Spring Boot, typescript, AWS",
          "school": "서울과학기술대학교",
          "major": "컴퓨터공학과",
          "imgUrl": profileImg1
        },
        "lastAnsweredMessages": [
          "백엔드 주니어 개발자가 통찰력과 꼼꼼함 부족으로 어려움을 겪고 있음. 개발능력 향상을 위해 어떤 방법이 좋을까? 마인드가 중요하다면 개발 직종을 계속 이어갈 수 있을까?",
          "1. 백엔드 주니어 개발자로 이직한 후 개발 역량과 통찰력 향상을 원함.\n2. 새로운 기술 스택을 빠르게 습득하고 개발자로서 성장하기 위한 조언 필요.\n3. 개발자로 성장하기 위해 '개발 머리'의 필요성에 대한 의견을 듣고 싶음."
        ],
        "followersCount": 2,
        "answersCount": 56
      },
      {
        "followingUserDto": {
          "nickname": "mentor3",
          "company": "당근마켓",
          "field": "백엔드",
          "techStack": "AWS, Node.js, javascript, go, Kubernetes, AWS EKS, Docker, Ruby, Express.js",
          "school": "서울과학기술대학교",
          "major": "컴퓨터공학과",
          "imgUrl": profileImg3
        },
        "lastAnsweredMessages": [],
        "followersCount": 2,
        "answersCount": 0
      },
      {
        "followingUserDto": {
          "nickname": "mentor5",
          "company": "우아한형제들",
          "field": "프론트엔드, 백엔드",
          "techStack": "javascript, React, typescript, git, html, css",
          "school": "숭실대학교",
          "major": "미디어학부",
          "imgUrl": profileImg1
        },
        "lastAnsweredMessages": [],
        "followersCount": 1,
        "answersCount": 0
      },
      {
        "followingUserDto": {
          "nickname": "mentor6",
          "company": "라인플러스",
          "field": "프론트엔드",
          "techStack": "javascript, React, typescript, html, css",
          "school": "인하대학교",
          "major": "컴퓨터정보공학과",
          "imgUrl": profileImg2
        },
        "lastAnsweredMessages": [],
        "followersCount": 1,
        "answersCount": 0
      },
      {
        "followingUserDto": {
          "nickname": "mentor9",
          "company": "LG U+",
          "field": "DevOps",
          "techStack": "AWS, Github, Docker, python, Go, Kubernetes, Jenkins, PHP",
          "school": "성균관대학교",
          "major": "경영학과",
          "imgUrl": profileImg3
        },
        "lastAnsweredMessages": [],
        "followersCount": 1,
        "answersCount": 0
      },
      {
        "followingUserDto": {
          "nickname": "mentor11",
          "company": "NAVER",
          "field": "데이터 엔지니어",
          "techStack": "Python, R, SQL, TensorFlow, Scikit-learn",
          "school": "연세대학교",
          "major": "산업공학",
          "imgUrl": profileImg1
        },
        "lastAnsweredMessages": [],
        "followersCount": 2,
        "answersCount": 0
      }
    ],
    "pageable": {
      "sort": {
        "empty": false,
        "sorted": true,
        "unsorted": false
      },
      "offset": 0,
      "pageNumber": 0,
      "pageSize": 9,
      "paged": true,
      "unpaged": false
    },
    "last": false,
    "totalPages": 2,
    "totalElements": 11,
    "size": 9,
    "number": 0,
    "sort": {
      "empty": false,
      "sorted": true,
      "unsorted": false
    },
    "first": true,
    "numberOfElements": 9,
    "empty": false
  };

  const myMentorAxios = async (sessionData: any, index: number) => {
    try {
      return await authedTokenAxios(sessionData.accessToken)
        .get(`${process.env.NEXT_PUBLIC_API_URL}/api/following?nickname=${user.name}&page=${index}`)
    } catch (error: any) {
      console.log(`${error.response?.data?.code}: ${error.response?.data?.message}`)
      refreshTokenAPI(sessionData, sessionUpdate).then()
    }
  };
  const fetchUsers = useCallback(async (userName: any, session: any) => {
    if (userName && userName !=="유저" && session?.error === undefined) {
      myMentorAxios(session, page).then((result) => {
        const contentData = result?.data.data.content
        const pageableData = result?.data.data
        setFollowingList(followingList.concat(contentData))
        setPage(pageableData.pageable.pageNumber + 1)
        setNextPage(!pageableData.last)
        setFetching(false)
      })
    }
    else if (userName === "유저") {
      setFollowingList(followingList.concat(followingData.content))
      setPage(followingData.pageable.pageNumber + 1)
      setNextPage(!followingData.last)
      setFetching(false)
    }
    else {
      setPage(0)
    }
  }, [page]);

  const ref = useIntersect( async (entry, observer) => {
    observer.unobserve(entry.target)
    if (hasNextPage && !isFetching) {
      setFetching(true)
    }
  })

  useEffect(() => {
    if (isFetching && hasNextPage) fetchUsers(user.name, sessionData).then()
    else if (!hasNextPage) setFetching(false)
  }, [fetchUsers, hasNextPage, isFetching, sessionData, user.name]);

  const Target = styled.div`
    height: 1px;
  `

  return (
    <FollowsContainerDiv>
      <div className="cardList">
        {followingList && followingList.map((data: any, index: number) => {
          return (
            <FollowCard key={index}
                        profileData={data.followingUserDto}
                        recentAnswerList={data.lastAnsweredMessages}
                        followers={data.followersCount}
                        answers={data.answersCount}/>
          )
        })}
      </div>
      <Target ref={ref}></Target>
    </FollowsContainerDiv>
  );

};

export default Follows;