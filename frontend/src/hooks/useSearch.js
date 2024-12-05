import { ChatState } from "@/context/ChatProvider"
import { useQuery } from "@tanstack/react-query"
import axios from "axios"
import { useState } from "react"

const useSearch = () => {
   const [isSearch, setisSearch] = useState('')
   const {user} = ChatState()

    const {data:search,isLoading} = useQuery({
      queryKey: ["search", isSearch],
      queryFn: async () => {
        const res = await axios.get(
          `http://localhost:8000/user/searchUser?search=${isSearch}`,
          {
            headers: {
              Authorization: `Bearer ${user?.token}`,
            },
          }
        );
        return res.data;
      },
      enabled: !!isSearch.trim()
    });

  return {isSearch,setisSearch,search,isLoading}
}

export default useSearch
