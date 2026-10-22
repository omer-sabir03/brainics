"use client";

import { useEffect, useState, type FormEvent } from "react";
import { useLang } from "./LanguageProvider";
import { CheckIcon } from "./Icons";
import { Field, choiceClass, fieldClass } from "./AdmissionForm";
import {
  ApiError,
  fetchClasses,
  submitAdmission,
  type ClassOption,
} from "@/lib/publicApi";

type Values = {
  parentName: string;
  parentPhone: string;
  parentEmail: string;
  studentName: string;
  classId: string;
  message: string;
};

const emptyValues: Values = {
  parentName: "",
  parentPhone: "",
  parentEmail: "",
  studentName: "",
  classId: "",
  message: "",
};

// Short enquiry for the homepage: only what the backend needs to contact the family
export default function EnquiryForm() {
  const { t, lang } = useLang();
  const a = t.contact.admission;
  const e = t.contact.enquiry;

  const [classes, setClasses] = useState<ClassOption[]>([]);
  const [loadError, setLoadError] = useState(false);
  const [values, setValues] = useState<Values>(emptyValues);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitting, setSubmitting] = useState(false);
  const [serverError, setServerError] = useState("");
  const [referenceId, setReferenceId] = useState<number | null>(null);

  useEffect(() => {
    fetchClasses()
      .then(setClasses)
      .catch(() => setLoadError(true));
  }, []);

  const update = (key: keyof Values) => (ev: { target: { value: string } }) =>
    setValues((v) => ({ ...v, [key]: ev.target.value }));

  const validate = (): Record<string, string> => {
    const next: Record<string, string> = {};
    const phone = values.parentPhone.replace(/[\s-]/g, "");

    if (!values.parentName.trim()) next.parentName = a.required;
    if (!phone) next.parentPhone = a.required;
    else if (!/^(\+91|0)[6-9][0-9]{9}$/.test(phone)) next.parentPhone = a.invalidPhone;
    if (!values.parentEmail.trim()) next.parentEmail = a.required;
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.parentEmail.trim())) next.parentEmail = a.invalidEmail;
    if (!values.studentName.trim()) next.studentName = a.required;
    if (!values.classId) next.classId = a.required;

    return next;
  };

  const onSubmit = async (ev: FormEvent) => {
    ev.preventDefault();
    setServerError("");

    const found = validate();
    setErrors(found);
    if (Object.keys(found).length > 0) return;

    setSubmitting(true);
    try {
      setReferenceId(
        await submitAdmission({
          parentName: values.parentName.trim(),
          parentPhone: values.parentPhone.replace(/[\s-]/g, ""),
          parentEmail: values.parentEmail.trim(),
          studentName: values.studentName.trim(),
          classId: Number(values.classId),
          message: values.message.trim() || undefined,
        })
      );
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

  return (
    <form onSubmit={onSubmit} noValidate className={shell}>
      <h3 className="font-display text-2xl font-bold text-ink-900">{e.title}</h3>
      <p className="mt-2 text-sm text-ink-700/80">{e.intro}</p>

      {loadError && <p className="mt-5 rounded-xl bg-red-50 p-3 text-sm text-red-700">{a.loadError}</p>}
      {serverError && <p className="mt-5 rounded-xl bg-red-50 p-3 text-sm text-red-700">{serverError}</p>}

      <div className="mt-6 grid gap-5 sm:grid-cols-2">
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
        <Field label={`${a.parentEmail} *`} error={errors.parentEmail}>
          <input type="email" value={values.parentEmail} onChange={update("parentEmail")} className={fieldClass} autoComplete="email" dir="ltr" />
        </Field>
        <Field label={`${a.studentName} *`} error={errors.studentName}>
          <input value={values.studentName} onChange={update("studentName")} className={fieldClass} />
        </Field>
        <Field label={`${a.classLabel} *`} error={errors.classId} className="sm:col-span-2">
          <div className="flex flex-wrap gap-2">
            {classes.map((c) => (
              <button
                key={c.id}
                type="button"
                aria-pressed={values.classId === String(c.id)}
                onClick={() => setValues((v) => ({ ...v, classId: String(c.id) }))}
                className={choiceClass(values.classId === String(c.id))}
              >
                {lang === "ur" ? `جماعت ${c.classNumber}` : `Class ${c.classNumber}`}
              </button>
            ))}
          </div>
        </Field>
        <Field label={a.message} className="sm:col-span-2">
          <textarea rows={3} value={values.message} onChange={update("message")} className={fieldClass} />
        </Field>
      </div>

      <button
        type="submit"
        disabled={submitting}
        className="mt-7 inline-flex w-full items-center justify-center rounded-full bg-ink-900 px-6 py-3.5 text-sm font-semibold text-white shadow-sm transition hover:bg-ink-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-gold-400 disabled:cursor-not-allowed disabled:opacity-60"
      >
        {submitting ? a.submitting : e.submit}
      </button>

      <p className="mt-5 border-t border-ink-900/10 pt-4 text-center text-sm text-ink-700/80">
        {e.applyHint}{" "}
        <a href="/admission" className="font-semibold text-ink-900 underline decoration-gold-400 underline-offset-4">
          {e.applyLink}
        </a>
      </p>
    </form>
  );
}
