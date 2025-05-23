export interface User {
  id: number;
  email: string;
  password_hash: string;
  created_at: string;
}

export interface Patient {
  id: number;
  first_name: string;
  last_name: string;
  dob: string;
  email: string;
  created_at: string;
}

export interface AuthState {
  user: User | null;
  token: string | null;
}

export interface PatientState {
  data: Patient[];
  total: number;
  status: "idle" | "loading" | "success" | "failed";
}

