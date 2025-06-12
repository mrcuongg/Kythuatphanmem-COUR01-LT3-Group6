import { Song } from "@/types";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import getSongs from "./getSongs";

const getSongsByTitle = async (title: string): Promise<Song[]> => {
  try {
    const cookieStore = cookies();
    const supabase = createServerComponentClient({ cookies: () => cookieStore });

    if (!title) {
      return await getSongs();
    }

    const { data, error } = await supabase
      .from("songs")
      .select("*")
      .ilike("title", `%${title}%`) // lọc theo tiêu đề
      .order("created_at", { ascending: false });

    if (error || !data) {
      console.error("Error fetching songs:", error?.message);
      return [];
    }

    return data as Song[];
  } catch (err) {
    console.error("Unexpected error:", err);
    return [];
  }
};

export default getSongsByTitle;
