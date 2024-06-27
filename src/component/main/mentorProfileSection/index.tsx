import {MentorProfileSectionTitleDiv} from "@/component/main/mentorProfileSection/profileCard.style";
import styled from "@emotion/styled";
import {useCallback, useEffect, useMemo, useState} from "react";
import {authedTokenAxios, refreshTokenAPI} from "@/lib/jwt";
import {useSession} from "next-auth/react";
import {userState} from "@/states/stateUser";
import {useRecoilValue} from "recoil"
import MentorProfileCard from "@/component/main/mentorProfileSection/mentorProfileCard";
import useIntersect from "@/hooks/useIntersect";
import defaultProfileImg from "@/img/img_default-profile.png"
import FilterForm from "@/component/main/mentorProfileSection/filterForm";

import profileImg1 from "src/img/img_profile-image-1.png"
import profileImg2 from "src/img/img_profile-image-2.png"
import profileImg3 from "src/img/img_default-profile.png"

export const MentorProfileSectionDiv = styled.div`
  width: 995px;
  height: auto;
  border-radius: 12px;
  border: 0 solid var(--textline-color);
  background: white;
  box-shadow: 0 0 4px 0 var(--box-shadow);
  display: flex;
  flex-direction: column;
`;

const MentorProfileList = () => {
  const [mentorProfileDataList, setMentorProfileDataList] = useState<any[]>([]);
  const defaultProfileDataList = [
    {
      nickname: "멘토멘토",
      major: "컴퓨터공학과",
      company: "멘질멘질",
      field: "기본정보",
      techStack: "기본정보",
      imgUrl: defaultProfileImg,
      lastAnsweredMessages: ["기본정보", "last answer"]
    }
  ];
  const {data: sessionData, update: sessionUpdate} =useSession();
  const user = useRecoilValue(userState);
  const [page, setPage] = useState<number>(0);
  const [isFetching, setFetching] = useState(false);
  const [hasNextPage, setNextPage] = useState(true);
  const [filterValues, setFilterValues] = useState({
    company: "all"
  });

  const mentorData = {
    "content": [
      {
        "nickname": "mentor1",
        "major": "컴퓨터공학과",
        "company": "Amazon",
        "field": "백엔드",
        "techStack": "Java, Spring Boot, typescript, AWS",
        "imgUrl": profileImg1,
        "lastAnsweredMessages": [
          "3년차부터 이직을 고려 중인데, 워홀을 가면 1년 텀이 생기는데, 다음 구직활동에 큰 문제가 될까요?",
          "1년차 백엔드 주니어 개발자, 시니어들의 꼼꼼한 점검에 답답함을 느끼며 통찰력을 키우고 싶어함. 기초적인 멘토링 및 강의 등을 통한 도움 필요.\n"
        ]
      },
      {
        "nickname": "mentor2",
        "major": "전자공학부",
        "company": "네이버 클라우드",
        "field": "백엔드",
        "techStack": "Java, Spring Boot, apache kafka, Netty, Redis, Linux, Docker, Kubernetes, Elasticsearch",
        "imgUrl": profileImg2,
        "lastAnsweredMessages": []
      },
      {
        "nickname": "mentor3",
        "major": "컴퓨터공학과",
        "company": "",
        "field": "백엔드",
        "techStack": "AWS, Node.js, javascript, go, Kubernetes, AWS EKS, Docker, Ruby, Express.js",
        "imgUrl": profileImg3,
        "lastAnsweredMessages": []
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
      "pageSize": 3,
      "paged": true,
      "unpaged": false
    },
    "last": false,
    "totalPages": 17,
    "totalElements": 50,
    "first": true,
    "number": 0,
    "sort": {
      "empty": false,
      "sorted": true,
      "unsorted": false
    },
    "size": 3,
    "numberOfElements": 3,
    "empty": false
  }
  const mentorDataAxios = async (sessionData: any, index: number) => {
    try {
      return await authedTokenAxios(sessionData.accessToken)
        .get(`${process.env.NEXT_PUBLIC_API_URL}/api/main/mentors?nickname=${user.name}&page=${index}`)
    } catch (error: any) {
      console.log(`${error.response?.data?.code}: ${error.response?.data?.message}`)
      refreshTokenAPI(sessionData, sessionUpdate).then()
    }
  };
  const fetchUsers = useCallback(async (userName: any, session: any) => {
    if (userName && userName !== "유저" && session?.error === undefined) {

      mentorDataAxios(session, page).then((result) => {
        const contentData = result?.data.data.content
        const pageableData = result?.data.data
        setMentorProfileDataList(mentorProfileDataList.concat(contentData))
        setPage(pageableData.pageable.pageNumber + 1)
        setNextPage(!pageableData.last)
        setFetching(false)
      })
    }
    else if (userName === "유저") {
      setMentorProfileDataList(mentorProfileDataList.concat(mentorData.content))
      setPage(mentorData.pageable.pageNumber + 1)
      setNextPage(!mentorData.last)
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

  const filteredProfiles = useMemo(() =>
      mentorProfileDataList.filter(
      (data) => filterValues.company==="true" && data.company ||
        filterValues.company==="false" && !data.company ||
        filterValues.company==="all"
    )
  , [filterValues, mentorProfileDataList]);

  return (
    <MentorProfileSectionDiv>
      <MentorProfileSectionTitleDiv>추천 멘토</MentorProfileSectionTitleDiv>
      <FilterForm filterName={"company"} initialValues={filterValues} onSubmit={setFilterValues}/>
      {user.name ?
        filteredProfiles.map((data: any, index: number) => {
          return <MentorProfileCard key={index} data={data}></MentorProfileCard>
        }) :
        <>
          {filteredProfiles.map((data: any, index: number) => {
            return <MentorProfileCard key={index} data={data}></MentorProfileCard>
          })}
          <div>로그인 필요</div>
        </>
      }
      {(!!user.name && isFetching) && <div>loading</div>}
      <Target ref={ref}></Target>
    </MentorProfileSectionDiv>
  );
}

export default MentorProfileList;