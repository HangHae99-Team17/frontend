import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { actionCreators as userActions } from "../redux/modules/user";
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
    
    if(!searchval){
      setSearch(!search);
      return;
    }
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

  const onKeyPress = (e) =>{
    console.log("asdasf")
    if(e.key === 'Enter'){
      searchcoupon();
    }
    
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
                  if(is_login){history.push("/loginmain");}
                 else{ history.push("/");}
                }}
              />
            </IconBox>
            <StyledBurger>
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
              {search ? (
                <img
                  src={search_orange}
                  alt="search"
                  onClick={searchcoupon}
                />
              ) : (
                <img
                  src={search_black}
                  alt="search"
                  onClick={searchcancel}
                />
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
                내 정보 수정
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
          <IconBox>
            <img
              src={gooddablack}
              alt="icon"
              onClick={() => {
                history.push("/");
              }}
            />
          </IconBox>
          <MenuBox>
            {search?(
              <SearchBox
              type="text"
              placeholder="브랜드를 검색해보세요"
              required="required"
              value={searchval}
              onChange={searchchange} onKeyPress={onKeyPress}
            />
            ):(<div>
              {is_login?(
              <>
                <button className="menubutton" onClick={() => {history.push("/salebox");}}>보관함</button>
                <button className="menubutton" onClick={() => {history.push("/edituser");}}>내 정보 수정</button>
                <button className="menubutton" onClick={() => {history.push("/loginmain");}}>나의 카테고리</button>
              </>
              ):(
                ""
              )}
              <button className="menubutton" onClick={() => {history.push("/category");}}>카테고리</button>
              {is_login?(
              <LoginButton onClick={logout}>로그아웃</LoginButton>
            ):(
              <LoginButton onClick={() => {
                history.push("/login");
              }}>asdafdasfdsafdsafasfsa</LoginButton>
            )}
            </div>)}
            <div className="searchIcon">  
              <img src={search?search_orange:search_black} alt="search" onClick={search?searchcoupon:searchcancel}/>
            </div>
          </MenuBox>
      </PcHeaderBox>
    </React.Fragment>
  );
};

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
    background-color: white;
  }
`;

const MenuBox = styled.div`
  margin-right:30px;
  display: flex;
  align-items: center;
  div{
    .menubutton{
      border:none;
      margin-right:15px;
      font-weight: bold;
      font-size:15px;
      background-color: white;
      cursor:pointer;
    }
  }
  .searchIcon{
    margin-left:40px;
    margin-top:7px;
    cursor:pointer;
  }
`;

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

const SearchBox = styled.input`
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
    margin-right:40px;
    width: 250px;
  }
`;

const WriteImg = styled.img`
  right: 55px;
  @media screen and (min-width: 1028px) {
    left: 860px;
    transform: scale(1.3);
  }
`;

const IconBox = styled.div`
  margin-left: 20px;
  margin-top: 13px;
  cursor:pointer;
  @media screen and (min-width: 1028px) {
    margin-left: 80px;
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
    width: 750px;
    flex-flow: row nowrap;
    background-color: white;
    li {
      color: black;
      width: 220px;
      font-size: 18px;
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
  cursor:pointer;
  @media screen and (min-width: 1028px) {
    margin-bottom:20px;
    color: black;
    width: 120px;
  }
`;

export default Header;
