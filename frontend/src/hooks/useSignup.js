import { useMutation } from "@tanstack/react-query"
import axios from "axios";
import apiUrl from "./GetUser";

export const useSignup = () => {

    const {mutate:signup,isLoading,error,isError} = useMutation({
        mutationFn: async(formdata) => {

           const data = new FormData();
           data.append("fullName", formdata.fullName);
           data.append("userName", formdata.userName);
           data.append("password", formdata.password);
           if (formdata.profileImg) {
             data.append("profileImg", formdata.profileImg);
           }

          const res = await axios.post(
            `${apiUrl}/auth/signup`,
            data,
            {
              headers: {
                "Content-Type": "multipart/form-data",
              },
            }
          );
          const response = res.data
          return response;
        },
        onError:() => {
            console.log(error.response.data.error)
        }
    })

    return {signup,isLoading,error,isError}
}
