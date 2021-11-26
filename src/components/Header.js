import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { actionCreators as userActions } from "../redux/modules/user";
import { listCreators } from "../redux/modules/main";
import { history } from "../redux/configureStore";
import styled from "styled-components";
import {
  Frame_101,
  x,
  gooddablack,
  gooddawhite,
  edit_3,
  search_black,
  search_orange,
} from "../image";

const Header = (props) => {
  const dispatch = useDispatch();
  const is_login = useSelector((state) => state.user.is_login);
  const user_info = useSelector((state) => state.user.user);
  const is_session = sessionStorage.getItem("token") ? true : false;
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState(false);
  const [searchval, setSearchVal] = useState("");

  const searchchange = (e) => {
    setSearchVal(e.target.value);
  };

  const searchcoupon = () => {
    localStorage.setItem("search", searchval);
    setSearch(!search);
    setSearchVal("");
    history.push("/search");
  };

  const searchcancel = () => {
    setSearch(!search);
  };

  const logout = () => {
    setOpen(!open);
    dispatch(userActions.logoutFB());
    history.push("/");
  };

  useEffect(() => {
    if (is_session) {
      dispatch(userActions.loginCheckFB());
    }
  }, []);

  return (
    <React.Fragment>
      <HeaderBox
        color={open ? "black" : "white"}
        fontcolor={open ? "white" : "black"}
      >
        {!open ? (
          <>
            <IconBox>
              <img
                src={gooddablack}
                alt="icon"
                onClick={() => {
                  history.push("/");
                }}
              />

              {search ? (
                <SearchBox
                  type="text"
                  placeholder="브랜드를 검색해보세요"
                  required="required"
                  value={searchval}
                  onChange={searchchange}
                />
              ) : (
                ""
              )}
              {user_info?.role === "ADMIN" ? (
                <WriteImg
                  src={edit_3}
                  alt="write"
                  onClick={() => {
                    history.push("/salewrite");
                  }}
                />
              ) : (
                ""
              )}
              {search ? (
                <SearchImg
                  src={search_orange}
                  alt="search"
                  onClick={searchcoupon}
                />
              ) : (
                <SearchImg
                  src={search_black}
                  alt="search"
                  onClick={searchcancel}
                />
              )}
            </IconBox>
            <StyledBurger>
              <img
                src={Frame_101}
                alt="burgerbutton"
                open={open}
                onClick={() => setOpen(!open)}
              />
            </StyledBurger>
          </>
        ) : (
          <>
            <IconBox>
              <img
                src={gooddawhite}
                alt="icon"
                onClick={() => {
                  history.push("/");
                }}
              />
            </IconBox>
            <StyledBurger open={open} onClick={() => setOpen(!open)}>
              <img src={x} alt="x" />
            </StyledBurger>
          </>
        )}
        <Ul open={open}>
          <li
            onClick={() => {
              history.push("/category");
              setOpen(!open);
            }}
          >
            카테고리
          </li>
          {is_login ? (
            <>
              <li
                onClick={() => {
                  history.push("/salebox");
                  setOpen(!open);
                }}
              >
                보관함
              </li>
              <li
                onClick={() => {
                  history.push("/edituser");
                  setOpen(!open);
                }}
              >
                마이페이지
              </li>
              <li
                onClick={() => {
                  history.push("/loginmain");
                  setOpen(!open);
                  history.go(0);
                }}
              >
                나의 카테고리
              </li>
            </>
          ) : (
            ""
          )}
          {is_login ? (
            <LoginButton onClick={logout}>Goodda 로그아웃</LoginButton>
          ) : (
            <LoginButton
              onClick={() => {
                history.push("/login");
                setOpen(!open);
              }}
            >
              Goodda 로그인하기
            </LoginButton>
          )}
        </Ul>
      </HeaderBox>

      <PcHeaderBox>
        {!open ? (
          <>
            <IconBox>
              <img
                src={gooddablack}
                alt="icon"
                onClick={() => {
                  history.push("/");
                }}
              />

              {search ? (
                <SearchBox
                  type="text"
                  placeholder="브랜드를 검색해보세요"
                  required="required"
                  value={searchval}
                  onChange={searchchange}
                />
              ) : (
                ""
              )}
              {user_info?.role === "ADMIN" ? (
                <WriteImg
                  src={edit_3}
                  alt="write"
                  onClick={() => {
                    history.push("/salewrite");
                  }}
                />
              ) : (
                ""
              )}
              {search ? (
                <SearchImg
                  src={search_orange}
                  alt="search"
                  onClick={searchcoupon}
                />
              ) : (
                <SearchImg
                  src={search_black}
                  alt="search"
                  onClick={searchcancel}
                />
              )}
            </IconBox>
          </>
        ) : (
          <>
            <IconBox>
              <img
                src={gooddawhite}
                alt="icon"
                onClick={() => {
                  history.push("/");
                }}
              />
            </IconBox>
          </>
        )}
        <Ul open={open}>
          <li
            onClick={() => {
              history.push("/category");
            }}
          >
            카테고리
          </li>
          {is_login ? (
            <>
              <li
                onClick={() => {
                  history.push("/salebox");
                }}
              >
                보관함
              </li>
              <li
                onClick={() => {
                  history.push("/edituser");
                }}
              >
                마이페이지
              </li>
              <li
                onClick={() => {
                  history.push("/loginmain");

                  history.go(0);
                }}
              >
                나의 카테고리
              </li>
            </>
          ) : (
            ""
          )}
          {is_login ? (
            <LoginButton onClick={logout}>Goodda 로그아웃</LoginButton>
          ) : (
            <LoginButton
              onClick={() => {
                history.push("/login");
              }}
            >
              Goodda 로그인하기
            </LoginButton>
          )}
        </Ul>
      </PcHeaderBox>
    </React.Fragment>
  );
};

