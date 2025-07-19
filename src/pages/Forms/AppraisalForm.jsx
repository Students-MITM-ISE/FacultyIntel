import { useForm, FormProvider } from "react-hook-form";
import { useState } from "react";

import PersonalForm from "./PersonalForm";
import TeachingForm from "./TeachingForm";
import RDForm from "./RDForm";
import AdminForm from "./AdminForm";

function AppraisalForm({ onSubmit }) {
  const methods = useForm({
    defaultValues: {
      academic_year: "2024-2025",
      personal_details: {},
      teaching_activities: {},
      research_activities: {},
      admin_responsibilities: {},
    },
  });

  const [openSection, setOpenSection] = useState(null);

  const toggleSection = (section) => {
    setOpenSection((prev) => (prev === section ? null : section));
  };

  const handleFormSubmit = methods.handleSubmit((data) => {
    const payload = {
      ...data,
      teaching_activities: JSON.stringify(data.teaching_activities),
      research_activities: JSON.stringify(data.research_activities),
      admin_responsibilities: JSON.stringify(data.admin_responsibilities),
    };
    onSubmit(payload);
  });

  return (
    <FormProvider {...methods}>
      <form onSubmit={handleFormSubmit}>
        <h2 onClick={() => toggleSection("personal")}>1. Personal Details</h2>
        {openSection === "personal" && <PersonalForm />}

        <h2 onClick={() => toggleSection("teaching")}>
          2. Teaching, Learning & Evaluation
        </h2>
        {openSection === "teaching" && <TeachingForm />}

        <h2 onClick={() => toggleSection("rd")}>
          3. Research & Development Contributions
        </h2>
        {openSection === "rd" && <RDForm />}

        <h2 onClick={() => toggleSection("admin")}>
          4. Administrative, Organizational & Professional Contributions
        </h2>
        {openSection === "admin" && <AdminForm />}

        <button type="submit">Submit</button>
      </form>
    </FormProvider>
  );
}

export default AppraisalForm;
