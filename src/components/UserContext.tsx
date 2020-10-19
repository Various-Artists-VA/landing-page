import { createContext, useContext } from 'react'
import { CurrentUserQuery } from '../graphql'

export const UserContext = createContext<CurrentUserQuery['me'] | null>(null)
export const useCurrentUser = () => useContext(UserContext)
