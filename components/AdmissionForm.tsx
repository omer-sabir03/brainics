"use client";

import { useEffect, useState, type FormEvent } from "react";
import { useLang } from "./LanguageProvider";
import { WhatsAppIcon } from "./Icons";
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

const input =
  "mt-1.5 w-full rounded-xl border border-ink-900/10 bg-white px-4 py-3 text-sm outline-none transition focus:border-gold-500 focus:ring-2 focus:ring-gold-400/40";

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

  if (referenceId !== null) {
    return (
      <div className="rounded-3xl border border-ink-900/5 bg-cream p-8 text-center shadow-card">
        <h3 className="font-display text-2xl font-bold">{a.successTitle}</h3>
        <p className="mt-3 text-ink-700">
          {a.success} <strong dir="ltr">#{referenceId}</strong>
        </p>
        <p className="mt-2 text-sm text-ink-700/70">{a.successHint}</p>
      </div>
    );
  }

  const fieldError = (key: string) =>
    errors[key] ? <p className="mt-1 text-xs text-red-600">{errors[key]}</p> : null;

  const whatsappHref = `https://wa.me/${site.whatsapp}`;

  return (
    <form onSubmit={onSubmit} noValidate className="rounded-3xl border border-ink-900/5 bg-cream p-8 shadow-card">
      <h3 className="font-display text-2xl font-bold">{a.title}</h3>
      <p className="mt-2 text-sm text-ink-700/80">{a.intro}</p>

      {loadError && <p className="mt-4 text-sm text-red-600">{a.loadError}</p>}
      {serverError && <p className="mt-4 rounded-xl bg-red-50 p-3 text-sm text-red-700">{serverError}</p>}

      <div className="mt-6 grid gap-5 sm:grid-cols-2">
        <label className="block text-sm font-semibold">
          {a.parentName} *
          <input value={values.parentName} onChange={update("parentName")} className={input} autoComplete="name" />
          {fieldError("parentName")}
        </label>
        <label className="block text-sm font-semibold">
          {a.parentEmail} *
          <input
            type="email"
            value={values.parentEmail}
            onChange={update("parentEmail")}
            className={input}
            autoComplete="email"
            dir="ltr"
          />
          {fieldError("parentEmail")}
        </label>
        <label className="block text-sm font-semibold">
          {a.parentPhone} *
          <input
            type="tel"
            inputMode="tel"
            value={values.parentPhone}
            onChange={update("parentPhone")}
            className={input}
            autoComplete="tel"
            dir="ltr"
            placeholder="+91 9XXXXXXXXX"
          />
          {fieldError("parentPhone")}
        </label>
        <label className="block text-sm font-semibold">
          {a.studentName} *
          <input value={values.studentName} onChange={update("studentName")} className={input} />
          {fieldError("studentName")}
        </label>
        <label className="block text-sm font-semibold">
          {a.dob}
          <input type="date" value={values.studentDateOfBirth} onChange={update("studentDateOfBirth")} className={input} dir="ltr" />
          {fieldError("studentDateOfBirth")}
        </label>
        <label className="block text-sm font-semibold">
          {a.gender}
          <select value={values.gender} onChange={update("gender")} className={input}>
            <option value="">{a.genderPlaceholder}</option>
            <option value="MALE">{a.male}</option>
            <option value="FEMALE">{a.female}</option>
            <option value="OTHER">{a.other}</option>
          </select>
        </label>
        <label className="block text-sm font-semibold">
          {a.classLabel} *
          <select value={values.classId} onChange={update("classId")} className={input}>
            <option value="">{a.selectClass}</option>
            {classes.map((c) => (
              <option key={c.id} value={String(c.id)}>
                {lang === "ur" ? `جماعت ${c.classNumber}` : `Class ${c.classNumber}`}
              </option>
            ))}
          </select>
          {fieldError("classId")}
        </label>
        <label className="block text-sm font-semibold">
          {a.school}
          <input value={values.currentSchool} onChange={update("currentSchool")} className={input} />
        </label>
        <div className="block text-sm font-semibold">
          {a.subjects}
          <div className="mt-1.5 rounded-xl border border-ink-900/10 bg-white p-3">
            {subjects.length === 0 ? (
              <p className="text-xs font-normal text-ink-700/60">{a.noSubjects}</p>
            ) : (
              <ul className="grid gap-2 sm:grid-cols-2">
                {subjects.map((s) => (
                  <li key={s.id}>
                    <label className="flex items-center gap-2 text-sm font-normal">
                      <input
                        type="checkbox"
                        checked={subjectIds.includes(s.id)}
                        onChange={() => toggleSubject(s.id)}
                      />
                      {lang === "ur" && s.nameUrdu ? s.nameUrdu : s.nameEn}
                    </label>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </div>

      <label className="mt-5 block text-sm font-semibold">
        {a.address}
        <textarea rows={2} value={values.address} onChange={update("address")} className={input} />
      </label>
      <label className="mt-5 block text-sm font-semibold">
        {a.message}
        <textarea rows={3} value={values.message} onChange={update("message")} className={input} />
      </label>

      <button type="submit" disabled={submitting} className="btn btn-dark mt-6 w-full disabled:opacity-60">
        {submitting ? a.submitting : a.submit}
      </button>

      <p className="mt-3 text-center text-xs text-ink-700/60">
        {a.whatsappAlt}{" "}
        <a href={whatsappHref} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 font-semibold text-ink-900 underline">
          <WhatsAppIcon /> WhatsApp
        </a>
      </p>
    </form>
  );
}
