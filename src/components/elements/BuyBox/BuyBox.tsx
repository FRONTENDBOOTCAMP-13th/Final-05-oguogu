export default function BuyBox({ onOpenModal }: { onOpenModal: () => void }) {
  return (
    <div className="fixed bottom-0 w-[320px] h-[68px] bg-oguogu-white z-999 px-4 py-3 ">
      <div className="flex f items-center justify-between gap-2">
        <button className="flex items-center justify-center border border-oguogu-main bg-oguogu-white w-[46px] h-[44px] rounded-[4px] cursor-pointer">
          <svg xmlns="http://www.w3.org/2000/svg" width="22" height="20" viewBox="0 0 22 20" fill="none">
            <path
              d="M11.105 16.9482L11 17.0572L10.8845 16.9482C5.897 12.2507 2.6 9.14441 2.6 5.99455C2.6 3.81471 4.175 2.17984 6.275 2.17984C7.892 2.17984 9.467 3.26975 10.0235 4.75204H11.9765C12.533 3.26975 14.108 2.17984 15.725 2.17984C17.825 2.17984 19.4 3.81471 19.4 5.99455C19.4 9.14441 16.103 12.2507 11.105 16.9482ZM15.725 0C13.898 0 12.1445 0.882834 11 2.26703C9.8555 0.882834 8.102 0 6.275 0C3.041 0 0.5 2.6267 0.5 5.99455C0.5 10.1035 4.07 13.4714 9.4775 18.5613L11 20L12.5225 18.5613C17.93 13.4714 21.5 10.1035 21.5 5.99455C21.5 2.6267 18.959 0 15.725 0Z"
              fill="#489F51"
            />
          </svg>
        </button>
        <button
          className={`flex flex-1 items-center justify-center text-center
         bg-oguogu-main text-oguogu-white 
         text-[16px] h-[44px]
         px-[24px] py-[6px] rounded-[4px]`}
          onClick={onOpenModal}
        >
          구매하기
        </button>
      </div>
    </div>
  );
}
