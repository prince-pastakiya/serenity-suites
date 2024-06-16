"use client";

import axios from "axios";
import { AiFillGithub } from "react-icons/ai";
import { FcGoogle } from "react-icons/fc";
import { useCallback, useState } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { signIn } from "next-auth/react";

import Model from "./Model";
import Heading from "../Heading";
import Input from "../Inputs/Input";
import Button from "../Button";

import useRegisterModel from "@/app/hooks/useRegisterModel";
import useLoginModel from "@/app/hooks/useLoginModel";
import { useRouter } from "next/navigation";
const LoginModel = () => {
	const registerModel = useRegisterModel();

	const loginModel = useLoginModel();

	const router = useRouter();

	const [isLoading, setIsLoading] = useState(false);

	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<FieldValues>({
		defaultValues: {
			email: "",
			password: "",
		},
	});

	const onSubmit: SubmitHandler<FieldValues> = (data) => {
		setIsLoading(true);
		signIn("credentials", {
			...data,
			redirect: false,
		}).then((callback) => {
			setIsLoading(false);

			if (callback?.ok) {
				toast.success("Logged in");
				router.refresh();
				loginModel.onClose();
			}
			if (callback?.error) {
				toast.error(callback.error);
			}
		});
	};

	const toggle = useCallback(() => {
		loginModel.onClose();
		registerModel.onOpen();
	}, [loginModel, registerModel]);

	const bodyContent = (
		<div className="flex flex-col gap-4">
			<Heading
				title="Welcome Back!"
				subtitle="Log in to your account!"
				center
			/>
			<Input
				id="email"
				label="Email"
				disabled={isLoading}
				register={register}
				errors={errors}
				required
			/>
			<Input
				id="password"
				type="password"
				label="Password"
				disabled={isLoading}
				register={register}
				errors={errors}
				required
			/>
		</div>
	);

	const FooterContent = (
		<div className="flex flex-col gap-4 mt-3">
			<hr />
			{/* <Button
				outline
				label="Continue with Google"
				icon={FcGoogle}
				onClick={() => signIn("google")}
			/>
			<Button
				outline
				label="Continue with GitHub"
				icon={AiFillGithub}
				onClick={() => signIn("github")}
			/> */}
			<div className="text-neutral-500 text-center mt-4 font-light">
				<div className="justify-center flex flex-row items-center gap-2">
					<div>First time using Midnight Amber?</div>
					<div
						onClick={toggle}
						className="text-neutral-800 cursor-pointer hover:underline">
						Create an account
					</div>
				</div>
			</div>
		</div>
	);

	return (
		<Model
			disabled={isLoading}
			isOpen={loginModel.isOpen}
			title="Log In"
			actionLabel="Continue"
			onClose={loginModel.onClose}
			onSubmit={handleSubmit(onSubmit)}
			body={bodyContent}
			footer={FooterContent}
		/>
	);
};

export default LoginModel;
