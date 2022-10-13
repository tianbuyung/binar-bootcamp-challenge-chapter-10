import { NextResponse } from "next/dist/server/web/spec-extension/response";
import { cekUser, cekAdmin } from "features/authSlice";
import { useSelector, useDispatch } from "react-redux";

export default function middleware(req) {
	console.log(req.url);
	const url = req.url;

	const dispatch = useDispatch();
	if (url.includes("login")) {
		const isUser = useSelector((state) => {
			return state.auth;
		});

		dispatch(cekUser());

		if (isUser === true) {
			return NextResponse.redirect("/profile");
		}
	}
}

export const config = {
	matcher: [
		"/product/:path*",
		"/cart",
		"/admin/:path*",
		"/login",
		"/admin",
		"/register",
	],
};
