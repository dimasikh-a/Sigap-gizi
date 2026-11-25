"use server";

import bcrypt from "bcryptjs";
import { redirect } from "next/navigation";
import { db } from "@/lib/db";
import { createSession } from "@/lib/auth";

export async function loginAction(
  prevState: any,
  formData: FormData
) {
  const telepon = formData
    .get("notelp")
    ?.toString()
    .trim();

  const password = formData
    .get("password")
    ?.toString();

  if (!telepon || !password) {
    return {
      error: "Nomor telepon dan password wajib diisi",
    };
  }

  // Akun hardcode untuk development/testing
  const HARDCODED_ADMIN = {
    no_telp_hp: "081280493435",
    // hash bcrypt dari "admin123"
    password: "$2b$10$l8gtyl16sJmvStOdlXDTSegvFxfY9xon45tki1LIGH9HYZQMlAb6.",
    id_user: 0,
    nama_user: "Admin",
    status: "Admin",
  };

  if (telepon === HARDCODED_ADMIN.no_telp_hp) {
    const isMatch = await bcrypt.compare(password, HARDCODED_ADMIN.password);
    if (!isMatch) {
      return { error: "Password salah" };
    }
    await createSession(
      HARDCODED_ADMIN.id_user,
      HARDCODED_ADMIN.nama_user,
      HARDCODED_ADMIN.status
    );
    redirect("/admin/dashboard");
  }

  const user = await db.users.findFirst({
    where: {
      no_telp_hp: telepon,
      is_active: true,
    },
  });

  if (!user) {
    return {
      error: "User tidak ditemukan",
    };
  }

  const isMatch = await bcrypt.compare(
    password,
    user.password
  );

  if (!isMatch) {
    return {
      error: "Password salah",
    };
  }

  await createSession(
    user.id_user,
    user.nama_user,
    user.status
  );

  redirect("/admin/dashboard");
}