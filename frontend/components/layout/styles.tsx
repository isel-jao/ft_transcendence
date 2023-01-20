import styled from "styled-components";

const StyledLayout = styled.div`
  position: relative;
  display: flex;
  width: 100vw;
  height: 100vh;
  overflow: hidden;
  background: ${(props) => props.theme.bg[props.theme.mode]};
  .main {
    width: 100%;
    margin-left: 6rem;
    transition: margin-left 0.3s ease;
    &.open {
      margin-left: 16rem;
    }
    position: relative;
    .nav {
      top: 0;
      right: 0;
      height: 5rem;
      width: 100%;
      box-shadow: 0rem 0rem 0.25rem 0.25rem rgba(0, 0, 0, 0.1);
    }
  }

  .sidenav {
    position: absolute;
    z-index: 1;
    left: 0;
    width: 6rem;
    transition: width 0.3s ease;
    height: 100vh;
    bottom: 0;
    box-shadow: 0rem 0rem 0.25rem 0.25rem rgba(0, 0, 0, 0.1);
    background: linear-gradient(180deg, #4e0044 0%, rgba(78, 0, 68, 0) 100%);
  }
  .nav,
  .sidenav {
    overflow: hidden;
    color: ${(props) => props.theme.text[props.theme.mode]};
  }
  .router-view {
    height: 100vh;
    width: 100%;
    overflow-x: hidden;
    overflow-y: auto;
    & > * {
      margin: 1rem;
    }
  }
`;

export default StyledLayout;
