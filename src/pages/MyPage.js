import React,{useEffect} from 'react';
import styled from 'styled-components';
import { vector } from '../image'

const MyPage = (props) => {

    return (
        <React.Fragment>
            <MyPageBox>
                <NameBox>
                    <p>이근호</p>
                </NameBox>
                <EditTitleBox>
                    <h3>개인정보 수정</h3>
                </EditTitleBox>
                <EditListBox>
                    <ul>
                        <li>비밀번호<img src={vector}/></li>
                        <li>관심사<img src={vector}/></li>
                        <li>카드사 정보<img src={vector}/></li>
                        <li>통신사 정보<img src={vector}/></li>
                    </ul>
                </EditListBox>
            </MyPageBox>
        </React.Fragment>
    );
};

const MyPageBox = styled.div`
    
`;

const EditListBox = styled.div`
    ul{
        list-style:none;
        li{
            margin-bottom: 10px;
            font-weight: bold;
            display: flex;
            align-items: center;
            justify-content:space-between;
            img{
                margin-right: 30px;
            }
        }
    }
`;

const EditTitleBox = styled.div`
    border-bottom: solid 1px grey;
    margin-left: 20px;
    margin-bottom: 30px; 
`;

const NameBox =  styled.div`
    background-color: black;
    height: 70px;
    padding-left: 20px;
    padding-top: 30px;
    margin-top: -35px;
    color:white;
`;

export default MyPage;