import { withAuth } from "next-auth/middleware"

export default withAuth(
    {
        callbacks: {
            authorized: ({ token }) => !!token  
        },
        pages: {
            signIn: "/login",
        },
    },
  )

export const config = { matcher: ["/auth/patient", "/auth/admin"] }