import { notFound } from "next/navigation";
import { db } from "@/lib/db";
import { authorize } from "@/lib/authorize";
import { ACTION, PAGE } from "@/lib/permission";
import { updateActivity } from "@/features/kegiatan/update-activity";
import UpdateKegiatan from "./update-kegiatan";

export default async function EditKegiatanPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  await authorize(PAGE.KEGIATAN, ACTION.UPDATE);

  const kegiatan = await db.kegiatan.findUnique({
    where: {
      idkegiatan: Number(id),
      is_active: true,
    },
  });

  if (!kegiatan) {
    notFound();
  }

  const boundAction = updateActivity.bind(null, kegiatan.idkegiatan);

  return (
    <div className="min-h-screen bg-[#F7FAFC] flex">
      <UpdateKegiatan
        id={kegiatan.idkegiatan}
        activity={{
          judul_kegiatan: kegiatan.judul_kegiatan,
          foto: kegiatan.foto,
          tanggal_pelaksanaan: kegiatan.tanggal_pelaksanaan.toISOString(),
          jam: kegiatan.jam,
          tempat: kegiatan.tempat,
          keterangan: kegiatan.keterangan,
        }}
        action={boundAction}
      />
    </div>
  );
}
