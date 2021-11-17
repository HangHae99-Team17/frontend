import React from "react";
import "./Errpage.css";
import styled from "styled-components";
import { Link } from "react-router-dom";

const Errpage = () => {
  return (
    <AllBox>
      <div>
        <div id="lock" class="key-container"></div>
        <div id="key"></div>

        <p id="text">403 FORBIDDEN</p>
        <p id="credit">사용자 접근 불가 페이지입니다</p>
        <Link id="link" to="/">메인으로</Link>
      </div>
    </AllBox>
  );
};

const AllBox = styled.div`
  width: 100%;
`;

export default Errpage;
