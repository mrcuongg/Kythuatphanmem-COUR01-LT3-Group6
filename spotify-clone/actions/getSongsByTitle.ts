import { Song } from "@/types";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import getSongs from "./getSongs";

const getSongsByTitle = async (title: string): Promise<Song[]> => {
  const cookieStore = cookies();
  const supabase = createServerComponentClient({ cookies: () => cookieStore });

  if (!title) {
    const allSongs = await getSongs();
    return allSongs;
  }

  const { data, error } = await supabase
    .from("songs")
    .select("*")
    .ilike("title", `%${title}%`) // lọc theo tiêu đề
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Error fetching songs:", error.message);
    return [];
  }

  return data as Song[];
};

export default getSongsByTitle;
