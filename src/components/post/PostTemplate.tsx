import Image from "next/image";
import Link from "next/link";
import PostReactionBtns from "../buttons/PostReactionBtns";

interface PostProps {
  profilePicture: string;
  profileName: string;
  username: string;
  timestamp: string;
  textContent: string;
  imageContent?: string;
  videoContent?: string;
}

const Post: React.FC<PostProps> = ({
  profilePicture,
  profileName,
  username,
  timestamp,
  textContent,
  imageContent,
  videoContent,
}) => {
  return (
    <div className="flex flex-col gap-[10px] sm:w-[600px] w-[90%] sm:border border-gray-900 hover:border-gray-800 transition duration-200 bg-black sm:p-[15px] sm:rounded-[15px]">
      <div className="flex items-center justify-between">
        <Link href={""} className="flex items-center gap-[10px] group">
          <img
            src={profilePicture}
            alt={`${profileName}'s profile picture`}
            className="rounded-full h-[40px] w-[40px] object-cover"
          />
          <div className="flex flex-col gap-[1px]">
            {/* Profile name */}
            <div className="font-bold text-[13px] group-hover:text-blue-500">
              {profileName}
            </div>
            {/* Username */}
            <div className="text-[13px] text-gray-500">@{username}</div>
          </div>
        </Link>
        <div className="flex items-center gap-[15px]">
          <div className="text-[15px] text-right text-gray-500">
            {timestamp}
          </div>
          {/* Dropdown button */}
        </div>
      </div>
      <div className="flex flex-col gap-[10px]">
        <p className="text-[15px] leading-normal overflow-x-hidden">
          {textContent}
        </p>
        {imageContent && (
          <div className="">
            <img
              src={imageContent}
              alt="Post image"
              className="w-full rounded-md"
            />
          </div>
        )}
        {videoContent && (
          <div className="">
            <video controls className="w-full rounded-md">
              <source src={videoContent} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          </div>
        )}
      </div>
      <PostReactionBtns
        likeCount={0}
        commentCount={0}
        shareCount={0}
        donateCount={0}
      />
    </div>
  );
};

export default Post;