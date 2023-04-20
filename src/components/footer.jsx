import styled from "@emotion/styled";

export const Footer = () => {
  const year = new Date().getFullYear();

  const Footer = styled.section`
    margin: 90px;
    display: flex;
    justify-content: center;
  `;

  return <Footer>Рындин Сергей {year} ©</Footer>;
};
