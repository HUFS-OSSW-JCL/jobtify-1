import NoticeListItem from "./NoticeListItem";
import { userData } from "../../../util/atom";
import { useRecoilValue, useRecoilState } from "recoil";
import { favState } from "../../../util/atom";
import { useEffect } from "react";

const NoticeListSaved = () => {
  const usrData = useRecoilValue(userData);
  const [isFav, setIsFav] = useRecoilState(favState);

  useEffect(() => {
    if (localStorage.getItem("LOGGED_IN")) {
      console.log(isFav);
      setIsFav(false);
      for (let i = 0; i < usrData.length; i++) {
        if (usrData[i].bookmark === true) {
          setIsFav(true);
          break;
        }
      }
      console.log("parse done");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [usrData]);

  useEffect(() => {}, [isFav]);

  return (
    <div className="w-[346px] flex flex-col justify-center items-start mb-[30px]">
      {localStorage.getItem("LOGGED_IN") ? (
        <div className="mt-[10px] container w-[346px] min-h-[140px] rounded-xl mx-auto flex flex-col items-center justify-start bg-white">
          <h1 className="font-main font-bold text-[24px] text-black mr-[216px] mt-[20px] mb-[9px]">
            즐겨찾기
          </h1>
          {usrData ? (
            usrData.map((item, id) => {
              if (item.bookmark === true) {
                return (
                  <NoticeListItem
                    key={id}
                    id={id}
                    // badge={item.crawl[0]}
                    company={item.company}
                    job={item.title}
                    location={item.country}
                    keywords={item.keywords}
                    crawls={item.site}
                    bookmark={item.bookmark}
                    link={item.link}
                  />
                );
              } else {
                return null;
              }
            })
          ) : (
            <p>Loading...</p>
          )}
          {!isFav && (
            <div className="mt-[10px] container w-[346px] min-h-[140px] rounded-xl mx-auto flex flex-col items-center justify-start bg-white">
              <div className="w-[300px] mt-[10px] mb-[40px] flex flex-col justify-center items-center">
                <p className="text-center font-main font-bold text-[20px]">
                  등록된 기업이 없어요
                </p>
                <p className="mt-[10px] font-main text-fontgray text-center text-[14px]">
                  공고를 클릭해서 별 모양을 누르고
                </p>
                <p className="font-main text-fontgray text-center text-[14px]">
                  즐겨찾기를 등록해보세요
                </p>
              </div>
            </div>
          )}
        </div>
      ) : (
        <div className="mt-[10px] container w-[346px] min-h-[140px] rounded-xl mx-auto flex flex-col items-center justify-start bg-white">
          <h1 className="font-main font-bold text-[24px] text-black mr-[216px] mt-[20px] mb-[9px]">
            즐겨찾기
          </h1>
          <div className="w-[300px] mt-[25px] mb-[40px] flex flex-col justify-center items-center">
            <p className="text-center font-main font-bold text-[20px]">
              로그인이 필요합니다
            </p>
            <p className="mt-[10px] font-main text-fontgray text-center text-[14px]">
              상단 오른쪽의 프로필 버튼을 눌러서
            </p>
            <p className="font-main text-fontgray text-center text-[14px]">
              로그인을 해주세요
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default NoticeListSaved;
