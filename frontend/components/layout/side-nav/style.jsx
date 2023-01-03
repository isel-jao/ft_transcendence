import styled from "styled-components";

const StyledNav = styled.nav`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 100%;
  height: 100%;
  .logo {
    display: flex;
    align-items: center;
    justify-content: center;
    transition-property: width, height;
    transition-duration: 0.3s;
    transition-timing-function: ease;
    height: 6rem;
    width: 6rem;
  }
  .main-links {
    display: flex;
    flex-direction: column;
  }
  .other-links {
    display: flex;
    flex-direction: column;
  }
  .link {
    display: flex;
    margin-inline: 1rem;
    transition: width 0.3s ease, padding-left 0.3s ease;
    border-radius: 0.5rem;
    cursor: pointer;
    height: 4rem;
    align-items: center;
    &:hover {
      > .icon {
        transform: scale(1.2);
      }
    }
    &:active {
      transform: scale(1);
    }
    .icon {
      display: flex;
      align-items: center;
      justify-content: center;
      height: 100%;
      width: 4rem;
      min-width: 4rem;
      border-radius: 0.5rem;
      transition: all 0.3s ease;
    }
  }
  .contained {
    color: ${(props) => props.theme.text.ligt};
    background-color: rgba(255, 255, 255, 0.3);
  }
`;

export default StyledNav;
