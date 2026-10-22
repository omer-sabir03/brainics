import AdmissionForm from "@/components/AdmissionForm";

export const metadata = {
  title: "Admission form — Brainics",
  description: "Apply for admission at Brainics: parent, student and class details in one form.",
};

// Full admission form, linked from the homepage enquiry section
export default function AdmissionPage() {
  return (
    <main className="section bg-cream min-h-screen">
      <div className="container-x">
        <div className="mx-auto max-w-3xl">
          <a href="/" className="text-sm font-semibold text-ink-900 underline decoration-gold-400 underline-offset-4">
            ← Brainics
          </a>
          <div className="mt-6">
            <AdmissionForm />
          </div>
        </div>
      </div>
    </main>
  );
}
