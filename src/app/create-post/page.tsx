"use client";

import Link from "next/link";
import React, { useEffect, useRef, useState } from "react";
import useAutosizeTextArea from "@/hooks/useAutosizeTextArea";
import PostReactionButtons from "@/components/buttons/PostReactionButtons";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import PostTemplate from "@/components/post/PostTemplate";
import DangerButton from "@/components/buttons/DangerButton";
import PrimaryButton from "@/components/buttons/PrimaryButton";
import { useTheme } from "@/context/ThemeContext";

const CreatePost: React.FC = () => {
  const { data: session } = useSession();
  const router = useRouter();
  const [title, setTitle] = useState<string>("");
  const [text, setText] = useState<string>("");
  const [characterCount, setCharacterCount] = useState<number>(0);
  const [wordCount, setWordCount] = useState<number>(0);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const [borderColor, setBorderColor] = useState<string>("#3b82f6"); // debug
  const [isPostTitleFocused, setIsPostTitleFocused] = useState<boolean>(false); // debug
  const [isPostTitleHovered, setIsPostTitleHovered] = useState<boolean>(false); // debug
  const [isPostTextFocused, setIsPostTextFocused] = useState<boolean>(false);
  const [isPostTextHovered, setIsPostTextHovered] = useState<boolean>(false);

  const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
  };

  useAutosizeTextArea(textareaRef.current, text);

  const handlePostTitleFocus = () => setIsPostTitleFocused(true);
  const handlePostTitleBlur = () => setIsPostTitleFocused(false);
  const handlePostTitleMouseOver = () => setIsPostTitleHovered(true);
  const handlePostTitleMouseOut = () => setIsPostTitleHovered(false);

  const handlePostTextFocus = () => setIsPostTextFocused(true);
  const handlePostTextBlur = () => setIsPostTextFocused(false);
  const handlePostTextMouseOver = () => setIsPostTextHovered(true);
  const handlePostTextMouseOut = () => setIsPostTextHovered(false);

  const calculateTitleBorderColor = () => {
    if (isPostTitleFocused || isPostTitleHovered) return borderColor;
    return `${borderColor}33`; // 20% opacity
  };

  const calculateTextBorderColor = () => {
    if (isPostTextFocused || isPostTextHovered) return borderColor;
    return `${borderColor}33`; // 20% opacity
  };

  useEffect(() => {
    if (session?.user.id) {
      fetch(`/api/user-color?userId=${session.user.id}`)
        .then((response) => response.json())
        .then((data) => {
          if (data.color) {
            setBorderColor(data.color);
          }
        })
        .catch((error) => console.error("Error fetching user color:", error));
    }
  }, [session]);

  const handleTextChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newText = event.target.value;
    setText(newText);
    setCharacterCount(newText.length);
    setWordCount(newText ? newText.trim().split(/\s+/).length : 0);

    const val = event.target?.value;
    setText(val);
  };

  const parseTextWithMedia = (inputText: string) => {
    const mediaRegex = /(https:\/\/.*?\.(jpg|jpeg|png|gif|mp4|avi|mov))/g;
    let parts = [];
    let lastIndex = 0;

    let match;
    while ((match = mediaRegex.exec(inputText)) !== null) {
      const textBeforeMedia = inputText.slice(lastIndex, match.index);
      parts.push(
        textBeforeMedia.split("\n").map((line, index, array) => (
          <React.Fragment key={`${lastIndex}-${index}`}>
            {line}
            {index < array.length + 1 && <br />}
          </React.Fragment>
        ))
      );

      const mediaLink = match[0];
      const isImage = /\.(jpg|jpeg|png|gif)$/.test(mediaLink);
      if (isImage) {
        parts.push(
          <img
            key={mediaLink}
            src={mediaLink}
            alt="User uploaded content"
            className="rounded-[10px]"
          />
        );
      } else {
        parts.push(
          <video
            key={mediaLink}
            src={mediaLink}
            className="rounded-[10px]"
            width="100%"
            controls
            autoPlay
            muted
          />
        );
      }

      lastIndex = mediaRegex.lastIndex;
    }

    const remainingText = inputText.slice(lastIndex);
    parts.push(
      remainingText.split("\n").map((line, index, array) => (
        <React.Fragment key={`${lastIndex}-${index}`}>
          {line}
          {index < array.length - 1 && <br />}
        </React.Fragment>
      ))
    );

    return parts;
  };
  const createPost = async () => {
    if (!text.trim()) return;

    try {
      const response = await fetch("/api/create-post", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId: session?.user.id,
          title,
          text,
        }),
      });

      if (!response.ok) {
        throw new Error("Error creating post");
      }

      const post = await response.json();
      console.log("Post created:", post);

      setTitle("");
      setText("");
      setCharacterCount(0);
      setWordCount(0);

      router.push(`/post/${post.id}?success=true`);
    } catch (error) {
      console.error("Error creating post:", error);
    }
  };

  return (
    <>
      <div className="flex justify-center mt-[90px] mb-[100px]">
        <div className="flex flex-col gap-[30px] w-[800px]">
          <div>
            <h1 className="text-[25px] font-semibold">Create Post</h1>
            <input
              type="text"
              placeholder="Title of post (optional)..."
              value={title}
              onChange={handleTitleChange}
              className="mt-[30px] p-[15px] w-full bg-transparent outline-none rounded-xl transition duration-300 ease-in-out"
              style={{
                borderColor: calculateTitleBorderColor(),
                borderWidth: "2px",
              }}
              onFocus={handlePostTitleFocus}
              onBlur={handlePostTitleBlur}
              onMouseOver={handlePostTitleMouseOver}
              onMouseOut={handlePostTitleMouseOut}
            />
            <textarea
              placeholder="Write your post here..."
              value={text}
              onChange={handleTextChange}
              ref={textareaRef}
              className="my-[30px] p-[15px] min-h-[400px] w-full bg-transparent outline-none rounded-xl overflow-hidden transition duration-150 ease-in-out"
              style={{
                borderColor: calculateTextBorderColor(),
                borderWidth: "2px",
              }}
              onFocus={handlePostTextFocus}
              onBlur={handlePostTextBlur}
              onMouseOver={handlePostTextMouseOver}
              onMouseOut={handlePostTextMouseOut}
            />

            <div className="flex justify-between items-center gap-[30px]">
              <div className="flex gap-[30px]">
                <p className="text-white/50">
                  Character count: {characterCount}
                </p>
                <p className="text-white/50">Word count: {wordCount}</p>
              </div>
              <div className="flex gap-[30px]">
                <Link
                  href={""}
                  className="text-center font-semibold w-[100px] py-[12px] text-green-500 hover:text-white hover:bg-green-700 rounded-xl transition duration-150 ease-in-out"
                >
                  Save Draft
                </Link>
                <PrimaryButton onClick={createPost}>Publish</PrimaryButton>
                <DangerButton>Cancel</DangerButton>
              </div>
            </div>
          </div>
          <div className="w-full h-[1px] bg-white/5"></div>
          <div>
            <h1 className="font-bold mb-[20px] text-white/50">Preview Post</h1>
            <PostTemplate
              id={session?.user.id || ""}
              profilePicture={null}
              profileName={
                session?.user.profileName || session?.user.username || ""
              }
              username={session?.user.username || ""}
              timestamp={""}
              title={parseTextWithMedia(title)}
              textContent={text}
              initialLikesCount={0}
              userLiked={false}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default CreatePost;
