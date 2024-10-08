interface CreatePostData {
  userId: string | undefined;
  title?: string;
  content: string;
  timestamp?: string;
}

interface QuotePostData extends CreatePostData {
  quotedPostId: string;
}

export async function createPost(data: CreatePostData): Promise<any> {
  try {
    const postData = {
      ...data,
      timestamp: data.timestamp || new Date().toISOString(), // Use provided timestamp or generate a new one
    };

    const response = await fetch("/api/create-post", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || "Failed to create post");
    }

    return await response.json();
  } catch (error) {
    console.error("Error creating post:", error);
    throw error;
  }
}

export async function quotePost(data: QuotePostData): Promise<any> {
  try {
    const response = await fetch("/api/quote-post", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || "Failed to quote post");
    }

    return await response.json();
  } catch (error) {
    console.error("Error quoting post:", error);
    throw error;
  }
}
