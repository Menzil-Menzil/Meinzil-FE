import styled from "@emotion/styled";

export const GoPageBtn = styled.button`
  width: 30px;
  height: 55px;
  background-color: transparent;
  border: none;
  margin-top: 279px;
  * {
    fill: var(--highlighted-element);
    cursor: pointer;
  }
  :disabled * {
    fill: #d3d3d3;
    cursor: auto;
  }
`;
export const FormContainerDiv = styled.div`
  width: 667px;
  height: 100%;
  display: flex;
  flex-wrap: wrap;
`;
export const TitleBoxDiv = styled.div`
  width: 100%;
  margin-bottom: 50px;
  font-weight: 700;
  font-size: 36px;
  line-height: 43px;
  display: inline-flex;
  justify-content: space-between;
  > span {
    padding: 0 0.3em;
    background: linear-gradient(to top, #fbbc053b 50%, transparent 50%);
  }
  .afterWrite {
    font-weight: 600;
    font-size: 18px;
    color: var(--text-color);
    text-decoration-line: underline;
  }
`;
export const InputContainer = styled.div`
  .titleBox {
    margin-top: 50px;
    font-weight: 700;
    font-size: 24px;
    line-height: 29px;
  }
  .subtitleBox {
    color: #525252;
    margin-top: 15px;
    font-weight: 700;
    font-size: 20px;
    line-height: 30px;
  }
  input {
    height: 60px;
    padding: 0 0.3em 0 0.8em;
    box-sizing: border-box;
    border: 1px solid rgba(0, 0, 0, 0.5);
    border-radius: 12px;
    font-weight: 500;
    font-size: 20px;
    line-height: 24px;
  }
  input:focus {
    border-color: var(--highlighted-element);
    outline: none;
  }
  input[aria-invalid="1"] {
    border-color: #ef2626;
    outline: none;
  }
  input[aria-invalid="2"] {
    border-color: #2c8f47;
    outline: none;
  }
  input[aria-invalid="3"] {
    border: 1px solid rgba(0, 0, 0, 0.5);
    outline: none;
  }
  .inputBox {
    margin-top: 15px;
    font-weight: 500;
    font-size: 20px;
  }
  .inputBox::placeholder {
    color: var(--input-placeholder);
  }
  .nicknameCheckBtn {
    width: 100px;
    height: 37px;
    margin-top: 15px;
    margin-bottom: 12px;
    cursor: pointer;
    background: #ff8a00a6;
    border: none;
    border-radius: 12px;
    font-weight: 500;
    font-size: 16px;
    line-height: 19px;
    text-align: center;
    color: black;
  }
  .nicknameCheckBtn:disabled {
    cursor: auto;
    background: #e3e2e2;
    color: #6b6565;
  }
  .nicknameCheckTextDiv {
    width: 300px;
    margin: 24px 0 0 20px;
    font-weight: 500;
    font-size: 16px;
    line-height: 19px;
  }
  .selectBox {
    display: none;
  }
  .selectBox + label {
    width: 140px;
    height: 60px;
    margin-top: 20px;
    display: inline-flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    box-sizing: border-box;
    border: 1px solid rgba(0, 0, 0, 0.5);
    border-radius: 12px;
    font-weight: 500;
    font-size: 20px;
    line-height: 24px;
    cursor: pointer;
    color: #302d2d;
  }
  /*.selectBox + label:active {
    background-clip: content-box;
    padding: 4px;
    background-color: var(--selected-element);
  }*/
  .selectBox:checked + label {
    background-color: var(--selected-element);
    border: 1px solid var(--highlighted-element);
  }
  .addBtn {
    height: 60px;
    background-color: var(--highlighted-element);
    border: none;
    border-radius: 12px;
    font-weight: 500;
    font-size: 20px;
    line-height: 24px;
    color: #000000;
    :disabled {
      background: #e3e2e2;
      color: #6b6565;
    }
  }
  .scoreRadioContainer {
    width: 300px;
    height: 60px;
    display: inline-flex;
    align-items: center;
    justify-content: space-around;
    box-sizing: border-box;
    border: 1px solid rgba(0, 0, 0, 0.5);
    border-radius: 12px;
    .scoreRadioBox {
      display: none;
    }
    .scoreRadioBox + label {
      width: 92px;
      height: 52px;
      display: inline-flex;
      align-items: center;
      justify-content: center;
      border-radius: 10px;
      font-weight: 500;
      font-size: 20px;
      line-height: 24px;
      cursor: pointer;
      color: var(--input-placeholder);
    }
    .scoreRadioBox + label:hover {
      background-color: var(--selected-element);
    }
    .scoreRadioBox:checked + label {
      background-color: var(--selected-element);
      color: black;
    }
  }
  .searchContainer {
    margin-top: 15px;
    display: flex;
    align-items: center;
    .icon {
      transform: translateX(-40px);
      cursor: pointer;
    }
    .icon:hover {
      border: 2px solid #f0f0f0;
      border-radius: 4px;
      transform: translateX(-42px);
      background-color: #f0f0f0;
    }
    .searchBox {
      padding-right: 48px;
    }
    .searchBox::placeholder {
      color: var(--input-placeholder);
    }
    > input[type="submit"] {
      display: none;
    }
  }
  .addMajor {
    display: flex;
  }
`;

export const InputTextArea = styled.textarea`
  width: 667px;
  height: 276px;
  resize: none;
  margin-top: 15px;
  padding: 18px 20px;
  box-sizing: border-box;
  border: 1px solid rgba(0, 0, 0, 0.5);
  border-radius: 12px;
  font-weight: 500;
  font-size: 20px;
  line-height: 24px;
  :focus {
    outline-color: var(--highlighted-element);
  }
  ::placeholder {
    color: var(--input-placeholder);
  }
`;

export const SaveBtnContainer = styled.div`
  width: 100%;
  margin-top: 80px;
  display: flex;
  justify-content: end;
  gap: 20px;
  button {
    height: 60px;
    border: none;
    border-radius: 12px;
    font-weight: 600;
    font-size: 24px;
    line-height: 29px;
    cursor: pointer;
  }
  .saveBtn {
    width: 149px;
    background: var(--highlighted-element);
  }
  .afterBtn {
    width: 210px;
    background: #efefef;
    font-weight: 500;
    font-size: 24px;
    color: #646464;
  }
`;
