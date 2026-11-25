import bcrypt from "bcryptjs";
import pg from "pg";

const { Client } = pg;

const DATABASE_URL =
  "postgresql://postgres.ymxuqarcivorbpedsbcl:satuklikgizi@aws-0-ap-northeast-2.pooler.supabase.com:5432/postgres";

const noTelp = "081280493435";
const plainPassword = "admin123";
const namaUser = "Admin";
const alamatUser = "Posyandu";
const jabatan = "Admin";
const status = "Admin";

async function main() {
  const hash = await bcrypt.hash(plainPassword, 10);
  console.log("Password hash:", hash);

  const client = new Client({ connectionString: DATABASE_URL });
  await client.connect();

  // Cek apakah nomor sudah ada
  const existing = await client.query(
    `SELECT id_user, no_telp_hp FROM users WHERE no_telp_hp = $1`,
    [noTelp]
  );

  if (existing.rows.length > 0) {
    console.log("User sudah ada, update password saja...");
    await client.query(
      `UPDATE users SET password = $1, is_active = true WHERE no_telp_hp = $2`,
      [hash, noTelp]
    );
    console.log("✅ Password berhasil diperbarui untuk", noTelp);
  } else {
    await client.query(
      `INSERT INTO users (nama_user, no_telp_hp, alamat_user, jabatan, password, status, is_active)
       VALUES ($1, $2, $3, $4, $5, $6, true)`,
      [namaUser, noTelp, alamatUser, jabatan, hash, status]
    );
    console.log("✅ User Admin berhasil dibuat:", noTelp);
  }

  await client.end();
}

main().catch((e) => {
  console.error("❌ Error:", e.message);
  process.exit(1);
});
