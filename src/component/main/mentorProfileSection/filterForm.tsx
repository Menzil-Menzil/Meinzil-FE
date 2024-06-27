import {useState} from "react";
import styled from "@emotion/styled";

export const MainFilterForm = styled.form`
  height: 54px;
  padding: 0 40px;
  border-top: solid 1px rgba(0, 0, 0, 0.12);
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export const MainFilterFieldset = styled.fieldset`
  border: none;
  display: flex;
  align-items: center;
  gap: 14px;
  margin: 0;
  padding: 0;
  label {
    color: var(--follow-btn-text-color);
  }
  input[type="radio"]{
    appearance: none;
    width: 12px;
    height: 12px;
    margin-right: 6px;
    box-shadow: 0 0 0 1px var(--follow-btn-text-color);
    border: 4px solid transparent;
    border-radius: 50%;
  }
  input[type="radio"]:checked {
    width: 12px;
    height: 12px;
    box-shadow: 0 0 0 2px var(--highlighted-element);
    border: 3px solid white;
    background-color: var(--highlighted-element);
  }
  .title {
    margin-right: 12px;
    color: black;
    font-size: 16px;
    font-style: normal;
    font-weight: 600;
    line-height: normal;
  }
`;

export const SearchBtn = styled.button`
  width: 50px;
  height: 24px;
  border: 1px solid var(--follow-btn-text-color);
  border-radius: 6px;
  color: var(--follow-btn-text-color);
  background: none;
  cursor: pointer;
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
`;

interface propsType {
  filterName: string
  initialValues: any
  onSubmit: any
}
const FilterForm = ({filterName, initialValues, onSubmit}: propsType) => {
  const [values, setValues] = useState(initialValues);
  const handleFilterChange = (e: any) => {
    setValues({
      ...values,
      company: e.target.value
    })
  };

  return (
    <MainFilterForm onSubmit={
      (event) => {
        event.preventDefault();
        onSubmit(values);
      }}
    >
      <MainFilterFieldset>
        <div className="title">회사정보</div>
        <label>
          <input type="radio"
                 name={filterName}
                 value="all"
                 defaultChecked
                 onChange={handleFilterChange}
          />전체
        </label>
        <label>
          <input type="radio"
                 name={filterName}
                 value="true"
                 defaultChecked={false}
                 onChange={handleFilterChange}
          />유
        </label>
        <label>
          <input type="radio"
                 name={filterName}
                 value="false"
                 defaultChecked={false}
                 onChange={handleFilterChange}
          />무
        </label>
      </MainFilterFieldset>
      <SearchBtn>설정</SearchBtn>
    </MainFilterForm>
  );
}

export default FilterForm;