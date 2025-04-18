import axios from "axios";
import { useEffect, useState } from "react";
import { BACKEND_URL } from "../config";

interface Content {
  _id: string;
  title: string;
  link: string;
  type: "youtube" | "twitter";
}

export function useContent() {
  const [contents, setContents] = useState<Content[]>([]);

  async function refresh() {
    try {
      const response = await axios.get(`${BACKEND_URL}/api/v1/content`, {
        headers: {
          Authorization: localStorage.getItem("token") || "",
        },
      });

      console.log("Fetched content:", response.data);

      setContents(response.data.content); // ✅ Make sure `content` exists in response
    } catch (error) {
      console.error("Error fetching content:", error);
    }
  }

  useEffect(() => {
    refresh();

    const interval = setInterval(() => {
      refresh();
    }, 10000); // 10 seconds

    return () => clearInterval(interval);
  }, []);

  return { contents, refresh };
}
