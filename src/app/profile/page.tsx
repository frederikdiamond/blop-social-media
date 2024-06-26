import Link from "next/link";

const Profile: React.FC = () => {
  return (
    <>
      <div className="mt-[60px] flex justify-center">
        {/* Banner */}
        {/* <div className="absolute left-0 right-0 top-0 w-full h-[350px] -z-10 bg-slate-800"></div> */}
        <div className="absolute left-[50px] right-[50px] top-[100px] h-[350px] -z-10 rounded-3xl bg-slate-800"></div>
        <div className="flex flex-col gap-[30px] w-[650px] mt-[350px]">
          <div>
            <div className="flex items-center gap-[50px]">
              {/* Profile picture */}
              <img
                src="https://primal.b-cdn.net/media-cache?s=o&a=1&u=https%3A%2F%2Fpbs.twimg.com%2Fprofile_images%2F1466655107387379715%2FmQ_gUEyM.jpg"
                alt="Profile picture"
                className="h-[130px] w-[130px] rounded-full border-[4px] border-black"
              />
              <div className="flex items-center gap-[20px] mt-[20px]">
                <button className="font-semibold px-[20px] py-[10px] rounded-full bg-slate-400">
                  FOLLOW
                </button>
                <button className="flex gap-[10px] font-semibold px-[20px] py-[10px] rounded-full bg-[#EAB308]/25 active:bg-[#EAB308]/50 transition ease-in-out duration-200">
                  <svg
                    width="16"
                    height="23"
                    viewBox="0 0 16 23"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M11.941 0.874302C12.0218 0.677323 11.7798 0.507319 11.6218 0.650086L0.782865 10.4491C0.667901 10.553 0.709728 10.7426 0.857757 10.7885L9.38569 13.4328C9.51253 13.4721 9.56652 13.6219 9.49395 13.7331L3.72491 22.5748C3.59531 22.7734 3.85788 22.9924 4.03 22.8292L15.8003 11.6711C15.9037 11.5731 15.8743 11.4014 15.7441 11.3433L9.07788 8.37027C8.97917 8.32624 8.93329 8.21176 8.97429 8.11175L11.941 0.874302Z"
                      fill="#EAB308"
                    />
                  </svg>{" "}
                  ZAP
                </button>
                <div className="flex items-center justify-center h-[40px] w-[40px] rounded-full hover:bg-gray-700/40 cursor-pointer">
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <g fill="#fff">
                      <circle cx="10" cy="15" r="2" />
                      <circle cx="10" cy="10" r="2" />
                      <circle cx="10" cy="5" r="2" />
                    </g>
                  </svg>
                </div>
              </div>
            </div>
            {/* Profile name */}
            <p className="font-bold text-[20px] mt-[10px]">Profile name</p>
            {/* Username */}
            <p className="text-[15px]">@username</p>
            {/* Description */}
            <p className="text-[15px] mt-[10px]">
              Hey Nostr! I write about stuff like BTC and Nostr ⚡️
            </p>
          </div>
          {/* Profile stats */}
          <div className="flex gap-[30px]">
            <Link
              href="#"
              className="flex flex-col items-center opacity-50 hover:opacity-100 transition"
            >
              <span>FOLLOWERS</span>
              <span className="font-bold text-[20px]">2,7K</span>
            </Link>
            <Link
              href="#"
              className="flex flex-col items-center opacity-50 hover:opacity-100 transition"
            >
              <span>FOLLOWING</span>
              <span className="font-bold text-[20px]">143</span>
            </Link>
            <Link
              href="#"
              className="flex flex-col items-center opacity-50 hover:opacity-100 transition"
            >
              <span>NOTES</span>
              <span className="font-bold text-[20px]">68</span>
            </Link>
          </div>
          {/* Content menu */}
          <div className="flex gap-[25px]">
            <button className="px-[20px] py-[5px] rounded-full bg-[#2d104a]">
              All
            </button>
            <button className="px-[20px] py-[5px] rounded-full bg-[#2d104a]">
              Notes
            </button>
            <button className="px-[20px] py-[5px] rounded-full bg-gray-700">
              Pictures
            </button>
            <button className="px-[20px] py-[5px] rounded-full bg-gray-700">
              Videos
            </button>
            <button className="px-[20px] py-[5px] rounded-full bg-gray-700">
              Livestreams
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Profile;
