"use client";
import { auth } from "../firebase";
import { useRouter } from "next/navigation";
import { useState } from "react";
import {
  useSendEmailVerification,
  useCreateUserWithEmailAndPassword,
} from "react-firebase-hooks/auth";

export default function Page() {
  const router = useRouter();
  const [createUser] = useCreateUserWithEmailAndPassword(auth);
  const [sendEmailVerification] = useSendEmailVerification(auth);

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [loading, _setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const onSubmit = async () => {
    console.log(auth);
    // const result = await createUserWithEmailAndPassword(auth, email, password);
    const result = await createUser(email, password);
    if (!result) {
      console.error("Failed to create user");
      return;
    }
    await sendEmailVerification();
    router.push("/");
  };

  return (
    <div className="flex justify-center items-center flex-col">
      <h1>Create account</h1>
      {loading ? (
        <div>Loading ...</div>
      ) : (
        <>
          <input
            type="text"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            placeholder="Email"
            className="text-xl px-4 py-2 rounded-md border border-gray-300 mb-4"
          />
          <input
            type="password"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            placeholder="Password"
            className="text-xl px-4 py-2 rounded-md border border-gray-300 mb-4"
          />
          <button
            className="bg-yellow-500 text-black px-4 py-2 rounded-md font-bold"
            onClick={onSubmit}
          >
            SIGN UP
          </button>
        </>
      )}
    </div>
  );
}
