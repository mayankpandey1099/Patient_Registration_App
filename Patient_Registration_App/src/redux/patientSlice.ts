import {
  createSlice,
  createAsyncThunk,
  type PayloadAction,
} from "@reduxjs/toolkit";
import db from "../db/pglite";
import type { Patient, PatientState } from "../types";

export const addPatient = createAsyncThunk<Patient, Patient>(
  "patients/add",
  async (patient) => {
    const result = await db.query(
      "INSERT INTO patients (first_name, last_name, dob, email) VALUES ($1, $2, $3, $4) RETURNING *",
      [patient.first_name, patient.last_name, patient.dob, patient.email]
    );
    return result.rows[0] as Patient;
  }
);

export const fetchPatients = createAsyncThunk<
  { data: Patient[]; total: number },
  { page: number; pageSize: number }
>("patients/fetch", async ({ page, pageSize }) => {
  const offset = (page - 1) * pageSize;
  const result = await db.query(
    "SELECT * FROM patients ORDER BY created_at DESC LIMIT $1 OFFSET $2",
    [pageSize, offset]
  );
  const totalResult: any = await db.query("SELECT COUNT(*) FROM patients");
  return {
    data: result.rows as Patient[],
    total: Number(totalResult.rows[0].count),
  };
});

const initialState: PatientState = {
  data: [],
  total: 0,
  status: "idle",
};

const patientSlice = createSlice({
  name: "patients",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(
        addPatient.fulfilled,
        (state, action: PayloadAction<Patient>) => {
          state.data.unshift(action.payload);
          state.total += 1;
        }
      )
      .addCase(
        fetchPatients.fulfilled,
        (state, action: PayloadAction<{ data: Patient[]; total: number }>) => {
          state.data = action.payload.data;
          state.total = action.payload.total;
          state.status = "succeeded";
        }
      );
  },
});

export default patientSlice.reducer;
