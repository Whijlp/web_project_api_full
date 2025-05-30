import { createContext } from "react";
const CurrentUserContexts = createContext({currentUser: { email: "" }});

export default CurrentUserContexts;
