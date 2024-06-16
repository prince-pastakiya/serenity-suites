import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Nunito } from "next/font/google";
import Navbar from "./components/Navbar/Navbar";
import ClientOnly from "./components/ClientOnly";
import RegisterModel from "./components/Models/RegisterModel";
import ToasterProvider from "./providers/ToasterProvider";
import LoginModel from "./components/Models/LoginModel";
import getCurrentUser from "./actions/getCurrentUser";
import RentModel from "./components/Models/RentModel";
import SearchModel from "./components/Models/SearchModel";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
	title: "Serenity Suites",
	description: "Living Beyond Blueprints.",
	icons: [
		{
			url: "https://img.icons8.com/?size=96&id=YCbKhwUNH1pc&format=png",
			href: "https://img.icons8.com/?size=96&id=YCbKhwUNH1pc&format=png",
		},
	],
};

const font = Nunito({
	subsets: ["latin"],
});

export default async function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	const currentUser = await getCurrentUser();
	return (
		<html lang="en">
			<body className={font.className}>
				<ClientOnly>
					<ToasterProvider />
					<SearchModel />
					<RentModel />
					<LoginModel />
					<RegisterModel />
					<Navbar currentUser={currentUser} />
				</ClientOnly>
				<div className="pb-20 pt-28">{children}</div>
			</body>
		</html>
	);
}
