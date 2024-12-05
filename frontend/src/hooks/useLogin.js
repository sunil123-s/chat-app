import { useMutation } from "@tanstack/react-query"
import axios from "axios"

export const useLogin = () => {
    const {mutate:login,isLoading,isError,error} = useMutation({
        mutationFn: async(formdata) => {
            const res = await axios.post(
              "http://localhost:8000/auth/login",
              formdata
            );
          const response = res.data;
          return response;
        }
    })
    return { login,isLoading, isError, error };
}