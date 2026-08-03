// import { getReq  } from "@/lib/request";
// import type { loginInfo } from "@/types/login";


// const userEmail = (email: string) => email.trim().toLowerCase();



// export const loginUser = async (email: string, password: string) => {
//     const validateEmail = userEmail(email);


//     const loginUser = await getReq(`/user?email=${validateEmail}&password=${password}&_page=1&_per_page=1`) as unknown as loginInfo[]

//     if (loginUser.length === 0) {
//         return {
//             success: false,
//             message: "User not found",
//         };
//     }
//     else {
//         return {
//             success: true,
//             message: "Login Successfull",
//             user: loginUser[0]
//         }
//     }
// };

// export const startSession = async (payload : Partial<loginInfo>) =>{
//    sessionStorage.setItem("userData",JSON.stringify(payload))
//    sessionStorage.setItem("isLoggedIn", JSON.stringify(true))
//    return true
// }

// export const checkSession = ()=>{
//   const isLoggedIn =  sessionStorage.getItem("isLoggedIn")
//   return isLoggedIn ? JSON.parse(isLoggedIn) === true : false;

// };

// export const endSession = () =>{
//    sessionStorage.clear()
//    return true
// }