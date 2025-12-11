import {User} from "@/contexts/userContext";

export default {
  login: async (token: string): Promise<User> => {
    await new Promise((res) => setTimeout(res, 800));

    return {
      email: "",
      name: "Neil Armstrong"
    }
  }
}
