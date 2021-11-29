import React, { useEffect } from 'react';

const KakaoShare = (props) => {
    
      const createKakaoButton = () => {
        // kakao sdk script이 정상적으로 불러와졌으면 window.Kakao로 접근이 가능합니다
        console.log(window.location.href)
        if (window.Kakao) {
          const kakao = window.Kakao
          console.log(props)
          // 중복 initialization 방지
          if (!kakao.isInitialized()) {
            // 두번째 step 에서 가져온 javascript key 를 이용하여 initialize
            kakao.init("7c733b77fba12e7cd6730104e0b83101")
          }
          kakao.Link.createDefaultButton({
            // Render 부분 id=kakao-link-btn 을 찾아 그부분에 렌더링을 합니다
            container: '#kakao-link-btn',
            objectType: 'feed',
            content: {
              title: props.title,
              description: '#리액트 #카카오 #공유버튼',
              imageUrl: `${props.image}`, // i.e. process.env.FETCH_URL + '/logo.png'
              link: {
                mobileWebUrl: window.location.href,
                webUrl: window.location.href,
              },
            },
            buttons: [
              {
                title: '웹으로 보기',
                link: {
                  mobileWebUrl: window.location.href,
                  webUrl: window.location.href,
                },
              },
            ],
          })
        }
      }

      useEffect(() => {
        createKakaoButton()
      }, [])

      return (
        <div className="kakao-share-button">
          {/* Kakao share button */}
          <button id="kakao-link-btn">
            <img src="/icons/kakao.png" alt="kakao-share-icon" />
          </button>
        </div>
      )
};

export default KakaoShare;