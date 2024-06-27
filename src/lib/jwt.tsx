import axios from "axios";
import {decodeJwt} from "jose";

export const authedTokenAxios = (accessToken: any) => {
  return axios.create({
    // header를 여기서 설정해주면,
    // 인스턴스를 실행할 때마다 매번 이 헤더가 자동으로 요청을 보낼 때 포함됨
    headers: {
      Authorization: `Bearer ${accessToken}`
    }
  })
}

export const refreshingTokenAxios = (accessToken: any, refreshToken: any) => {
  return axios.create({
    // header를 여기서 설정해주면,
    // 인스턴스를 실행할 때마다 매번 이 헤더가 자동으로 요청을 보낼 때 포함됨
    headers: {
      Authorization: `Bearer ${accessToken} ${refreshToken}`
    }
  })
}

export const refreshTokenAPI = async (data: any, update: any) => {
  // access 토큰 만료시 재발급을 위한 요청
  // const test_url = `${process.env.NEXT_PUBLIC_API_URL}/api/user/token-test`
  //
  // await refreshingTokenAxios(data.accessToken, data.refreshToken)
  //   .post(test_url, "None")
  //   .then((res) => {
  //     const refreshedAccessToken = res.data.data.accessToken;
  //     update({ newToken: refreshedAccessToken });
  //   })
  //   .catch((reason) => {
  //     console.log(`${reason.response.data?.code}: ${reason.response.data?.message}`)
  //     update( {error: reason.response.data?.message} )
  //   })
}

export const verifyTokenExp = (token: string) => {
  // 토큰에서 만료기한 읽기
  if (token) {
    const decoded = decodeJwt(token)
    return decoded.exp
  } else return undefined
};
export const verifyTokenUserId = (token: string) => {
  // 토큰에서 user_id 읽기
  if (token) {
    const decoded = decodeJwt(token)
    return decoded.user_id
  } else return undefined
};