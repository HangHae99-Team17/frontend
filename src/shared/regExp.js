export const checkValue = (value) => {
    // 영문 숫자 조합 6자리 이상
    const regEXP = /^.*(?=.{6,20})(?=.*[0-8])(?=.*[a-zA-Z]).*$/;
    return regEXP.test(value);
  };