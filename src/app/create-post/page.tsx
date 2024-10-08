"use client";

import Link from "next/link";
import React, { useRef, useState } from "react";
import useAutosizeTextArea from "@/hooks/useAutosizeTextArea";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import PostTemplate from "@/components/post/PostTemplate";
import DangerButton from "@/components/buttons/DangerButton";
import PrimaryButton from "@/components/buttons/PrimaryButton";
import useUserColor from "@/hooks/useUserColor";
import { parseTextWithEnhancements } from "@/utils/parseTextWithEnhancements";
import { UserProps } from "@/types/UserProps";
import TiptapEditor from "@/components/TipTapEditor";
import DOMPurify from "dompurify";
import { createPost } from "@/utils/api-calls/post-apis/createPostApi";

const CreatePost: React.FC = () => {
  const { data: session } = useSession();
  const router = useRouter();
  const [title, setTitle] = useState<string>("");
  const [content, setContent] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [characterCount, setCharacterCount] = useState<number>(0);
  const [wordCount, setWordCount] = useState<number>(0);
  const [isPostTitleFocused, setIsPostTitleFocused] = useState<boolean>(false);
  const [isPostTitleHovered, setIsPostTitleHovered] = useState<boolean>(false);
  const [isPostContentFocused, setIsPostContentFocused] =
    useState<boolean>(false);
  const [isPostContentHovered, setIsPostContentHovered] =
    useState<boolean>(false);
  const [overlayImage, setOverlayImage] = useState<string | null>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const borderColor = useUserColor();

  const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
  };

  useAutosizeTextArea(textareaRef.current, content);

  const handlePostTitleFocus = () => setIsPostTitleFocused(true);
  const handlePostTitleBlur = () => setIsPostTitleFocused(false);
  const handlePostTitleMouseOver = () => setIsPostTitleHovered(true);
  const handlePostTitleMouseOut = () => setIsPostTitleHovered(false);

  const handlePostContentFocus = () => setIsPostContentFocused(true);
  const handlePostContentBlur = () => setIsPostContentFocused(false);
  const handlePostContentMouseOver = () => setIsPostContentHovered(true);
  const handlePostContentMouseOut = () => setIsPostContentHovered(false);

  const calculateTitleBorderColor = () => {
    if (isPostTitleFocused || isPostTitleHovered) return borderColor;
    return `${borderColor}33`; // 20% opacity
  };

  const calculateTextBorderColor = () => {
    if (isPostContentFocused || isPostContentHovered) return borderColor;
    return `${borderColor}33`; // 20% opacity
  };

  const handleTextChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newText = event.target.value;
    setContent(newText);
    setCharacterCount(newText.length);
    setWordCount(newText ? newText.trim().split(/\s+/).length : 0);

    const val = event.target?.value;
    setContent(val);
  };

  const handleCreatePost = async () => {
    if (!content.trim()) return;
    setIsLoading(true);
    // const createPost = async () => {
    //   if (!content.trim()) return;
    //   setIsLoading(true);

    try {
      const post = await createPost({
        userId: session?.user.id,
        title,
        content,
        // content: processContent(content),
        timestamp: new Date().toISOString(),
      });

      // Old POST request. Importing API call now above:
      // const response = await fetch("/api/create-post", {
      //   method: "POST",
      //   headers: {
      //     "Content-Type": "application/json",
      //   },
      //   body: JSON.stringify({
      //     userId: session?.user.id,
      //     title,
      //     content,
      //     timestamp: new Date().toISOString(),
      //   }),
      // });

      // if (!response.ok) {
      //   throw new Error("Error creating post");
      // }

      // const post = await response.json();

      console.log("Post created:", post);

      setTitle("");
      setContent("");
      setCharacterCount(0);
      setWordCount(0);

      router.push(`/post/${post.id}?success=true`);
    } catch (error) {
      console.error("Error creating post:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const user: UserProps = {
    id: session?.user.id || "",
    username: session?.user.username || "",
    profileName: session?.user.profileName || "",
    profilePicture: session?.user.image || "",
    profileBanner: "",
    bio: "",
    followersCount: 0,
    followingCount: 0,
    postsCount: 0,
  };

  // Testing for TipTapEditor:
  // const handleContentUpdate = (newContent: string) => {
  //   setContent(newContent);
  // };

  // const processContent = (htmlContent: string) => {
  //   // Sanitize the HTML content
  //   const sanitizedHtml = DOMPurify.sanitize(htmlContent);

  //   // Create a temporary element to parse the HTML
  //   const tempDiv = document.createElement("div");
  //   tempDiv.innerHTML = sanitizedHtml;

  //   // Function to convert a single node to Markdown-like syntax
  //   const nodeToMarkdown = (node: Node): string => {
  //     if (node.nodeType === Node.TEXT_NODE) {
  //       return node.textContent || "";
  //     }

  //     if (node.nodeType === Node.ELEMENT_NODE) {
  //       const element = node as HTMLElement;
  //       let result = "";

  //       for (const childNode of element.childNodes) {
  //         let childText = nodeToMarkdown(childNode);

  //         switch (element.tagName.toLowerCase()) {
  //           case "p":
  //             childText += "\n\n";
  //             break;
  //           case "br":
  //             childText += "\n";
  //             break;
  //           case "strong":
  //           case "b":
  //             childText = `**${childText}**`;
  //             break;
  //           case "em":
  //           case "i":
  //             childText = `*${childText}*`;
  //             break;
  //           case "u":
  //             childText = `__${childText}__`;
  //             break;
  //           case "s":
  //             childText = `~~${childText}~~`;
  //             break;
  //           case "a":
  //             const href = element.getAttribute("href");
  //             childText = `[${childText}](${href})`;
  //             break;
  //           // Add more cases for other HTML elements as needed
  //         }

  //         result += childText;
  //       }

  //       return result;
  //     }

  //     return "";
  //   };

  //   // Convert the entire content
  //   const markdownContent = nodeToMarkdown(tempDiv);

  //   // Remove extra newlines and trim
  //   return markdownContent.replace(/\n{3,}/g, "\n\n").trim();
  // };

  return (
    <>
      <div className="mb-[100px] mt-[90px] flex justify-center">
        <div className="flex w-[800px] flex-col gap-[30px]">
          <div>
            <h1 className="text-[25px] font-semibold">Create Post</h1>
            <input
              type="text"
              placeholder="Title of post (optional)..."
              value={title}
              onChange={handleTitleChange}
              onFocus={handlePostTitleFocus}
              onBlur={handlePostTitleBlur}
              onMouseOver={handlePostTitleMouseOver}
              onMouseOut={handlePostTitleMouseOut}
              className="mt-[30px] w-full rounded-xl bg-transparent p-[15px] outline-none transition duration-200 ease-in-out"
              style={{
                borderColor: calculateTitleBorderColor(),
                borderWidth: "2px",
              }}
            />
            <textarea
              placeholder="Write your post here..."
              value={content}
              onChange={handleTextChange}
              ref={textareaRef}
              onFocus={handlePostContentFocus}
              onBlur={handlePostContentBlur}
              onMouseOver={handlePostContentMouseOver}
              onMouseOut={handlePostContentMouseOut}
              className="my-[30px] min-h-[400px] w-full overflow-hidden rounded-xl bg-transparent p-[15px] outline-none transition duration-200 ease-in-out"
              style={{
                borderColor: calculateTextBorderColor(),
                borderWidth: "2px",
              }}
            />

            {/* <TiptapEditor onUpdate={handleContentUpdate} /> */}

            <div className="flex items-center justify-between gap-[30px]">
              <div className="flex gap-[30px]">
                <p className="text-white/50">
                  Character count: {characterCount}
                </p>
                <p className="text-white/50">Word count: {wordCount}</p>
              </div>
              <div className="flex gap-[30px]">
                <Link
                  href={""}
                  className="w-[100px] rounded-xl py-[12px] text-center font-semibold text-green-500 transition duration-150 ease-in-out hover:bg-green-700 hover:text-white"
                >
                  Save Draft
                </Link>
                <PrimaryButton
                  onClick={handleCreatePost}
                  disabled={!content.trim() || isLoading}
                >
                  {isLoading ? "Publishing..." : "Publish"}
                </PrimaryButton>
                {/* Show warning modal before cancelling */}
                <DangerButton onClick={() => router.push("/home")}>
                  Cancel
                </DangerButton>
              </div>
            </div>
          </div>
          <div className="h-[1px] w-full bg-white/5"></div>
          <div>
            <h1 className="mb-[20px] font-bold text-white/50">Preview Post</h1>
            <PostTemplate
              id={session?.user.id || ""}
              user={user}
              createdAt={new Date().toISOString()}
              updatedAt={new Date().toISOString()}
              timestamp={new Date().toISOString()}
              title={title}
              content={parseTextWithEnhancements(
                content,
                // processContent(content),
                () => {},
              )}
              // content={parseTextWithEnhancements(content, handleImageClick)}
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
