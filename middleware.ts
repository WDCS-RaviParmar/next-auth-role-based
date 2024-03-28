import {withAuth, NextRequestWithAuth} from "next-auth/middleware"
import { redirect } from "next/navigation";
import { NextResponse } from "next/server";

export default withAuth(
    function middleware(req: NextRequestWithAuth){

        const nextUrl = req.nextUrl.pathname
        const role = req?.nextauth?.token?.role
        
        

        if(nextUrl.startsWith('/admin') && role !== "admin"){
            return NextResponse.rewrite(new URL('/denied', req.url))
        }
        else if((nextUrl.startsWith('/manager') && (role !== "manager" && role !== "admin"))){
            return NextResponse.rewrite(new URL('/denied', req.url))
        }
        else if(nextUrl.startsWith('/user') && (role !== "user" && role !== "admin" && role !== "manager")){
            return NextResponse.rewrite(new URL('/denied', req.url))
        }
    },
    {
        callbacks: {
            authorized: ({token}) => {
                return !!token
            }
        }
    }
)

export const config = {matcher: ['/admin', '/user', '/manager']}