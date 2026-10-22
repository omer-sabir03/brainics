"use client";

import { useEffect, useState, type FormEvent, type ReactNode } from "react";
import { useLang } from "./LanguageProvider";
import { CheckIcon, WhatsAppIcon } from "./Icons";
import { site } from "@/lib/site";
import {
  ApiError,
  fetchClasses,
  submitAdmission,
  type AdmissionPayload,
  type ClassOption,
} from "@/lib/publicApi";

type FormValues = {
  parentName: string;
  parentEmail: string;
  parentPhone: string;
  studentName: string;
  studentDateOfBirth: string;
  gender: string;
  currentSchool: string;
  address: string;
  classId: string;
  message: string;
};

const emptyValues: FormValues = {
  parentName: "",
  parentEmail: "",
  parentPhone: "",
  studentName: "",
  studentDateOfBirth: "",
  gender: "",
  currentSchool: "",
  address: "",
  classId: "",
  message: "",
};

export const fieldClass =
  "w-full rounded-xl border border-ink-900/15 bg-white px-4 py-3 text-sm text-ink-900 outline-none transition placeholder:text-ink-700/40 focus:border-gold-500 focus:ring-2 focus:ring-gold-400/30 disabled:opacity-60";

export const choiceClass = (active: boolean) =>
  `inline-flex items-center gap-2 rounded-full border px-4 py-2 text-sm font-semibold transition focus:outline-none focus-visible:ring-2 focus-visible:ring-gold-400 ${
    active
      ? "border-ink-900 bg-ink-900 text-white shadow-sm"
      : "border-ink-900/15 bg-white text-ink-900 hover:border-gold-500"
  }`;

// Label above the control, with an error line underneath
export function Field({ label, error, children, className = "" }: { label: string; error?: string; children: ReactNode; className?: string }) {
  return (
    <div className={className}>
      <span className="mb-1.5 block text-sm font-semibold text-ink-900">{label}</span>
      {children}
      {error && <p className="mt-1.5 text-xs font-medium text-red-600">{error}</p>}
    </div>
  );
}

function SectionTitle({ children }: { children: ReactNode }) {
  return <h4 className="mb-4 text-xs font-bold uppercase tracking-[0.18em] text-gold-600">{children}</h4>;
}

