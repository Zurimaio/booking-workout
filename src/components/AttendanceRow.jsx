import { doc, setDoc, serverTimestamp } from "firebase/firestore";
import { db } from "../services/firebase";

export default function AttendanceRow({ booking, lessonId, lessonDate }) {
  const docId = `${lessonId}_${booking.userId}`;
  const ref = doc(db, "attendances", docId);

  const updateAttendance = async (data) => {
    await setDoc(
      ref,
      {
        lessonId,
        lessonDate,
        userId: booking.userId,
        userName: booking.userName,
        updatedAt: serverTimestamp(),
        ...data,
      },
      { merge: true }
    );
  };

  return (
    <div className="bg-white rounded-xl shadow p-3 space-y-2">
      {/* Nome */}
      <div className="font-semibold text-base">
        {booking.userName}
      </div>

      {/* Presenza */}
      <div className="flex gap-2">
        <button
          onClick={() => updateAttendance({ present: true })}
          className="flex-1 py-2 rounded-lg bg-green-500 text-white text-sm"
        >
          Presente
        </button>

        <button
          onClick={() => updateAttendance({ present: false })}
          className="flex-1 py-2 rounded-lg bg-gray-200 text-sm"
        >
          Assente
        </button>
      </div>

      {/* Pagamento */}
      <div className="flex items-center gap-2">
        <label className="flex items-center gap-1 text-sm">
          <input
            type="checkbox"
            onChange={(e) =>
              updateAttendance({ paid: e.target.checked })
            }
          />
          Pagato
        </label>

        <select
          className="flex-1 border rounded px-2 py-1 text-sm"
          defaultValue=""
          onChange={(e) =>
            updateAttendance({ paymentMethod: e.target.value })
          }
        >
          <option value="" disabled>
            Metodo
          </option>
          <option value="cash">Contanti</option>
          <option value="card">Carta</option>
          <option value="app">App</option>
          <option value="subscription">Abbonamento</option>
        </select>

        <input
          type="number"
          placeholder="€"
          className="w-20 border rounded px-2 py-1 text-sm"
          onChange={(e) =>
            updateAttendance({
              paymentAmount: Number(e.target.value),
            })
          }
        />
      </div>
    </div>
  );
}
