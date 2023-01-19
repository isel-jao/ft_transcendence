import styled from "styled-components";
const Sl = styled.select`
  background-color: transparent;
  font-size: 1.3rem;
  width: 30%;
  height: 100%;
  padding: 5px;
  border: 1px solid #d3d3d3;
  border-radius: 10px;
  padding: 15px 28px;
  & option {
    &::checked {
      background-color: greenyellow !important;
    }
    background: #2c2c2c;
  }
`;
const Select = () => {
  return (
    <Sl>
      <option>Easy</option>
      <option>Medium</option>
      <option>Hard</option>
    </Sl>
  );
};

export default Select;
