import { asciiCookieTwo, surprisedOne } from "./assets/ascii";

export default async (req, context) => {

	if (context.cookies.get("choc-chip")) {
		// toggle cookie, so each time page refreshed cookie issued or removed
		context.cookies.delete("choc-chip");
		return new Response(`${surprisedOne} \n   Sorry, no choc-chip cookies for you`);
	}

	context.cookies.set("choc-chip", "yummy");

	return new Response(`${asciiCookieTwo} \n\n    Here is a choc-chip cookie for you! 🍪 `);
};

export const config = {
	path: "/hello",
};
