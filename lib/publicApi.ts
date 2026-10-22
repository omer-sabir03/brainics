// Public (no login) calls to the Brainics backend used by the website.

const API_BASE = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080/api";

export type SubjectOption = {
  id: number;
  nameEn: string;
  nameUrdu: string | null;
};

export type ClassOption = {
  id: number;
  classNumber: number;
  isActive: boolean;
  subjects: SubjectOption[];
};

export type AdmissionPayload = {
  parentName: string;
  parentEmail: string;
  parentPhone: string;
  studentName: string;
  studentDateOfBirth?: string;
  gender?: "MALE" | "FEMALE" | "OTHER";
  currentSchool?: string;
  address?: string;
  classId: number;
  preferredSubjectIds?: number[];
  message?: string;
};

export class ApiError extends Error {
  validationErrors: Record<string, string>;

  constructor(message: string, validationErrors: Record<string, string> = {}) {
    super(message);
    this.validationErrors = validationErrors;
  }
}

export async function fetchClasses(): Promise<ClassOption[]> {
  const response = await fetch(`${API_BASE}/public/academy/classes`, { cache: "no-store" });
  if (!response.ok) {
    throw new ApiError("Could not load classes");
  }
  const body = (await response.json()) as { data: ClassOption[] };
  return body.data.filter((classOption) => classOption.isActive !== false);
}

// Returns the new enquiry's id, which the parent can quote when following up
export async function submitAdmission(payload: AdmissionPayload): Promise<number> {
  const response = await fetch(`${API_BASE}/public/enquiry/submit`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    const body = (await response.json().catch(() => null)) as {
      message?: string;
      validationErrors?: Record<string, string> | null;
    } | null;
    throw new ApiError(body?.message ?? "Submission failed", body?.validationErrors ?? {});
  }

  const body = (await response.json()) as { data: { id: number } };
  return body.data.id;
}