const HeaderBox = styled.div`
  display: flex;
  justify-content: space-between;
  background-color: ${(props) => props.color};
  color: ${(props) => props.fontcolor};
  align-items: center;
  height: 65px;
  top: 0;
  width: 100%;
  position: fixed;
  border-bottom: solid 1px #9e9e9e;
  z-index: 5;
  @media screen and (min-width: 1028px) {
    border: none;
    width: 0px;
    display: none;
  }
`;

const PcHeaderBox = styled.div`
  display: none;
  background-color: ${(props) => props.color};
  color: ${(props) => props.fontcolor};
  align-items: center;
  height: 65px;
  top: 0;
  width: 100%;
  position: fixed;
  border-bottom: solid 1px #9e9e9e;
  z-index: 5;
  @media screen and (min-width: 1028px) {
    display: flex;
    justify-content: space-between;
    background-color:white;
  }
`;

const SearchBox = styled.input`
  position: absolute;
  right: 115px;
  height: 22px;
  top: 20px;
  border: none;
  border-bottom: solid 1px #9e9e9e;
  width: 140px;
  font-weight: bold;
  :focus {
    outline: 2px solid orange;
    border-radius: 2px;
    border: none;
  }
  :valid {
    border-bottom: solid 1px orange;
    color: orange;
  }
  @media screen and (min-width: 1028px) {
    left: 430px;
    transform: scale(1.4);
    width: 160px;
  }
`;

const SearchImg = styled.img`
  position: absolute;
  right: 85px;
  @media screen and (min-width: 1028px) {
    left: 640px;
    transform: scale(1.4);
  }
`;
const WriteImg = styled.img`
  position: absolute;
  right: 55px;
  @media screen and (min-width: 1028px) {
    left: 700px;
    transform: scale(1.4);
  }
`;

const IconBox = styled.div`
  margin-left: 20px;
  margin-top: 13px;

  @media screen and (min-width: 1028px) {
    margin-left: 200px;
  }
`;

const StyledBurger = styled.div`
  display: flex;
  margin-left: 20px;
  padding-right: 20px;

  button {
    border: none;
    cursor: pointer;
    color: white;
    background-color: black;
    font-size: 20px;
  }

  img {
    margin-left: 10px;
  }

  @media screen and (min-width: 1028px) {
    margin-right: 180px;
    display: none;
  }
`;

const Ul = styled.ul`
  list-style: none;
  display: flex;
  flex-flow: column nowrap;
  background-color: black;
  position: fixed;
  transform: ${({ open }) => (open ? "translateX(0)" : "translateX(100%)")};
  top: 50px;
  right: 0;
  height: 100vh;
  width: 360px;
  padding-top: 3.5rem;
  transition: transform 0.3s ease-in-out;
  li {
    padding: 18px 10px;
    color: #fff;
    font-size: 20px;
    font-weight: bold;
  }

  @media screen and (min-width: 1028px) {
    transform: none;
    padding-top: 5px;
    top: -19px;
    right: 200px;
    height: 60px;
    width: 900px;
    flex-flow: row nowrap;
    background-color:white;
    li {
      color: black;
      width: 1000px;
    }
  }
`;

const LoginButton = styled.button`
  margin-top: 20px;
  background-color: #ff8f00;
  width: 93%;
  height: 46px;
  border-radius: 5px;
  border: none;
  font-weight: bold;
  font-size: 16px;
  @media screen and (min-width: 1028px) {
    margin-top: 10px;
    color: white;
  }
`;

export default Header;
