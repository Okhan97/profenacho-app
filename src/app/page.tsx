"use client";
import { auth } from "./firebase";
import Link from "next/link";
import { useAuthState, useSignOut } from "react-firebase-hooks/auth";
import { SignedIn } from "./components/signed-in";
import { SignedOut } from "./components/signed-out";
import { useEffect, useState } from "react";
import axios from "axios";
import { Student } from "@/types/types";

const Home = () => {
  const [user, loading] = useAuthState(auth);
  const [signOut] = useSignOut(auth);
  const [students, setStudents] = useState<Student[]>([]);

  useEffect(() => {
    if (!user) return;
    const getStudents = async () => {
      try {
        const token = await user.getIdToken();
        const response = await axios.get("/api/students", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setStudents(response.data.students);
      } catch (error) {
        console.error("Failed to fetch students:", error);
      }
    };
    getStudents();
  }, [user]);

  return (
    <div className="bg-black">
      <h1>NextJS + Firebase Auth</h1>
      {loading && <div>Loading ...</div>}
      <>
        <SignedIn>
          <div className="flex flex-col text-primary-500">
            <h1 className="text-3xl font-bold">Signed in as</h1>
            <p>{user?.email}</p>
            <p>
              Email verified:{" "}
              {user?.emailVerified ? (
                <span className="text-green-500">Verified</span>
              ) : (
                <span className="text-red-500">Not verified</span>
              )}
            </p>
            <button onClick={signOut} className="text-red-500 font-bold">
              Sign out
            </button>
          </div>
        </SignedIn>
        <SignedOut>
          <Link className="mr-4 underline" href="/sign-in">
            Sign in
          </Link>
          <Link className="mr-4 underline" href="/sign-up">
            Create account
          </Link>
        </SignedOut>
      </>
      <div>
        Students
        {students.length > 0 ? (
          <ul>
            {students.map((student) => (
              <li key={student.id} className="text-primary-500">
                {student.name}
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-primary-500">No students found</p>
        )}
      </div>
    </div>
  );
};

export default Home;
