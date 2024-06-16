"use client";

import { AiOutlineMenu } from "react-icons/ai";
import Avatar from "../Avatar";
import { useCallback, useState } from "react";
import MenuItem from "./MenuItem";
import useRegisterModel from "@/app/hooks/useRegisterModel";
import useLoginModel from "@/app/hooks/useLoginModel";
import { signOut } from "next-auth/react";
import { SafeUser } from "@/app/types";
import useRentModel from "@/app/hooks/useRentModel";
import { useRouter } from "next/navigation";

interface UserMenuProps {
	currentUser?: SafeUser | null;
}

const UserMenu: React.FC<UserMenuProps> = ({ currentUser }) => {
	const router = useRouter();
	const registerModel = useRegisterModel();
	const loginModel = useLoginModel();
	const rentModel = useRentModel();

	const [isOpen, setIsOpen] = useState(false);

	const toggleOpen = useCallback(() => {
		setIsOpen((value) => !value);
	}, []);

	const onRent = useCallback(() => {
		if (!currentUser) {
			return loginModel.onOpen();
		}
		rentModel.onOpen();
	}, [currentUser, loginModel, rentModel]);

	return (
		<div className="relative">
			<div className="flex flex-row items-center gap-3">
				<div
					onClick={onRent}
					className="
                    hidden md:block text-sm font-semibold py-3
                    px-4 rounded-full hover:bg-neutral-100
                    transition cursor-pointer">
					Add Listing
				</div>
				<div
					onClick={toggleOpen}
					className="p-4 md:py-1 md:px-2 border-[1px] border-neutral-100
                    flex flex-row items-center gap-3 rounded-full cursor-pointer
                    hover:shadow-md transition ">
					<AiOutlineMenu />
					<div className="hidden md:block">
						<Avatar src={currentUser?.image} />
					</div>
				</div>
			</div>
			{isOpen && (
				<div
					className="absolute rouded-xl shadow-md
            w-[40vw] md:w-3/4 bg-white overflow-hidden right-0 top-12 text-sm">
					<div className="flex flex-col cursor-pointer">
						{currentUser ? (
							<>
								<MenuItem
									onClick={() => router.push("/trips")}
									label="My Trips"
								/>
								<MenuItem
									onClick={() => router.push("/favorites")}
									label="My Favorites"
								/>
								<MenuItem
									onClick={() => router.push("/reservations")}
									label="Property Reservations"
								/>
								<MenuItem
									onClick={() => router.push("/properties")}
									label="My Properties"
								/>
								<MenuItem
									onClick={rentModel.onOpen}
									label="Listing a Property"
								/>
								<hr />
								<MenuItem onClick={() => signOut()} label="Sign out" />
							</>
						) : (
							<>
								<MenuItem onClick={loginModel.onOpen} label="Log In" />
								<MenuItem onClick={registerModel.onOpen} label="Sign Up" />
							</>
						)}
					</div>
				</div>
			)}
		</div>
	);
};

export default UserMenu;
