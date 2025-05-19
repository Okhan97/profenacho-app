import { NextResponse } from "next/server";
import axios from "axios";

export const dynamic = "force-dynamic";

export async function GET(request: Request) {
  const headers = Object.fromEntries(request.headers.entries());
  try {
    const getStudentsUrl = `${process.env.NEXT_PUBLIC_API_URL}/students`;
    const response = await axios.get(getStudentsUrl, {
      headers,
    });

    return NextResponse.json({
      students: response.data.students,
    });
  } catch (error) {
    console.error("[STUDENTS_GET]", error);
    return new NextResponse("Internal Error STUDENTS Get", { status: 500 });
  }
}
