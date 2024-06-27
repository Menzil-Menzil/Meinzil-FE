import styled from "@emotion/styled";

export const ProfileBox = styled.div`
  width: 980px;
  height: 786px;
  display: flex;
  flex-direction: column;
  border-radius: 12px;
  background: #FAF9F8;
  box-shadow: 0 0 4px 0 rgba(0, 0, 0, 0.25);
`;

export const ProfileContentBox = styled.div`
  width: 980px;
  height: 246px;
  display: flex;
  flex-direction: column;
  border-radius: 12px 12px 0 0;
  background: #FFF;
  p {margin: 0; padding: 0;}
  button {
    cursor: pointer;
    background: none;
    border: none;
  }
  .profileInfo {
    display: flex;
    margin: 30px 30px;
    gap: 15px;
    .emphasisColor {
      color: #FF8A00;
    }
    .wrap {
      display: flex;
      flex-direction: column;
    }
    .titleWrap {
      display: flex;
      align-items: center;
      gap: 10px;
      color: black;
      .role {
        display: flex;
        width: 38px;
        height: 22px;
        border-radius: 33px;
        border: 0.7px solid #FF8A00;
        background: #F6F6F6;
        color: #FF8A00;
        justify-content: center;
        align-items: center;
        font-size: 11px;
        font-weight: 600;
      }
      .nickname {
        width: 124px;
        font-size: 20px;
        font-style: normal;
        font-weight: 600;
        line-height: 150%; /* 30px */
        margin-right: 5px;
      }
      .button {
        height: 22px;
        display: flex;
        gap: 4px;
        align-items: center;
        justify-content: center;
        color: #898989;
        font-size: 13px;
        font-weight: 600;
      }
    }
    .contentWrap {
      margin: 26px 0 0 5px;
      display: flex;
      color: rgba(0, 0, 0, 0.60);
      font-size: 12px;
      font-style: normal;
      font-weight: 500;
      line-height: normal;
      .count {
        margin-top: 6px;
        font-size: 20px;
        font-style: normal;
        font-weight: 700;
        line-height: 150%; /* 30px */
      }
      .answers {
        width: 72px;
        * {
          color: #575757;
        }
      }
      .likes {
        width: 75px;
        * {
          color: #FF8A00;
        }
      }
      .reviews {
        width: 213px;
        gap: 6px;
        * {
          height: 18px;
          display: flex;
          align-items: center;
          color: rgba(0, 0, 0, 0.80);
        }
      }
      .skillInfo {
        display: flex;
        flex-direction: column;
        gap: 12px;
        box-sizing: border-box;
        padding-left: 25px;
        border-left: 1px solid rgba(0, 0, 0, 0.18);
        .skillBox {
          display: flex;
          gap: 20px;
          .techData {
            height: 40px;
            margin-left: 9px;
          }
          .data {
            max-width: 360px;
            display: flex;
            flex-wrap: wrap;
            color: #444;
            font-size: 13px;
            font-style: normal;
            font-weight: 500;
            line-height: normal;
            .majorTag {
              height: 15px;
              margin-right: 5px;
              padding: 0 2px;
              display: flex;
              border-radius: 6px;
              border: 0.8px solid rgba(0, 0, 0, 0.70);
              font-size: 10px;
              justify-content: center;
              align-items: center;
            }
            .techStack {
              color: #000;
              font-weight: 400;
              margin: 0 8px 5px 0;
            }
          }
          .emphasis {
            color: rgba(0, 0, 0, 0.80);
            font-weight: 600;
          }
        }
      }
    }
  }
  .btnGroup {
    width: 100%;
    display: flex;
    justify-content: space-around;
    position: relative;
    bottom: 20px;
    input[type="radio"] {
      display: none;
    }
    label {
      width: 120px;
      height: 42px;
      margin-top: 10px;
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      color: #746D6D;
      font-size: 16px;
      font-style: normal;
      font-weight: 600;
      line-height: 150%; /* 24px */
    }
    input[type="radio"]:checked + label {
      color: black;
      border-bottom: 2px solid #FF8A00;
    }
  }
`;