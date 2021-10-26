import styled from "styled-components";
import React from "react";


// 이미지 컴포넌트
/**
 * 
 * @param {*} props 
 * - shape 이미지를 동그랗게 보여줄 지, 네모로 보여줄 지 모양을 결정합니다.
 * - src 이미지 경로
 * - size 이미지 사이즈
 * @returns 
 */
const Image = (props) => {
  const { src, size, width } = props;

  const styles = {
    src: src,
    size: size,
    width: width
  };
    return (
      <AspectOutter>
        <AspectInner {...styles}></AspectInner>
      </AspectOutter>
    );
};

Image.defaultProps = {
  width: "100%",
  shape: "circle",
  src: "https://mean0images.s3.ap-northeast-2.amazonaws.com/4.jpeg",
  size: 36,

};

const AspectOutter = styled.div`
  ${(props) => (props.width ? `width: ${props.width};` : "")}
  min-width: 250px;
`;

const AspectInner = styled.div`
  position: relative;
  padding-top: 75%;
  overflow: hidden;
  background-image: url("${(props) => props.src}");
  background-size: cover;
`;

export default Image;
