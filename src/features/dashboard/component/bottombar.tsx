export default function BottomBar() {
  return (
    <footer
      className="
    bg-sky-500
    text-white
    px-8
    py-5
    flex
    items-center
    justify-between
    mt-6
  "
    >
      {/* LEFT */}
      <div className="max-w-[80%]">
        <p className="text-[11px] leading-relaxed font-medium">
          Aplikasi SIGAP Gizi Posyandu Dukuh Kelurahan Tanah Baru oleh
          Tim Mahasiswa Universitas Nusa Mandiri
        </p>
      </div>

      {/* RIGHT */}
      <div>
        <p className="text-[13px] font-medium whitespace-nowrap">
          © 2026 SIGAP Gizi. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
