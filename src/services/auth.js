import { useMutation } from "@tanstack/react-query";
import { account, ID } from "configs/appwrite";

const useRegister = () => {
    return useMutation({
        mutationFn: async ({ email, password, name }) => {
            await account.create({
                email,
                password,
                name,
                userId: ID.unique(),
            });
            await account.createEmailPasswordSession({
                email,
                password,
            });
            await account.createVerification({
                url: 'http://localhost:5173/',
            });
            return { name, email };
        }
    })
}

const useLogin = () => {
    return useMutation({
        mutationFn: async ({email, password}) => {
            return await account.createEmailPasswordSession({
                email,
                password,
            })
        }
    })
}

const useLogOut = () => {
    return useMutation({
        mutationFn: async () => {
            return await account.deleteSession('current');
        }
    })
}


export { useRegister, useLogin, useLogOut };