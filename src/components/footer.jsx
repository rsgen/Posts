import styled from "@emotion/styled";

export const Footer = () => {
  const year = new Date().getFullYear();

  const Footer = styled.section`
    margin: 30px;
    bottom: 0;
    left: 0;
    right: 0;
    padding: 8px;
    text-align: center;
  `;

  return <Footer>{`Copyright © RSGEN ${year}`}</Footer>;
};