export default function AdmissionForm() {
  const { t, lang } = useLang();
  const a = t.contact.admission;

  const [classes, setClasses] = useState<ClassOption[]>([]);
  const [loadError, setLoadError] = useState(false);
  const [values, setValues] = useState<FormValues>(emptyValues);
  const [subjectIds, setSubjectIds] = useState<number[]>([]);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitting, setSubmitting] = useState(false);
  const [serverError, setServerError] = useState("");
  const [referenceId, setReferenceId] = useState<number | null>(null);

  useEffect(() => {
    fetchClasses()
      .then(setClasses)
      .catch(() => setLoadError(true));
  }, []);

  const selectedClass = classes.find((c) => String(c.id) === values.classId);
  const subjects = selectedClass?.subjects ?? [];

  const update = (key: keyof FormValues) => (e: { target: { value: string } }) =>
    setValues((v) => ({ ...v, [key]: e.target.value }));

  const pickClass = (id: string) => {
    setValues((v) => ({ ...v, classId: id }));
    setSubjectIds([]); // subjects belong to a class, so reset the choice
  };

  const toggleSubject = (id: number) =>
    setSubjectIds((ids) => (ids.includes(id) ? ids.filter((x) => x !== id) : [...ids, id]));

  const validate = (): Record<string, string> => {
    const next: Record<string, string> = {};
    const phone = values.parentPhone.replace(/[\s-]/g, "");

    if (!values.parentName.trim()) next.parentName = a.required;
    if (!values.parentEmail.trim()) next.parentEmail = a.required;
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.parentEmail.trim())) next.parentEmail = a.invalidEmail;
    if (!phone) next.parentPhone = a.required;
    else if (!/^(\+91|0)[6-9][0-9]{9}$/.test(phone)) next.parentPhone = a.invalidPhone;
    if (!values.studentName.trim()) next.studentName = a.required;
    if (!values.classId) next.classId = a.required;

    // Compare ISO dates as strings: today itself is not "in the past"
    const today = new Date().toISOString().slice(0, 10);
    if (values.studentDateOfBirth && values.studentDateOfBirth >= today) next.studentDateOfBirth = a.futureDate;

    return next;
  };

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setServerError("");

    const found = validate();
    setErrors(found);
    if (Object.keys(found).length > 0) return;

    const payload: AdmissionPayload = {
      parentName: values.parentName.trim(),
      parentEmail: values.parentEmail.trim(),
      parentPhone: values.parentPhone.replace(/[\s-]/g, ""),
      studentName: values.studentName.trim(),
      classId: Number(values.classId),
      studentDateOfBirth: values.studentDateOfBirth || undefined,
      gender: (values.gender || undefined) as AdmissionPayload["gender"],
      currentSchool: values.currentSchool.trim() || undefined,
      address: values.address.trim() || undefined,
      preferredSubjectIds: subjectIds.length > 0 ? subjectIds : undefined,
      message: values.message.trim() || undefined,
    };

    setSubmitting(true);
    try {
      setReferenceId(await submitAdmission(payload));
    } catch (error) {
      if (error instanceof ApiError && Object.keys(error.validationErrors).length > 0) {
        setServerError(Object.values(error.validationErrors).join(" "));
      } else if (error instanceof ApiError && error.message) {
        setServerError(error.message);
      } else {
        setServerError(a.error);
      }
    } finally {
      setSubmitting(false);
    }
  };

  const shell = "rounded-3xl border border-ink-900/10 bg-white p-6 shadow-card sm:p-8";

  if (referenceId !== null) {
    return (
      <div className={`${shell} text-center`}>
        <span className="mx-auto grid h-14 w-14 place-items-center rounded-full bg-gold-400/20 text-gold-600">
          <CheckIcon className="h-7 w-7" />
        </span>
        <h3 className="mt-5 font-display text-2xl font-bold text-ink-900">{a.successTitle}</h3>
        <p className="mt-3 text-ink-700">
          {a.success} <strong className="font-semibold text-ink-900" dir="ltr">#{referenceId}</strong>
        </p>
        <p className="mt-2 text-sm text-ink-700/70">{a.successHint}</p>
      </div>
    );
  }

  const genders = [
    { value: "MALE", label: a.male },
    { value: "FEMALE", label: a.female },
    { value: "OTHER", label: a.other },
  ];

  return (
    <form onSubmit={onSubmit} noValidate className={shell}>
      <div className="border-b border-ink-900/10 pb-5">
        <div className="mb-3 h-1 w-12 rounded-full bg-gold-400" />
        <h3 className="font-display text-2xl font-bold text-ink-900">{a.title}</h3>
        <p className="mt-2 text-sm text-ink-700/80">{a.intro}</p>
      </div>

      {loadError && <p className="mt-5 rounded-xl bg-red-50 p-3 text-sm text-red-700">{a.loadError}</p>}
      {serverError && <p className="mt-5 rounded-xl bg-red-50 p-3 text-sm text-red-700">{serverError}</p>}

      {/* Parent */}
      <section className="mt-7">
        <SectionTitle>{lang === "ur" ? "والدین" : "Parent / guardian"}</SectionTitle>
        <div className="grid gap-5 sm:grid-cols-2">
          <Field label={`${a.parentName} *`} error={errors.parentName}>
            <input value={values.parentName} onChange={update("parentName")} className={fieldClass} autoComplete="name" />
          </Field>
          <Field label={`${a.parentPhone} *`} error={errors.parentPhone}>
            <input
              type="tel"
              inputMode="tel"
              value={values.parentPhone}
              onChange={update("parentPhone")}
              className={fieldClass}
              autoComplete="tel"
              dir="ltr"
              placeholder="+91 9XXXXXXXXX"
            />
          </Field>
          <Field label={`${a.parentEmail} *`} error={errors.parentEmail} className="sm:col-span-2">
            <input
              type="email"
              value={values.parentEmail}
              onChange={update("parentEmail")}
              className={fieldClass}
              autoComplete="email"
              dir="ltr"
            />
          </Field>
        </div>
      </section>

      {/* Student */}
      <section className="mt-8">
        <SectionTitle>{lang === "ur" ? "طالب علم" : "Student"}</SectionTitle>
        <div className="grid gap-5 sm:grid-cols-2">
          <Field label={`${a.studentName} *`} error={errors.studentName}>
            <input value={values.studentName} onChange={update("studentName")} className={fieldClass} />
          </Field>
          <Field label={a.dob} error={errors.studentDateOfBirth}>
            <input type="date" value={values.studentDateOfBirth} onChange={update("studentDateOfBirth")} className={fieldClass} dir="ltr" />
          </Field>
          <Field label={a.gender} className="sm:col-span-2">
            <div className="flex flex-wrap gap-2">
              {genders.map((g) => (
                <button
                  key={g.value}
                  type="button"
                  aria-pressed={values.gender === g.value}
                  onClick={() => setValues((v) => ({ ...v, gender: v.gender === g.value ? "" : g.value }))}
                  className={choiceClass(values.gender === g.value)}
                >
                  {values.gender === g.value && <CheckIcon className="h-4 w-4" />}
                  {g.label}
                </button>
              ))}
            </div>
            <p className="mt-1.5 text-xs text-ink-700/60">{a.genderPlaceholder}</p>
          </Field>
        </div>
      </section>

      {/* Admission */}
      <section className="mt-8">
        <SectionTitle>{lang === "ur" ? "داخلہ" : "Admission"}</SectionTitle>

        <Field label={`${a.classLabel} *`} error={errors.classId}>
          {classes.length === 0 && !loadError ? (
            <p className="text-sm text-ink-700/60">…</p>
          ) : (
            <div className="flex flex-wrap gap-2">
              {classes.map((c) => (
                <button
                  key={c.id}
                  type="button"
                  aria-pressed={values.classId === String(c.id)}
                  onClick={() => pickClass(String(c.id))}
                  className={choiceClass(values.classId === String(c.id))}
                >
                  {lang === "ur" ? `جماعت ${c.classNumber}` : `Class ${c.classNumber}`}
                </button>
              ))}
            </div>
          )}
        </Field>

        <div className="mt-6">
          <span className="mb-1.5 block text-sm font-semibold text-ink-900">{a.subjects}</span>
          <div className="rounded-2xl border border-dashed border-ink-900/15 bg-cream/60 p-4">
            {subjects.length === 0 ? (
              <p className="text-sm text-ink-700/60">{a.noSubjects}</p>
            ) : (
              <div className="flex flex-wrap gap-2">
                {subjects.map((s) => {
                  const active = subjectIds.includes(s.id);
                  return (
                    <button
                      key={s.id}
                      type="button"
                      aria-pressed={active}
                      onClick={() => toggleSubject(s.id)}
                      className={choiceClass(active)}
                    >
                      {active && <CheckIcon className="h-4 w-4" />}
                      {lang === "ur" && s.nameUrdu ? s.nameUrdu : s.nameEn}
                    </button>
                  );
                })}
              </div>
            )}
          </div>
        </div>

        <div className="mt-6 grid gap-5 sm:grid-cols-2">
          <Field label={a.school}>
            <input value={values.currentSchool} onChange={update("currentSchool")} className={fieldClass} />
          </Field>
          <Field label={a.address} className="sm:col-span-2">
            <textarea rows={2} value={values.address} onChange={update("address")} className={fieldClass} />
          </Field>
          <Field label={a.message} className="sm:col-span-2">
            <textarea rows={3} value={values.message} onChange={update("message")} className={fieldClass} />
          </Field>
        </div>
      </section>

      <button
        type="submit"
        disabled={submitting}
        className="mt-8 inline-flex w-full items-center justify-center gap-2 rounded-full bg-ink-900 px-6 py-3.5 text-sm font-semibold text-white shadow-sm transition hover:bg-ink-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-gold-400 disabled:cursor-not-allowed disabled:opacity-60"
      >
        {submitting ? a.submitting : a.submit}
      </button>

      <p className="mt-4 flex flex-wrap items-center justify-center gap-1.5 text-center text-xs text-ink-700/70">
        {a.whatsappAlt}
        <a
          href={`https://wa.me/${site.whatsapp}`}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1 font-semibold text-ink-900 underline decoration-gold-400 underline-offset-4"
        >
          <WhatsAppIcon className="h-4 w-4" /> WhatsApp
        </a>
      </p>
    </form>
  );
}
